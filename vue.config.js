// eslint-disable-next-line @typescript-eslint/no-var-requires
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = '民政服务办公室'
      return args
    })
    config.plugins.delete('prefetch')
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('api', resolve('src/api'))
      .set('views', resolve('src/views'))
      .set('components', resolve('src/components'))
    // 打包分析
    if (IS_PROD) {
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static',
        },
      ])
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "./src/assets/css/global.scss";',
      },
    },
  },
  // devServer: {
  //   proxy: {
  //     "/jobs": {
  //       target: "http://jobs.softspirit.cn/jobs", // 接口的域名
  //       changOrigin: true, // 开启代理，在本地创建一个虚拟服务端
  //       pathRewrite: {
  //         "^/jobs": "/"
  //       }
  //     }
  //   }
  // },
  productionSourceMap: false,
}
