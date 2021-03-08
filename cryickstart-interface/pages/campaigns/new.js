import Layout from '../../components/Layout';
import { Form, Button, Input } from 'semantic-ui-react';
import { useState } from 'react';
import factory from '../../hooks/useFactory';
import web3 from '../../connectors/web3';

function NewCampaign() {

    const [minContribution, setMinContribution] = useState('');

    const handleChange = (event) => {
      setMinContribution(event.target.value)
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
      // const account = await web3.eth.getAccounts()[0];
      const accounts = await ethereum.send('eth_requestAccounts');
      await factory.methods.createCampaign(minContribution).send({
        from: accounts.result[0] 
      });
    }

    return (
      <Layout>
        <Form onSubmit={handleSubmit}>
          <h3>Create a Campaign</h3>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input label="wei" labelPosition="right" value={minContribution} onChange={handleChange}/>
          </Form.Field>
          <Button primary>Create!</Button>
        </Form>
      </Layout>
    );
}

export default NewCampaign;