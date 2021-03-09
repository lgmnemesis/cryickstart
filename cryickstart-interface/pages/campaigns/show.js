import Layout from '../../components/Layout';
import Campaign from '../../hooks/useCampaign';
import { Card, Grid } from 'semantic-ui-react';
import web3 from '../../connectors/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';
import { Button } from 'semantic-ui-react';

ShowCampaign.getInitialProps = async (props) => {
  const address = props.query.address;
  const campaign = Campaign(address);
  let summary
  try {
    summary = await campaign.methods.getSummary().call();
  } catch (error) {
    console.error(error);
  }
  return { 
    address: props.query.address,
    minContribution: summary[0],
    balance: summary[1],
    requestsCount: summary[2],
    bakersCount: summary[3],
    manager: summary[4]
   };
}

const renderCard = ({minContribution, balance, requestsCount, bakersCount, manager}) => {
  const items = [
    {
      header: manager,
      meta: 'Address of Manager',
      description: 'The Manager who created this campaign',
      style: { overflowWrap: 'break-word' }
    },
    {
      header: minContribution,
      meta: 'Minimum Contribution (wei)',
      description: 'You must contribute at least this much wei to become an aoorover'
    },
    {
      header: requestsCount,
      meta: 'Number of Requests',
      description: 'A request tries to withdraw money from the contract. Requests must be approved by approvers'
    },
    {
      header: bakersCount,
      meta: 'Number of Bakers',
      description: 'Number of people who have already donated to the campaign'
    },
    {
      header: web3.utils.fromWei(balance, 'ether'),
      meta: 'Campaign balance (ether)',
      description: 'Shows how much money this campaign has left to spend.'
    }
  ];

  return <Card.Group items={items} />;
}

function ShowCampaign(props) {

  return (
    <Layout>
      <h3>Campaign View</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            {renderCard(props)}
          </Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={props.address}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link route={`/campaigns/${props.address}/requests`}>
              <a><Button primary>View Requests</Button></a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
}

export default ShowCampaign;