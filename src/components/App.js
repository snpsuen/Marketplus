import React, { Component } from 'react';
import Web3 from 'web3'
// import logo from '../logo.png';
import './App.css';
import Marketplus from '../abis/Marketplus.json'
import Navbar from './Navbar'
import Main from './Main'

class App extends Component {
	async componentWillMount() {
		await this.loadWeb3()
		await this.loadBlockchainData()
	}

	async loadWeb3() {
		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum)
			await window.ethereum.enable()
		}
		else if (window.web3) {
			window.web3 = new Web3(window.web3.currentProvider)
		}
		else {
			window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
		}
	}

	async loadBlockchainData() {
		const web3 = window.web3
    
		// Load account
		const accounts = await web3.eth.getAccounts()
		this.setState({ account: accounts[0] })
		const networkId = await web3.eth.net.getId()
		const networkData = Marketplus.networks[networkId]
		
		if(networkData) {
			const marketplus = web3.eth.Contract(Marketplus.abi, networkData.address)
			this.setState({ marketplus })     
			const length = await marketplus.methods.getLength().call()
			this.setState({ length })
      
			// Load products
			for (var i = 0; i < length; i++) {
				const product = await marketplus.methods.productlist(i).call()
				this.setState({
					productlist: [...this.state.productlist, product]
				})
			}
			this.setState({ loading: false})
		} 
		else {
				window.alert('Marketplus contract not deployed to detected network.')
		}
	}

	constructor(props) {
		super(props)
		this.state = {
			marketplus: null,
			account: '',
			length: 0,
			productlist: [],
			loading: true
		}

		this.createProduct = this.createProduct.bind(this)
		this.purchaseProduct = this.purchaseProduct.bind(this)
	}

	createProduct(name, price, stock) {
		this.setState({ loading: true })
		this.state.marketplus.methods.createProduct(name, price, stock).send({ from: this.state.account })
		.once('receipt', (receipt) => {
			this.setState({ loading: false })
		})
	}

	purchaseProduct(id, number) {
		var price;
		this.setState({ loading: true })
		
		for (var i = 0; i < this.state.length; i++) {
			if (this.state.productlist[i].id === id) {
				price = this.state.productlist[i].price
				break;
			}
		}
		
		const total = price * number
		this.state.marketplus.methods.purchaseProduct(id, number).send({ from: this.state.account, value: total })
		.once('receipt', (receipt) => {
			this.setState({ loading: false })
		})
	}

	render() {
		return (
			<div>
				<Navbar account={this.state.account} />
				<div className="container-fluid mt-5">
					<div className="row">
						<main role="main" className="col-lg-12 d-flex"> {
							this.state.loading? 
							<div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
							: <Main productlist={this.state.productlist}
								// length={this.state.length}
								createProduct={this.createProduct}
								purchaseProduct={this.purchaseProduct} />
						}
						</main>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
