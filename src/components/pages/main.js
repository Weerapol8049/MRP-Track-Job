import React from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import { imageUrl } from './../../Constants';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { useDispatch, useSelector } from 'react-redux';
import * as orderActions from './../../actions/main.action';
import * as buActions from './../../actions/bu.action';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Box from '@material-ui/core/Box';
import Badge from '@material-ui/core/Badge';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
//import Breadcrumbs from './../flagments/breadcrumbs';
import DeleteDialog from './../flagments/dialogDelete';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Formik, Form, Field } from 'formik';
import { withOrientationChange } from 'react-device-detect';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NumberFormatCustom } from './../flagments/numberFormat';
import { createStore } from 'redux'

const tableIcons = {
	Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
	Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
	Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
	DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
	Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
	Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
	FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
	ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
	SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
	ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
	ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const useStyles = makeStyles((theme) => ({
	root: {
		justifyContent: 'center',
		//display: "flex",
		//width: '100%',
		marginTop: '5%',
		marginLeft: '5%',
		marginRight: '5%',
		marginBottom: '5%',
	},
	txt: {
		fontFamily: 'kanit',
	},
	cell: {
		minWidth: theme.spacing(10),
	},
}));

function Stock(props) {
	const { isLandscape, isPortrait, isMobile, isWindows, isMacOs } = props;
	const dispatch = useDispatch();
	const orderReducer = useSelector(({ orderReducer }) => orderReducer);
	const buReducer = useSelector(({ buReducer }) => buReducer);
	
	const classes = useStyles();

	const initialState = {
		query: '',
		fetching: false,
		results: []
	  }

	React.useEffect(() => {
		//let store = localStorage.getItem('LOGIN_USER_BY_STORE');
		dispatch(orderActions.getOrders());
		dispatch(buActions.getBU());
	}, []);

	const [open, setOpen] = React.useState(false);
	const [deleteId, setDeleteId] = React.useState(0);
	const [openCreate, setOpenCreate] = React.useState(false);
	const [startDate, setStartDate] = React.useState(new Date());

	const reducer = (state = initialState, action = buActions) => {
		if (action.type === 'TRACK_BU_SUCCESS') {
		  return Object.assign({}, state, {
			query: action.payload,
			fetching: true
		  })
		}

		return state
	  }
	  
	  const store = createStore(reducer)

	const handleStartDateChange = (date) => {
		setStartDate(date);
	};

	const handleClickOpenCreate = () => {
		setOpenCreate(true);
	};

	const handleCloseCreate = () => {
		setOpenCreate(false);
	};

	const handleClickOpen = (rowId) => {
		setOpen(true);
		setDeleteId(rowId);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const columns = [
		{
			title: 'Start date',
			cellStyle: { minWidth: 130 },
			render: (item) => (
				<Typography className={classes.txt}>
					<Box fontWeight="fontWeightLight">
						<Moment format="DD/MM/YYYY">{item.StartDate}</Moment>
					</Box>
				</Typography>
			),
		},
		{
			title: 'Finish date',
			cellStyle: { minWidth: 130 },
			render: (item) => (
				<Typography className={classes.txt}>
					<Box fontWeight="fontWeightLight">
						<Moment format="DD/MM/YYYY">{item.FinishDate}</Moment>
					</Box>
				</Typography>
			),
		},
		{
			title: 'Track Id',
			cellStyle: { minWidth: 110 },
			render: (item) => (
				<Typography className={classes.txt}>
					<Box fontWeight="fontWeightLight">{item.TrackId}</Box>
				</Typography>
			),
		},
		{
			title: 'Project',
			cellStyle: { minWidth: 350 },
			render: (item) => (
				<div>
					<Typography className={classes.txt}>
						<Box fontWeight="fontWeightRegular">{item.ProjId}</Box>
						<Box fontWeight="fontWeightLight" fontSize={14}>
							{item.Name}
						</Box>
					</Typography>
				</div>
			),
		},
		// {
		// 	title: 'Project name',
		// 	cellStyle: { minWidth: 200 },
		// 	render: (item) => (
		// 		<Typography className={classes.txt} variant="body1">
		// 			<Box fontWeight="fontWeightLight">{item.Name}</Box>
		// 		</Typography>
		// 	),
		// },
		{
			title: 'Project stage',
			cellStyle: { minWidth: 150 },
			render: (item) => (
				<Typography className={classes.txt} variant="body1">
					<Box fontWeight="fontWeightLight">{item.Stage}</Box>
				</Typography>
			),
		},
		{
			title: 'Track status',
			cellStyle: { minWidth: 140 },
			render: (item) => (
				<Typography className={classes.txt} variant="body1">
					<Box fontWeight="fontWeightLight">{item.TrackStatus}</Box>
				</Typography>
			),
		},
		{
			title: 'BU',
			//cellStyle: { minWidth: 50 },
			render: (item) => (
				<Typography className={classes.txt} variant="body1">
					<Box fontWeight="fontWeightLight">{item.BU}</Box>
				</Typography>
			),
		},
		{
			title: 'Type room',
			cellStyle: { minWidth: 140 },
			render: (item) => (
				<Typography className={classes.txt} variant="body1">
					<Box fontWeight="fontWeightLight">{item.TypeRoom}</Box>
				</Typography>
			),
		},
		{
			title: 'Unit',
			align: 'right',
			cellStyle: { minWidth: 150 },
			render: (item) => (
				<Typography className={classes.txt} fontWeight="fontWeightLight" variant="body1">
					<Box fontWeight="fontWeightLight">
						<NumberFormat
							value={item.Unit}
							displayType={'text'}
							thousandSeparator={true}
							decimalScale={2}
							fixedDecimalScale={true}
							align="right"
						/>
					</Box>
				</Typography>
			),
		},
		{
			title: 'Project amount',
			cellStyle: { minWidth: 170 },
			align: 'right',
			render: (item) => (
				<Typography className={classes.txt} variant="body1">
					<Box fontWeight="fontWeightLight">
						<NumberFormat
							align="right"
							value={item.ProjAmount}
							displayType={'text'}
							thousandSeparator={true}
							decimalScale={2}
							fixedDecimalScale={true}
						/>
					</Box>
					{/* <span style={{fontSize: 10, padding: 0, magin: 0}}>บาท</span> */}
				</Typography>
			),
		},
	];

	const actions = [
		(rowData) => ({
			icon: () => <Edit color="primary" />,
			tooltip: 'Edit',
			// disabled: rowData.line == 0 ?true: false,
			onClick: (event, rowData) => {
				props.history.push('/sales_edit/' + rowData.RecId);
			},
		}),
		(rowData) => ({
			icon: () => <DeleteOutline color="secondary" />,
			tooltip: 'Delete',
			onClick: (event, rowData) => {
				handleClickOpen(rowData.RecId);
			},
		}),
	];
	const top100Films = [
		{ code: 'KBI', label: ' พระราม 2' },
		{ code: 'RST', label: ' พระราม 3' },
	];

	const GET_ORDERS = buReducer.result;
	const options = top100Films.map((option) => {
		const firstLetter = option.code[0].toUpperCase();
		return {
			firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
			...option,
		};
	});
	const showDialog = () => {
		return (
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{'Are you sure you want to delete this Oreder?'}</DialogTitle>
				<DialogContent>
					{/* <DialogContentText id="alert-dialog-description">{deleteId}</DialogContentText> */}
					{/* <Formik
						initialValues={{
							id: 0,
						}}
						onSubmit={(values, { setSubmitting }) => {
							//dispatch(orderActions.deleteOrder(deleteId, props.history));
							setSubmitting(false);
						}}
					>
						{(props) => {
							const { handleSubmit, isSubmitting } = props;

							return (
								<Form onSubmit={handleSubmit}>
									<DialogActions>
										<Button
											disabled={isSubmitting}
											onClick={handleClose}
											type="submit"
											color="primary"
											variant="contained"
										>
											OK
										</Button>
										<Button onClick={handleClose} color="primary" autoFocus>
											Cancel
										</Button>
									</DialogActions>
								</Form>
							);
						}}
					</Formik>
				 */}
				</DialogContent>
			</Dialog>
		);
	};

	const showDialogCreate = () => {
		return (
			<div>
				<Formik
					initialValues={{
						TrackId: '',
						BU: '',
						ProjId: '',
						Name: '',
						Stage: '',
						TrackStatus: '',
						TypeRoom: '',
						Unit: 0,
						StartDate: Date(),
						FinishDate: Date(),
						ProjAmount: 0,
					}}
				>
					<Form>
						<Dialog open={openCreate} onClose={handleCloseCreate} aria-labelledby="form-dialog-title">
							<DialogTitle id="form-dialog-title">New track</DialogTitle>
							<DialogContent>
								<Form>
									<Grid container spacing={3}>
										<Grid item md={6} xs={12}>
											<TextField
												fullWidth
												label="Track Id"
												margin="dense"
												name="trackId"
												variant="outlined"
											></TextField>
											<TextField
												id="standard-select-currency-native"
												select
												label="Native select"
												// value={currency}
												// onChange={handleChange}
												SelectProps={{
													native: true,
												}}
												helperText="Please select your currency"
											>
												{/* {buReducer.result.map((option) => (
													<option key={option.value} value={option.value}>
														{option.label}
													</option>
												))} */}
											</TextField>
										</Grid>
										<Grid item md={6} xs={12}> 
											<Autocomplete
												id="groupedStore"
												options={options.sort(
													(a, b) => -b.firstLetter.localeCompare(a.firstLetter)
												)}
												groupBy={(option) => option.firstLetter}
												getOptionLabel={(option) => option.code}
												renderOption={(option) => (
													<React.Fragment>
														{option.code} {option.label}
														{/* <span>{storeToFlag(option.code)}</span> */}
													</React.Fragment>
												)}
												renderInput={(params) => (
													<TextField
														{...params}
														fullWidth
														label="Stored"
														margin="dense"
														name="storeId"
														// onChange={handleChange}
														// value={values.storeId}
														required
														variant="outlined"
													/>
												)}
												//onChange={(event, val) => setStoreId(val)}
											/>
										</Grid>
									</Grid>
									<Grid container spacing={3}>
										<Grid item md={4} xs={12}>
											<TextField
												fullWidth
												label="BU"
												margin="dense"
												name="bu"
												variant="outlined"
											/>
										</Grid>
										<Grid item md={4} xs={12}>
											<TextField
												fullWidth
												label="Track status"
												margin="dense"
												name="trackStatus"
												variant="outlined"
											/>
										</Grid>
										<Grid item md={4} xs={12}>
											<TextField
												fullWidth
												label="Type room"
												margin="dense"
												name="typeRoom"
												variant="outlined"
											/>
										</Grid>
									</Grid>

									<Grid container spacing={3}>
										<Grid item md={4} xs={12}>
											<TextField
												fullWidth
												label="Project Id"
												margin="dense"
												name="projId"
												// onChange={handleChange}
												// value={values.pool}
												variant="outlined"
											/>
										</Grid>
										<Grid item md={8} xs={12}>
											<TextField
												fullWidth
												label="Project Name"
												margin="dense"
												name="projName"
												// onChange={handleChange}
												// value={values.pool}
												variant="outlined"
											/>
										</Grid>
									</Grid>

									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<Grid container justify="space-around">
											<Grid item md={5} xs={12}>
												<KeyboardDatePicker
													disableToolbar
													variant="inline"
													format="dd/MM/yyyy"
													margin="normal"
													id="startDate"
													label="Start date"
													KeyboardButtonProps={{
														'aria-label': 'change date',
													}}
												/>
											</Grid>
											<Grid item md={5} xs={12}>
												<KeyboardDatePicker
													disableToolbar
													variant="inline"
													format="dd/MM/yyyy"
													margin="normal"
													id="finishDate"
													label="Finish date"
													KeyboardButtonProps={{
														'aria-label': 'change date',
													}}
												/>
											</Grid>
										</Grid>
									</MuiPickersUtilsProvider>
									<Grid container spacing={3}>
										<Grid item md={4} xs={12}>
											<TextField
												fullWidth
												label="Project stage"
												margin="dense"
												name="projStage"
												// onChange={handleChange}
												// value={values.pool}
												variant="outlined"
											/>
										</Grid>
										<Grid item md={8} xs={12}>
											<TextField
												fullWidth
												label="Project stage name"
												margin="dense"
												name="projStageName"
												// onChange={handleChange}
												// value={values.pool}
												variant="outlined"
											/>
										</Grid>
									</Grid>

									<Grid container spacing={3}>
										<Grid item md={6} xs={12}>
											<TextField
												fullWidth
												label="Unit"
												margin="dense"
												name="unit"
												variant="outlined"
												InputProps={{
													inputComponent: NumberFormatCustom,
												}}
											/>
										</Grid>
										<Grid item md={6} xs={12}>
											<TextField
												fullWidth
												label="Project amount"
												margin="dense"
												name="projAmount"
												variant="outlined"
												InputProps={{
													inputComponent: NumberFormatCustom,
												}}
											/>
										</Grid>
									</Grid>
								</Form>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleCloseCreate} color="primary" variant="contained">
									Add
								</Button>
								<Button onClick={handleCloseCreate} color="primary" variant="outlined">
									Cancel
								</Button>
							</DialogActions>
						</Dialog>
					</Form>
				</Formik>
			</div>
		);
	};

	return (
		// <div >
		<div className={classes.root}>
			{/* <div className={classes.breadcrumbs}>
					<Breadcrumbs id="Main"></Breadcrumbs>
				</div> */}
			{/* <h2>
				{JSON.stringify(buReducer.result)}--{store.query} -- {JSON.stringify(top100Films)}
			</h2> */}
			<div>
				<MaterialTable
					title="MRP Track"
					//size="small"
					icons={tableIcons}
					columns={columns}
					data={orderReducer.result ? orderReducer.result : []}
					actions={actions}
					//striped
					options={{
						search: true,
					}}
					components={{
						Toolbar: (props) => (
							<div>
								<MTableToolbar {...props} />
								<div style={{ marginLeft: '10', padding: '10px 10px' }}>
									<Button
										width="50"
										variant="outlined"
										color="primary"
										//component={Link}
										startIcon={<AddCircleOutlineIcon />}
										onClick={handleClickOpenCreate}
									>
										New track
									</Button>
								</div>
							</div>
						),
					}}
				/>
				{showDialog()}
				{showDialogCreate()}
			</div>
		</div>
	);
}

//Stock = withOrientationChange(Stock);

export default Stock;
