const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  "dwarf crack raw ill grief rocket genre satisfy arrow kit entire egg",
  "https://goerli.infura.io/v3/72021f9b0e164da4bf78e3609ba8548a"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to connect from account ", accounts[0]);

  const res = await new web3.eth
    .Contract(JSON.parse(interface))
    .deploy({ data: "0x" + bytecode, arguments: ["Hi there!"] })
    .send({ from: accounts[0] });

  console.log("Contract deployed at ", res.options.address);
};

deploy();