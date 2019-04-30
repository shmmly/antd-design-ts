import React from 'react'
import { Icon, message } from 'antd'
import styles from './index.module.less'
import { placeholder } from '@babel/types'

interface LoginItemMap {
  [key: string]: {
    props: {
      size?: string
      id?: string
      prefix?: React.ReactNode
      placeholder?: string
      type?: string
    }
    rules: [
      {
        required?: boolean
        message: string
        pattern?: string
      },
      {
        pattern?: any
        message?: string
      }?
    ]
  }
}

const ItemMaps: LoginItemMap = {
  UserName: {
    props: {
      size: 'large',
      id: 'userName',
      prefix: <Icon type="user" className={styles.prefixIcon} />,
      placeholder: 'admin'
    },
    rules: [
      {
        required: true,
        message: 'Please enter username!'
      }
    ]
  },
  Password: {
    props: {
      size: 'large',
      prefix: <Icon type="lock" className={styles.prefixIcon} />,
      type: 'password',
      id: 'password',
      placeholder: '888888'
    },
    rules: [
      {
        required: true,
        message: 'Please enter password!'
      }
    ]
  },
  Mobile: {
    props: {
      size: 'large',
      prefix: <Icon type="mobile" className={styles.prefixIcon} />,
      placeholder: 'mobile number'
    },
    rules: [
      {
        required: true,
        message: 'Please enter mobile number!'
      },
      {
        pattern: /^1\d{10}$/,
        message: 'Wrong mobile number format!'
      }
    ]
  },
  Captcha: {
    props: {
      size: 'large',
      prefix: <Icon type="mail" className={styles.prefixIcon} />,
      placeholder: 'captcha'
    },
    rules: [
      {
        required: true,
        message: 'Please enter Captcha!'
      }
    ]
  }
}

export default ItemMaps
