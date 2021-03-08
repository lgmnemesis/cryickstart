const CampaignFactory = artifacts.require('./CampaignFactory.sol');
const Campaign = artifacts.require('./Campaign.sol');

contract('Campaign', (accounts) => {

  const [manager, baker1, baker2, baker3, flourSupplier] = accounts;
  let campaignFactory;
  let campaignAddress;
  let campaign;

  beforeEach(async () => {
    campaignFactory = await CampaignFactory.deployed();
    await campaignFactory.createCampaign('100');
    [campaignAddress] = await campaignFactory.getDeployedCampaigns();
    campaign = await Campaign.at(campaignAddress);
  })

  describe('Campaigns', () => {
    it('deploys a Factory and a campaign', () => {
      assert.ok(campaignFactory.address);
      assert.ok(campaign.address);
    });

    it('Campaign manager is the deployer', async () => {
      const cManager = await campaign.manager();
      assert.equal(cManager, manager, 'manager is not the deployer');
    });

    it('Contribute to campaign', async () => {
      const initialValue = await web3.eth.getBalance(campaign.address);
      await campaign.contribute({from: baker1, value: web3.utils.toWei('1', 'ether')});
      await campaign.contribute({from: baker2, value: web3.utils.toWei('2', 'ether')});
      await campaign.contribute({from: baker3, value: web3.utils.toWei('3', 'ether')});
      const currentValue = await web3.eth.getBalance(campaign.address);
      assert.equal(initialValue, 0, 'Campaign initial eth value should be eq to 0 ether');
      assert.equal(currentValue, web3.utils.toWei('6', 'ether'), 'Campaign eth value should be eq to 6 ether');
    });
    
    it('Create a request', async () => {
      const description = 'Buy 100 Kg of flour';
      await campaign.createRequest(description, web3.utils.toWei('2', 'ether'), flourSupplier, {from: manager});
      const request = await campaign.requests(0);
      assert.equal(request.description, description);
    });

    it('Approve request', async () => {
      await campaign.approveRequest(0, {from: baker1});
      await campaign.approveRequest(0, {from: baker2});
      const request = await campaign.requests(0);
      const bakersCount = await campaign.bakersCount();
      assert(request.approved > (bakersCount / 2), "Request not approved");
    });

    it('Trying to approve request again', async () => {
      let request = await campaign.requests(0);
      const approved = request.approved;
      await campaign.approveRequest(0, {from: baker1});
      request = await campaign.requests(0);
      assert.equal(request.approved.toString(), approved.toString(), `Request was approved again! expected ${approved} got ${request.approved}`);
    });

    it('Finalize request', async () => {
      let request = await campaign.requests(0);
      const flourSupplierValue = await web3.eth.getBalance(flourSupplier);
      assert(!request.complete, 'Request already completed');
      await campaign.finalizeRequest(0, {from: manager});
      request = await campaign.requests(0);
      assert(request.complete, 'Request should be completed');
      const flourSupplierCurrentValue = await web3.eth.getBalance(flourSupplier);
      const value = flourSupplierCurrentValue - flourSupplierValue;
      assert.equal(value.toString(), request.value.toString(), `flourSpplier value should increas by ${web3.utils.fromWei(request.value.toString())} ether`);
    });

    it('Get summary', async () => {
      const sum = await campaign.getSummary();
      console.log('sum:', sum);
      assert.equal('', '');
    });
  })

})