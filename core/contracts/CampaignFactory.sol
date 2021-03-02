// SPDX-License-Identifier: MIT
pragma solidity >=0.7.4;

import "./interfaces/ICampaignFactory.sol";
import "./Campaign.sol";

contract CampaignFactory is ICampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint256 minContribution) external override {
        Campaign campaign = new Campaign(msg.sender, minContribution);
        deployedCampaigns.push(address(campaign));
    }

    function getDeployedCampaigns()
        external
        view
        override
        returns (address[] memory)
    {
        return deployedCampaigns;
    }
}
