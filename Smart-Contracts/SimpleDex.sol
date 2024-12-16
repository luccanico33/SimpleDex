// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SimpleDEX {
    IERC20 public tokenA;
    IERC20 public tokenB;
    uint256 private reserveA;
    uint256 private reserveB;
    address public owner;

    event LiquidityAdded(uint256 amountA, uint256 amountB);
    event LiquidityRemoved(uint256 amountA, uint256 amountB);
    event TokensSwapped(address indexed user, string swapDirection, uint256 amountIn, uint256 amountOut);

    constructor(address _tokenA, address _tokenB) {
        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the Owner");
        _;
    }

    function addLiquidity(uint256 amountA, uint256 amountB) external onlyOwner {
        tokenA.transferFrom(msg.sender, address(this), amountA);
        tokenB.transferFrom(msg.sender, address(this), amountB);
        reserveA += amountA;
        reserveB += amountB;
        emit LiquidityAdded(amountA, amountB);
    }

    function removeLiquidity(uint256 amountA, uint256 amountB) external onlyOwner {
        require(reserveA >= amountA && reserveB >= amountB, "Insufficient reserves");
        reserveA -= amountA;
        reserveB -= amountB;
        tokenA.transfer(msg.sender, amountA);
        tokenB.transfer(msg.sender, amountB);
        emit LiquidityRemoved(amountA, amountB);
    }

    function swapAforB(uint256 amountAIn) external {
        require(reserveA > 0 && reserveB > 0, "Insufficient liquidity");
        uint256 amountBOut = reserveB -(reserveA * reserveB) / (reserveA + amountAIn);
        reserveA += amountAIn;
        reserveB -= amountBOut;
        tokenA.transferFrom(msg.sender, address(this), amountAIn);
        tokenB.transfer(msg.sender, amountBOut);
        emit TokensSwapped(msg.sender, "A to B", amountAIn, amountBOut);
    }

    function swapBforA(uint256 amountBIn) external {
        require(reserveA > 0 && reserveB > 0, "Insufficient liquidity");
        uint256 amountAOut = ((reserveB * reserveA) / (reserveB - amountBIn)) - reserveA; // formula del producto constante para X
        
        reserveB += amountBIn;
        reserveA -= amountAOut;
        tokenB.transferFrom(msg.sender, address(this), amountBIn);
        tokenA.transfer(msg.sender, amountAOut);
        emit TokensSwapped(msg.sender, "B to A", amountBIn, amountAOut);
    }

    function getPrice(address _token) external view returns (uint256) {
        if (_token == address(tokenA)) {
            return reserveB / reserveA;
        } else if (_token == address(tokenB)) {
            return reserveA / reserveB;
        } else {
            revert("Invalid token address");
        }
    }

    /*function balanceOfToken(address _token) external view returns (uint256) {
        if (_token == address(tokenA)) {
            return tokenA.balanceOf(tokenA);
        } else if (_token == address(tokenB)) {
            return tokenB.balanceOf(tokenB);
        } else {
            revert("Invalid token address");
        }
    }*/
    
}
