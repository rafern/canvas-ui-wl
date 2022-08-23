/// <reference path="../../types/globals.d.ts" />
import type { VirtualKeyboardRootProperties, KeyboardDriver } from '@rafern/canvas-ui';
import type { WLRootProperties } from './WLRoot';
import { WLRoot } from './WLRoot';
/**
 * Optional WLVirtualKeyboardRoot constructor properties.
 *
 * @category Core
 */
export interface WLVirtualKeyboardRootProperties extends VirtualKeyboardRootProperties, WLRootProperties {
    /** The KeyboardDriver to dispatch key events to. If null (default), WLRoot.keyboardDriver is used. */
    keyboardDriver?: KeyboardDriver;
}
/**
 * A WLRoot with a virtual keyboard, similar to VirtualKeyboardRoot from
 * canvas-ui. Can also be automatically hidden when there is no keyboard focus
 * by callid updateVisibility before calling update. This doesn't need to be
 * directly used, the virtual-keyboard-ui-root component can be used instead.
 * @alias module:WLVirtualKeyboardRoot
 */
export declare class WLVirtualKeyboardRoot extends WLRoot {
    /** The {@link KeyboardDriver} used by this root's virtual keyboard. */
    private readonly keyboardDriver;
    /**
     * Create a new WLVirtualKeyboardRoot.
     * @param wlObject The object where the mesh will be added.
     * @param material The material to use for this root's mesh. The material will be cloned.
     * @constructor
     */
    constructor(wlObject: WL.Object, material: WL.Material, properties?: WLVirtualKeyboardRootProperties);
    /**
     * Automatically enables/disables this root if needed/unneeded. Call this
     * before calling update.
     */
    updateVisibility(): void;
}
