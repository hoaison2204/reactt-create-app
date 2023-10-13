const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css']

module.exports = {
  productionSourceMap: false,

  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/assets/css/_foundation/_variable.scss";\n @import "@/assets/css/_foundation/_mixin.scss";`,
      },
    },
  },

  configureWebpack: {
    resolve: {
      alias: {
        vue$: "vue/dist/vue.esm.js",
      },
    },
    output: {
      filename: '[name].[hash].js',
    },
    plugins: [
      new CompressionWebpackPlugin({
        filename: '[path].gz',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      })
    ],
  },

  // CORS対策
  devServer: {
    disableHostCheck: true,
    proxy: {
      "^/v1": {
        target: process.env.VUE_APP_API_DOMAIN
      },
      "^/auto": {
        target: process.env.VUE_APP_API_DOMAIN
      },
      "^/rakuten": {
        target: process.env.VUE_APP_API_DOMAIN
      },
      "^/health": {
        target: process.env.VUE_APP_API_DOMAIN
      },
      "^/bo": {
        target: process.env.VUE_APP_CMS_ASSET_DOMAIN
      },
      "/stub/token": {
        target: "https://bomap-dev-sh.multisoup.net/benefitone"
      },
      "/stub/menu": {
        target: "https://bomap-dev-sh.multisoup.net/benefitone"
      },
      "/codes": {
        target: "https://y9hj1zl710.execute-api.ap-northeast-1.amazonaws.com/bo03devmnpps01"
      },
      "/bs-menu-api": {
        target: "https://maps-bff.tst.benefit-one.inc"
      },
      "/facilities": {
        target: "https://2luisen1r4.execute-api.ap-northeast-1.amazonaws.com/bo01-dev-curs-externalapi-stage01"
      },
      // "/menus": {
      //   target: "https://5sec2hha6e.execute-api.ap-northeast-1.amazonaws.com/bo03devmnpps01"
      // }
    }
  }
};
