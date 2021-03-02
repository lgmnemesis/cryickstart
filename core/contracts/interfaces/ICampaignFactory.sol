// SPDX-License-Identifier: MIT
pragma solidity >=0.7.4;

interface ICampaignFactory {
    function createCampaign(uint256 minContribution) external;

    function getDeployedCampaigns() external view returns (address[] memory);
}
