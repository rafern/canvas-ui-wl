import { PointerHint } from 'canvas-ui';
import { WLRoot } from '../core/WLRoot';
/*global WL*/

WL.registerComponent('canvas-ui-input-guard', {
    /** (optional) Object to disable if keyboard is in use */
    keyboardObject: {type: WL.Type.Object, default: null},
    /** (optional) Object to disable if pointer is hovering a UI root */
    pointerObject: {type: WL.Type.Object, default: null},
    /** (optional) Object which has a cursor component. Needed if pointerObject is set */
    cursorObject: {type: WL.Type.Object, default:null},
}, {
    init() {
        this.pointer = null;
    },
    start() {
        if(this.pointerObject !== null) {
            if(this.cursorObject === null) {
                console.warn('pointerObject set in canvas-ui-keyboard-guard, but cursorObject was not');
                return;
            }

            const cursor = this.cursorObject.getComponent('cursor');
            if(cursor === null)
                console.warn('cursorObject set in canvas-ui-keyboard-guard, but cursorObject has no cursor component');
            else
                this.pointer = WLRoot.getPointerID(cursor);
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
