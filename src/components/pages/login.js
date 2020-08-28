import React, { useState, useEffect } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";
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
} from "@material-ui/core";
import * as loginActions from "./../../actions/login.action";

const schema = {
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
    length: {
      maximum: 64,
    },
  },
  password: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 128,
    },
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    display: "flex",
    marginTop: theme.spacing(20),
    marginLeft: theme.spacing(50),
    marginRight: theme.spacing(50),
  },
  grid: {
    backgroundColor: "#EAEDED",
    height: "100%",
  },

  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white,
  },

  contentContainer: {},
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  contentHeader: {
    display: "flex",
    alignItems: "center",
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },

  contentBody: {
    //flexGrow: 1,
    //display: "flex",
    alignItems: "center",
  },
  form: {
    margin: theme.spacing(5, 10),
    justifyContent: "center",
  },
  title: {
    marginTop: theme.spacing(3),
  },
  socialButtons: {
    marginTop: theme.spacing(3),
  },
  socialIcon: {
    marginRight: theme.spacing(1),
  },
  sugestion: {
    marginTop: theme.spacing(2),
  },
  margin: {
    margin: theme.spacing(2, 0),
  },
  textField: {
    backgroundColor: "#FBFCFC",
    margin: theme.spacing(2, 0),
  },
  formField: {
    backgroundColor: "#FBFCFC",
    margin: theme.spacing(2, 0),
  },
  signInButton: {
    margin: theme.spacing(2, 0),
  },
}));

const SignIn = (props) => {
  const { history } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const loginReducer = useSelector(({ loginReducer }) => loginReducer);

  const [values, setValues] = React.useState({
    username: "admin",
    password: "admin123",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

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
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <Card className={classes.grid} container>
        <Grid className={classes.content} item lg={12} xs={12}>
          <div className={classes.contentBody}>
            <form
              className={classes.form}
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(loginActions.login({ ...values, ...props }));
              }}
            >
              <Typography className={classes.title} variant="h4">
                ลงชื่อเข้าใช้งาน
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Sign in with social media
              </Typography>
              <Grid
                className={classes.socialButtons}
                container
                spacing={2}
              ></Grid>
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
              <FormControl className={classes.formField} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  รหัสผ่าน
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
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
                        {values.showPassword ? (
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

              {loginReducer.error && (
                <Alert severity="error">{loginReducer.result}</Alert>
              )}

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
