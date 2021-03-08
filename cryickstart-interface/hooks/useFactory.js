import web3 from '../connectors/web3';
import factoryABI from '../constants/abis/CampaignFactory';
import { FACTORY_ADDRESS } from '../constants';

const Factory = new web3.eth.Contract(factoryABI, FACTORY_ADDRESS);

export default Factory;

