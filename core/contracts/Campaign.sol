// SPDX-License-Identifier: MIT
pragma solidity >=0.7.4;

import "./interfaces/ICampaign.sol";

contract Campaign is ICampaign {
    uint256 constant MIN_CONTRIBUTION = 10;
    address public manager;
    uint256 public minContribution;
    mapping(address => uint256) public bakers;
    uint256 public bakersCount;

    struct Request {
        string description;
        uint256 value;
        address recipient;
        uint256 approved;
        bool complete;
    }

    Request[] public requests;
    mapping(uint256 => mapping(address => bool)) approvedByBaker;

    modifier onlyManager() {
        require(msg.sender == manager, "Only manager");
        _;
    }

    constructor(address _manager, uint256 _minContribution) {
        manager = _manager;
        minContribution = _minContribution < MIN_CONTRIBUTION
            ? MIN_CONTRIBUTION
            : _minContribution;
    }

    function contribute() external payable override {
        require(msg.value >= minContribution, "amount is too small");
        if (bakers[msg.sender] == 0) {
            bakersCount++;
        }
        bakers[msg.sender] += msg.value;
    }

    function createRequest(
        string memory description,
        uint256 value,
        address recipient
    ) external override onlyManager {
        Request memory request =
            Request({
                description: description,
                value: value,
                recipient: recipient,
                complete: false,
                approved: 0
            });
        requests.push(request);
    }

    function approveRequest(uint256 index) external override {
        require(manager != msg.sender, "You are the creator");
        require(
            bakers[msg.sender] >= minContribution,
            "You did not contribute to the campaign"
        );

        Request storage request = requests[index];

        require(request.value > 0, "Request not found");
        require(!request.complete, "Request already completed");
        bool isApprovedByBaker = approvedByBaker[index][msg.sender];
        if (!isApprovedByBaker) {
            approvedByBaker[index][msg.sender] = true;
            request.approved++;
        }
    }

    function finalizeRequest(uint256 index) external override onlyManager {
        Request storage request = requests[index];
        require(!request.complete, "Request already completed");
        require(request.approved > (bakersCount / 2), "Request not approved");
        request.complete = true;
        payable(request.recipient).transfer(request.value);
    }
}
