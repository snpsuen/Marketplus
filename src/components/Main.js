import React, { Component } from 'react';

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {buyID: 0, buyNumber: 0};
		this.handleChangeID = this.handleChangeID.bind(this);
		this.handleChangeNumber = this.handleChangeNumber.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChangeID(event) {	
		this.setState({buyID: event.target.value});
	}
	
	handleChangeNumber(event) {
		this.setState({buyNumber: event.target.value});
	}
	
	handleSubmit(event) {
		event.preventDefault();
		var index;
		const id = this.state.buyID;
		const number = this.state.buyNumber;
		
		console.log("this.props.length = %i", this.props.length);
		for (index = 0; index < this.props.length; index++) {
			if (this.props.productlist[index].id.toString() === id.toString()) {
				// console.log("Found index = %i", index);
				break;
			}
			// console.log("index = %i", index);
		}
		
		const productid = this.props.productlist[index].id;
		// console.log("Calling purchaseProduct(%i, %i)", productid, number);
		this.props.purchaseProduct(productid, number);		
	}

	
	render() {
		return (
			<div id="content">
			
				<h1>Add Product</h1>		
				<form onSubmit={(event) => {
					event.preventDefault()
					const name = this.productName.value
					const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
					const stock = this.productStock.value
					this.props.createProduct(name, price, stock)
					}}>
					<div className="form-group mr-sm-2">
						<input
						id="productName"
						type="text"
						ref={(input) => { this.productName = input }}
						className="form-control"
						placeholder="Product Name"
						required />
					</div>
					<div className="form-group mr-sm-2">
						<input
						id="productPrice"
						type="text"
						ref={(input) => { this.productPrice = input }}
						className="form-control"
						placeholder="Product Price"
						required />
					</div>
					<div className="form-group mr-sm-2">
						<input
						id="productStock"
						type="number"
						ref={(input) => { this.productStock = input }}
						className="form-control"
						placeholder="Number in stock"
						required />
					</div>
					<button type="submit" className="btn btn-primary">Add Product</button>
				</form> 
				
				<p>&nbsp;</p> 
							
				<h2>List And Buy Product</h2>
				<table className="table">
					<thead>
						<tr>
							<th scope="col">ID</th>
							<th scope="col">Name</th>
							<th scope="col">Price</th>
							<th scope="col">Stock</th>
							<th scope="col">Owner</th>
						</tr>
					</thead>
					<tbody id="productlist"> {
						this.props.productlist.map((product, index) => {
							return(
								<tr key={index}>
									<th scope="row">{product.id.toString()}</th>
									<td>{product.name}</td>
									<td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</td>
									<td>{product.stock.toNumber()}</td>
									<td>{product.owner}</td>
								</tr>
							)
						})}
				  </tbody>
				</table>
				
				<form onSubmit={this.handleSubmit}>
					<div className="form-group mr-sm-2">
						<input
						id="buyID"
						type="number"
						placeholder="Product ID to buy"
						onChange={this.handleChangeID}
						className="form-control"
						required />
					</div>
					<div className="form-group mr-sm-2">
						<input
						id="buyNumber"
						type="number"
						placeholder="How many to buy"
						onChange={this.handleChangeNumber}
						className="form-control"
						required />
					</div>
					<button type="submit" className="btn btn-primary">Buy Product</button>
				</form>
					  
			</div>
		);
	}
}

export default Main;