import { useState } from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import Campaign from '../../../hooks/useCampaign';
import web3 from '../../../connectors/web3';
import { Link, Router } from '../../../routes';
import Layout from '../../../components/Layout';

NewRequest.getInitialProps = async (props) => {
  const { address } = props.query;
  return {address};
}

function NewRequest(props) {
  const [description, setdescription] = useState('');
  const [value, setvalue] = useState('');
  const [recipient, setrecipient] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loadSpinner, setLoadSpinner] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoadSpinner(true);
    setErrorMessage('');
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const campaign = Campaign(props.address);
    try {
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
        .send({ from: accounts[0] });
      Router.pushRoute(`/campaigns/${props.address}/requests`);
    } catch (error) {
      setErrorMessage(error.message);
      setLoadSpinner(false);
    }
  };

  return (
    <Layout>
      <Link route={`/campaigns/${props.address}/requests`}>
        <a>Back</a>
      </Link>
      <h3>Create a Request</h3>
      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Description</label>
          <Input value={description} onChange={(ev) => setdescription(ev.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Value in Ether</label>
          <Input value={value} onChange={(ev) => setvalue(ev.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input value={recipient} onChange={(ev) => setrecipient(ev.target.value)}/>
        </Form.Field>
        <Message error header="Oops!" content={errorMessage}/>
        <Button loading={loadSpinner} primary>Create!</Button>
      </Form>
    </Layout>
  );
}

export default NewRequest;