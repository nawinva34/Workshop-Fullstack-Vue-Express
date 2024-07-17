const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  chainWebpack: config => {
    config.module
      .rule('ignore')
      .test(/\.d\.ts$/)
      .use('ignore-loader')
      .loader('ignore-loader')
      .end();
  }
});
