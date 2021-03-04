// SPDX-License-Identifier: MIT
pragma solidity >=0.7.4;

interface ICampaign {
    function contribute() external payable;

    function createRequest(
        string memory description,
        uint256 value,
        address recipient
    ) external;

    function approveRequest(uint256 index) external;

    function finalizeRequest(uint256 index) external;
}
