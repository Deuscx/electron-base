const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
        win: {
          artifactName: "Hello Setup ${version}-${arch}.exe",
          target: [
            {
              target: "nsis",
              arch: ["x64", "ia32"],
            },
          ],
        },
        nsis: {
          shortcutName: "Hello",
          // oneClick: false,
          // allowToChangeInstallationDirectory: true,
        },
      },
    },
  },
});
