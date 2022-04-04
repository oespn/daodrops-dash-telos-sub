
import { useState, useEffect } from 'react'
import { styled } from '@stitches/react'

import { BsPalette, BsPiggyBank } from 'react-icons/bs';
import { BsChevronDown } from 'react-icons/bs'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { CHAINS, TelosURLS } from '../../../utils/web3-connnectors/chains';
 


const Main = styled("div", {
  width: '8em',
  position: 'sticky',
  right: 0,
});

const DropDownContainer = styled("div", {
  width: '10em',
  margin: '0 auto 5',
  right:0,
});

const DropDownHeader = styled("div", {
  'margin-top': 2,
  'margin-bottom': '0.0em',
  background: '#ffffff',
});

const DropDownListContainer = styled("div",
{
  position: 'fixed',

});

const DropDownList = styled("ul", {
  width: '9em',
  padding: 0,
  margin: 0,
  'padding-left': '1em',
  background: '#ffffff',
  border: '2px solid #e5e5e5',
  'box-sizing': 'border-box',
  '&:first-child' : '{ padding-top: 0.2em;}',
});

const ListOption = styled("li", {
  textAlign: 'right',
  justifyContent: 'right',
  color: 'Grey',
  fontSize: '0.8em',
  'margin-bottom': '0.2em',
});

const ListItem = styled("li", {
  'list-style': 'none',
  textAlign: 'left',
  color: '#6366F1',
  fontSize: '0.8em',
  'margin-bottom': '0.2em',
});


const DropDownMenu = ({props}) =>
{

  const chainOptions = TelosURLS();

    const router = useRouter();

    const [walletBalance, setBalance] = useState("0");

    useEffect(() => {

    }, []);

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Telos Testnet EVM");
    
    console.log('handleStatusChange:'+props.handleStatusChange);
    const setIsClient = props.handleStatusChange;

    var isClient = props.isClient;

    const toggling = () => setIsOpen(!isOpen);
  
    const onOptionClicked = value => () => {
      setSelectedOption(value);
      setIsOpen(false);
      console.log('sel option:'+selectedOption);
      props.handleStatusChange(isClient);
      /* reload UI with selected network considered */
    };

    return (
    <Main>
      <DropDownContainer>
          <DropDownHeader onClick={toggling}>
            <button className="flex items-center gap-1 ">
              <span className="text-sm font-medium">{selectedOption}</span>
              <span>
                <BsChevronDown className="text-sm" />
              </span>
            </button>
          </DropDownHeader>
        {isOpen && (
          <DropDownListContainer>
            <DropDownList>
              
              <hr/>
              <ListItem onClick={onOptionClicked('')} >Switch network</ListItem>
              {chainOptions.map((option, index) => (
                <ListOption onClick={onOptionClicked(option)} key={index}>
                  {option}
                </ListOption>
              ))}
            </DropDownList>
          </DropDownListContainer>
        )}
     </DropDownContainer>
    </Main>
  )
}

export default DropDownMenu; 