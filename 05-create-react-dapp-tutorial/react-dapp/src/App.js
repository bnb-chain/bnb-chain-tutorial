import logo from './logo.svg';
import './App.css';

import { ethers} from 'ethers';
import contractABI from './GiveForeverABI.json';
const contractAddress = '0x9f383b299E900362C8BB894226bc8Af4f31dBafB';
// import contractABI from './ContractName.json';
// const contractAddress = '0x....3837837';
const loadData = async () => { 
  const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545');
  const contract = new ethers.Contract(contractAddress, contractABI, provider);
  const greeting = await contract.hello();
  alert(greeting);
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick = {loadData}>Click Me</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          BNB CHAIN
        </a>
      </header>
    </div>
  );
}

export default App;
