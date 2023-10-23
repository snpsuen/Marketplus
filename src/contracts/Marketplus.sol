pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Marketplus {
	string public name;
	Product[] public productlist;

	struct Product {
		uint id;
		string name;
		uint price;
		uint stock;
		address payable owner;
	}

	event ProductCreated(
		uint id,
		string name,
		uint price,
		uint stock,
		address payable owner
	);

    event ProductPurchased(
		uint id,
		string name,
		uint price,
		uint stock,
		address payable owner
    );

    constructor() public {
		name = "Dapp University Marketplus";
    }

    function random(uint number) private view returns(uint){
		return uint(keccak256(abi.encodePacked(block.timestamp,block.difficulty, msg.sender))) % number;
    }
	
	function getList() public view returns(Product[] memory){
        return productlist;
    }
	
	function getLength() public view returns(uint){
        return productlist.length;
    }
	
	function getName() public view returns(string memory){
        return name;
    }
	
    function createProduct(string memory _name, uint _price, uint _stock) public {
		uint _id;
	
		// Require a valid name
		require(bytes(_name).length > 0);
		
		// Require a valid price
		require(_price > 0);
		
		// Require a valid stock
		require(_stock > 0);
		
		// Generate new product ID from 0..9999
		_id = random(10000);
		
        // Create the product
		productlist.push(Product(_id, _name, _price, _stock, msg.sender));
		       
		// Trigger an event
        emit ProductCreated(_id, _name, _price, _stock, msg.sender);
    }

    function purchaseProduct(uint _id, uint _number) public payable {
		// Fetch the product
		Product memory _product;
		uint _where;
	  
		for (uint i = 0; i < productlist.length; i++) {
			if (productlist[i].id == _id) {
				_where = i;
				_product = productlist[_where];
				break;
			}
		}

		// Make sure the product has a valid id
		require(_product.id >= 0 && _product.id < 10000);
	  
		// Require enough product items in stock
		require(_product.stock >= _number);
    
		// Require that there is enough Ether in the transaction
		require(msg.value >= _product.price * _number);

		// Require that the buyer is not the owner
		require(_product.owner != msg.sender);
     
		// Mark as purchased
		_product.stock -= _number;
    
		// Update the product
		productlist[_where] = _product;
    
		// Pay the seller by sending them Ether
		address(_product.owner).transfer(msg.value);
    
		// Trigger an event
		emit ProductPurchased(_id, _product.name, _product.price, _product.stock, msg.sender);

    }
}