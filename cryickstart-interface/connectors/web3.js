import Web3 from 'web3';
import { KOVAN_INFURA_END_POINT } from '../constants';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // Browser + metamask
  const ethereum = window.ethereum;
  if (ethereum) {
    // window.web3 = new Web3(ethereum);
    web3 = window.web3;
  }
} else {
  // Server || no metamask
  const provider = new Web3.providers.HttpProvider(KOVAN_INFURA_END_POINT);
  web3 = new Web3(provider);
  console.log('moshe web3 server');
}

// const web3 = () => {
//   let instance = null;
//   if (typeof window !== "undefined") {
//     window.addEventListener('load', function() {
//       console.log('moshe: addEventListener load');
      
//       // Check if Web3 object is injected by Ethereum compatible browser such as MetaMask/Mist
//       const ethereum = window.ethereum;
//       if (ethereum) {
//         // Initialize Web3 using a provider of MetaMask/Mist
//         window.web3 = new Web3(ethereum);
//         instance = window.web3;

//         ethereum.on('accountsChanged', (accounts) => {
//           console.log(accounts);
//         })
//       } else {
//         // Using the infura.io as a provider in the example below.
//       }
//       return instance;
//     });
//   }
// }

export default web3;