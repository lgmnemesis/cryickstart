import web3 from '../connectors/web3';
import campaignABI from '../constants/abis/Campaign';

const Campaign = (address) => {
  return new web3.eth.Contract(campaignABI, address);
}

export default Campaign;

