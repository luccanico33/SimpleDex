const contractAddress = "0x1382DF2cfae5eF7Bc4532691Ab6488f3859afA6d"; 
const contractABI = [{"inputs":[{"internalType":"address","name":"_tokenA","type":"address"},{"internalType":"address","name":"_tokenB","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amountA","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountB","type":"uint256"}],"name":"LiquidityAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amountA","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountB","type":"uint256"}],"name":"LiquidityRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"string","name":"swapDirection","type":"string"},{"indexed":false,"internalType":"uint256","name":"amountIn","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountOut","type":"uint256"}],"name":"TokensSwapped","type":"event"},{"inputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"name":"addLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"balanceOfToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"getPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"name":"removeLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"reserveA","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reserveB","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountAIn","type":"uint256"}],"name":"swapAforB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountBIn","type":"uint256"}],"name":"swapBforA","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"tokenA","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenB","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"}];
let provider;
let signer;

const walletButton = document.getElementById('walletButton');
const walletInfo = document.getElementById('walletInfo');
const walletAddress = document.getElementById('walletAddress');
const walletNetwork = document.getElementById('walletNetwork');
const walletBalance = document.getElementById('walletBalance');

const approveSwapButton = document.getElementById('approveSwapButton');
const swapButton = document.getElementById('swapButton');

const approveLiquidityButton = document.getElementById('approveLiquidityButton');
const addLiquidityButton = document.getElementById('addLiquidityButton');

const approveMintButton = document.getElementById('approveMintButton');
const mintButton = document.getElementById('mintButton');

// Create a contract instance
const contract = new ethers.Contract(contractAddress, contractABI, signer);


walletButton.addEventListener('click', async () => {
  if (walletButton.innerText === 'Connect Wallet') {
    await connectWallet();
  } else {
    disconnectWallet();
  }
});

approveSwapButton.addEventListener('click', () => {
  alert('Approved Swap');
  approveSwapButton.classList.add('d-none');
  swapButton.classList.remove('d-none');
});

swapButton.addEventListener('click', () => {
  alert('Swapped Tokens');
  
});

approveLiquidityButton.addEventListener('click', () => {
  alert('Approved Liquidity');
  approveLiquidityButton.classList.add('d-none');
  addLiquidityButton.classList.remove('d-none');
});

addLiquidityButton.addEventListener('click', () => {
  alert('Added Liquidity');
});

approveMintButton.addEventListener('click', () => {
  alert('Approved Mint');
  approveMintButton.classList.add('d-none');
  mintButton.classList.remove('d-none');
});

mintButton.addEventListener('click', () => {
  alert('Minted Tokens');
});

async function connectWallet() {
  try {
    await ethereum.request({ method: 'eth_requestAccounts' });
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    
    const address = await signer.getAddress();
    const network = await provider.getNetwork();
    const balance = await signer.getBalance();
    const balanceInEth = ethers.utils.formatEther(balance);
    
    walletAddress.innerText = address;
    walletNetwork.innerText = network.name;
    walletBalance.innerText = balanceInEth;

    walletButton.innerText = 'Disconnect Wallet';
    walletButton.classList.replace('btn-primary', 'btn-danger');
    walletInfo.classList.remove('d-none');
  } catch (error) {
    console.error(error);
  }
}

function disconnectWallet() {
  provider = null;
  signer = null;

  walletAddress.innerText = '';
  walletNetwork.innerText = '';
  walletBalance.innerText = '';

  walletButton.innerText = 'Connect Wallet';
  walletButton.classList.replace('btn-danger', 'btn-primary');
  walletInfo.classList.add('d-none');
}
