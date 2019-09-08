import React, { Component } from 'react';
import logo from './img/eyes.svg';
import './App.css';
import LoadForm from './components/LoadForm'
import { Provider } from 'react-redux'
import { store, history } from './redux/store';

class App extends Component {
	render() {
	    return (
	    	<Provider store={store}>
			<div className="App">
			    <header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<LoadForm />
				</header>
			</div>
		    </Provider>
	    );
	}
}

export default App;
