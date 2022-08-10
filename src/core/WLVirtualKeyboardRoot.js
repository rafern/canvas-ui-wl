import { VirtualKeyboard, defaultVirtualKeyboardTemplate, Margin } from '@rafern/canvas-ui';
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
     * @param {Object} [properties] An object containing all optional properties for this Root. Can have all properties from canvas-ui's VirtualKeyboardRootProperties interface and {@link WLRoot}'s properties constructor argument.
     * @param {KeyboardDriver | null} [properties.keyboardDriver=null] The KeyboardDriver to dispatch key events to. If null (default), WLRoot.keyboardDriver is used.
     * @constructor
     */
    constructor(wlObject, material, properties) {
        const keyboardDriver = properties?.keyboardDriver ?? WLRoot.keyboardDriver;

        super(
            wlObject,
            material,
            new Margin(
                new VirtualKeyboard(
                    keyboardDriver,
                    properties?.keyboardTemplate ?? defaultVirtualKeyboardTemplate
                ),
            ),
            properties
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
        this.enabled = this.keyboardDriver.needsInput;
    }
}
