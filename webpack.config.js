const path = require( 'path' );
const webpack = require( 'webpack' );

const dev = process.env.NODE_ENV !== 'production';

const DefinePluginConfig = new webpack.DefinePlugin( {
    'process.env.NODE_ENV': JSON.stringify( 'production' ),
} );

module.exports = {
    devServer: {
        port: '8080',
        contentBase: path.join( __dirname, '/public/' ),
    },
    devtool:   'source-map',
    entry:     [
        './src/index.tsx'
    ],
    module:    {
        rules: [
            {
                test:   /\.tsx?$/,
                loader: 'babel-loader',
            },
            {
                enforce: 'pre',
                test:    /\.js$/,
                loader:  'source-map-loader',
            },
            {
                test:   /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader',
            },
            {
                test:    /\.(jpe?g|png|gif|svg)$/i,
                loader:  'url-loader',
                options: {
                    limit: 10000,
                },
            },
        ],
    },
    resolve:   {
        extensions: [ '.ts', '.tsx', '.js' ],
    },
    output:    {
        filename:      'app.js',
        chunkFilename: 'chunk-[name].js',
        path:          path.join( __dirname, '/public/' ),
    },
    mode:      dev ? 'development' : 'production',
};
