import { ReactNode } from 'react'
export interface MenuType {
  // 菜单名称
  name?: string
  // 图标
  icon?: string | ReactNode
  //   菜单路径
  path: string
  //   子菜单
  children?: MenuType[] | undefined
  // 是否展示
  show?: boolean
}
