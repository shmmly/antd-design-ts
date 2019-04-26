import React, { FunctionComponent, useEffect } from 'react'
import DocumentTitle from 'react-document-title'
const App:FunctionComponent<{}> = ()=>{

    useEffect(()=>{
        document.title ='测试'
    },[])


    return   <div>12</div>
   
}

export default App;