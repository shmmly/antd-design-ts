module.exports = {
  fucTemplate: componentName => {
    return `
  import React,{FunctionComponent} from 'react';
  import './index.less'

  interface ${componentName}Props {

  }
    
  const ${componentName}:FunctionComponent<${componentName}Props>=()=>{
        return (
          <div></div> 
        )
  } 
    
  export default ${componentName}
    
    `;
  },
};
