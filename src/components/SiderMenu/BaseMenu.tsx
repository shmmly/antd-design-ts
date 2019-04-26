import React, { FunctionComponent, ReactNode } from 'react'
import { isUrl, urlToList } from '../../utils'
import { Icon, Menu } from 'antd'
import styles from './index.module.less'
import IconFont from '../IconFont'
import { CollapseType, SiderTheme } from 'antd/lib/layout/Sider'
import { MenuType } from '../../typeing'
import { getMenuMatches } from './utils'

const { SubMenu, Item } = Menu

interface BaseMenuProps {
  flatMenuKeys: string[]
  location?: any
  onCollapse?: (collapsed: boolean, type?: CollapseType) => void
  isMobile?: boolean
  openKeys?: string[]
  theme?: SiderTheme
  className?: string
  collapsed?: boolean
  handleOpenChange?: (openKeys: string[]) => void
  menuData?: Menu[]
  style?: React.CSSProperties
  onOpenChange?: (openKeys: string[]) => void
}
/**
 * 允许用户使用string或者ReactNode来传递icon的值
 * allow use string or ReactNode
 * @param icon
 */
const getIcon = (icon: string | ReactNode) => {
  if (typeof icon === 'string') {
    if (isUrl(icon)) {
      return (
        <Icon
          component={() => (
            <img src={icon} alt="icon" className={styles.icon} />
          )}
        />
      )
    }
    if (icon.startsWith('icon-')) {
      return <IconFont type={icon} />
    }
  }
  return icon
}

const App: FunctionComponent<BaseMenuProps> = ({ flatMenuKeys }) => {
  const getNavMenuItems = (menusData: MenuType[]) => {
    if (!menusData) {
      return []
    }
    return menusData
      .filter(menu => menu.name && menu.show)
      .map(menu => getSubMenuOrItem(menu))
      .filter(item => item)
  }

  const getSubMenuOrItem = (menu: MenuType) => {
    if (
      menu.children &&
      menu.show &&
      menu.children.some(child => (child.name ? true : false))
    ) {
      const { name } = menu
      return (
        <SubMenu
          title={
            menu.icon ? (
              <span>
                {getIcon(menu.icon)} <span>{name}</span>{' '}
              </span>
            ) : (
              name
            )
          }
          key={menu.path}
        >
          {getNavMenuItems(menu.children)}
        </SubMenu>
      )
    }
    return <Item key={menu.path}>{getMenuItemPath(menu)}></Item>
  }

  const getMenuItemPath = (menu:MenuType)=>{
    const {name}= menu
  
  }

  /**
   * 
   * 
   * @param path 
   */
  const conversionPath = (path:string)=>{
    if(path&&path.indexOf('http')===0){
      return path
    }
    return `/${path||''}`.replace(/\/+/g,'/')
  }


  // get the current selcted menu
  const getSelectedMenuKeys = (pathname: string) => {
    return urlToList(pathname).map(path =>
      getMenuMatches(flatMenuKeys, path).pop()
    )
  }

  return <div />
}
export default App
