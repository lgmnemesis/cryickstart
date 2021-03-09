// SPDX-License-Identifier: MIT
pragma solidity >=0.7.4;

interface ICampaign {
    struct Request {
        string description;
        uint256 value;
        address recipient;
        uint256 approved;
        bool complete;
    }

    function contribute() external payable;

    function createRequest(
        string memory description,
        uint256 value,
        address recipient
    ) external;

    function approveRequest(uint256 index) external;

    function finalizeRequest(uint256 index) external;

    function getSummary()
        external
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            address
        );

    function getRequestsCount() external view returns (uint256);

    function getRequests() external view returns (Request[] memory);

    function isApprovedBakerByRequest(uint256 index)
        external
        view
        returns (bool);
}
