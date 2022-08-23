/// <reference path="../../types/wonderland/wonderland.min.js" />
import { VirtualKeyboard, defaultVirtualKeyboardTemplate, Margin } from '@rafern/canvas-ui';
import type { VirtualKeyboardRootProperties, KeyboardDriver } from '@rafern/canvas-ui';
import type { WLRootProperties } from './WLRoot';
import { WLRoot } from './WLRoot';

interface WLVirtualKeyboardRootProperties extends VirtualKeyboardRootProperties, WLRootProperties {
    /** The KeyboardDriver to dispatch key events to. If null (default), WLRoot.keyboardDriver is used. */
    keyboardDriver?: KeyboardDriver,
}

/**
 * A WLRoot with a virtual keyboard, similar to VirtualKeyboardRoot from
 * canvas-ui. Can also be automatically hidden when there is no keyboard focus
 * by callid updateVisibility before calling update. This doesn't need to be
 * directly used, the virtual-keyboard-ui-root component can be used instead.
 * @alias module:WLVirtualKeyboardRoot
 */
export class WLVirtualKeyboardRoot extends WLRoot {
    /** The {@link KeyboardDriver} used by this root's virtual keyboard. */
    private readonly keyboardDriver: KeyboardDriver;

    /**
     * Create a new WLVirtualKeyboardRoot.
     * @param wlObject The object where the mesh will be added.
     * @param material The material to use for this root's mesh. The material will be cloned.
     * @constructor
     */
    constructor(wlObject: WL.Object, material: WL.Material, properties?: WLVirtualKeyboardRootProperties) {
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
