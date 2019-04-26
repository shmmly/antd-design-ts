
const path = require('path')
const chalk = require('chalk')
const fs = require('fs')

const resolve = (...file) => path.resolve(__dirname, ...file)

const log = message => console.log(chalk.blue(`${message}`))

const successLog = message => console.log(chalk.green(`${message}`))

const errorLog = error => console.log(chalk.red(`${error}`))

const {fucTemplate} = require('./template')

const generateFile = (path, data) => {
  if (fs.existsSync(path)) {
    errorLog(`${path} 文件已存在`)
    return
  }
  return new Promise((resolve, reject) => {
    console.log(path)
    fs.writeFile(path, data, 'utf8', error => {
      if (error) {
        errorLog(error.message)
        reject(error)
      } else {
        resolve(true)
      }
    })
  })
}
log('请输入要生成组建的名称')
let fucComponentName = ''
process.stdin.on('data', async chunk => {

  const input = String(chunk)
    .trim()
    .toString()

  /**
   * 组件根目录
   */
  const componentDirectory = resolve('../src/components/', input)

  const componentName = resolve(componentDirectory,'index.tsx')

  const compoentStyleName = resolve(componentDirectory,'index.less')


  const hasComponentDirectory = fs.existsSync(componentDirectory)

  if (hasComponentDirectory) {
    errorLog(`${input} 该组件已经存在，请确认之后 重新输入`)
    return
  } else {
    log(`正在生成component目录${componentDirectory}`)
    await dotExistDirectoryCreate(componentDirectory)
  }

  try{
    if(input.includes('/')){
      const inputArray = input.split('/')
      fucComponentName = inputArray[inputArray.length-1]
    }else{
      fucComponentName = input
    }
    log(`正在生成.tsx文件${fucComponentName}`)
    // 生成组件文件
    await generateFile(componentName,fucTemplate(fucComponentName))
    // 生成less文件
    await generateFile(compoentStyleName,"")
    successLog('文件生成成功')
  }catch(e){
    errorLog(`文件生成失败 ${e.message}`)
  }
  process.stdin.emit('end')

})

process.stdin.on('end',()=>{
  log('exit')
  process.exit()
})



// 生成文件夹
function dotExistDirectoryCreate(directory) {
  return new Promise(resolve => {
    mkdirs(directory, () => resolve(true))
  })
}

// 判断文件夹是否存在 递归生成
function mkdirs(directory, callback) {
  let exists = fs.existsSync(directory)
  if (exists) {
    callback()
  } else {
    mkdirs(path.dirname(directory), () => {
      fs.mkdirSync(directory)
      callback()
    })
  }
}
