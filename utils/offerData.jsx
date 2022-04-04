import { FaCheck, FaSchool, FaEthereum, FaTwitter } from 'react-icons/fa';

export var offerData = {
  offers: [
    { 
      index: 0,
      title: "Join Whitelist ", 
      description: "'OG' role and NFT", 
      icon: FaCheck,
      earnCurrency: "$NFT",
      org: "@work3dao",
      what_to_do: "This. that and the other thing. Join our telegram for more information.",
      how_paid: "You'll receive one XCOIN token when we launch."
    },
    {
      index: 1,
      title: "Re-tweet our project",
      description: "Earn tokens by supporting #work3",
      icon: FaTwitter,
      earnCurrency: "$Work3",
      org: "@work3dao"
    }
  ],
  accepted: [
    {
      index: 10,
      title: "Learn to earn",
      description: "Watch our 5 slide presentation. Complete a quick quiz to join.",
      icon: FaSchool,
      earnCurrency: "$Tlos",
      org: "telosfoundation.org"
    },
    {
      index: 11,
      title: "Learn to earn",
      description: "Watch our 5 slide presentation. Complete a quick quiz to join.",
      icon: FaEthereum,
      earnCurrency: "$TELOS",
      org: "telos.org"
    }
  ]
};