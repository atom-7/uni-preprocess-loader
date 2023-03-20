# uni-preprocess-loader

> 用于给H5的Vue项目提供Uniapp条件编译能力

使用方法

1. 安装npm包

```bash
npm install uni-preprocess-loader
```

2. 在Vue.config.js中引入
```javascript
 chainWebpack: config => {
        require('uni-preprocess-loader/init')(config, {
            H5: process.env.PLATFORM === 'h5',
            'MP-WEIXIN': process.env.PLATFORM === 'mp-weixin',
            'MP-ALIPAY': process.env.PLATFORM === 'mp-alipay',
        });
    },
```

3. 添加环境变量 - 在package.json中修改script
```javascript
 script: {
    "dev:h5" : "PLATFORM=h5 vue-cli-service serve", 
    "dev:mp-weixin" : "PLATFORM=mp-weixin vue-cli-service serve", 
    //   ${环境} : 平台:  "PLATFORM=${平台}  .....其他你项目配置"
 }
```
4. vue SFC上使用
```html
<style>
    /* #ifdef MP */
        .page{ color:red; } 
    /* #endif */
</style>
<template> 
    <!-- #ifdef MP -->
        <div>只在mp生效</div>
    <!-- #endif -->
</template>

<script>
export default {
    create(){
        // #ifdef h5
        console.log("只会在h5打印")
        // #endif
    }
}
</script>
```
### 注意: 第三步如果在win下,设置环境变量请借助 cross-env
---
init文件参数
1. config: webpack-chain-config 链式webpackConfig
2. context: 条件编译的上下文,用于编译时判断当前环境
