module.exports = {
  components: './src/components',
  outputPath: './playroom-static',
  frameComponent: './.playroom',
  exampleCode: '<Button label="Welcome" />',
  openBrowser: false,
  webpackConfig: () => ({
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          include: __dirname,
          exclude: [/node_modules\/(?!(gatsby)\/)/],
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                '@babel/plugin-proposal-class-properties',
                'babel-plugin-remove-graphql-queries',
                'babel-plugin-styled-components',
              ],
            },
          },
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack', 'url-loader'],
        },
      ],
    },
    resolve: {
      mainFields: ['browser', 'module', 'main'],
    },
  }),
};
