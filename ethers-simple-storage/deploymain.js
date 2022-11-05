const ethers = require("ethers");
const fs = require("fs-extra"); // we use fs-extra to read from the ABI
require("dotenv").config();

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL
  );
  const wallet = new ethers.Wallet(
    process.env.PRIVATE_KEY,
    provider
  );
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait....");
  const contract = await contractFactory.deploy();
  const currentFavoriteNumber = await contract.retrieve();
  console.log(`Current favorite Number : ${currentFavoriteNumber.toString()}`);
  const transactionResponse = await contract.store("7");
  const transactionReciept = await transactionResponse.wait(1);
  const updatedFavoriteNumber = await contract.retrieve();
  console.log(`Updated favorite Number is: ${updatedFavoriteNumber}`);
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
