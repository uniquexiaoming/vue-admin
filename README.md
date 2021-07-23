# vue-admin

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Question lists
Q1:warning Delete `␍` prettier/prettier（eslint配置的一些问题）
A1:换行格式问题,执行以下命令（可以自动修复这些问题）：npm run lint --fix
link:https://blog.csdn.net/LPLIFE/article/details/105655178

Q2:element ui 安装,报错信息
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR!
npm ERR! While resolving: sushiju@0.1.0
npm ERR! Found: vue@3.0.5
npm ERR! node_modules/vue
npm ERR!   vue@"^3.0.0" from the root project
npm ERR!
npm ERR! Could not resolve dependency:
npm ERR! peer vue@"^2.5.17" from element-ui@2.15.0
npm ERR! node_modules/element-ui
npm ERR!   element-ui@"*" from the root project
A2:7.0版本npm新版安装多会有此依赖树错误的问题出现
使用旧版本npm安装 以管理员省份运行命令行工具执行npm install -g npm@6.14.8

Q3:使用最新的Vue3.0，按照正常的elementui方式引入，结果页面出现空白，控制台出现报错Uncaught TypeError: Cannot read property 'prototype' of undefined /element-ui/lib/utils/types.js
A3:Vue3.0不支持Element UI，需要改成Element Plus。
```
npm install element-plus --save
```