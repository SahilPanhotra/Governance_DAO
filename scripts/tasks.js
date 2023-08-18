const { ethers } = require("hardhat");
const { toUtf8Bytes, keccak256, parseEther } = ethers.utils;

async function task() {
  const [owner, otherAccount] = await ethers.getSigners();
  const governor = await ethers.getContractAt(
    "MyGovernor",
    "0x870181D67687b0fF24264cf208c79d9D6ecB1aad"
  );
  const token = await ethers.getContractAt(
    "MyToken",
    "0xf96688f584840967d4E3c5154Ea0f15E67c1F071"
  );
  await token.delegate(owner.address);
  console.log(governor);

  const tx = await governor.propose(
    [token.address],
    [0],
    [
      token.interface.encodeFunctionData("mint", [
        owner.address,
        parseEther("1000"),
      ]),
    ],
    "Give the owner more token"
  );
  console.log("transaction", tx);
  const receipt = await tx.wait();
  console.log("reciept", receipt);
  const event = receipt.events.find((x) => x.event === "ProposalCreated");
  const { proposalId } = event.args;

  const tx2 = await governor.castVote(proposalId, 1);

  await governor.execute(
    [token.address],
    [0],
    [
      token.interface.encodeFunctionData("mint", [
        owner.address,
        parseEther("25000"),
      ]),
    ],
    keccak256(toUtf8Bytes("Give the owner more tokens!"))
  );
}

task().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
