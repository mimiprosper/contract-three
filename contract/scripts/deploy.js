const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying SimpleRegistry with the account:", deployer.address);

  // Deploying SimpleRegistry contract
  const SimpleRegistry = await ethers.getContractFactory("SimpleRegistry");
  const simpleRegistry = await SimpleRegistry.deploy("InitialName", 25); // Set initial name and age

  console.log("SimpleRegistry address:", simpleRegistry.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
