import factory from '../hooks/useFactory';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';

Start.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
}

function renderCampaigns(campaigns) {
  const items = campaigns.map(address => { 
    return {
      header: address,
      description: <a>View Campaign</a>,
      fluid: true
    }
  });
  return <Card.Group items={items} />
}

function Start({campaigns}) {
  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>
        <Button content="Create Campaign" icon="add circle" floated="right" primary/>
        {renderCampaigns(campaigns)}
      </div>
    </Layout>
  );
}

export default Start;