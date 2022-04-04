
import { styled } from '@stitches/react'

import Layout from '../common/Layout/Layout'

import { MdClose } from 'react-icons/md'
import { useRouter } from 'next/router'
import MetaHead from '../common/Layout/MetaHead'
import LearnCarousel from './LearnCarousel'
import { useState } from 'react'
import LearnQnA from './LearnQnA'

const CloseButton = styled("button",
  {
    position: 'fixed',
    right: 5,
    height: '30px',
    width: '30px',
    top: 5,
  });


  const organisationData = {
    name: "Telos.org",
    slides: [
      {
        image: "/images/purple/undraw_my_notifications.svg",
        title: "Telos uses less energy",
        subtitle: "PoS means transactions don't require expensive PoW.", 
      },
      {
        image: "/images/gold/undraw_viral_tweet.svg",
        title: "Get the benefits of EVM without the cost",
        subtitle: "Telos can run Solidity EVM Smart Contracts", 
      },
      {
        image: "/images/purple/undraw_my_notifications.svg",
        title: "EVM transactions in 1/2 a second",
        subtitle: "EVM transactions run on Telos Native", 
      }
    ]
  }

  const questionData = [
    {
      question: "Is Telos bad for the environment?",
      question_type: "multiple-choice",
      answer_options: [
        "No - Telos is carbon neural",
        "Yes - All blockchains are bad"
      ],
      correct_option: 0,
      answered: false
    },
    {
      question: "Telos is better for the planet because...",
      question_type: "multiple-choice",
      answer_options: [
        "It uses Proof of Stake",
        "Proof of work is awesome!"
      ],
      correct_option: 0,
      answered: false
    },
    {
      question: "Telos cannot run Smart Contracts?",
      question_type: "true-false",
      answer_options: [
        "true",
        "false"
      ],
      correct_option: 1,
      answered: false
    },
    {
      question: "What type of Smart Contract can run on Telos?",
      question_type: "multiple-choice-all-that-apply",
      answer_options: [
        "Solidity on the Ethereum VM",
        "Telos EOSIO"
      ],
      correct_option: -1,
      answered: false
    },
    {
      question: "What are the benefits of Telos?",
      question_type: "multiple-choice-all-that-apply",
      answer_options: [
        "EVM Contracts run on Telos native",
        "Super fast transactions (1/2 second)",
        "Gas price is fixed to Telos Token",
        "Devs benefit from Ethereum tools",
      ],
      correct_option: -1,
      answered: false
    },

  ];

export default function LearnModal() {
  const [step, setStep] = useState(1)
  const router = useRouter()
  const value = router.query


  const [qnaData, setQnAData] = useState(questionData);
  const [orgData, setOrgData] = useState(organisationData);
 
  return (
    <Layout>
      <MetaHead title="Learn to earn" />
      <div className="mb-10 m-5">
        <CloseButton
          type="button"
          onClick={() => {
            window.history.back();
          }}>
          <p className="text-right text-black text-2xl">
            <MdClose />
          </p>
        </CloseButton>
      </div>
      {step === 1 && (
        <div className="p-5" >
          <h1 className="text-3xl font-medium">Learn about</h1>
          <p className="text-3xl mb-10">{orgData.name}</p>
          <p>Read each slide carefully. <br /> There will be a short quiz at the end. </p>
          <LearnCarousel orgData = {orgData} />
          <div className="w-full text-center">
            <button className="px-3 rounded-sm py-1 bg-primary text-white font-medium w-80" onClick={() => {
              setStep(2)
            }}>
              <div className="flex justify-center px-5 py-1 ">
                <span>&nbsp;I&apos;m ready for the Quiz</span>
              </div>
            </button>
          </div>
        </div>
      )}
      {step === 2 && (
       <LearnQnA qnaData={qnaData}/>
      )}
    </Layout>
  )
}
