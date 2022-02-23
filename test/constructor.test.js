import { expect } from 'chai';
import { ethers, waffle } from 'hardhat';
import { deployMockContract } from '@ethereum-waffle/mock-contract';

import rinkebyTerminalV1 from '@candyboxdao/contracts/deployments/rinkeby/TerminalV1.json';

describe('Constructor', () => {
    async function setup() {
        const [deployer] = await ethers.getSigners();
        const mockTerminalV1 = await deployMockContract(deployer, rinkebyTerminalV1.abi);
        const nftMarketFactory = await ethers.getContractFactory('NFTMarket');
        const nftMarket = await nftMarketFactory.deploy(mockTerminalV1.address);
        return { deployer, mockTerminalV1, nftMarket };
    }

    it('Should deploy the NFTMarket contract', async () => {
        const { deployer, mockTerminalV1, nftMarket } = await setup();
        expect(await nftMarket.resolvedAddress).to.not.equal(ethers.constants.AddressZero);
        expect(await nftMarket.resolvedAddress).to.not.equal(null);
        expect(await nftMarket.resolvedAddress).to.not.equal(undefined);
    });

    it('Should set the market\'s terminaldirectory to the address passed in the contructor', async () => {
        const { deployer, mockTerminalV1, nftMarket } = await setup();
        expect(await nftMarket.terminalDirectory()).to.equal(mockTerminalV1.address);
    })
});

