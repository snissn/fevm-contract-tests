require('dotenv').config()
const { getDeployerF1Address, getDeployerF0Address } = require(
  './utils/getDeployerAddresses')
const deployContract = require('./utils/deployContract')
const { web3 } = require('hardhat')
const { promisify } = require('util')
const should = require('chai').should()

let deployerF0Addr, deploymentTxHash, pendingContract, deploymentBlockHash,
  deploymentBlockNumber

describe('SimpleCoin', function () {
  it('Should send deployment transaction', async function () {
    const { contract, txHash } = await deployContract('SimpleCoin')

    pendingContract = contract
    deploymentTxHash = txHash

    const f1Addr = getDeployerF1Address()
    deployerF0Addr = await getDeployerF0Address(f1Addr)
  })
  it('Should successfully deploy', async function () {
    await pendingContract
  })
  it('Should access transaction details after it has been mined',
    async function () {
      const txByHash = await promisify(web3.eth.getTransaction)(
        deploymentTxHash)
      const {
        blockHash,
        blockNumber,
      } = txByHash
      deploymentBlockHash = blockHash
      deploymentBlockNumber = blockNumber

      txByHash.should.contain.keys(
        'blockHash',
        'blockNumber',
        'from',
        'hash',
        'transactionIndex',
      )
      txByHash.from.should.be.a.properAddress
      txByHash.from.should.hexEqual(deployerF0Addr)
      should.not.exist(txByHash.to)
    })
})
