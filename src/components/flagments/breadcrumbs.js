import React, { useState } from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Chip from '@material-ui/core/Chip';
import { emphasize, withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import Edit from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ListIcon from '@material-ui/icons/List';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
const useStyles = makeStyles((theme) => ({
	breadcrumbs: {
		paddingBottom: theme.spacing(1),
	},
}));

const StyledBreadcrumb = withStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.grey[100],
		height: theme.spacing(3),
		color: theme.palette.grey[800],
		fontWeight: theme.typography.fontWeightRegular,
		'&:hover, &:focus': {
			backgroundColor: theme.palette.grey[300],
		},
		'&:active': {
			boxShadow: theme.shadows[1],
			backgroundColor: emphasize(theme.palette.grey[300], 0.12),
		},
	},
}))(Chip);

const Breadcrumb = (props) => {
	const classes = useStyles();
	const [breadcrumb, setBreadcrumb] = useState('');
	const [mainId, setMainId] = useState(0);

	React.useEffect(() => {
		let parm = props.id;
		let main = props.match.params.main;
		setMainId(main);
		setBreadcrumb(parm);
	}, []);

	function handleClick(event) {
		event.preventDefault();
		props.history.push('/main');
	}
	function handleLineClick(event) {
		event.preventDefault();
		props.history.push('/sales_line/' + mainId);
	}

	return (
		<div className={classes.breadcrumbs}>
			<Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
				<StyledBreadcrumb
					component="a"
					href="#"
					label="Home"
					icon={<HomeIcon fontSize="small" />}
					onClick={handleClick}
				/>
        	{breadcrumb == 'Create' && (
					<Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
						<StyledBreadcrumb
							separator={<NavigateNextIcon fontSize="small" />}
							style={{ backgroundColor: '#ABEBC6' }}
							component="a"
							label="Created"
							icon={<AddCircleOutlineIcon fontSize="small" />}
						/>
					</Breadcrumbs>
				)}
        	{breadcrumb == 'Edit' && (
					<Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
						<StyledBreadcrumb
							separator={<NavigateNextIcon fontSize="small" />}
							style={{ backgroundColor: '#ABEBC6' }}
							component="a"
							label="Edit"
							icon={<Edit fontSize="small" />}
						/>
					</Breadcrumbs>
				)}
				{breadcrumb == 'Line' && (
					<Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
						<StyledBreadcrumb
							separator={<NavigateNextIcon fontSize="small" />}
							style={{ backgroundColor: '#ABEBC6' }}
							component="a"
							label="Line"
							icon={<ListIcon fontSize="small" />}
						/>
					</Breadcrumbs>
				)}
				{breadcrumb == 'Line_edit' && (
					<Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
						<StyledBreadcrumb
							separator={<NavigateNextIcon fontSize="small" />}
							component="a"
							label="Line"
							icon={<ListIcon fontSize="small" />}
							onClick={handleLineClick}
						/>
						<StyledBreadcrumb
							separator={<NavigateNextIcon fontSize="small" />}
							style={{ backgroundColor: '#ABEBC6' }}
							component="a"
							label="Edit"
							icon={<Edit fontSize="small" />}
						/>
					</Breadcrumbs>
				)}
				{breadcrumb == 'Line_create' && (
					<Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
						<StyledBreadcrumb
							separator={<NavigateNextIcon fontSize="small" />}
							component="a"
							label="Line"
							icon={<ListIcon fontSize="small" />}
							onClick={handleLineClick}
						/>
						<StyledBreadcrumb
							separator={<NavigateNextIcon fontSize="small" />}
							style={{ backgroundColor: '#ABEBC6' }}
							component="a"
							label="Created"
							icon={<AddCircleOutlineIcon fontSize="small" />}
						/>
					</Breadcrumbs>
				)}
        {breadcrumb == 'Gallery' && (
					<Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
						<StyledBreadcrumb
							separator={<NavigateNextIcon fontSize="small" />}
							style={{ backgroundColor: '#ABEBC6' }}
							component="a"
							label="Gallery"
							icon={<PhotoLibraryIcon fontSize="small" />}
						/>
					</Breadcrumbs>
				)}
			</Breadcrumbs>
		</div>
	);
};

Breadcrumb.propTypes = {
	className: PropTypes.string,
};

export default withRouter(Breadcrumb);
