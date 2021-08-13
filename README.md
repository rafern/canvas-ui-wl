# canvas-ui-wl

[Wonderland Engine](https://wonderlandengine.com/) integration for the
[canvas-ui](https://github.com/rafern/canvas-ui) Typescript UI library.

Documentation is available on [Github pages](https://rafern.github.io/canvas-ui-wl/).

Documentation for canvas-ui is available in the
[canvas-ui repository](https://github.com/rafern/canvas-ui).

## Setup

1. Install the canvas-ui NPM package: `npm install --save-dev @rafern/canvas-ui`
2. Install this NPM package: `npm install --save-dev @rafern/canvas-ui-wl`
3. `require` `@rafern/canvas-ui` and `@rafern/canvas-ui-wl` in your bundle script
4. Create a new component for your UI root ([see examples section](#Examples))
5. Set the material to use for your UI root component to a textured material. If you want a semi-transparent background, create a new pipeline with alpha blending enabled

## Examples

Example usage can be found in
[example-components](https://github.com/rafern/canvas-ui-wl/tree/master/example-components).

A default virtual keyboard component, `virtual-keyboard-ui-root`, is supplied.
The implementation can be found in
[src/components/virtual-keyboard-ui-root.js](https://github.com/rafern/canvas-ui-wl/blob/master/src/components/virtual-keyboard-ui-root.js).

## Miscellaneous

A component which disables a component of 2 given objects if the keyboard and/or
mouse are in use in a UI root is also provided. The component is named
`canvas-ui-input-guard`.

## Special thanks

Special thanks to Playko ([website](https://www.playko.com/),
[github](https://github.com/playkostudios)) where this project started and is
currently being developed at.

## License

This project is licensed under the MIT license (see the LICENSE file)

This project uses the following open-source projects:
- [@rafern/canvas-ui](https://github.com/rafern/canvas-ui) licensed under the MIT license
- [esbuild](https://github.com/evanw/esbuild) licensed under the MIT license
- [eslint](https://github.com/eslint/eslint) licensed under the MIT license
- [gl-matrix](https://github.com/toji/gl-matrix) licensed under the MIT license
- [jsdoc](https://github.com/jsdoc/jsdoc) licensed under the Apache 2.0 license