import { Label, Margin, Column, Row, TextInput, TextButton, Alignment, FlexAlignment, ValidatedVariable } from '@rafern/canvas-ui';
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
                .add(
                    new TextInput(new ValidatedVariable('', null, value => {
                        label.text = `Text input: ${value}`;
                    }, false))
                )
                .add(
                    new Row({
                        multiContainerAlignment: {
                            main: FlexAlignment.Center,
                            cross: Alignment.Stretch
                        },
                    }).add([
                        new TextButton('Button 1', () => label.text = 'Button 1 clicked!'),
                        new TextButton('Button 2', () => label.text = 'Button 2 clicked!'),
                    ])
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
