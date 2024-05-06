import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
export default {
  input: './src/index.js', // 打包的入口文件
  output: {
      file: 'dist/vue.js',
      format: 'umd', // 在window上 Vue
      name: 'Vue',
      sourcemap: true
  },
  plugins: [
    // 高级语法转成初级语法
    babel({
      exclude: 'node_modules/**'
    }),
    serve({ // 3000,开启一个服务，
      port: 3000, // 端口
      contentBase: '', // 空字符串，表示当前目录
      openPage: '/index.html'
    })
  ]
}