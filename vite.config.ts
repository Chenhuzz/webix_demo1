import { defineConfig } from 'vite';
import dts from "vite-plugin-dts"; 
const mode = process.argv.slice(2).find(arg => arg.startsWith('--mode='))?.split('=')[1]; 
let buildConfig;
if(mode == "widgets"){ 
  //组件
  buildConfig = {
    outDir: 'dist/widgets',
    assetsDir: '',
    lib:{
      entry:["src/indexWidgets.ts"],
      name: 'webixExpand-widgets',
      fileName: 'webix-expand-widgets'
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['@xbs/webix-pro','webix-jet'], 
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          '@xbs/webix-pro': 'webix',"webix-jet":"webixJet"
        },
        assetFileNames:'webix-expand-widgets.css'
      }
    } 
  } 
}else{
    //框架
    buildConfig = {
    outDir: 'dist',
    assetsDir: '',
    lib:{
      entry:["src/index.ts"],
      name: 'webixExpand',
      fileName: 'webix-expand'
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['@xbs/webix-pro','webix-jet'], 
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          '@xbs/webix-pro': 'webix',"webix-jet":"webixJet"
        },
        assetFileNames:'webix-expand.css'
      }
    } 
  }
  
} 
export default defineConfig({
  server:{
    port:3000,
    open:true,
    proxy:{
      "/file": {
        target: "http://192.168.0.232:9009",
        changeOrigin: true,
      },
      "/web": {
        target: "http://192.168.0.232",
        changeOrigin: true,
      },
    }
  },
 
    plugins: [dts({
      outDir: "dist/types",
      insertTypesEntry: true,
    })], 
    resolve: {
      extensions: ['.ts', '.js', '.json']
    }, 
    build:buildConfig

})
