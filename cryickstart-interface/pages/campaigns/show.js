import Layout from '../../components/Layout';
import Campaign from '../../hooks/useCampaign';

ShowCampaign.getInitialProps = async (props) => {
  const address = props.query.address;
  const campaign = Campaign(address);
  let summary
  try {
    summary = await campaign.methods.getSummary().call();
  } catch (error) {
    console.error(error);
  }
  console.log('sum:', summary);
  return { summary };
}

function ShowCampaign({summary}) {

  return (
    <Layout>
      moshe
    </Layout>
  );
}

export default ShowCampaign;