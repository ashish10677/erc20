pragma solidity ^0.4.18;

interface IToken {
    function totalSupply() external view returns (uint256);

    function balanceOf(address tokenOwner) external view returns (uint256);

    function transfer(address to, uint256 tokens) external returns (bool success);

    function transferFrom(
        address from,
        address to,
        uint256 tokens
    ) external returns (bool success);

    function allowance(address tokenOwner, address spender)
        external
        view
        returns (uint256 remaining);

    function approve(address spender, uint256 tokens)
        external
        returns (bool success);
}
