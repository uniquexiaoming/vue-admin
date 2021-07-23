// https://cli.vuejs.org/zh/config/
const path = require("path");
// const webpack = require('webpack')
// const fs = require("fs");
// const resolve = dir => path.join(__dirname, dir);
// const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
// const IS_DEV = ["development"].includes(process.env.NODE_ENV);

// const glob = require('glob')
// const pagesInfo = require('./pages.config')
// const pages = {}

// glob.sync('./src/pages/**/main.js').forEach(entry => {
//   let chunk = entry.match(/\.\/src\/pages\/(.*)\/main\.js/)[1];
//   const curr = pagesInfo[chunk];
//   if (curr) {
//     pages[chunk] = {
//       entry,
//       ...curr,
//       chunk: ["chunk-vendors", "chunk-common", chunk]
//     }
//   }
// })

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "" : "/", // 默认'/'，部署应用包时的基本 URL
  outputDir: process.env.NODE_ENV === "production" ? "dist" : "devdist", // 'dist', 生产环境构建文件的目录
  // assetsDir: "", // 相对于outputDir的静态资源(js、css、img、fonts)目录
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  /*
   * webpack option, see https://github.com/vuejs/vue-cli/blob/dev/docs/guide/webpack.md
   */
  chainWebpack: (config) => {
    // 修复HMR
    config.resolve.symlinks(true);

    const cdn = {
      // 访问https://unpkg.com/element-ui/lib/theme-chalk/index.css获取最新版本
      css: ["//unpkg.com/element-ui@2.10.1/lib/theme-chalk/index.css"],
      js: [
        "//unpkg.com/vue@2.6.10/dist/vue.min.js", // 访问https://unpkg.com/vue/dist/vue.min.js获取最新版本
        "//unpkg.com/vue-router@3.0.6/dist/vue-router.min.js",
        "//unpkg.com/vuex@3.1.1/dist/vuex.min.js",
        "//unpkg.com/axios@0.19.0/dist/axios.min.js",
        "//unpkg.com/element-ui@2.10.1/lib/index.js",
      ],
    };

    // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
    config.plugin("html").tap((args) => {
      // html中添加cdn
      args[0].cdn = cdn;

      // 修复 Lazy loading routes Error
      args[0].chunksSortMode = "none";
      return args;
    });

    // 防止多页面打包卡顿
    // config => config.plugins.delete('named-chunks')

    // 多页面cdn添加
    // Object.keys(pagesInfo).forEach(page => {
    //   config.plugin(`html-${page}`).tap(args => {
    //     // html中添加cdn
    //     args[0].cdn = cdn;

    //     // 修复 Lazy loading routes Error
    //     args[0].chunksSortMode = "none";
    //     return args;
    //   });
    // })
    return config;
  },
  configureWebpack: (config) => {
    // const plugins = [];
    // config.externals = {
    //   vue: "Vue",
    //   "element-ui": "ELEMENT",
    //   "vue-router": "VueRouter",
    //   vuex: "Vuex",
    //   axios: "axios"
    // };
    // // mutate for development...
    // if (IS_DEV) {
    //   // 关闭host check，方便使用ngrok之类的内网转发工具
    //   config.devServer = {
    //     disableHostCheck: true
    //   };
    // }
    // config.plugins = [...config.plugins, ...plugins];
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css option
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 是否开启 CSS sourceMap
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      sass: {
        prependData: `@import "./src/styles/main.scss";`,
        // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
        // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        // prependData: `
        //   @import "@scss/variables.scss";
        //   @import "@scss/mixins.scss";
        //   @import "@scss/function.scss";
        //   $src: "${process.env.VUE_APP_BASE_API}";
        //   `
      },
    },
    requireModuleExtension: false,
  },
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  // use thread-loader for babel & TS in pre-processor build
  // enabled by default if the machine has more than 1 cores
  parallel: require("os").cpus().length > 1,
  /*
   * PWA plugin options， see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
   */
  pwa: {},
  // webpack-dev-server plugin options
  devServer: {
    open: false, // 编译完成是否打开浏览器
    host: "0.0.0.0", // 指定使用地址，默认localhost，0.0.0.0代表可以被外界访问
    port: "8080", // 代理端口
    https: false, // 编译失败时刷新页面
    hot: true, // 开启热加载
    hotOnly: false, // 热更新
    proxy: null,
    overlay: {
      // 全屏模式下是否显示脚本错误
      warnings: true,
      errors: true,
    },
    before: (app) => {},
  },
  /**
   * 第三方插件配置
   */
  pluginOptions: {},
};
