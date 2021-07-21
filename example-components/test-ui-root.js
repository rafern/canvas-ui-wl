import { Margin, Label, TextButton, BasicTextInput, Column, Row } from 'canvas-ui';
import { WLRoot } from '../index.esm.js';
/*global WL*/

WL.registerComponent('test-ui-root', {
    /** Material to apply the canvas texture to */
    material: {type: WL.Type.Material},
}, {
    init() {
        const label = new Label('Hello world!');
        this.root = new WLRoot(this.object, this.material,
            new Margin(
                new Column()
                .add(label)
                .add(new BasicTextInput())
                .add(
                    new Row()
                    .add(new TextButton('Button 1', () => label.text = 'Button 1 pressed!'))
                    .add(new TextButton('Button 2', () => label.text = 'Button 2 pressed!'))
                )
            ),
        );
    },
    update(_dt) {
        if(this.root)
            this.root.update();
    },
    onActivate() {
        if(this.root)
            this.root.enabled = true;
    },
    onDeactivate() {
        if(this.root)
            this.root.enabled = false;
    },
});
