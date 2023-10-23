import React, { Component } from 'react';

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {number: 0};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({number: event.target.value});
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
			
			
			<h2>Buy Product</h2>
			<table className="table">
				<thead>
					<tr>
						<th scope="col">ID</th>
						<th scope="col">Name</th>
						<th scope="col">Price</th>
						<th scope="col">Stock</th>
						<th scope="col">Owner</th>
						<th scope="col"></th>
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
								<td>
									<form onSubmit={(event) => {
										event.preventDefault()
										const id = product.id
										const number = this.state.number
										this.props.purchaseProduct(id, number)
										}}>
										
										<div className="form-group mr-sm-2">
											<input
											id="productNumber"
											type="number"
											value={this.state.number} 
											onChange={this.handleChange}
											className="form-control"
											required />
										</div>
										<button type="submit" className="btn btn-primary">Purchase Product</button>
									</form>
								</td>
							</tr>
						)
					})}
			  </tbody>
			</table>
		  
		  </div>
		);
	  }
}

export default Main;