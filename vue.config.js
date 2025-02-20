
module.exports ={
  pages: {
    index: {
      entry: "src/renderer/main.js",
    },
  },
  pluginOptions:{
    electronBuilder:{
      nodeIntegration: true,
      mainProcessFile: "src/main/index.js",
      mainProcessWatch: ['src/main/index.js'],
      builderOptions:{
        appId:'net.xianYun.EasyEnv',
        productName:'EasyEnv',
        mac:{
          target:[
            {
              target: 'dmg',
              arch:['x64'],
            },
          ],
          extraFiles: {
            from: "./extra/darwin/",
            to: "./",
          },
          icon: 'build/icons/icon.icns',
        },
        win:{
          target: [
            {
              target: "zip",
              arch: ["x64"]
            },
          ],
          extraFiles: {
            from: "./extra/win32/",
            to: "./",
          },
          icon: 'build/icons/icon.ico',
        },
        artifactName:'${productName}-${version}-${arch}.${ext}',

      }
    }
  }
}
