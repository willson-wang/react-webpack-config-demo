## 简介（Introduction)

webpack插件使用demo

## 技术栈（Scheme）

react + typescript + webpack5

## 项目设计结构

```js
.
├── README.md
├── babel.config.js
├── config
│   └── webpack.config.js
├── global.d.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
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
│   │   │   ├── components
│   │   │   │   ├── header.css
│   │   │   │   ├── header.module.css
│   │   │   │   ├── header.module.less
│   │   │   │   └── header.tsx
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

正常构建
```
pnpm build
```

开启loader与plugin耗时统计
```
pnpm build:speed
```

开启构建产物大小分析
```
pnpm build:analyzer
```

