import { useEffect, useState } from "react";
import AirdropCampaign from "./Airdrop";

import CampaignOptionCard from "./CampaignOptionCard";
import LearnToEarnCampaign from "./LearnToEarn";
import SendOfferCampaign from "./SendOffer";

import TargetListBuilder from "./TargetListBuilder";
import TargetedOption from "./TargetOption";

import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

import 'react-tabs/style/react-tabs.css';
import NewTargetList from "../Dashboard/Desktop/TargetList/NewTargetList";
import useAirdropContract from './AirdropContract'

const CampaignSelect = ({ selectedItems, rowCount }) => {

  // const [airDropContract, setAirDropContract] = useState(contract);

  const airDropContract = useAirdropContract(selectedItems)

  const [selectedIdx, setSelectedIdx] = useState(undefined);

  const handleClick = function (index) {
    console.log(index);
    // const selectedIdx = parseInt(index);
    setSelectedIdx(index);
  };

  useEffect(()=> {
    console.log(airDropContract, 'airDropContract');
  }, [airDropContract])


  const optionData = [
    {
      title: "Targeted airdrop",
      description: "Generate a smart contract for your DAO. Reward contributors or target accounts with your NFT or project tokens.",
      image: "/images/purple/undraw_air_support.svg",
      form: <AirdropCampaign option={airDropContract} />,
      link: 0
    },
    {
      title: "Learn to earn",
      description: "Invite accounts to earn your token by first learning about your project.",
      image: "/images/purple/undraw_developer_activity.svg",
      form: <LearnToEarnCampaign />,
      link: 1
    },
    {
      title: "Engagement offer",
      description: "Build community, grow your project by engaging crypto people to do an action and earn your token / NFT.",
      image: "/images/purple/undraw_shared_goals.svg",
      form: <SendOfferCampaign selectedItems={selectedItems} changeSection={handleClick} />,
      link: 2
    },
  ];

  const [tabIndex, setTabIndex] = useState(0);

  return (
    <section>
      <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
        <TabList>
          <Tab>Apply selection</Tab>
          <Tab>Build a target list</Tab>
        </TabList>
        <TabPanel>
          <TargetedOption selectedItems={selectedItems} />
        </TabPanel>
        <TabPanel>
          <p className="text-gray-800 text-center">Add the {selectedItems.length} addresses selected</p>
          <TargetListBuilder selectedItems={selectedItems} />
          <p className="text-center">- OR - </p>
          <NewTargetList selectedItems={selectedItems} selectSection={() => handleClick(2)} />
        </TabPanel>
      </Tabs>

      {/*<NewTargetList selectedItems={selectedItems} selectSection={() => handleClick(2)} />*/}

      <div className={`${tabIndex == 1 && 'hidden'}`} >
        <div className={`flex justify ${selectedIdx == undefined && 'hidden'}`} >
          <button className="flex justify-end w-full text-right text-primary" onClick={(e) => {
            e.preventDefault()
            setSelectedIdx(undefined)
          }}>
            change
          </button>
        </div>
        <div className={`flex justify ${(selectedIdx != undefined || selectedIdx > 3) && 'hidden'}`} >
          Choose a campaign to target the selected accounts
        </div>
        <div className="">
          {optionData.map((option, index) => {
            return (

              <div key={index} >
                <div className={` ${(selectedIdx != undefined && selectedIdx != index) && 'hidden'}`}>
                  <CampaignOptionCard option={option} key={index} handleClick={() => handleClick(option.link)} isSelected={selectedIdx == index} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}

export default CampaignSelect;

