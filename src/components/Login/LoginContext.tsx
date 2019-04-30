import { createContext } from 'react'

interface LoginContext {
  tabUtils: {}
  form: any
  updateActive: (item: any) => void
}

const loginContext:LoginContext = {
    tabUtils:{},
    form:{},
    updateActive:()=>{}
}
const LoginContext = createContext(loginContext)
export default LoginContext
