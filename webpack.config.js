/*!
 *                                                                                                                         (℠)
 *  # Webpack Config for Bibi
 *
 */

'use strict';

const Package = require('./package.json'), Bibi = require('./bibi.info.js');

const Dresses = (_ => {
    const Dresses = require('./' + Bibi.SRC + '/bibi/wardrobe/_dresses.js') || {};
    Dresses['custom-made'] = _(Dresses['custom-made']).filter(D => !Dresses['ready-made'].includes(D));
    Dresses[ 'ready-made'] = _(Dresses[ 'ready-made']);
    return Dresses;
})(Ds => Ds instanceof Array ? Ds.filter(D => typeof D == 'string' && /^[a-zA-Z0-9][a-zA-Z0-9_\-]*$/.test(D)) : []);

const Webpack = require('webpack');

const HardSourcePlugin = require('hard-source-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const StringReplacePlugin = require('string-replace-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const BrowsersList = ['last 1 version', 'ie 11'];

const Config = {
    stats: 'errors-warnings',
    performance: { maxEntrypointSize: 1000000, maxAssetSize: 1000000, hints: false  },
    optimization: { minimizer: [] },
    entry: ((Es, Ns) => { Ns.forEach(N => Es[Bibi.DIST + '/bibi/' + N.replace(/\.js$/, '')] = __dirname + '/' + Bibi.SRC + '/bibi/' + N.replace(/\.css$/, '.scss')); return Es; })({}, [
        'and/jo.js',
        'extensions/analytics.js',
        'extensions/epubcfi.js',
        'extensions/extractor/at-once.js',
        'extensions/pegasus/pegasus.js',
        'extensions/unaccessibilizer.js',
        'extensions/zine.js',
        'resources/polyfills/bundle.js',
        'resources/polyfills/encoding.js',
        'resources/polyfills/intersection-observer.js',
        'resources/scripts/bibi.js',
        'resources/styles/bibi.css'
    ].concat(Dresses['custom-made'].map(D => 'wardrobe/' + D + '/bibi.dress.css'))),
    output: { path: __dirname, filename: '[name].js' },
    plugins: [
        new StringReplacePlugin(),
        new FixStyleOnlyEntriesPlugin({ extensions: ['scss', 'css'] }),
        new MiniCSSExtractPlugin({ filename: '[name]' }),
        new BrowserSyncPlugin(require('./bs-config.js'), { reload: true, injectCss: true }),
        new CopyPlugin([
            { from: 'node_modules/lsld/dist/lsldw.js',              to: Bibi.DIST + '/bibi/extensions/pegasus' },
            { from: Bibi.SRC + '/bibi/extensions/pegasus/lszlw.js', to: Bibi.DIST + '/bibi/extensions/pegasus' },
        ])
    ],
    module: { rules: [] }
};

module.exports = (env, argv) => {
    Config.mode = argv.mode;
    const IsDev = (Config.mode !== 'production');
    if(IsDev) {
        Config.devtool = 'inline-source-map';
    } else {
    }
    Config.module.rules.push({
        test: /\.m?js$/,
        use: [{
            loader: 'babel-loader', options: {
                babelrc: false,
                presets: [
                    ['@babel/preset-env', {
                        targets: BrowsersList,
                        useBuiltIns: false//, corejs: 3
                    }]
                ]
            }
        }]
    });
    Config.module.rules.push({
        test: /\/(bibi\.heart|jo)\.js$/,
        use: [
            StringReplacePlugin.replace({ replacements: [{
                pattern: /____Bibi-Version____/ig,
                replacement: () => Bibi.version
            }]})
        ]
    });
    Config.module.rules.push({
        test: /(\/pegasus\/pegasus)\.js$/,
        use: [
            StringReplacePlugin.replace({ replacements: [{
                pattern: /____Pegasus-Version____/ig,
                replacement: () => Package.version
            }]})
        ]
    });
    const CommonLoadersForCSS = [
        { loader: 'css-loader', options: {
            url: true,
            sourceMap: IsDev,
            importLoaders: 2
        }},
        { loader: 'postcss-loader', options: {
            config: {
                ctx: {
                    'postcss-cssnext': BrowsersList,//'autoprefixer': { grid: true },
                    'cssnano': { zindex: false }
                }
            },
            sourceMap: IsDev
        }},
        { loader: 'sass-loader', options: {
            sourceMap: IsDev
        }}
    ];
    Config.module.rules.push({
        test: /\.scss$/,
        exclude: /\/(bibi\.book|jo)\.scss$/,
        use: [
            MiniCSSExtractPlugin.loader,
            StringReplacePlugin.replace({ replacements: [{
                pattern: IsDev ? null : /@charset \\"UTF-8\\";\\n?/ig,
                replacement: () => ''
            }]})
        ].concat(CommonLoadersForCSS)
    });
    Config.module.rules.push({
        test: /\/(bibi\.book|jo)\.scss$/,
        use: [
            { loader: 'style-loader' }
        ].concat(CommonLoadersForCSS)
    });
    Config.module.rules.push({
        test: /\.(eot|wof|woff|woff2|ttf|svg)$/,
        use: [
            { loader: 'file-loader', options: {
                outputPath: Bibi.DIST + '/bibi/resources/fonts',
                publicPath:                          '../fonts',
                name: '[name].[ext]'
            }}
        ]
    });
    Config.module.rules.push({
        test: /\.(gif|png|jpg|svg)$/,
        use: [
            { loader: 'url-loader' }
        ]
    });
    (Param => Config.plugins.push(new CopyPlugin(Param.From.map(From => ({ from: From, to: Param.To })), { context: Param.Context })))({
        Context: './' + Bibi.SRC + '/bibi', To: './' + Bibi.DIST + '/bibi', From: [
            './*.html',
            './presets/**'
        ].concat(Dresses['ready-made'].map(D => './wardrobe/' + D + '/**'))
    });
    if(Config.mode === 'production') {
        Config.optimization.minimizer.push(new TerserPlugin({
            cache: true,
            parallel: true,
            extractComments: false,
            terserOptions: {
                ecma: 5,
                compress: true,
                output: {
                    comments: /^\!/,
                    beautify: false
                }
            }
        }));
        for(const N in Bibi.Banners) if(N) Config.plugins.push(new Webpack.BannerPlugin({ test: new RegExp(N.replace(/([\/\.])/g, '\\$1') + '$'), banner: Bibi.Banners[N], raw: true }));
        Config.plugins.push(new Webpack.BannerPlugin({ test: /\/pegasus\/pegasus\.js$/, banner: require(Bibi.SRC + '/bibi/extensions/pegasus/_banner.js').trim(), raw: true }));
        Config.plugins.push(new CopyPlugin([
            { from: 'LICENSE',   to: './' + Bibi.DIST + '/bibi' },
            { from: 'README.md', to: './' + Bibi.DIST + '/bibi' }
        ]));
    } else if(Config.mode === 'development') {
        Config.module.rules.push({
            test: /\/bibi\.heart\.js$/,
            use: [
                StringReplacePlugin.replace({ replacements: [{
                    pattern: /$/,
                    replacement: () => '\n' + `Bibi.Dev = true;`
                }]})
            ]
        });
    } else {
    }
    return Config;
};