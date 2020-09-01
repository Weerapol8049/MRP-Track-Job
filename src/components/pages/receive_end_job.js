import React, { useState, useEffect, forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import MaterialTable, { MTableToolbar } from 'material-table';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import Box from '@material-ui/core/Box';
import Moment from 'react-moment';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Button from '@material-ui/core/Button';
import { Formik, Form, Field } from 'formik';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { green } from '@material-ui/core/colors';
import axios from 'axios';
import { API_URL, LOGIN_USERNAME, LOGIN_PASSWORD  } from '../../Constants';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

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
		backgroundColor: '#1111',

		paddingTop: '3%',
		paddingLeft: '5%',
		paddingRight: '5%',
		paddingBottom: '7%',
	},
	txt: {
		fontFamily: 'kanit',
	},
	cell: {
		minWidth: theme.spacing(10),
	},
	margin: {
		margin: theme.spacing(1),
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

}));

function Line() {
	const classes = useStyles();

	const [open, setOpen] = useState(false);
	const [rowData, setRowData] = useState(0);
	const [data, setData] = useState([]);

	useEffect(() => {
		let user = localStorage.getItem(LOGIN_USERNAME);
		let pwd = localStorage.getItem(LOGIN_PASSWORD);

		API('data', user, pwd);
	}, []);

	const API = (path, username, password) => {
		setData({ showLoading: true });
		if (path == 'data') {
			axios
				.get(API_URL + '/' + path + '/' + username + '/' + password)
				.then((response) => {
					setData({ LoadData: response.data, showLoading: false });
				})
				.catch((error) => {
					console.log(error);
				});
		} else if (path == 'edit') {
			const parm = {
				RecId: rowData.RecId,
				ActStartDate: rowData.ActStartDate,
				ActEndDate: rowData.ActEndDate,
				Delay: rowData.Delay,
				DelayPlan: rowData.DelayPlan,
				OperName: rowData.OperName,
				OperNo: rowData.OperNo,
				PlanDays: rowData.PlanDays,
				PlanStartDate: rowData.PlanStartDate,
				PlanEndDate: rowData.PlanEndDate,
				Remark: rowData.Remark,
				SideDesign: rowData.SideDesign,
				StmTrackId: rowData.StmTrackId,
				TypeDesign: rowData.TypeDesign,
				UserId: rowData.UserId,
				UserName: rowData.UserName,
			};

			axios.post(API_URL + '/' + path, parm).then(() => {
				refreshPage();
			});
		}
	};

	function formatDate(string) {
		var options = { year: 'numeric', month: 'short', day: 'numeric' };
		return new Date(string).toLocaleDateString('th-TH', options);
	}

	function refreshPage() {
		let user = localStorage.getItem(LOGIN_USERNAME);
		let pwd = localStorage.getItem(LOGIN_PASSWORD);

		API('data', user, pwd);
	}

	const handleClickOpen = (rowData, name) => {
		let today = new Date();
		const currdate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + 'T00:00:00';
		setOpen(true);
		if (name == 'รับ') {
			setRowData({ ...rowData, Action: name, ActStartDate: currdate });
		}
		if (name == 'เสร็จ') {
			setRowData({ ...rowData, Action: name, ActEndDate: currdate });
		}
	};

	const handleOK = () => {
		setOpen(false);
		API('edit');
	};

	const handleClose = () => {
		setOpen(false);
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
						<CardHeader title={'ยืนยัน' + rowData.Action + 'งาน'} subheader={formatDate(Date())} />
						<CardContent>
							<Grid container justify="space-around">
								<Grid item md={12} xs={12}>
									<Typography variant="body2" color="textPrimary" component="p">
										<Box fontWeight="fontWeightRegular" fontSize={16}>
											{rowData.UserName + ' (' + rowData.UserId + ')'}
										</Box>
									</Typography>
								</Grid>
								<Grid item md={12} xs={12}>
									<Typography className={classes.txt}>
										<Box fontWeight="fontWeightLight" fontSize={14} textAlign="left">
											{rowData.PlanStartDate != '1900-01-01T00:00:00' ? (
												formatDate(rowData.PlanStartDate)
											) : (
												<Box fontWeight="fontWeightLight"> </Box>
											)}
											{' - '}
											{rowData.PlanEndDate != '1900-01-01T00:00:00' ? (
												formatDate(rowData.PlanEndDate)
											) : (
												<Box fontWeight="fontWeightLight"> </Box>
											)}
										</Box>
									</Typography>
								</Grid>
							</Grid>
							<br></br>
							<Grid container justify="space-around">
								<Grid item md={12} xs={12}>
									<Typography variant="body2" color="textPrimary" component="p">
										<Box fontWeight="fontWeightRegular">
											{'Project : '}
											<Box fontWeight="fontWeightLight"  fontSize={18}>
												{rowData.ProjName}
											</Box>
										</Box>
									</Typography>
								</Grid>
							</Grid>
							<br></br>
							<Grid container justify="space-around">
								<Grid item md={5} xs={5}>
									<Typography variant="body2" color="textPrimary" component="p">
										<Box fontWeight="fontWeightLight" fontSize={16}>
											{'Type design : '}
										</Box>
									</Typography>
								</Grid>
								<Grid item md={7} xs={7}>
									<Typography variant="body2" color="textPrimary" component="p">
										<Box fontWeight="fontWeightLight" fontSize={16}>
											<Box fontWeight="fontWeightRegular">{rowData.TypeDesign} </Box>
										</Box>
									</Typography>
								</Grid>
							</Grid>
							<Grid container justify="space-around">
								<Grid item md={5} xs={5}>
									<Typography variant="body2" color="textPrimary" component="p">
										<Box fontWeight="fontWeightLight" fontSize={16}>
											{'Side design : '}
										</Box>
									</Typography>
								</Grid>
								<Grid item md={7} xs={7}>
									<Typography variant="body2" color="textPrimary" component="p">
										<Box fontWeight="fontWeightRegular" fontSize={16}>
											{rowData.SideDesign}
										</Box>
									</Typography>
								</Grid>
							</Grid>
							<Grid container justify="space-around">
								<Grid item md={5} xs={5}>
									<Typography variant="body2" color="textPrimary" component="p">
										<Box fontWeight="fontWeightLight" fontSize={16}>
											{'Operation : '}
										</Box>
									</Typography>
								</Grid>
								<Grid item md={7} xs={7}>
									<Typography variant="body2" color="textPrimary" component="p">
										<Box fontWeight="fontWeightRegular" fontSize={16}>
											{'(' + rowData.OperNo + ') ' + rowData.OperName}
										</Box>
									</Typography>
								</Grid>
							</Grid>
							<Grid container justify="space-around">
								<Grid item md={3} xs={3}>
									<Typography variant="body2" color="textPrimary" component="p">
										<Box fontWeight="fontWeightLight" fontSize={16}>
											{'Remark : '}
										</Box>
									</Typography>
								</Grid>
								<Grid item md={9} xs={9}>
									<Typography variant="body2" color="textPrimary" component="p">
										<Box fontWeight="fontWeightRegular" fontSize={16}>
											{rowData.Remark}
										</Box>
									</Typography>
								</Grid>
							</Grid>
						</CardContent>
						<Divider className={classes.divider} />
						<CardActions style={{ width: '100%', justifyContent: 'flex-end' }}>
							<Formik
								initialValues={{
									id: 0,
								}}
								onSubmit={(values, { setSubmitting }) => {
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
													onClick={handleOK}
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
						</CardActions>
					</Card>
				</Fade>
			</Modal>
			// <Dialog
			// 	open={open}
			// 	onClose={handleClose}
			// 	aria-labelledby="alert-dialog-title"
			// 	aria-describedby="alert-dialog-description"
			// >
			// 	<DialogTitle id="alert-dialog-title">{rowData.Action + ' job'}</DialogTitle>
			// 	<DialogContent>
			// 		<DialogContentText id="alert-dialog-description">
			// 			{'Are you sure you want to ' + rowData.Action + ' this job?'}
			// 		</DialogContentText>
			// 		<Formik
			// 			initialValues={{
			// 				id: 0,
			// 			}}
			// 			onSubmit={(values, { setSubmitting }) => {
			// 				setSubmitting(false);
			// 			}}
			// 		>
			// 			{(props) => {
			// 				const { handleSubmit, isSubmitting } = props;

			// 				return (
			// 					<Form onSubmit={handleSubmit}>
			// 						<DialogActions>
			// 							<Button
			// 								disabled={isSubmitting}
			// 								onClick={handleOK}
			// 								type="submit"
			// 								color="primary"
			// 								variant="contained"
			// 							>
			// 								OK
			// 							</Button>
			// 							<Button onClick={handleClose} color="primary" autoFocus>
			// 								Cancel
			// 							</Button>
			// 						</DialogActions>
			// 					</Form>
			// 				);
			// 			}}
			// 		</Formik>
			// 	</DialogContent>
			// </Dialog>
		);
	};

	const actions = [
		(rowData) => ({
			icon: () => (
				<Button size="small" color="primary" variant="contained" className={classes.margin}>
					รับ
				</Button>
			),
			cellStyle: { minWidth: 50 },
			tooltip: 'รับงาน',
			hidden: rowData.ActStartDate.toString() == '1900-01-01T00:00:00' ? false : true,
			onClick: (event, rowData) => {
				handleClickOpen(rowData, 'รับ');
			},
		}),
		(rowData) => ({
			icon: () => (
				<Button size="small" color="primary" variant="outlined" className={classes.margin}>
					เสร็จ
				</Button>
			),
			cellStyle: { minWidth: 50 },
			tooltip: 'จบงาน',
			hidden:
				rowData.ActStartDate.toString() != '1900-01-01T00:00:00'
					? rowData.ActEndDate.toString() == '1900-01-01T00:00:00'
						? false
						: true
					: true,
			onClick: (event, rowData) => {
				handleClickOpen(rowData, 'เสร็จ');
			},
		}),
		(rowData) => ({
			icon: () => <CheckCircleOutlineRoundedIcon style={{ color: green[700] }}></CheckCircleOutlineRoundedIcon>,
			cellStyle: { minWidth: 50, alignCenter: true },
			tooltip: 'จบงานแล้ว',
			disabled: true,
			align: 'center',
			hidden:
				rowData.ActStartDate.toString() != '1900-01-01T00:00:00' &&
				rowData.ActEndDate.toString() != '1900-01-01T00:00:00'
					? false
					: true,
		}),
	];

	const columns = [
		{
			title: 'Project',
			field: 'ProjId',
			cellStyle: { minWidth: 300 },
			render: (item) => (
				<div>
					<Typography className={classes.txt}>
						<Box fontWeight="fontWeightRegular">{item.ProjId}</Box>
						<Box fontWeight="fontWeightLight" fontSize={14}>
							{item.ProjName}
						</Box>
					</Typography>
				</div>
			),
		},

		{
			title: 'User',
			field: 'UserId',
			cellStyle: { minWidth: 150 },
			render: (item) => (
				<div>
					<Typography className={classes.txt}>
						<Box fontWeight="fontWeightRegular">{item.UserId}</Box>
						<Box fontWeight="fontWeightLight" field="UserName" fontSize={14}>
							{item.UserName}
						</Box>
					</Typography>
				</div>
			),
		},

		{
			title: 'Type Design',
			field: 'TypeDesign',
			cellStyle: { minWidth: 150 },
			render: (item) => (
				<Typography className={classes.txt}>
					<Box fontWeight="fontWeightLight">{item.TypeDesign}</Box>
				</Typography>
			),
		},
		{
			title: 'Side Design',
			field: 'SideDesign',
			cellStyle: { minWidth: 110 },
			render: (item) => (
				<Typography className={classes.txt}>
					<Box fontWeight="fontWeightLight">{item.SideDesign}</Box>
				</Typography>
			),
		},
		{
			title: 'Plan date',
			field: 'PlanStartDate',
			cellStyle: { minWidth: 220 },
			render: (item) => (
				<Typography className={classes.txt}>
					<Box fontWeight="fontWeightLight">
						{item.PlanStartDate.toString() != '1900-01-01T00:00:00' ? (
							formatDate(item.PlanStartDate)
						) : (
							// <Moment globalLocale="th" format="DD/MM/YYYY">
							// 	{item.PlanStartDate}
							// </Moment>
							<Box fontWeight="fontWeightLight"> </Box>
						)}
						{' - '}
						{item.PlanEndDate.toString() != '1900-01-01T00:00:00' ? (
							formatDate(item.PlanEndDate)
						) : (
							// <Moment format="DD/MM/YYYY">{item.PlanEndDate}</Moment>
							<Box fontWeight="fontWeightLight"></Box>
						)}
					</Box>
				</Typography>
			),
		},

		{
			title: 'Operation',
			field: 'OperName',
			//align: 'center',
			cellStyle: { minWidth: 300 },
			render: (item) => (
				<Typography className={classes.txt} variant="body1">
					<Box fontWeight="fontWeightLight">
						{item.OperNo} : {item.OperName}
					</Box>
				</Typography>
			),
		},
		{
			title: 'Remark',
			field: 'Remark',
			cellStyle: { minWidth: 200 },
			render: (item) => (
				<Typography className={classes.txt} variant="body1">
					<Box fontWeight="fontWeightLight">{item.Remark}</Box>
				</Typography>
			),
		},
		{
			// สำหรับ search
			field: 'ProjName',
			render: () => <div></div>,
		},
		{
			// สำหรับ search
			field: 'UserName',
			//cellStyle: { padding: 0 },
			//hidden:true,
			render: () => <div></div>,
		},
		{
			// สำหรับ search
			field: 'OperNo',
			render: () => <div></div>,
		},
	];

	return (
		<div className={classes.root}>
			<MaterialTable
				title="MRP Track"
				size="small"
				icons={tableIcons}
				columns={columns}
				data={data.LoadData}
				actions={actions}
				isLoading={data.showLoading}
				options={{
					search: true,
					//grouping: true
				}}
			/>
			{showDialog()}
		</div>
	);
}
export default Line;
