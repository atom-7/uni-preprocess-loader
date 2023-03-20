const path = require('path')
const utils = require('loader-utils')
const preprocessor = require('./preprocess/lib/preprocess')

const isWin = /^win/.test(process.platform)
const normalizePath = path => (isWin ? path.replace(/\\/g, '/') : path);

const ERRORS = {
    html: `条件编译失败,参考示例(注意 ifdef 与 endif 必须配对使用):
<!--  #ifdef  %PLATFORM% -->
模板代码
<!--  #endif -->
`,
    js: `条件编译失败,参考示例(注意 ifdef 与 endif 必须配对使用):
// #ifdef  %PLATFORM%
js代码
// #endif
`,
    css: `条件编译失败,参考示例(注意 ifdef 与 endif 必须配对使用):
/*  #ifdef  %PLATFORM%  */
css代码
/*  #endif  */
`
}

const TAGS = {
    html: 'template',
    js: 'script',
    css: 'style'
}

module.exports = function (content, map) {
    this.cacheable && this.cacheable()
    let types = utils.getOptions(this).type;
    if (!types) return this.callback(null, content, map);
    // console.log(`%c Line:33 🍩 content [${types}]`, "color:#2eafb0", content);

    const context = utils.getOptions(this).context || {}
    if (!Array.isArray(types)) {
        types = [types]
    }
    const resourcePath = this.resourcePath
    types.forEach(type => {
        try {
            content = preprocessor.preprocess(content, context, {
                type
            })
        } catch (e) {
            let msg;
            if (~['.nvue', '.vue'].indexOf(path.extname(resourcePath))) {
                msg = `${TAGS[type]}节点 ${ERRORS[type]} 🍺 at ` + normalizePath(resourcePath + ':1')
            } else {
                msg = `${ERRORS[type]} 🍺 at ` + normalizePath(resourcePath) + ':1'
            }
            throw msg;
        }
    })
    this.callback(null, content, map)
}