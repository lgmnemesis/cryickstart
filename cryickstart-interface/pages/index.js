import Factory from '../hooks/useFactory';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';

Start.getInitialProps = async () => {
  const campaigns = await Factory.methods.getDeployedCampaigns().call();
  return { campaigns };
}

function renderCampaigns(campaigns) {
  const items = campaigns.map(address => { 
    return {
      header: address,
      description: 
        <Link route={`/campaigns/${address}`}>
          <a>View Campaign</a>
        </Link>,
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
        <Link route="/campaigns/new">
          <a>
            <Button content="Create Campaign" icon="add circle" floated="right" primary/>
          </a>
        </Link>
        {renderCampaigns(campaigns)}
      </div>
    </Layout>
  );
}

export default Start;