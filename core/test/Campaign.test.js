const CampaignFactory = artifacts.require('./CampaignFactory.sol');
const Campaign = artifacts.require('./Campaign.sol');

contract('Campaign', (accounts) => {

  let campaignFactory;
  const [manager, baker1, baker2, baker3] = accounts;

  beforeEach(async () => {
    campaignFactory = await CampaignFactory.deployed();
  })

  describe('Deployment', () => {
    it('deploys successfully', async () => {
      assert.ok(campaignFactory.address);
    });
  })

  // describe('Flow', () => {
  //   it('allow player to enter lottery', async () => {
  //     await lottery.enter({from: user1, value: web3.utils.toWei('1', 'ether')});
  //     const players = await lottery.getPlayers();
  //     assert.equal(players[0].toString(), user1.toString());
  //   });
  // })
})