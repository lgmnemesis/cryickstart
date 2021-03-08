import Layout from '../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import { useState } from 'react';
import factory from '../../hooks/useFactory';
// import web3 from '../../connectors/web3';
import { Router } from '../../routes';

function NewCampaign() {

    const [minContribution, setMinContribution] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loadSpinner, setLoadSpinner] = useState(false);

    const handleChange = (event) => {
      setMinContribution(event.target.value)
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
      setLoadSpinner(true);
      setErrorMessage('');
      try {
        // const account = await web3.eth.getAccounts()[0];
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        await factory.methods.createCampaign(minContribution).send({
          from: accounts[0] 
        });
        Router.pushRoute('/')
      } catch (error) {
        setErrorMessage(error.message);
        setLoadSpinner(false);
      }
    }

    return (
      <Layout>
        <Form onSubmit={handleSubmit} error={!!errorMessage}>
          <h3>Create a Campaign</h3>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input label="wei" labelPosition="right" value={minContribution} onChange={handleChange}/>
          </Form.Field>
          <Message error header="Oops!" content={errorMessage}/>
          <Button loading={loadSpinner} primary>Create!</Button>
        </Form>
      </Layout>
    );
}

export default NewCampaign;