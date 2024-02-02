import React, { useState, useEffect } from "react";
import "./App.css";
import contractABI from "./abi.json";
const { ethers } = require("ethers");

const contractAddress = "0x6875765941F5f861b6c32Ec93e8533D449fC030A";

async function requestAccount() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
}

function App() {
  //const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [entityDetails, setEntityDetails] = useState({ name: "", age: 0 });
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    const initContract = async () => {
      await requestAccount();
      // Use BrowserProvider for production
      if (window.ethereum) {
        const web3Provider = new ethers.BrowserProvider(window.ethereum);
        //setProvider(web3Provider);

        const signer = await web3Provider.getSigner();

        const contractInstance = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        setContract(contractInstance);

        // Fetch initial entity details
        const details = await contractInstance.getEntityDetails();
        setEntityDetails({ name: details[0], age: details[1] });

        setWalletConnected(true);
      } else {
        console.error("MetaMask not detected!");
      }
    };

    initContract();
  }, []);

  const handleUpdateName = async () => {
    const newName = prompt("Enter new name:");
    if (newName) {
      try {
        await contract.updateName(newName);
        const details = await contract.getEntityDetails();
        setEntityDetails({ name: details[0], age: details[1].toNumber() });
      } catch (error) {
        console.error("Error updating name:", error);
      }
    }
  };

  const handleUpdateAge = async () => {
    const newAge = parseInt(prompt("Enter new age:"), 10);
    if (!isNaN(newAge)) {
      try {
        await contract.updateAge(newAge);
        const details = await contract.getEntityDetails();
        setEntityDetails({ name: details[0], age: details[1].toNumber() });
      } catch (error) {
        console.error("Error updating age:", error);
      }
    }
  };

  return (
    <div>
      <h1>Simple Registry App</h1>
      {walletConnected && contract && (
        <div>
          <p>Name: {entityDetails.name}</p>
          <p>Age: {entityDetails.age}</p>
          <button onClick={handleUpdateName}>Update Name</button>
          <button onClick={handleUpdateAge}>Update Age</button>
        </div>
      )}
    </div>
  );
}

export default App;
