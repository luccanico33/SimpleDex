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
