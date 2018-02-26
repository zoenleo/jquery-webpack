
## 项目结构

```
├── .eslintrc :eslint代码检查规范
├── .gitignore
├── package.json
├── index.js :项目入口文件
├── webpack.config.js :dev 相关配置文件
├── webpack.prod.js :build 相关配置文件
├── LICENSE :项目LICENSE
├── src
│   ├── category.html :页面入口
│   ├── article.html :页面入口
│   ├── index.html :页面入口
└── build :打包后的项目代码
    ├── index.html
    └── [name].bundle.js
```

下载本项目

### `yarn install`

安装依赖

### `npm start -- --env ${target page name}`

在开发环境运行项目，启动成功后，在浏览器打开`http://localhost:3000/${target page name}.html`可以访问。
当你修改项目中的文件并保存后，应用进程会重新加载，如果有错误会在终端显示。

### `npm run build -- --env ${target page name}`

运行打包程序，将项目打包为静态资源文件。

## 代码检查

集成`eslint`代码风格检查工具，可在根目录下的[.eslintrc]查看具体配置项目。