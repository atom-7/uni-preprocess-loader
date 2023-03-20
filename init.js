const defualtContext = {
    H5: process.env.PLATFORM === 'h5',
    'MP-WEIXIN': process.env.PLATFORM === 'mp-weixin',
    'MP-ALIPAY': process.env.PLATFORM === 'mp-alipay',
}
module.exports = (config, context) => {
    context = context || defualtContext;
    config.module
        .rule('vue')
        .use('uni-preprocess-loader')
        .loader('uni-preprocess-loader')
        .before('vue-loader')
        .options({ context: context, type: 'html' })
        .end();
    const rules = [
        {
            name: 'js',
            type: 'js'
        },
        {
            name: 'scss',
            type: 'css'
        },
        {
            name: 'sass',
            type: 'css'
        },
        {
            name: 'css',
            type: 'css'
        }
    ];
    rules.forEach(({ name, type }) => {
        if (type === 'css') {
            const ruleItem = config.module.rule(name);
            for (const oneOfName of ruleItem.oneOfs.store.keys()) {
                ruleItem
                    .oneOf(oneOfName)
                        .use('uni-preprocess-loader')
                        .after('css-loader')
                        .loader('uni-preprocess-loader')
                        .options({ context: context, type })
                        .end()
                        .end()
                    .oneOf(oneOfName)
                        .use('uni-preprocess-loader')
                        .after('css-loader')
                        .loader('uni-preprocess-loader')
                        .options({ context: context, type })
                        .end()
                        .end()
                    .oneOf(oneOfName)
                        .use('uni-preprocess-loader')
                        .after('css-loader')
                        .loader('uni-preprocess-loader')
                        .options({ context: context, type })
                        .end()
                        .end()
                    .oneOf(oneOfName)
                        .use('uni-preprocess-loader')
                        .after('css-loader')
                        .loader('uni-preprocess-loader')
                        .options({ context: context, type })
                        .end()
                        .end()
            }
        } else {
            config.module
                .rule(name)
                .use('uni-preprocess-loader')
                .loader('uni-preprocess-loader')
                .options({ context: context, type })
        }


    })
    // console.log(config.module.rule('css').oneOfs.store.keys());
    // console.log("%c Line:28 🥟 config.module.toConfig().module", "color:#465975", config.toConfig().module.rules);
    // console.log("%c Line:28 🥟 config.module.toConfig().module", "color:#465975", config.toConfig().module.rules[7].oneOf[0]);
    // abort.ab.ab.ab;

}