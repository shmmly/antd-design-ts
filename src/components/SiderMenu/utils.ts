import { MenuType } from '../../typeing'
import pathToRegexp from 'path-to-regexp'
/**
 *  获取菜单的path集合 递归获取
 * @param menuData
 */
export const getFlatMenuKeys = (menuData: MenuType[]): string[] => {
  let keys: string[] = []
  menuData.forEach(menu => {
    keys.push(menu.path)
    if (menu.children) {
      keys = keys.concat(getFlatMenuKeys(menu.children))
    }
  })
  return keys
}

export const getMenuMatches = (
  flatMenuKeys: string[],
  path: string
): string[] =>
  flatMenuKeys.filter(item => {
    if (item) {
      return pathToRegexp(item).test(path)
    }
    return false
  })
