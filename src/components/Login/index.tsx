import { FunctionComponent, useState, useContext } from 'react'
import LoginContext from './LoginContext';

interface LoginProps {
  // tab栏默认
  defaultActiveKey?: string
  //   tab chanage
  onTabChange?: (key: string) => void
  style?: React.CSSProperties
  onSumbit: (error: any, values: any) => void
  className?: string
}

const Login: FunctionComponent<LoginProps> = ({
  className = '',
  defaultActiveKey = '',
  onTabChange = () => {},
  onSumbit = () => {}
}) => {
  const [type, setType] = useState(defaultActiveKey)
  const [tabs, setTabs] = useState([])
  const [active, setActive] = useState({})
  const context = useContext(LoginContext)

  return <div />
}

export default Login
