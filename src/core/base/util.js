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
  parseNickname (email) {
    let emailArr
    if (!email) { return }
    email = this.trim(email)
    emailArr = email.match(/(.*?)(?:&lt;|<)?([\w.!#$%&*+\-/=?^{}|~]+@[\w.!#$%&*+\-/=?^{}|~]+)(?:&gt;|>)?$/)
    if (emailArr && emailArr.length) {
      return this.trim(emailArr[1]) || this.trim(emailArr[2]) || ''
    }
  },
  trim (str) {
    return str.replace(/^\s*/, '').replace(/\s*$/, '')
  }
}
