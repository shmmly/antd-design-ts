import { Form, Row, Col, Input, Button } from 'antd'
import React, {
  FunctionComponent,
  useState,
  useEffect,
  useContext
} from 'react'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import styles from './index.module.less'
import ItemMap from './map'
import LoginContext from './LoginContext'
const FormItem = Form.Item
/**
 * 这里大部分属性都是用在了input组件中
 *
 */
interface LoginItemProps {
  name: string
  rules?: any[]
  style?: React.CSSProperties
  // 发送验证码需要执行的函数
  onGetCaptcha?: () => void
  placeholder?: string
  // 验证码按钮的内容 可以为node
  buttonText?: React.ReactNode
  onPressEnter?: (e: any) => void
  // 倒计时
  countDown?: number
  getCaptchaButtonText?: string
  getCaptchaSecondText?: string
  updateActive: (activeItem: any) => void
  form: WrappedFormUtils
  type: string
  defaultValue?: string
  customProps?: any
  onChange?: (e: any) => void
}

const WrapFormItem: FunctionComponent<LoginItemProps> = ({
  // 这里不清楚是干嘛用的
  getCaptchaButtonText = '验证码',
  getCaptchaSecondText = 's',
  form: { getFieldDecorator },
  customProps,
  rules,
  onChange,
  defaultValue,
  placeholder,
  onGetCaptcha,
  type,
  countDown = 59,
  name
}) => {
  // 计算countDown
  const [count, setCount] = useState(countDown)

  useEffect(() => {})

  //   根据配置文件筛选options
  //   匹配antd form组件的getFieldDecorator 的props
  const getFormItemOptions = () => {
    const options: any = {
      rules: rules || customProps.rules
    }
    if (onChange) {
      options.onChange = onChange
    }
    if (defaultValue) {
      options.initivalValue = defaultValue
    }
    return options
  }

  // 发送验证码
  const handleGetCaptcha = () => {
    const result: any = onGetCaptcha ? onGetCaptcha() : null
    if (!result) {
      return
    }
    if (result instanceof Promise) {
      result.then(() => runGetCaptchaCountDown())
    } else {
      runGetCaptchaCountDown()
    }
  }
  // 执行倒计时函数
  const runGetCaptchaCountDown = () => {
    const id = setInterval(() => {
      setCount((c: number) => {
        if (c === 1) {
          clearInterval(id)
        }
        return c - 1
      })
    }, 1000)
  }

  const options = getFormItemOptions()

  const generateItem = () => {
    if (type === 'Captcha') {
      return (
        <FormItem>
          <Row gutter={8}>
            <Col span={16}>
              {getFieldDecorator(name, options)(
                <Input {...customProps} placeholder={placeholder} />
              )}
            </Col>
            <Col span={8}>
              <Button
                disabled={!!count}
                className={styles.getCaptcha}
                size="large"
                onClick={handleGetCaptcha}
              >
                {count
                  ? `${count} ${getCaptchaSecondText}`
                  : getCaptchaButtonText}
              </Button>
            </Col>
          </Row>
        </FormItem>
      )
    }
    return (
      <FormItem>
        {getFieldDecorator(name, options)(
          <Input {...customProps} placeholder={placeholder} />
        )}
      </FormItem>
    )
  }

  return <>{generateItem()}</>
}

const LoginItem: any = {}
//这里其实就是map里面自定义的一些组件内容
Object.keys(ItemMap).forEach(key => {
  //@ts-ignore
  const item = ItemMap(key)
  const ItemCompoent: FunctionComponent<LoginItemProps> = props => {
    const context = useContext(LoginContext)
    return (
      <WrapFormItem
        customProps={item.props}
        rules={item.rules}
        type={key}
        {...props}
        updateActive={context.updateActive}
        form={context.form}
      />
    )
  }
  LoginItem[key] = ItemCompoent
})

export default LoginItem
