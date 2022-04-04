import { IconType } from 'react-icons';

const IconStretch = ({props}) => { 
  const Icon = props.icon as IconType; 

  return (
     <Icon className="mx-auto absolute right-10 back-img-icon"  /> 
  )
}

export default IconStretch;