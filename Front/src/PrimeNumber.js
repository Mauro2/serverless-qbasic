import React from 'react';
import './App.css';
import axios from 'axios';

class PrimeNumbers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			primeNumber: 0,
        };
        this.handleInput = this.handleInput.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		
		this.c = 0
		this.loadingTexts = ['Consultando al conocimiento ancestral...', 'Mauro me hago viejo como vos esperando...', 'Lo hubieras hecho en Go...', 'No era que los porteños andan apurados?'];
	}

	

	handleInput = (event) => {
		const target = event.target;
		const name = target.value;
		if (document.getElementById('accepted').style.display === 'block' || document.getElementById('rejected').style.display === 'block'){
			document.getElementById('accepted').style.display = 'none'
			document.getElementById('rejected').style.display = 'none'
		}
		if (name !== ''){
			this.setState({
				primeNumber: name,
			})
		}else{
			console.log("Not a valid input")
		}
	}


	
	loadingInfo = () => {
		document.getElementById('accepted').style.display = 'none'
		document.getElementById('rejected').style.display = 'none'
		document.getElementById('loading').style.display = 'block'
		document.getElementById('loading').innerText = this.loadingTexts[this.c++ % this.loadingTexts.length ]
	}
	
	handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			console.log('do validate');
			console.log(this.state.primeNumber)

			axios({ 
				method: 'POST',
				url: 'http://serverless-qbasic.centralus.azurecontainer.io/run',
				headers: {'Access-Control-Allow-Origin': '*'},
				data: {
					value : {
						input: this.state.primeNumber.valueOf()
					} 
				}
			},
			this.loadingInfo())
			.then(function (response) {
				document.getElementById('loading').style.display = 'none'
				console.log(response.data.output);
				if (response.data.output === 'true'){
					document.getElementById('accepted').style.display = 'block'
					document.getElementById('rejected').style.display = 'none'
					document.getElementById('accepted').innerText = 'ES PRIMO!'
				}
				if (response.data.output === 'false'){
					document.getElementById('rejected').style.display = 'block'
					document.getElementById('accepted').style.display = 'none'
					document.getElementById('rejected').innerText = 'No es primo :( !'
				}
			})
			.catch(function (error) {
				console.log(error);
			});
		}
	}
	render(){
		return (
			<div class="container" style={{opacity: 1, top: 40 + '%', marginTop: 130 + 'px'}}>
				<div id="normal">
					<div id="faltan" style={{fontSize:90 + 'px'}}>¿Es numero primo?</div>
					<input id="contador"style={{fontSize:400 + 'px', lineHeight: 261.6 + 'px'}} type="number" min="1" max="32000" onKeyDown={this.handleKeyDown} onInput={this.handleInput}></input>
					<div id="dias" style={{fontSize: 60 + 'px'}}></div>
					<div id="accepted" style={{height: 225 + 'px', lineHeight: 2 + 'px', color: 'green', fontSize: 90 + 'px'}}></div>
					<div id="loading" style={{height: 225 + 'px', lineHeight: 2 + 'px', color: 'white', fontSize: 90 + 'px'}}></div>
					<div id="rejected" style={{height: 225 + 'px', lineHeight: 2 + 'px', color: 'red', fontSize: 90 + 'px'}}></div>
					<div id="fecha" style={{fontSize:32 + 'px'}}></div>
					<div id="motivo" style={{fontSize:17 + 'px'}}></div>
				</div>
			</div>
		  );
	}
}

export default PrimeNumbers;
