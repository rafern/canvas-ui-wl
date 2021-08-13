import { VirtualKeyboard, defaultVirtualKeyboardTemplate, Theme, Margin } from '@rafern/canvas-ui';
import { WLRoot } from './WLRoot';

/**
 * A WLRoot with a virtual keyboard, similar to VirtualKeyboardRoot from
 * canvas-ui. Can also be automatically hidden when there is no keyboard focus
 * by callid updateVisibility before calling update. This doesn't need to be
 * directly used, the virtual-keyboard-ui-root component can be used instead.
 * @alias module:WLVirtualKeyboardRoot
 */
export class WLVirtualKeyboardRoot extends WLRoot {
    /**
     * Create a new WLVirtualKeyboardRoot.
     * @param {Object} wlObject The object where the mesh will be added.
     * @param {Material} material The material to use for this root's mesh. The material will be cloned.
     * @param {VirtualKeyboardTemplate} [keyboardTemplate=defaultVirtualKeyboardTemplate] The virtual keyboard's layout template. Uses the US QWERTY layout by default.
     * @param {KeyboardDriver | null} [keyboardDriver=null] The KeyboardDriver to dispatch key events to. If null (default), WLRoot.keyboardDriver is used.
     * @param {Theme} [theme=new Theme()] The root's theme. If none is supplied, the default theme is used.
     * @param {number} [unitsPerPixel=0.01] The amount of world units per canvas pixel. Determines the pixel density of the mesh.
     * @param {number | null} [collisionGroup=1] The collision group that this root's collider will belong to. If null, collider and cursor-target will not be added.
     * @param {boolean} [registerPointerDriver=true] Register the default pointer driver to this root? If collisionGroup is null, this is forced to false.
     * @constructor
     */
    constructor(wlObject, material, keyboardTemplate = defaultVirtualKeyboardTemplate, keyboardDriver = null, theme = new Theme(), unitsPerPixel = 0.01, collisionGroup = 1, registerPointerDriver = true) {
        if(keyboardDriver === null)
            keyboardDriver = WLRoot.keyboardDriver;

        super(
            wlObject, material,
            new Margin(new VirtualKeyboard(keyboardDriver, keyboardTemplate)),
            theme, unitsPerPixel, collisionGroup, registerPointerDriver, false,
        );

        this.keyboardDriver = keyboardDriver;
    }

    /**
     * Automatically enables/disables this root if needed/unneeded. Call this
     * before calling update.
     */
    updateVisibility() {
        if(!this.valid)
            return;

        // Update visibility of virtual keyboard
        this.enabled = this.keyboardDriver.getFocusedRoot() !== null;
    }
}
