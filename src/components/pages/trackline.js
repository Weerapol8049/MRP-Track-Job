import React, { useState, useEffect, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import * as orderLineActions from "./../../actions/line.action";
import { Typography, Grid } from "@material-ui/core";
import MaterialTable, { MTableToolbar } from "material-table";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import Box from "@material-ui/core/Box";
import Moment from "react-moment";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Button from "@material-ui/core/Button";
import { Formik, Form, Field } from "formik";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { green } from "@material-ui/core/colors";
import https from "https";
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    //display: "flex",
    //width: '100%',
    marginTop: "5%",
    marginLeft: "5%",
    marginRight: "5%",
    marginBottom: "5%",
  },
  txt: {
    fontFamily: "kanit",
  },
  cell: {
    minWidth: theme.spacing(10),
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

function Line(props) {
  const dispatch = useDispatch();
  const orderLineReducer = useSelector(
    ({ orderLineReducer }) => orderLineReducer
  );
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState(0);
  const tableRef = React.useRef();

  useEffect(() => {
    dispatch(orderLineActions.getOrders());
  }, []);

  const handleClickOpen = (rowData, name) => {
    let today = new Date();
    const currdate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      "T00:00:00";
    setOpen(true);
    if (name == "Receive") {
      setRowData({ ...rowData, ActStartDate: currdate });
    }
    if (name == "End") {
      setRowData({ ...rowData, ActEndDate: currdate });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const showDialog = () => {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Receive job"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {"Are you sure you want to receive this job?"}
          </DialogContentText>
          <Formik
            initialValues={{
              id: 0,
            }}
            onSubmit={(values, { setSubmitting }) => {
              let formData = new FormData();
              formData.append("RecId", rowData.RecId);
              formData.append("ActStartDate", rowData.ActStartDate);
              formData.append("ActEndDate", rowData.ActEndDate);
              formData.append("Delay", rowData.Delay);
              formData.append("DelayPlan", rowData.DelayPlan);
              formData.append("OperName", rowData.OperName);
              formData.append("OperNo", rowData.OperNo);
              formData.append("PlanDays", rowData.PlanDays);
              formData.append("PlanStartDate", rowData.PlanStartDate);
              formData.append("PlanEndDate", rowData.PlanEndDate);
              formData.append("Remark", rowData.Remark);
              formData.append("SideDesign", rowData.SideDesign);
              formData.append("StmTrackId", rowData.StmTrackId);
              formData.append("TypeDesign", rowData.TypeDesign);
              formData.append("UserId", rowData.UserId);
              formData.append("UserName", rowData.UserName);
              dispatch(orderLineActions.updateOrder(formData, props.history));

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
        </DialogContent>
      </Dialog>
    );
  };

  const actions = [
    (rowData) => ({
      icon: () => (
        <Button
          size="small"
          color="primary"
          variant="contained"
          className={classes.margin}
        >
          รับ
        </Button>
      ),
      cellStyle: { minWidth: 50 },
      tooltip: "รับงาน",
      hidden:
        rowData.ActStartDate.toString() == "1900-01-01T00:00:00" ? false : true,
      onClick: (event, rowData) => {
        handleClickOpen(rowData, "Receive");
      },
    }),
    (rowData) => ({
      icon: () => (
        <Button
          size="small"
          color="primary"
          variant="outlined"
          className={classes.margin}
        >
          เสร็จ
        </Button>
      ),
      cellStyle: { minWidth: 50 },
      tooltip: "จบงาน",
      hidden:
        rowData.ActStartDate.toString() != "1900-01-01T00:00:00"
          ? rowData.ActEndDate.toString() == "1900-01-01T00:00:00"
            ? false
            : true
          : true,
      onClick: (event, rowData) => {
        handleClickOpen(rowData, "End");
      },
    }),
    (rowData) => ({
      icon: () => (
        <CheckCircleOutlineRoundedIcon
          style={{ color: green[700] }}
        ></CheckCircleOutlineRoundedIcon>
      ),
      cellStyle: { minWidth: 50, alignCenter: true },
      tooltip: "จบงานแล้ว",
      disabled: true,
      align: "center",
      hidden:
        rowData.ActStartDate.toString() != "1900-01-01T00:00:00" &&
        rowData.ActEndDate.toString() != "1900-01-01T00:00:00"
          ? false
          : true,
    }),
  ];

  const columns = [
    {
      title: "User",
      field: "UserId",
      cellStyle: { minWidth: 150 },
      render: (item) => (
        <div>
          <Typography className={classes.txt}>
            <Box fontWeight="fontWeightRegular">{item.UserId}</Box>
            <Box fontWeight="fontWeightLight" fontSize={16}>
              {item.UserName}
            </Box>
          </Typography>
        </div>
      ),
    },
    {
      title: "Type Design",
      field: "TypeDesign",
      cellStyle: { minWidth: 110 },
      render: (item) => (
        <Typography className={classes.txt}>
          <Box fontWeight="fontWeightLight">{item.TypeDesign}</Box>
        </Typography>
      ),
    },
    {
      title: "Side Design",
      field: "SideDesign",
      cellStyle: { minWidth: 110 },
      render: (item) => (
        <Typography className={classes.txt}>
          <Box fontWeight="fontWeightLight">{item.SideDesign}</Box>
        </Typography>
      ),
    },
    {
      title: "Plan date",
      field: "PlanStartDate",
      cellStyle: { minWidth: 220 },
      render: (item) => (
        <Typography className={classes.txt}>
          {item.PlanStartDate.toString() != "1900-01-01T00:00:00" ? (
            <Box fontWeight="fontWeightLight">
              {" "}
              <Moment globalLocale="th" format="DD/MM/YYYY">
                {item.PlanStartDate}
              </Moment>{" "}
              - <Moment format="DD/MM/YYYY">{item.PlanEndDate}</Moment>
            </Box>
          ) : (
            <Box fontWeight="fontWeightLight"> </Box>
          )}

          {/* {item.PlanEndDate.toString() != '1900-01-01T00:00:00' ? (
						<Box fontWeight="fontWeightLight">
							<Moment format="DD/MM/YYYY">{item.PlanEndDate}</Moment>
						</Box>
					) : (
						<Box fontWeight="fontWeightLight">End : -</Box>
					)} */}
        </Typography>
      ),
    },
    {
      title: "Operation",
      field: "OperName",
      //align: 'center',
      cellStyle: { minWidth: 100 },
      render: (item) => (
        <Typography className={classes.txt} variant="body1">
          <Box fontWeight="fontWeightLight">
            {item.OperNo} : {item.OperName}
          </Box>
        </Typography>
      ),
    },
    {
      title: "Remark",
      field: "Remark",
      cellStyle: { minWidth: 200 },
      render: (item) => (
        <Typography className={classes.txt} variant="body1">
          <Box fontWeight="fontWeightLight">{item.Remark}</Box>
        </Typography>
      ),
    },
  ];

  return (
    <div className={classes.root}>
      <MaterialTable
        title="MRP Track"
        size="small"
        icons={tableIcons}
        columns={columns}
        data={orderLineReducer.result ? orderLineReducer.result : []}
        actions={actions}
        
        options={{
          search: true,
          //searchFieldAlignment: 'left'
        }}
        tableRef={tableRef}
      />
      {showDialog()}
    </div>
  );
}
export default Line;
