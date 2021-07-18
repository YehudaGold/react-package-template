import babelPlugin from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import nodeResolverPlugin from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import less from 'rollup-plugin-less';

import pkg from './package.json';

const externals = [].concat(Object.keys(pkg.dependencies)).concat(Object.keys(pkg.peerDependencies));

const generateConfig = format => ({
    external: path => externals.some(external => path.startsWith(external)),
    input: 'src',
    output: {
        file: `dist/bundle.${format}.js`,
        format,
        sourcemap: true
    },
    plugins: [
        babelPlugin({
            babelHelpers: 'runtime',
            plugins: [
                ['@babel/plugin-transform-runtime', {corejs: {version: 3}, useESModules: format === 'esm'}]
            ],
            presets: [
                ['@babel/preset-env', {loose: true, modules: false}],
                '@babel/preset-react'
            ]
        }),
        json(),
        url({
            limit: 10 * 1024, // Inline files < 10k, copy files > 10k
            include: /\.(png|jpg|gif|ico|eot|svg|ttf|woff|woff2)$/u,
            destDir: 'dist/'
        }),
        less({
            minify: true,
            sourcemap: true,
            output: 'dist/styles.css'
        }),
        nodeResolverPlugin({extensions: ['.js', '.jsx']})
    ]
});

export default ['esm', 'cjs'].map(generateConfig);