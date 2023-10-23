const Marketplus = artifacts.require('./Marketplus.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Marketplus', ([deployer, seller, buyer]) => {
  let marketplus

  before(async () => {
    marketplus = await Marketplus.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await marketplus.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await marketplus.getName()
      assert.equal(name, 'Dapp University Marketplus')
    })

  })

  describe('products', async () => {
    let result, productlist

    before(async () => {
      result = await marketplus.createProduct('iPhone X', web3.utils.toWei('1', 'Ether'), 1, { from: seller })
	  productlist = await marketplus.getList();
    })

    it('creates products', async () => {
		
      // SUCCESS
      assert.equal(productlist.length, 1, 'count is correct')
      const event = result.logs[0].args
      assert.equal(event.name, 'iPhone X', 'name is correct')
      assert.equal(event.price, '1000000000000000000', 'price is correct')
	  assert.equal(event.stock, '1', 'stock is correct')
      assert.equal(event.owner, seller, 'owner is correct')

      
      // FAILURE: Product must have a name
      await marketplus.createProduct('', web3.utils.toWei('1', 'Ether'), 1, { from: seller }).should.be.rejected;
	  
      // FAILURE: Product must have a price
      await marketplus.createProduct('iPhone X', 0, 1, { from: seller }).should.be.rejected;
	  
	  // FAILURE: Product must have a postive stock number
	  await marketplus.createProduct('iPhone X', web3.utils.toWei('1', 'Ether'), 0, { from: seller }).should.be.rejected
	  	  
    })

    it('lists products', async () => {
		const product = await marketplus.productlist(0)
		assert.equal(productlist.length, '1', 'list length is correct')
		assert.equal(product.name, 'iPhone X', 'name is correct')
		assert.equal(product.price, '1000000000000000000', 'price is correct')
		assert.equal(product.stock, '1', 'stock is correct')
		assert.equal(product.owner, seller, 'owner is correct')

    })

    it('sells products', async () => {
      // Track the seller balance before purchase
      let oldSellerBalance
      oldSellerBalance = await web3.eth.getBalance(seller)
      oldSellerBalance = new web3.utils.BN(oldSellerBalance)

      // SUCCESS: Buyer makes purchase
      result = await marketplus.purchaseProduct(productlist[0].id, 1, { from: buyer, value: web3.utils.toWei('1', 'Ether')})

      // Check logs
      const event = result.logs[0].args
      assert.equal(event.id, productlist[0].id, 'id is correct')
      assert.equal(event.name, 'iPhone X', 'name is correct')
      assert.equal(event.price, '1000000000000000000', 'price is correct')
	  assert.equal(event.stock, '0', 'stock is correct')

      // Check that seller received funds
      let newSellerBalance
      newSellerBalance = await web3.eth.getBalance(seller)
      newSellerBalance = new web3.utils.BN(newSellerBalance)

      let price, number, total
	  price = 1
	  number = 1
	  total = price * number
	  total = total.toString()
	  
      total = web3.utils.toWei(total, 'Ether')
      total = new web3.utils.BN(total)

      const expectedBalance = oldSellerBalance.add(total)

      assert.equal(newSellerBalance.toString(), expectedBalance.toString())

      // FAILURE: Tries to buy a product that does not exist, i.e., product must have valid id
      await marketplus.purchaseProduct(10000, 1, { from: buyer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
 
      // FAILURE: Buyer tries to buy without enough ether
      await marketplus.purchaseProduct(productlist[0].id, 1, { from: buyer, value: web3.utils.toWei('0.5', 'Ether') }).should.be.rejected;
  
      // FAILURE: Deployer tries to buy the out-of-stock product, i.e., product can't be purchased if out of stock
      await marketplus.purchaseProduct(productlist[0].id, 1, { from: deployer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;

      // FAILURE: Seller tries to buy again, i.e., buyer can't be the seller
      await marketplus.purchaseProduct(productlist[0].id, 1, { from: seller, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;
    })

  })

})
