import { useState, useEffect } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../connectors/web3';
import Campaign from '../hooks/useCampaign';

function RequestRow(props) {

  const {Row, Cell} = Table;
  const [isBakerApproved, setisBakerApproved] = useState(false);

  const canFinalize = props.request[3] > props.bakersCount / 2;

  useEffect(async () => {
    const campaign = Campaign(props.address);
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const isBakerApproved = await campaign.methods.isApprovedBakerByRequest(props.id).call(
      {from: accounts[0]}
    );
    setisBakerApproved(isBakerApproved);
  }, []);

  const handleApprove = async () => {
    const { address, id } = props;
    const campaign = Campaign(address);
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      await campaign.methods.approveRequest(id).send({from: accounts[0]});
    } catch (error) {
      console.error(error);
    }
  }

  const handleFinalize = async () => {
    const { address, id } = props;
    const campaign = Campaign(address);
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      await campaign.methods.finalizeRequest(id).send({from: accounts[0]});
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Row disabled={props.request[4]} positive={canFinalize && !props.request[4]}>
      <Cell>{props.id}</Cell>
      <Cell>{props.request[0]}</Cell>
      <Cell>{web3.utils.fromWei(props.request[1], 'ether')}</Cell>
      <Cell>{props.request[2]}</Cell>
      <Cell>{props.request[3]}/{props.bakersCount}</Cell>
      <Cell>
        <Button disabled={isBakerApproved || props.request[4]} color="green" basic onClick={handleApprove}>
          Approve
        </Button>
      </Cell>
      <Cell>
        <Button disabled={props.request[4]} color="teal" basic onClick={handleFinalize}>
          Finalize
        </Button>
      </Cell>
    </Row>
  );
}

export default RequestRow;