import { PointerHint } from 'canvas-ui';
import { WLRoot } from '../core/WLRoot';
/*global WL*/

WL.registerComponent('canvas-ui-input-guard', {
    /** (optional) Name of component to disable if keyboard is in use */
    keyboardComponentName: {type: WL.Type.String, default: ''},
    /** (optional) Object containing component to disable if keyboard is in use. Required if keyboardComponentName is set, else, ignored */
    keyboardObject: {type: WL.Type.Object, default: null},
    /** (optional) Name of component to disable if pointer is hovering a UI root is in use */
    pointerComponentName: {type: WL.Type.String, default: ''},
    /** (optional) Object containing component to disable if pointer is hovering a UI root. Required if pointerComponentName is set, else, ignored */
    pointerObject: {type: WL.Type.Object, default: null},
    /** (optional) Object which has a cursor component. Required if pointerObject is set, else, ignored */
    cursorObject: {type: WL.Type.Object, default:null},
}, {
    init() {
        this.pointer = null;
        this.pointerComponent = null;
        this.keyboardComponent = null;
    },
    start() {
        if(this.keyboardComponentName !== '') {
            if(this.keyboardObject !== null) {
                const keyboardComponent = this.keyboardObject.getComponent(this.keyboardComponentName);
                if(keyboardComponent === null)
                    console.warn('keyboardObject has no component with name', this.keyboardComponentName);
                else
                    this.keyboardComponent = keyboardComponent;
            }
            else
                console.warn('keyboardComponentName set in canvas-ui-keyboard-guard, but keyboardObject was not');
        }

        if(this.pointerComponentName !== '') {
            if(this.pointerObject !== null) {
                const pointerComponent = this.pointerObject.getComponent(this.pointerComponentName);
                if(pointerComponent === null) {
                    console.warn('pointerObject has no component with name', this.pointerComponentName);
                    return;
                }

                if(this.cursorObject !== null) {
                    const cursor = this.cursorObject.getComponent('cursor');
                    if(cursor === null)
                        console.warn('cursorObject set in canvas-ui-keyboard-guard, but cursorObject has no cursor component');
                    else {
                        this.pointer = WLRoot.getPointerID(cursor);
                        this.pointerComponent = pointerComponent;
                    }
                }
                else
                    console.warn('pointerObject set in canvas-ui-keyboard-guard, but cursorObject was not');
            }
            else
                console.warn('pointerComponentName set in canvas-ui-keyboard-guard, but pointerObject was not');
        }

    },
    update(_dt) {
        if(this.keyboardObject !== null) {
            const enable = (WLRoot.keyboardDriver.getFocusedRoot() === null);
            this.keyboardObject.active = enable;
        }

        if(this.pointer !== null) {
            const enable = (WLRoot.pointerDriver.getPointerHint(this.pointer) === PointerHint.None);
            this.pointerObject.active = enable;
        }
    },
    onDeactivate() {
        if(this.keyboardObject !== null)
            this.keyboardObject.active = true;

        if(this.pointerObject !== null)
            this.pointerObject.active = true;
    },
});
