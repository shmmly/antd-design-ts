const urlReg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/

// 判断是否是url地址
export function isUrl(path: string): boolean {
  return urlReg.test(path)
}

// /userInfo/2144/id  ['/userInfo','/userInfo/2144','/userInfo/2144/1d']
export function urlToList(url: string) {
  const urlList = url.split('/')
  return urlList.map((_, index) => `/${urlList.slice(0, index + 1).join('/')}`)
}
