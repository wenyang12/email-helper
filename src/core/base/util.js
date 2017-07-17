import device from '@/core/base/device'

export default {
  device,
  /**
   * 获取url query参数
   * @param {*} n 参数名
   * @param {*} url 默认值为location
   */
  getQuery (n, url) {
    let m, result, search

    if (url) {
      m = url.match(/\?[^#]+/)
      search = !m ? '' : m[0]
    } else {
      search = window.location.search
    }

    m = search.match(new RegExp('(?:\\?|&)' + n + '=([^&]*)(&|$)'))
    result = !m ? '' : decodeURIComponent(m[1])
    return result
  },
  /**
   * 解析邮件昵称，没有昵称则返回整个邮件地址，传入的邮件格式如“张三<zhangshan@fxiaoke.com>”
   * @param {*} sEmail 邮件地址
   */
  parseNickname (sEmail) {
    let emailArr
    if (!sEmail) { return }
    sEmail = this.trim(sEmail)
    emailArr = sEmail.match(/(.*?)(?:&lt;|<)?([\w.!#$%&*+\-/=?^{}|~]+@[\w.!#$%&*+\-/=?^{}|~]+)(?:&gt;|>)?$/)
    if (emailArr && emailArr.length) {
      return this.trim(emailArr[1]) || this.trim(emailArr[2]) || ''
    }
  },
  /**
   * 去除首尾字符
   * @param {*} sText 字符串
   */
  trim (sText) {
    return sText.replace(/^\s*/, '').replace(/\s*$/, '')
  },
  /**
   * Native注册给H5的JS对象
   * @param {*} sName 方法名称
   * @param {*} options 传入方法的参数
   */
  mailBridge (sName, options = null) {
    let FSMailBridge = window.FSMailBridge
    FSMailBridge && FSMailBridge.handle(sName, options)
    // 兼容新版webview的ios
    if (!FSMailBridge) {
      window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.FSMailBridge.postMessage({
        method: 'closeDialog',
        param: options
      })
    }
  }
}
