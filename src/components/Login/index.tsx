import { FunctionComponent, useState } from 'react'
import LoginContext from './LoginContext'
import { Form, Tabs, Divider } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import classNames from 'classnames'
import styles from './index.module.less'
import React from 'react'
interface LoginProps extends FormComponentProps {
  // tab栏默认
  defaultActiveKey?: string
  //   tab chanage
  onTabChange: (key: string) => void
  style?: React.CSSProperties
  onSumbit: (error: any, values: any) => void
  className?: string
}

const Login: FunctionComponent<LoginProps> = ({
  className = '',
  defaultActiveKey = '',
  onTabChange,
  onSumbit,
  form,
  children
}) => {
  //  这个就是标签页面的序号
  const [type, setType] = useState(defaultActiveKey)
  const [tabs, setTabs] = useState([])
  const [active, setActive] = useState({})

  const getContext = () => {
    return {
      tabUtils: {
        addTab: (id: any[]) => {
          setTabs([...tabs, id])
        },
        removeTab: (id: any) => {
          setTabs(tabs.filter(currentId => currentId !== id))
        }
      },
      form,
      updateActive: activeItem => {
        if (active[type]) {
          active[type].push(activeItem)
        } else {
          active[type] = [activeItem]
        }
        setActive(active)
      }
    }
  }

  const onSwitch = (activityKey: string) => {
    setType(activityKey)
    onTabChange(activityKey)
  }

  const handleSubmit = (e: React.FormEvent<any>) => {
    e.preventDefault()
    const activeiFileds = active[type]
    form.validateFields(activeiFileds, { force: true }, (error, values) => {
      onSumbit(error, values)
    })
  }

  const tabChildren: any[] = []
  const ohterChildren: any[] = []
  //@ts-ignore
  React.Children.forEach(children, (item:any) => {
    if (!item) {
      return
    }
    if (item.type.typeName === 'LoginTab') {
      tabChildren.push(item)
    } else {
      ohterChildren.push(item)
    }
  })

  return (
    <LoginContext.Provider value={getContext()}>
      <div className={classNames(className, styles.login)}>
        <Form onSubmit={handleSubmit}>
          {tabs.length ? (
            <>
              <Tabs
                animated
                className={styles.tabs}
                activeKey={type}
                onChange={onSwitch}
              >
                {tabChildren}
              </Tabs>
              {ohterChildren}
            </>
          ) : (
            children
          )}
        </Form>
      </div>
    </LoginContext.Provider>
  )
}

export default Form.create<LoginProps>({})(Login)
