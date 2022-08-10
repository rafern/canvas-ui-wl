import { Root, PointerDriver, DOMKeyboardDriver, Theme } from '@rafern/canvas-ui';
import { vec3, quat } from 'gl-matrix';
/*global WL*/

// Drivers shared by all UI roots. For some reason, setting up the drivers here
// crashes Wonderland Editor. Instead, use WLRoot.pointerDriver/keyboardDriver
let canvasUIPointerDriver = null;
let canvasUIKeyboardDriver = null;

// Mapping for 'cursor' components to canvas-ui pointer IDs. Use
// WLRoot.pointerIDs or WLRoot.getPointerID(cursor)
let canvasUIPointerIDs = null;

/**
 * A canvas-ui Root which automatically manages a mesh and input. For an example
 * on how to use this in a component, see example-components/test-ui-root.js
 * @alias module:WLRoot
 */
export class WLRoot extends Root {
    /**
     * The shared PointerDriver instance. Getter only. The PointerDriver will
     * only be created when needed. Used for pointer (mouse & XR controller)
     * input.
     * @type {PointerDriver}
     */
    static get pointerDriver() {
        if(canvasUIPointerDriver === null)
            canvasUIPointerDriver = new PointerDriver();

        return canvasUIPointerDriver;
    }

    /**
     * The shared DOMKeyboardDriver instance. Getter only. The DOMKeyboardDriver
     * will only be created when needed. Used for keyboard input.
     * @type {DOMKeyboardDriver}
     */
    static get keyboardDriver() {
        if(canvasUIKeyboardDriver === null) {
            canvasUIKeyboardDriver = new DOMKeyboardDriver();
            canvasUIKeyboardDriver.bindDOMElem(WL.canvas);
        }

        return canvasUIKeyboardDriver;
    }

    /**
     * A Map mapping each cursor component to a PointerDriver's pointer ID.
     * @type {Map}
     */
    static get pointerIDs() {
        if(canvasUIPointerIDs === null)
            canvasUIPointerIDs = new Map();

        return canvasUIPointerIDs;
    }

    /**
     * Get the pointer ID assigned to a given cursor component. If the cursor
     * has no pointer ID assigned, a new pointer ID is registered to the
     * PointerDriver.
     * @param cursor The cursor component
     * @type {number}
     */
    static getPointerID(cursor) {
        const map = WLRoot.pointerIDs;
        let pointer = map.get(cursor);
        if(typeof pointer === 'undefined') {
            pointer = WLRoot.pointerDriver.registerPointer();
            //console.log('New pointer', pointer, 'registered for cursor', cursor);
            map.set(cursor, pointer);
        }

        return pointer;
    }

    /**
     * Create a new WLRoot.
     * @param {Object} wlObject The object where the mesh will be added.
     * @param {Material} material The material to use for this root's mesh. The material will be cloned.
     * @param {Widget} child The root's child widget.
     * @param {Theme} [theme=new Theme()] The root's theme. If none is supplied, the default theme is used.
     * @param {number} [unitsPerPixel=0.01] The amount of world units per canvas pixel. Determines the pixel density of the mesh.
     * @param {number | null} [collisionGroup=1] The collision group that this root's collider will belong to. If null, collider and cursor-target will not be added.
     * @param {boolean} [registerPointerDriver=true] Register the default pointer driver to this root? If collisionGroup is null, this is forced to false.
     * @param {boolean} [registerKeyboardDriver=true] Register the default keyboard driver to this root?
     * @constructor
     */
    constructor(wlObject, material, child, theme = new Theme(), unitsPerPixel = 0.01, collisionGroup = 1, registerPointerDriver = true, registerKeyboardDriver = true) {
        super(child, style => { WL.canvas.style.cursor = style }, theme);
        this.unitsPerPixel = unitsPerPixel;

        this.texture = null;

        // Create the child object where the mesh and collider will be put.
        // Starts inactive since the mesh won't be ready yet
        this.meshObject = WL.scene.addObject(wlObject);
        this.meshObject.active = false;

        // Setup drivers
        if(collisionGroup !== null && registerPointerDriver)
            this.registerDriver(WLRoot.pointerDriver);
        if(registerKeyboardDriver)
            this.registerDriver(WLRoot.keyboardDriver);

        // Setup mesh for rendering in world
        this.mesh = null;
        this.meshComponent = this.meshObject.addComponent('mesh');
        // keep clone as a variable instead of accessing it later via
        // this.meshComponent.material because mesh's material setter wraps the material,
        // so it can't be reused
        this.materialClone = material.clone();
        this.meshComponent.material = this.materialClone;
        this.oldTexSize = [0, 0];
        this._setupMesh(1, 0);

        // Setup mouse pointer input
        if(collisionGroup !== null) {
            this.collision = this.meshObject.addComponent('collision', {
                collider: WL.Collider.Box,
                extents: [1, 1, 0.01],
                group: 1 << collisionGroup,
            });

            this.cursorTarget = this.meshObject.addComponent('cursor-target');

            const cursorPos = new Float32Array(3);
            const pos = new Float32Array(3);
            const rot = new Float32Array(4);
            const getCursorPos = cursor => {
                cursorPos.set(cursor.rayHit.locations[0]);
                this.meshObject.getTranslationWorld(pos);
                vec3.sub(cursorPos, cursorPos, pos);
                quat.invert(rot, this.meshObject.rotationWorld);
                vec3.transformQuat(cursorPos, cursorPos, rot);
                vec3.div(cursorPos, cursorPos, this.meshObject.scalingWorld);

                return [
                    Math.min(Math.max((cursorPos[0] + 1) / 2, 0), 1),
                    Math.min(Math.max(1 - ((cursorPos[1] + 1) / 2), 0), 1),
                ];
            }

            if(registerPointerDriver) {
                this.cursorTarget.addUnHoverFunction((_, cursor) => {
                    WLRoot.pointerDriver.leavePointer(
                        this, WLRoot.getPointerID(cursor)
                    );
                });
                this.cursorTarget.addMoveFunction((_, cursor) => {
                    WLRoot.pointerDriver.movePointer(
                        this, WLRoot.getPointerID(cursor), ...getCursorPos(cursor), null, false, false, false
                    );
                });
                this.cursorTarget.addDownFunction((_, cursor) => {
                    WLRoot.pointerDriver.movePointer(
                        this, WLRoot.getPointerID(cursor), ...getCursorPos(cursor), 1, false, false, false
                    );
                });
                this.cursorTarget.addUpFunction((_, cursor) => {
                    WLRoot.pointerDriver.movePointer(
                        this, WLRoot.getPointerID(cursor), ...getCursorPos(cursor), 0, false, false, false
                    );
                });
            }
        }
        else {
            this.collision = null;
            this.cursorTarget = null;
        }

        this.valid = true;

        // Wonderland engine has much stricter texture limits because of the
        // texture atlas system. Limit canvas to 2048x2048 by default
        this.maxCanvasWidth = 2048;
        this.maxCanvasHeight = 2048;
    }


    /**
     * Do a full update of this root. Does a pre-layout update, resolves the
     * layout, does a post-layout update and paints. Call this instead of the
     * individual Root update methods.
     */
    update() {
        if(!this.valid)
            return;

        // Update (pre-layout)
        this.preLayoutUpdate();

        // Resolve layout
        const layoutDirty = this.resolveLayout();
        const [canvasWidth, canvasHeight] = this.canvasDimensions;
        if(layoutDirty) {
            //console.log('Root\'s layout was dirty, resizing');
            // Resize and update UV if layout was dirty so that UI is not
            // stretched
            const [width, height] = this.dimensions;
            const [scaleX, scaleY] = this.effectiveScale;
            this.meshObject.resetScaling();
            this.meshObject.scale([
                this.unitsPerPixel * width,
                this.unitsPerPixel * height,
                0.01,
            ]);

            if(this.collision !== null) {
                this.collision.extents = [
                    this.meshObject.scalingWorld[0],
                    this.meshObject.scalingWorld[1],
                    0.01,
                ];
            }

            this._setupMesh(scaleX * width / canvasWidth, 1 - (scaleY * height / canvasHeight));
        }

        // Update (post-layout)
        this.postLayoutUpdate();

        // Paint
        const wasDirty = this.paint();

        // Enable child object if the canvas is enabled
        this.meshObject.active = this.enabled;

        if(!wasDirty)
            return;

        // Update texture if needed (if root was dirty)
        if(this.oldTexSize[0] !== canvasWidth || this.oldTexSize[1] !== canvasHeight) {
            this.oldTexSize[0] = canvasWidth;
            this.oldTexSize[1] = canvasHeight;
            const mat = this.materialClone;
            const oldTexture = this.texture;
            this.texture = new WL.Texture(this.canvas);
            if(mat.shader === 'Flat Opaque Textured' || mat.shader === 'Flat Transparent Textured')
                mat.flatTexture = this.texture;
            else if(mat.shader == 'Phong Opaque Textured')
                mat.diffuseTexture = this.texture;
            else
                console.error('Shader', mat.shader, 'not supported by WLRoot');

            // Destroy old texture so that there isn't an accumulation of
            // texture atlas usage over time
            if(oldTexture)
                oldTexture.destroy();
        }
        else {
            //console.log('Root was dirty, updating texture');
            this.texture.update();
        }
    }

    _setVertex(vertexData, i, posX, posY, posZ, normX, normY, normZ, u, v) {
        vertexData.set([posX, posY, posZ, u, v, normX, normY, normZ], i * WL.Mesh.VERTEX_FLOAT_SIZE);
    }

    _setUV(vertexData, i, u, v) {
        vertexData.set([u, v], i * WL.Mesh.VERTEX_FLOAT_SIZE + WL.Mesh.TEXCOORD.U);
    }

    _setupMesh(u, v) {
        const indexData = new Uint8Array([
            0, 3, 1, // top-right triangle
            0, 2, 3, // bottom-left triangle
        ]);
        const vertexData = new Float32Array(4 * WL.Mesh.VERTEX_FLOAT_SIZE);
        this._setVertex(vertexData, 0, -1,  1, 0, 0, 0, 1, 0, 1); // top-left
        this._setVertex(vertexData, 1,  1,  1, 0, 0, 0, 1, u, 1); // top-right
        this._setVertex(vertexData, 2, -1, -1, 0, 0, 0, 1, 0, v); // bottom-left
        this._setVertex(vertexData, 3,  1, -1, 0, 0, 0, 1, u, v); // bottom-right

        const newMesh = new WL.Mesh({
            indexData,
            indexType: WL.MeshIndexType.UnsignedByte,
            vertexData,
        });

        this.meshComponent.mesh = newMesh;

        if(this.mesh)
            this.mesh.destroy();

        this.mesh = newMesh;
    }

    destroy() {
        if(this.texture) {
            this.texture.destroy();
            this.texture = null;
        }

        if(this.collision) {
            this.collision.destroy();
            this.collision = null;
        }

        if(this.cursorTarget) {
            this.cursorTarget.destroy();
            this.cursorTarget = null;
        }

        this.meshComponent.destroy();
        this.meshComponent = null;

        // FIXME material is not destroyed. find a way to do it

        if(this.mesh)
            this.mesh.destroy();

        this.meshObject.destroy();
        this.meshObject = null;

        super.destroy();
    }
}
