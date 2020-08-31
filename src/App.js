import React from 'react';
import logo from './logo.svg';
import './App.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Header from './components/flagments/header';
import Login from './components/pages/login';
import ReceiveEnd from './components/pages/receive_end_job';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

const theme = createMuiTheme({
	typography: {
		fontFamily: ['Kanit', 'sans-serif'].join(','),
	},
});

function App() {
	return (
		<Router>
			{/* <Header></Header> */}
			<Switch>
				<ThemeProvider theme={theme}>
					<div className="App">
					    {/* <Route path="/Login" component={Login}></Route> */}
						<Route path="/MRPTrack" component={ReceiveEnd}></Route>
						<Route exact={true} path="/" component={ReceiveEnd}></Route>
					</div>
				</ThemeProvider>
			</Switch>
		</Router>
	);
}

export default App;
