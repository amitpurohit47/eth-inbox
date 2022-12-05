const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { bytecode, interface } = require("../compile");

let accounts;
let inbox;
const INIT_MESSAGE = "Hi there!";
const NEW_MESSAGE = "Bye there!";

beforeEach(async () => {
  // Get a list of accounts
  accounts = await web3.eth.getAccounts();

  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INIT_MESSAGE] })
    .send({ from: accounts[0], gas: "1000000" });
  // Use one of them to deploy contract
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });

  it("has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INIT_MESSAGE);
  });

  it("can change message", async () => {
    await inbox.methods.setMessage(NEW_MESSAGE).send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, NEW_MESSAGE);
  });
});

// Use of mocha testing

// class Car {
//   park() {
//     return "stopped";
//   }
//   drive() {
//     return "vroom";
//   }
// }

// let car; // to avoid undefined variable declare it beforehand

// beforeEach(() => {
//   car = new Car();
// });
// executes before each it() call

// describe("Car", () => {
//   it("can park", () => {
//     assert.equal(car.park(), "stopped");
//   });

//   it("can drive", () => {
//     assert.equal(car.drive(), "vroom");
//   });
// });
