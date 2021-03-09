import Layout from '../../../components/Layout';
import { Button } from 'semantic-ui-react';
import { Link } from '../../../routes';

Requests.getInitialProps = async (props) => {
  const { address } = props.query;
  return {address};
}

function Requests(props) {
  return (
    <Layout>
      <h3>Requests</h3>
      <Link route={`/campaigns/${props.address}/requests/new`}>
      <a><Button primary>Add Request</Button></a>
      </Link>
    </Layout>
  );
}

export default Requests;