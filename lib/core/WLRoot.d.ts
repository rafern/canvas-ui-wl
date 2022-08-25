/// <reference path="../../types/globals.d.ts" />
import { Root, PointerDriver, DOMKeyboardDriver } from '@rafern/canvas-ui';
import type { Widget, RootProperties } from '@rafern/canvas-ui';
/** Impostor interface for the `cursor` WLE component. */
interface CursorComponent {
    rayHit: WL.RayHit;
}
/** Impostor interface for the `cursor-target` WLE component. */
interface CursorTargetComponent {
    addUnHoverFunction(callback: (object: WL.Object, cursor: CursorComponent) => void): void;
    addMoveFunction(callback: (object: WL.Object, cursor: CursorComponent) => void): void;
    addDownFunction(callback: (object: WL.Object, cursor: CursorComponent) => void): void;
    addUpFunction(callback: (object: WL.Object, cursor: CursorComponent) => void): void;
    removeUnHoverFunction(callback: (object: WL.Object, cursor: CursorComponent) => void): void;
    removeMoveFunction(callback: (object: WL.Object, cursor: CursorComponent) => void): void;
    removeDownFunction(callback: (object: WL.Object, cursor: CursorComponent) => void): void;
    removeUpFunction(callback: (object: WL.Object, cursor: CursorComponent) => void): void;
    destroy(): void;
}
/**
 * Optional WLRoot constructor properties.
 *
 * @category Core
 */
export interface WLRootProperties extends RootProperties {
    /**
     * The amount of world units per canvas pixel. Determines the pixel density
     * of the mesh. 0.01 by default.
     */
    unitsPerPixel?: number;
    /**
     * The collision group that this root's collider will belong to. If null,
     * collider and cursor-target will not be added. 1 by default.
     */
    collisionGroup?: number;
    /**
     * Register the default pointer driver to this root? If collisionGroup is
     * null, this is forced to false. true by default.
     */
    registerPointerDriver?: boolean;
    /** Register the default keyboard driver to this root? true by default. */
    registerKeyboardDriver?: boolean;
}
/**
 * A canvas-ui Root which automatically manages a mesh and input. For an example
 * on how to use this in a component, see example-components/test-ui-root.js
 * @alias module:WLRoot
 */
export declare class WLRoot extends Root {
    /**
     * The shared PointerDriver instance. Getter only. The PointerDriver will
     * only be created when needed. Used for pointer (mouse & XR controller)
     * input.
     * @type {PointerDriver}
     */
    static get pointerDriver(): PointerDriver;
    /**
     * The shared DOMKeyboardDriver instance. Getter only. The DOMKeyboardDriver
     * will only be created when needed. Used for keyboard input.
     * @type {DOMKeyboardDriver}
     */
    static get keyboardDriver(): DOMKeyboardDriver;
    /**
     * A Map mapping each cursor component to a PointerDriver's pointer ID.
     * @type {Map}
     */
    static get pointerIDs(): Map<object, number>;
    /**
     * Get the pointer ID assigned to a given cursor component. If the cursor
     * has no pointer ID assigned, a new pointer ID is registered to the
     * PointerDriver.
     * @param cursor The cursor component
     * @type {number}
     */
    static getPointerID(cursor: object): number;
    unitsPerPixel: number;
    texture: WL.Texture | null;
    meshObject: WL.Object | null;
    mesh: WL.Mesh | null;
    meshComponent: WL.MeshComponent | null;
    materialClone: WL.Material;
    oldTexSize: [number, number];
    collision: WL.CollisionComponent | null;
    cursorTarget: CursorTargetComponent | null;
    protected valid: boolean;
    private keydownEventListener;
    private keyupEventListener;
    private unHoverFunction;
    private moveFunction;
    private downFunction;
    private upFunction;
    /**
     * Create a new WLRoot. Note that the properties object can also contain
     * optional parameters for the canvas-ui Root constructor, and will be
     * passed to it.
     *
     * If texture bleeding prevention is not specified, then it will be enabled
     * by default.
     *
     * If a pointer style handler is not specified, then a default pointer
     * style handler that changes the cursor style of the Wonderland Engine
     * canvas will be used.
     *
     * @param wlObject The object where the mesh will be added.
     * @param material The material to use for this root's mesh. The material will be cloned.
     * @param child The root's child widget.
     * @constructor
     */
    constructor(wlObject: WL.Object, material: WL.Material, child: Widget, properties?: WLRootProperties);
    /**
     * Do a full update of this root. Does a pre-layout update, resolves the
     * layout, does a post-layout update and paints. Call this instead of the
     * individual Root update methods.
     */
    update(): void;
    private _setupMesh;
    destroy(): void;
}
export {};
