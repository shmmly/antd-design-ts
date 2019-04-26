import { FunctionComponent } from 'react'

// 定义不同分辨率
const query = {
  'screen-xs': {
    maxWidth: 575
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599
  },
  'screen-xxl': {
    minWidth: 1600
  }
}

interface BasicLayoutProps {
  // 导航栏的主题
  navTheme: string
  // 是否是手机用户
  isMobile: boolean
  // 菜单信息
  menuData: string
  // 面包屑
  breadcrumbNameMap: string
  // 是否固定头部
  fixedHeader: boolean
}

const BasicLayout: FunctionComponent<BasicLayoutProps> = ({
    
}) => {
  return <div />
}

export default BasicLayout
