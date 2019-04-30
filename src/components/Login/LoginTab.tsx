import { FunctionComponent, useEffect } from 'react'
import React from 'react'
import { Tabs } from 'antd'
const { TabPane } = Tabs

const generateId = (() => {
  let i = 0
  return (prefix = '') => {
    i += 1
    return `${prefix}${i}`
  }
})()

interface LoginTabProps {
  key?: string
//   tabPane 的标题
  tab?: React.ReactNode
  tabUtils: {
    addTab: (id: any) => void
    removeTab: (id: any) => void
  }
}

const LoginTab: FunctionComponent<LoginTabProps> = ({ tabUtils,children ,key,tab}) => {
  useEffect(() => {
    const uniqueId = generateId('login-tab-')
    tabUtils.addTab(uniqueId)
  }, [])

  return <TabPane  key={key} tab={tab}>
      {children}
  </TabPane>
}

export default LoginTab
