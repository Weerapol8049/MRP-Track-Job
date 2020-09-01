import React from 'react';
import logo from './logo.svg';
import './App.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Header from './components/flagments/header';
import Login from './components/pages/login';
import ReceiveEnd from './components/pages/receive_end_job';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { LOGIN_STATUS  } from '../src/Constants';

const theme = createMuiTheme({
	typography: {
		fontFamily: ['Kanit', 'sans-serif'].join(','),
	},
});

function App() { 
	const [login, setLogin] = React.useState(0);

	React.useEffect(() => {
		
		const loginStatus = localStorage.getItem(LOGIN_STATUS);
		console.log('Login status : ' +loginStatus);
		setLogin({ status : loginStatus });
	  }, []);

	  const LoginRoute = ({ component: Component, ...rest }) => (
		<Route
		  {...rest}
		  render={(props) =>
			// ternary condition
			login.status ? <Redirect to="/MRPTrack" /> : <Login {...props} />
		  }
		/>
	  );
	
	  // Protected Route
	const SecuredRoute = ({ component: Component, ...rest }) => (
		<Route
		  {...rest}
		  render={(props) =>
			// ternary condition
			login.status  ? (
			  <Component {...props} />
			) : (
			  <Redirect to="/Login" />
			)
		  }
		/>
	  );
	  
	  const redirectToLogin = () => {
		return <Redirect to="/Login"></Redirect>;
	  };
	  
	return (
		<Router>
			{login.status && <Header></Header>}
			<Switch>
				<ThemeProvider theme={theme}>
					<div className="App">
					    <LoginRoute path="/Login" component={Login}></LoginRoute>
						<SecuredRoute path="/MRPTrack" component={ReceiveEnd}></SecuredRoute>
						<Route exact={true} path="/" component={redirectToLogin}></Route>
					</div>
				</ThemeProvider>
			</Switch>
		</Router>
	);
}

export default App;
