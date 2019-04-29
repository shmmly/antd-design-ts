import { Form, Row, Col, Input } from 'antd'
import React, { FunctionComponent, useState } from 'react'
import { WrappedFormUtils } from 'antd/lib/form/Form'
const FormItem = Form.Item

interface LoginItemProps {
  name: string
  rules?: any[]
  style?: React.CSSProperties
  onGetCaptcha?: (event?: MouseEvent) => void
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
  getCaptchaButtonText = 'captcha',
  getCaptchaSecondText = 'second',
  form: { getFieldDecorator },
  customProps,
  rules,
  onChange,
  defaultValue,
  type,
  name
}) => {
  // 计算countDown
  const [count, setCount] = useState(0)

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

  const options = getFormItemOptions()

  const generateItem = ()=>{
      if(type==='Captcha'){
          return (
              <FormItem>
                  <Row>
                      <Col>
                        {getFieldDecorator(name,options)(
                            <Input ></Input>
                        )}
                      </Col>
                  </Row>
              </FormItem>
          )
      }
  }


  return <div />
}
