import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { Link as RouterLink } from 'react-router-dom';
//import * as loginActions from './../../actions/login.action';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { API_LOGIN_URL, LOGIN_STATUS,LOGIN_NAME, LOGIN_USERNAME, LOGIN_PASSWORD } from '../../Constants';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Divider from '@material-ui/core/Divider';
import DialogActions from '@material-ui/core/DialogActions';
import { Formik, Form, Field } from 'formik';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import {
	Grid,
	Button,
	IconButton,
	TextField,
	Link,
	Card,
	CardHeader,
	CardActions,
	CardContent,
	Collapse,
	Typography,
	FormControl,
	InputLabel,
	OutlinedInput,
	InputAdornment,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	formField: {
		backgroundColor: '#FBFCFC',
		margin: '2%',
	},
	modal: {
		justifyContent: 'center',
		display: 'flex',

		flexDirection: 'column',
		margin: 'auto',
		width: 'fit-content',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		//border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: '3%',
	},
	form: {
		margin: '5%',
		justifyContent: 'center',
	},
	textField: {
		fontFamily: 'kanit',
		backgroundColor: '#FBFCFC',
		margin: theme.spacing(2, 0),
	},
}));

const StyledMenuItem = withStyles((theme) => ({
	root: {},
}))(MenuItem);

const StyledMenu = withStyles({
	paper: {
		border: '0px solid #F7F9F9',
	},
	txt: {
		fontFamily: 'kanit',
	},
})((props) => (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'center',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'center',
		}}
		{...props}
	/>
));

const Header = (props) => {
	const { history } = props;
	const classes = useStyles();

	const [open, setOpen] = React.useState(false);
	const [alert, setAlert] = React.useState(false);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [user, setUser] = React.useState('');
	const [changePwd, setChangePwd] = React.useState({
		username: '',
		password: '',
		weight: '',
		weightRange: '',
		showPassword: false,
	});

	React.useEffect(() => {
		let username = localStorage.getItem('LOGIN_USERNAME');
		let name = localStorage.getItem('LOGIN_NAME');
		setUser({username : username, name : name});
	}, []);

	const handleClickLogout = () => {
		localStorage.removeItem(LOGIN_NAME);
		localStorage.removeItem(LOGIN_STATUS);
		localStorage.removeItem(LOGIN_USERNAME);
		localStorage.removeItem(LOGIN_PASSWORD);
		window.location = '/Login';
	};

	const handleClickShowPassword = () => {
		setChangePwd({ ...changePwd, showPassword: !changePwd.showPassword });
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setAnchorEl(null);
		setOpen(false);
		setChangePwd({ ...changePwd, username: '', password: '' });
	};

	const handleOK = () => {
		const parm = {
			RecId: changePwd.RecId,
			UserName: user.username,
			Password: changePwd.password,
		};

		axios.post(API_LOGIN_URL + '/changepassword', parm).then((response) => {
			if (response.data == 'NOK') {
			} else {
				setOpen(false);
				setAlert(true);
			}
		});
	};

	const alertMessage = () => {
		return (
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={alert}
				onClose={handleClose}
				closeAfterTransition
				// BackdropComponent={Backdrop}
				// BackdropProps={{
				// 	timeout: 500,
				// }}
			>
				<Fade in={alert}>
					<Collapse in={alert}>
						<Alert
							style={{ fontFamily: 'kanit' }}
							action={
								<IconButton
									aria-label="close"
									color="inherit"
									size="small"
									onClick={() => {
										setAlert(false);
									}}
								>
									<CloseIcon fontSize="inherit" />
								</IconButton>
							}
						>
							ทำการเปลี่ยนรหัสผ่านสำเร็จ
						</Alert>
					</Collapse>
				</Fade>
			</Modal>
		);
	};

	const showDialog = () => {
		return (
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<Card className={classes.paper}>
						<CardHeader title={'เปลี่ยนรหัสผ่าน'} />
						<form
							className={classes.form}
							onSubmit={(e) => {
								e.preventDefault();
							}}
						>
							<CardContent>
								<Grid container justify="space-around">
									<Grid item md={12} xs={12}>
										<TextField
											className={classes.textField}
											fullWidth
											name="username"
											label="ชื่อผู้ใช้"
											type="text"
											value={user.username}
											variant="outlined"
										/>
									</Grid>
								</Grid>
								<Grid container justify="space-around">
									<Grid item md={12} xs={12}>
										<FormControl variant="outlined">
											<InputLabel
												htmlFor="outlined-adornment-password"
												style={{ fontFamily: 'kanit' }}
											>
												รหัสผ่านใหม่
											</InputLabel>
											<OutlinedInput
												style={{ fontFamily: 'kanit' }}
												id="outlined-adornment-password"
												type={changePwd.showPassword ? 'text' : 'password'}
												value={changePwd.password}
												onChange={(e) => {
													setChangePwd({
														...changePwd,
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
															{changePwd.showPassword ? (
																<Visibility />
															) : (
																<VisibilityOff />
															)}
														</IconButton>
													</InputAdornment>
												}
												labelWidth={70}
											/>
										</FormControl>
									</Grid>
								</Grid>
							</CardContent>
							<Divider className={classes.divider} />
							<CardActions style={{ width: '100%', justifyContent: 'flex-end' }}>
								<Formik
									initialValues={{
										id: 0,
									}}
									onSubmit={(changePwd, { setSubmitting }) => {
										setSubmitting(false);
									}}
								>
									{(props) => {
										const { handleSubmit, isSubmitting } = props;

										return (
											<Form onSubmit={handleSubmit}>
												<DialogActions>
													<Button style={{ fontFamily: 'kanit' }}
														disabled={isSubmitting}
														onClick={handleOK}
														type="submit"
														color="primary"
														variant="contained"
													>
														ยืนยัน
													</Button>
													<Button style={{ fontFamily: 'kanit' }} onClick={handleClose} color="primary" autoFocus>
														ยกเลิก
													</Button>
												</DialogActions>
											</Form>
										);
									}}
								</Formik>
							</CardActions>
						</form>
					</Card>
				</Fade>
			</Modal>
		);
	};

	return (
		<div>
			<div className={classes.root}>
				<AppBar style={{ backgroundColor: '#3498DB' }} position="static">
					<Toolbar>
						<RouterLink to="/main">
							<img width="200" alt="Logo" src="/images/LOGO_STARMARK.png" />
						</RouterLink>
						<Typography className={classes.title}></Typography>

						<AccountCircleIcon />

						<p style={{ marginLeft: 10, marginRight: 10 }}>{user.username}</p>

						<IconButton aria-label="delete" className={classes.margin} size="small" onClick={handleClick}>
							<ExpandMoreIcon fontSize="small" />
						</IconButton>
						<StyledMenu
							id="customized-menu"
							anchorEl={anchorEl}
							keepMounted
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<StyledMenuItem>
								<ListItemIcon>
									<EditIcon color="primary" fontSize="small" />
								</ListItemIcon>
								<ListItemText onClick={handleOpen} primary="เปลี่ยนรหัสผ่าน" />
							</StyledMenuItem>
							<StyledMenuItem>
								<ListItemIcon>
									<PowerSettingsNewIcon color="secondary" fontSize="small" />
								</ListItemIcon>
								<ListItemText onClick={handleClickLogout} primary="ออกจากระบบ" />
							</StyledMenuItem>
							{showDialog()}
							{alertMessage()}
						</StyledMenu>
					</Toolbar>
				</AppBar>
			</div>
		</div>
	);
};

Header.propTypes = {
	history: PropTypes.object,
};

export default withRouter(Header);
