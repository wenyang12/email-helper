import request from 'superagent'
import Cookies from 'js-cookie'
import _ from 'lodash'

/**
 * 通用ajax方法
 * @param {*} opt 选项描述如下:
 *  method: string  请求的方式 默认为post请求。
 *  urlPrefix: string url前缀，默认值/open/emailproxy/web/
 *  url: string 接口地址
 *  data: object 请求数据
 *  always: function 请求完成后执行, 无论成功还是失败
 *  resPreproccess: boolean 是否对response进行内置的预处理 默认值false
 *  errAlert: number 是否提示错误信息, 0: 表示不提示 1: 表示提示. 默认值1
 * @param {*} output 用作传递输出参数
 *  req: superagent对象
 */
export default {
  ajax (opt, output) {
    let option = _.defaults({}, opt, {
      method: 'post',
      urlPrefix: '/open/emailproxy/web/',
      errAlert: 1,
      resPreproccess: false,
      data: {},
      getData: {}
    })
    let req
    if (option.method !== 'get') {
      req = output.req = request.post(option.urlPrefix + option.url)
    } else {
      req = output.req = request.get(option.urlPrefix + option.url)
      option.data = null
    }
    let result = req
      .query(_.defaults(option.getData, { _fs_token: Cookies.get('fs_token') }))
      .send(option.data)
      .then(res => {
        if (option.resPreproccess === false) {
          return res.body
        }
        if (res.body.Result.StatusCode === 0) {
          let value = res.body.Value
          if (value.errorCode === 0) {
            return value
          } else {
            let err = new Error(value.errorMessage)
            err.$errCode = value.errorCode
            throw err
          }
        } else {
          let err = new Error(res.body.Result.FailureMessage)
          err.$errCode = res.body.Result.StatusCode
          throw err
        }
      })
      .catch(err => {
        if (option.errAlert === 1) alert(err.message)
        throw err
      })
    return Promise.resolve(result)
      .finally(() => {
        _.isFunction(option.always) && option.always()
      })
  },
  /**
   * 注册一般业务接口方法：方法名称取接口地址斜杠末尾
   * @param {*} serive 输出参数，所有的方法都放在service对象中
   * @param {*} names url地址名称 类似email/bind
   */
  registe (serive, ...names) {
    names.forEach(name => {
      // 取斜杠末尾为方法名称
      let nameLast = name.match(/\/(\w+)$/)[1]
      serive[nameLast] = (opt, curOpt) => {
        if (curOpt && curOpt.abortLast) {
          serive[nameLast].req && serive[nameLast].req.abort()
        }
        let output = {}
        let promise = this.ajax(Object.assign(opt, {url: name}), output)
        serive[nameLast].req = output.req
        if (curOpt && curOpt.abortLast) {
          serive[nameLast].req.once('abort', function () {
            curOpt.abortFn && curOpt.abortFn()
          })
        }
        return promise
      }
    })
    return serive
  }
}
