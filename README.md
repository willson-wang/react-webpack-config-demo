## 简介（Introduction)

手写基于react项目的webpack配置demo，稍微修改之后可以直接在生产项目中使用

## 技术栈（Scheme）

react + typescript + webpack5

## 项目设计结构

```js
.
├── LICENSE
├── README.md
├── config
│   ├── webpack.base.config.js // 公共配置
│   ├── webpack.dev.config.js  // 开发环境配置
│   └── webpack.prod.config.js // 生产环境配置
├── global.d.ts
├── package.json
├── pnpm-lock.yaml
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── api
│   │   └── index.ts
│   ├── app.tsx
│   ├── assets
│   │   ├── images
│   │   │   ├── defaultPhoto@3x.png
│   │   │   └── defaultQR.png
│   │   └── styles
│   │       ├── index.less
│   │       └── normalize.less
│   ├── components
│   │   ├── index.ts
│   │   ├── noMatch.tsx
│   │   └── routeWithSubRoutes.tsx
│   ├── pages
│   │   ├── home
│   │   │   ├── index.less
│   │   │   └── index.tsx
│   │   └── my
│   │       └── index.tsx
│   ├── routes.ts
│   ├── types
│   │   └── index.d.ts
│   └── utils
│       └── index.ts
└── tsconfig.json
```

## 使用（Usage）

### 克隆仓库
 
git clone git@github.com:willson-wang/react-webpack-config-demo.git
 
### 安装依赖
 
pnpm install
 
### 构建模式

开发环境
```
pnpm dev
```

生产环境
```
pnpm build
```



