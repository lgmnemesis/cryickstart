import Layout from '../../../components/Layout';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Campaign from '../../../hooks/useCampaign';
import RequestRow from '../../../components/RequestRow';

Requests.getInitialProps = async (props) => {
  const { address } = props.query;

  const campaign = Campaign(address);
  const requests = await campaign.methods.getRequests().call();
  const bakersCount = await campaign.methods.bakersCount().call();

  return {address, requests, bakersCount};
}

function Requests(props) {
  const {Header, Row, HeaderCell, Body} = Table;

  const renderRows = () => {
    return props.requests.map((request, index) => {
      return <RequestRow key={index} id={index} request={request} bakersCount={props.bakersCount} address={props.address}/>
    });
  }

  return (
    <Layout>
      <h3>Requests</h3>

      <Link route={`/campaigns/${props.address}/requests/new`}>
      <a><Button primary floated="right" style={{marginBottom: 10}}>Add Request</Button></a>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>
          {renderRows()}
        </Body>
      </Table>
      <div>Found: {props.requests.length} request{props.requests.length === 1 ? '' : 's'}.</div>
    </Layout>
  );
}

export default Requests;