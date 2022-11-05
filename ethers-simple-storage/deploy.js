const ethers = require("ethers");
const fs = require("fs-extra"); // we use fs-extra to read from the ABI

async function main()
{
  const provider = new ethers.providers.JsonRpcProvider(
    "HTTP://127.0.0.1:7545"
  );
  const wallet = new ethers.Wallet("a4ad56622807d4751462add3e84471beff543e15868e9c14c08fdb24c79d9b50", provider);
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8");
  const contractFactory = new ethers.ContractFactory(abi,binary,wallet);
  console.log("Deploying, please wait....");
//   const contract = await contractFactory.deploy({gasPrice: 10000}); // Stop here! Wait for the contract to deploy!..
//   // In deploy, we can also give overrides to the properties of the deploy e.g gas free or leave it completely empty and the gas price would be set to default.
//   console.log(contract);
// We can also wait for one block to get attached to the chain.
   const contract = await contractFactory.deploy();
   const transactionReciept = await contract.deployTransaction.wait(1); // Here we are specifying for how many confirmations we wait. i.e we are waiting for how many blocks are getting added.
   console.log("Here is the deployment transaction (Transaction response): ");
   console.log(contract.deployTransaction);
   console.log("Here is the transaction receipt");
   console.log(transactionReciept);
}



// The code we are going to add on main function is specifically for async functions
main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});

