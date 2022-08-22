const path = require('node:path');
const fs = require('node:fs');

// from https://stackoverflow.com/a/24867012, ported to JS
function getLongestCommonPrefix(/** @type {string[]} */ paths) {
    let commonStartLength = paths[0].length;

    for(let i = 1; i < paths.length; i++) {
        commonStartLength = Math.min(commonStartLength, paths[i].length);

        for(let j = 0; j < commonStartLength; j++) {
            if(paths[i][j] !== paths[0][j]) {
                commonStartLength = j;
                break;
            }
        }
    }

    return paths[0].substring(0, commonStartLength);
}

const typesDir = path.join('types', 'wonderland');

function sourcemapToJS(sourcemapPath) {
    const contents = fs.readFileSync(sourcemapPath);
    const sourcemap = JSON.parse(contents);
    const parent = getLongestCommonPrefix(sourcemap.sources);
    const trimStart = parent.length;

    for(let i = 0; i < sourcemap.sources.length; i++) {
        fs.writeFileSync(
            path.join(typesDir, sourcemap.sources[i].substring(trimStart)),
            sourcemap.sourcesContent[i]
        );
    }
}

if(require.main === module) {
    try {
        if(process.argv.length < 3)
            throw new Error('Not enough arguments. Must supply at least one sourcemap file.');
        else {
            if(!fs.existsSync(typesDir))
                fs.mkdirSync(typesDir, { recursive: true });

            for(let i = 2; i < process.argv.length; i++)
                sourcemapToJS(process.argv[i]);
        }
    }
    catch(e) {
        console.error(e.message);
        process.exit(1);
    }

    process.exit(0);
}
