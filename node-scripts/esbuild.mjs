import('esbuild').then(esbuild => esbuild.build({
    bundle: true,
    minify: true,
    sourcemap: true,
    target: 'es6',
    format: 'esm',
    logLevel: 'info',
    entryPoints: [ './src/index.ts' ],
    outfile: './lib/index.esm.js',
    external: [ '@rafern/canvas-ui', 'gl-matrix', '@wonderlandengine/api' ]
}).catch(() => process.exit(1)));