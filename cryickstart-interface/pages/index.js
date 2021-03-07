import factory from '../hooks/useFactory';

Start.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
}

function Start({campaigns}) {
  return (
    <div>
      <h1>moshe {campaigns}</h1>
    </div>
  );
}

export default Start;