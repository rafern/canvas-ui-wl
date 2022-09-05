# canvas-ui-wl

[Wonderland Engine](https://wonderlandengine.com/) integration for the
[canvas-ui](https://github.com/rafern/canvas-ui) Typescript UI library.

Documentation is available on [Github pages](https://rafern.github.io/canvas-ui-wl/).

Documentation for canvas-ui is available in the
[canvas-ui repository](https://github.com/rafern/canvas-ui).

## Setup

1. Install the canvas-ui NPM package: `npm install --save-dev @rafern/canvas-ui`
2. Install this NPM package: `npm install --save-dev @rafern/canvas-ui-wl`
3. Import needed classes from `@rafern/canvas-ui` and `@rafern/canvas-ui-wl` in your code
4. Create a new component for your UI root ([see examples section](#Examples))
5. Set the material to use for your UI root component to a textured material. If you want a semi-transparent background, create a new pipeline with alpha blending enabled

## Build

#### Stable WLE versions

If you are using the stable release versions, then simply run `npm run build`.

#### Nightly WLE versions

Wonderland Engine nightlies don't have official type definition files. To work
around this, nightly type definition files can be generated from the
`wonderland.min.js` sourcemap file. This isn't perfect (ctrl+F FIXME), but it
works for now and only needs to be done once (or when the API changes).

1. Grab a copy of the `wonderland.min.js` file from a Wonderland Editor project's `deploy` folder and put it inside `types/wonderland`.
2. Run `npm run gen_wle_types`.
3. Remove the `@wonderlandengine/api` package.
4. Add this to the `tsconfig.json` file:

```json
{
    // ...
    "compilerOptions": {
        // ...
        "paths": {
            "@wonderlandengine/api": ["./types/wonderland/wonderland.d.ts"]
        }
        // ...
    }
    // ...
}
```

After generating the file once, the regular build method can be used
(`npm run build`).

**Contributions with generated `wonderland.d.ts` or any nightly Wonderland
Engine file will be rejected. Nightlies are not meant to be redistributed.**

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
currently being developed at, and to the Wonderland Engine developers
([website](https://wonderlandengine.com/)).

## License

This project is licensed under the MIT license (see the LICENSE file)

This project uses the following open-source projects:
- [@rafern/canvas-ui](https://github.com/rafern/canvas-ui) licensed under the MIT license
- [@wonderlandengine/api](https://www.npmjs.com/package/@wonderlandengine/api) licensed under the MIT license
- [@wonderlandengine/components](https://www.npmjs.com/package/@wonderlandengine/components) licensed under the MIT license
- [@rafern/canvas-ui-typedoc-resolver](https://github.com/rafern/canvas-ui-typedoc-resolver) licensed under the MIT license
- [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint) licensed under the MIT license
- [@typescript-eslint/parser](https://github.com/typescript-eslint/typescript-eslint) licensed under the BSD 2-Clause license
- [esbuild](https://github.com/evanw/esbuild) licensed under the MIT license
- [eslint](https://github.com/eslint/eslint) licensed under the MIT license
- [eslint-plugin-tsdoc](https://github.com/microsoft/tsdoc) licensed under the MIT license
- [gl-matrix](https://github.com/toji/gl-matrix) licensed under the MIT license
- [rimraf](https://github.com/isaacs/rimraf) licensed under the ISC license
- [typedoc](https://github.com/TypeStrong/TypeDoc) licensed under the Apache 2.0 license
- [typescript](https://github.com/Microsoft/TypeScript) licensed under the Apache 2.0 license