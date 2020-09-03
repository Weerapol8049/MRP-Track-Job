import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import { API_LOGIN_URL, LOGIN_STATUS, LOGIN_USERNAME, LOGIN_PASSWORD } from '../../Constants';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';
import {
	Grid,
	Button,
	IconButton,
	TextField,
	Link,
	Card,
	Typography,
	FormControl,
	InputLabel,
	OutlinedInput,
	InputAdornment,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		justifyContent: 'center',
		display: 'flex',
		alignItems: 'center',
		paddingTop: '7%',
		paddingLeft: '5%',
		paddingRight: '5%',
		paddingBottom: '7%',
	},
	grid: {
		paddingTop: '7%',
		paddingLeft: '3%',
		paddingRight: '3%',
		paddingBottom: '7%',
		justifyContent: 'center',
		display: 'flex',
		backgroundColor: '#EAEDED',
		height: '100%',
	},
	name: {
		marginTop: '3%',
		color: theme.palette.white,
	},
	content: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	contentBody: {
		//flexGrow: 1,
		//display: "flex",
		alignItems: 'center',
	},
	form: {
		margin: '5%',
		justifyContent: 'center',
	},
	title: {
		marginTop: '3%',
	},
	textField: {
		backgroundColor: '#FBFCFC',
		margin: theme.spacing(2, 0),
	},
	formField: {
		backgroundColor: '#FBFCFC',
		margin: '2%',
	},
	signInButton: {
		margin: theme.spacing(2, 0),
	},
}));

const SignIn = (props) => {
	const { history } = props;

	const classes = useStyles();
	const [login, setLogin] = useState('');
	const [values, setValues] = useState({
		username: '',
		password: '',
		weight: '',
		weightRange: '',
		showPassword: false,
	});

	const API = (path) => {
		const parm = {
			UserName: values.username,
			Password: values.password,
		};

		axios.post(API_LOGIN_URL + '/' + path, parm).then((response) => {
			if (response.data == 'NOK') {
				localStorage.setItem(LOGIN_STATUS, 'NOK');
				setLogin({ status: 'NOK', error: 'Username or Password incorrect.' });
				console.log(response.data);
			} else {
				setLogin({ status: 'OK' });
				localStorage.setItem(LOGIN_STATUS, 'OK');
				localStorage.setItem(LOGIN_USERNAME, values.username);
				localStorage.setItem(LOGIN_PASSWORD, values.password);
				console.log('Success ' + values.username + ' - ' + values.password);
				window.location = '/MRPTrack';
			}
		});
	};

	const handleBack = () => {
		history.goBack();
	};

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};
	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleSignIn = (event) => {
		event.preventDefault();
		history.push('/');
	};

	return (
		<div className={classes.root}>
			<Card className={classes.grid} container>
				<Grid className={classes.content} item lg={12} xs={12}>
					<Grid item lg={12} xs={12}>
						<img width="200" alt="Logo" src="/images/LOGO_STARMARK.png" />
					</Grid>
					<div className={classes.contentBody}>
						<form
							className={classes.form}
							onSubmit={(e) => {
								e.preventDefault();
								API('user');
							}}
						>
							<Typography variant="body2" color="textPrimary" component="p">
								<Box fontWeight="fontWeightRegular" fontSize={20}>
									{'ลงชื่อเข้าใช้งาน'}
								</Box>
							</Typography>

							<Grid container justify="space-around">
								<Grid item md={12} xs={12}>
									<TextField
										className={classes.textField}
										fullWidth
										name="username"
										label="ชื่อผู้ใช้"
										type="text"
										value={values.username}
										onChange={(e) => {
											setValues({
												...values,
												username: e.target.value,
											});
										}}
										variant="outlined"
									/>
								</Grid>
							</Grid>
							<Grid container justify="space-around">
								<Grid item md={12} xs={12}>
									<FormControl className={classes.textField} variant="outlined">
										<InputLabel htmlFor="outlined-adornment-password">รหัสผ่าน</InputLabel>
										<OutlinedInput
											id="outlined-adornment-password"
											type={values.showPassword ? 'text' : 'password'}
											value={values.password}
											onChange={(e) => {
												setValues({
													...values,
													password: e.target.value,
												});
											}}
											endAdornment={
												<InputAdornment position="end">
													<IconButton
														aria-label="toggle password visibility"
														onClick={handleClickShowPassword}
														onMouseDown={handleMouseDownPassword}
														edge="end"
													>
														{values.showPassword ? <Visibility /> : <VisibilityOff />}
													</IconButton>
												</InputAdornment>
											}
											labelWidth={70}
										/>
									</FormControl>
								</Grid>
							</Grid>

							{login.status == 'NOK' && <Alert severity="error">{login.error}</Alert>}

							<Button
								className={classes.signInButton}
								color="primary"
								fullWidth
								size="large"
								type="submit"
								variant="contained"
							>
								เข้าสู่ระบบ
							</Button>
						</form>
					</div>
				</Grid>
			</Card>
		</div>
	);
};

SignIn.propTypes = {
	history: PropTypes.object,
};

export default SignIn;
