import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
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
	//const dispatch = useDispatch();
	//const loginReducer = useSelector(({ loginReducer }) => loginReducer);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [user, setUser] = React.useState('');

	React.useEffect(() => {
		let username = localStorage.getItem('LOGIN_USERNAME');
		setUser(username);
	}, []);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<div className={classes.root}>
				<AppBar style={{ backgroundColor: '#3f51b5' }} position="static">
					<Toolbar>
						<RouterLink to="/main">
							<img width="200" alt="Logo" src="/images/LOGO_STARMARK.png" />
						</RouterLink>
						<Typography className={classes.title}></Typography>

						<AccountCircleIcon />

						<p style={{ marginLeft: 10, marginRight: 10 }}>{user}</p>

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
									<PowerSettingsNewIcon color="secondary" fontSize="small" />
								</ListItemIcon>
								<ListItemText 
									onClick={() => {
										//dispatch(loginActions.logout({ ...props }));
									}}
									primary="ออกจากระบบ"
								/>
							</StyledMenuItem>
						</StyledMenu>
					</Toolbar>
				</AppBar>
			</div>
			{/* <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div> */}
		</div>
	);
};

Header.propTypes = {
	history: PropTypes.object,
};

export default withRouter(Header);
