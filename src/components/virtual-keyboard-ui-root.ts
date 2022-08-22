import { WLVirtualKeyboardRoot } from '../core/WLVirtualKeyboardRoot';
import * as WL from '../../types/wonderland/wonderland';

interface VirtualKeyboardUIRootComponent {
    init(): void;
    update(dt: number): void;
    onActivate(): void;
    onDeactivate(): void;

    root: WLVirtualKeyboardRoot;
    forceDisabled: boolean;
    object: WL.Object;
    material: WL.Material;
}

WL.registerComponent('virtual-keyboard-ui-root', {
    /** Material to apply the canvas texture to */
    material: {type: WL.Type.Material},
}, <VirtualKeyboardUIRootComponent>{
    init() {
        this.root = new WLVirtualKeyboardRoot(this.object, this.material);
        this.forceDisabled = false;
    },
    update(_dt) {
        if(this.root && !this.forceDisabled) {
            this.root.updateVisibility();
            this.root.update();
        }
    },
    onActivate() {
        if(this.root) {
            this.forceDisabled = false;
            this.root.enabled = true;
        }
    },
    onDeactivate() {
        if(this.root) {
            this.forceDisabled = true;
            this.root.enabled = false;
        }
    },
} as unknown as WL.Component);
