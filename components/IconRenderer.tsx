import { IconType } from 'react-icons';

const IconRenderer = ({props}) => { 
  const Icon = props.icon as IconType; 

  //const selected: boolean = props.selected;

  return (
    props.selected ? 
        <Icon  className="mx-auto border-solid border-3 border-sky-500"/>
      : <Icon  className="mx-auto "/> 
  )
}

export default IconRenderer;