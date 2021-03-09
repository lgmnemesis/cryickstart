import { Form, Input, Message, Button } from 'semantic-ui-react';
import { useState } from 'react';
import web3 from '../connectors/web3';
import Campaign from '../hooks/useCampaign';
import { Router } from '../routes';

function ContributeForm(props) {

  const [inputVal, setinputVal] = useState('');
  const [errorMessage, seterrorMessage] = useState('');
  const [loadSpinner, setloadSpinner] = useState(false);

  const handleChange = (ev) => {
    console.log('in change');
    setinputVal(ev.target.value);
  }

  const handleSubmit = async (ev) => {
    console.log('in submit');
    ev.preventDefault();
    setloadSpinner(true);
    seterrorMessage('');
    try {
      const campaign = Campaign(props.address);
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(inputVal, 'ether')
      });
      Router.replaceRoute(`/campaigns/${props.address}`);
      setinputVal('');
    } catch (error) {
      seterrorMessage(error.message);
      console.error(error);
    }
    setloadSpinner(false);
  }

  return (
    <Form onSubmit={(ev) => handleSubmit(ev)} error={!!errorMessage}>
      <Form.Field>
        <label>Amount to contribute</label>
        <Input value={inputVal} label="ether" labelPosition="right" onChange={(ev) => handleChange(ev)}/>
      </Form.Field>
      <Message error header={'Oops!'} content={errorMessage}/>
      <Button loading={loadSpinner} primary>Contribute!</Button>
    </Form>
  );
}

export default ContributeForm;