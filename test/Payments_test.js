const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("Payments", function () {
	let acc1
	let acc2
	let payments

  beforeEach(async function () {
	 [acc1,acc2] = await ethers.getSigners()
   const Payments = await  ethers.getContractFactory("Payments", acc1);
	payments = await Payments.deploy()
	await payments.deployed()

  });

  it ("should be deployed" , async function() {
	expect(payments.address).to.be.properAddress;
	console.log('succes!')
  })

  it("should have 0 ether by default", async function() {
	const balance = await payments.currentBalance()
	expect(balance).to.eq(0)

  })
  it ("should be possible to send funds", async function() {
	const tx = await payments.connect(acc2).pay('Slava Ykraine' , {value: 142300})

await expect(()=> tx)
	.to.changeEtherBalances([acc2, payments], [-142300, 142300]);

	await tx.wait()

	const newPayment = await payments.getPayment(acc2.address, 0)
	console.log(newPayment)
  })
  it("should be possible to send funds 2 times", async function() {
	const txn = await payments.connect(acc2).pay('Slava Ykraine' , {value: 142300})
	const txn2 = await payments.connect(acc2).pay('Slava Rossiiine' , {value: 1200})
	await txn.wait()
	await txn2.wait()
	const newPayment1 = await payments.getPayment(acc2.address, 0)
	console.log(newPayment1)
	const newPayment2 = await payments.getPayment(acc2.address, 1)
	console.log(newPayment2)
  })
});
