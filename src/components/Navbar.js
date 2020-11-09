import React from "react";
import { Redirect } from "react-router-dom";
import logo from "../assets/logo.png";
import { GoogleLogin } from "react-google-login";
import Cookies from "js-cookie";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {
  AppBar,
  Tabs,
  Tab,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  Paper,
  InputBase,
  Toolbar,
} from "@material-ui/core";
import { blue, pink } from "@material-ui/core/colors";
import { fade } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";

const useStyles = (theme) => ({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: pink[500],
    },
  },
  roots: {
    flexGrow: 1,
  },
  tab: {
    marginLeft: theme.spacing(3),
    flexGrow: 1,
    color: "#ccd6f6",
  },
  search: {
    position: "relative",
    color: "#ccd6f6",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(6),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ccd6f6",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  margin: {
    margin: theme.spacing.unit,
  },
  input: {
    color: "white",
    opacity: 0.4,
    background: "#8892b0",
  },
  textField: {
    flexBasis: 50,
    color: "white",
  },
  loginBtn: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    width: "10%",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    "&:hover": {
      background: "linear-gradient(45deg, #FE3762 30%, #FF742B 90%)",
    },
  },
  cancelBtn: {
    border: "none",
    color: "#FE6B8B",
    "&:hover": {
      color: "#FE3762",
    },
  },
  hasAccountBtn: {
    border: "none",
    color: "#EAB71A",
    textTransform: "none",
    fontWeight: 400,
  },
  myBtn: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    "&:hover": {
      background: "linear-gradient(45deg, #FE3762 30%, #FF742B 90%)",
    },
    width: "85%",
    fontSize: 18,
    paddingBottom: "2%",
    paddingTop: "2%",
    textTransform: "none",
  },
  googleLoginBtn: {
    width: "85%",
    marginBottom: "5%",
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function display(auth) {
  return {
    display: auth ? "block" : "none",
  };
}

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      isLoggedIn: false,
      openForm: false,
      value: 0,
      hasAccount: true,
      user_name: "",
      user_role: "",
      open: false,
    };
  }

  openLoginForm = (e) => {
    this.setState({
      openForm: true,
    });
  };

  handleClose = () => {
    this.setState({ openForm: false, userName: "", password: "" });
  };

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = () => {
    this.setState({
      isLoggedIn: true,
      openForm: false,
    });
    Cookies.set("auth", true);
    window.location.reload();
  };

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      isSignedIn: false,
    });
    Cookies.remove("auth");
    Cookies.remove("name");
    Cookies.remove("role");
    window.location.reload();
  };

  handleValueChange = (event, value) => {
    this.setState({ value });
  };

  userlogin = (res) => {
    const idToken = res.tokenId;
    this.setState({
      isLoggedIn: true,
      openForm: false,
    });

    var axios = require("axios");

    var config = {
      method: "post",
      url: "http://localhost:8080/music-auth/google-auth",
      headers: {
        Authorization: "Bearer " + idToken,
      },
    };
    axios(config)
      .then((response) => {
        this.setState((state) => ({
          isLoggedIn: true,
          user_name: response.data.name,
          user_role: response.data.role,
        }));
        Cookies.set("name", this.state.user_name);
        Cookies.set("role", this.state.user_role);
        Cookies.set("auth", true);
        window.location.reload();
        console.log(JSON.stringify(response.data));
      })

      .catch(
        function (error) {
          console.log(error);
          this.handleInvalid();
        }.bind(this)
      );
  };

  handleInvalid = () => {
    this.setState({ open: true });
  };

  userSignUp = (res) => {
    const idToken = res.tokenId;
  };

  render() {
    const auth = Cookies.get("auth");
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.roots}>
        <AppBar
          position="fixed"
          style={{ marginTop: 0, backgroundColor: "#0a192f" }}
        >
          <Toolbar>
            <img
              src={logo}
              alt="logo"
              style={{
                width: "4%",
                height: "4%",
                marginTop: 5,
                marginBottom: 5,
              }}
            />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <Tabs
              className={classes.tab}
              value={value}
              onChange={this.handleValueChange}
            >
              <Tab label="Home" />
              <Tab label="Genres" />
              <Tab label="Albums" />
              <Tab label="Artists" />
              <Tab label="My Account" style={display(auth)} />
            </Tabs>
            <Button
              className={this.props.classes.loginBtn}
              style={display(!auth)}
              onClick={() => {
                this.openLoginForm();
                // Cookies.set("auth", true);
                // reloadPage();
              }}
            >
              Login
            </Button>
            <Button
              className={this.props.classes.loginBtn}
              style={display(auth)}
              onClick={() => {
                this.handleLogout();
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        {value === 0 && <Redirect to="/" />}
        {value === 1 && <Redirect to="/genres" />}
        {value === 2 && <Redirect to="/albums" />}
        {value === 3 && <Redirect to="/artists" />}
        {value === 4 && <Redirect to="/user-profile" />}

        {/* Error Message */}
        <Snackbar
          open={this.state.open}
          autoHideDuration={5000}
          onClose={() => this.setState({open: false})}
          style={{ marginTop: "50%", marginRight: "15%" }}
        >
          <Alert severity="error">
            <AlertTitle>Oops! Invalid login credentials.</AlertTitle>
          </Alert>
        </Snackbar>

        {/* Login Form */}
        <Dialog
          open={this.state.openForm}
          TransitionComponent={Transition}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent style={{ backgroundColor: "#0a192f" }}>
            <DialogActions style={{ backgroundColor: "#0a192f" }}>
              <Button
                onClick={() => {
                  this.setState({
                    openForm: false,
                    userName: "",
                    password: "",
                  });
                }}
                variant="outlined"
                className={this.props.classes.cancelBtn}
              >
                <CloseIcon style={{ size: "medium" }} />
              </Button>
            </DialogActions>
            <Paper
              style={{
                width: "450px",
                justifyContent: "center",
                paddingLeft: "2%",
                marginRight: "10%",
                marginTop: "5%",
                backgroundColor: "#0a192f",
                color: "#fff",
              }}
            >
              <ValidatorForm onSubmit={this.handleSubmit} autoComplete="off">
                {this.state.hasAccount ? (
                  <>
                    <center>
                      <div>
                        <GoogleLogin
                          className={classes.googleLoginBtn}
                          clientId="1089431229900-cr0lmg2vonocbcu8mkk9ok9htr153mgc.apps.googleusercontent.com"
                          buttonText="Sign in with Google"
                          onSuccess={this.userlogin}
                          onFailure={this.responseGoogle}
                          isSignedIn={true}
                          cookiePolicy={"single_host_origin"}
                        />
                      </div>
                      <h4>
                        <span>Or</span>
                      </h4>
                      <br />
                      <TextValidator
                        style={{ width: "85%" }}
                        id="outlined-basict"
                        className={(classes.margin, classes.textField)}
                        variant="outlined"
                        label="Email"
                        onChange={this.handleChange("email")}
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        value={this.state.email}
                        color="secondary"
                        InputProps={{
                          className: classes.input,
                        }}
                      />
                      <br />
                      <br />
                      <TextValidator
                        style={{ width: "85%" }}
                        id="outlined-basic"
                        className={(classes.margin, classes.textField)}
                        variant="outlined"
                        label="Password"
                        onChange={this.handleChange("password")}
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        value={this.state.password}
                        color="secondary"
                        InputProps={{
                          className: classes.input,
                        }}
                      />
                      <br />
                      <br />
                      <Button
                        type="submit"
                        className={this.props.classes.myBtn}
                      >
                        Sign In
                      </Button>
                    </center>
                    <p style={{ marginLeft: "37%", fontSize: 14 }}>
                      Don't have an account ?{" "}
                      <span>
                        <Button
                          className={this.props.classes.hasAccountBtn}
                          onClick={() => {
                            this.setState({ hasAccount: false });
                          }}
                        >
                          Sign Up
                        </Button>
                      </span>
                    </p>
                  </>
                ) : (
                  <>
                    <center>
                      <div>
                        <GoogleLogin
                          className={classes.googleLoginBtn}
                          clientId="1089431229900-cr0lmg2vonocbcu8mkk9ok9htr153mgc.apps.googleusercontent.com"
                          buttonText="Sign up with Google"
                          onSuccess={this.userSignUp}
                          onFailure={this.responseGoogle}
                          isSignedIn={true}
                          cookiePolicy={"single_host_origin"}
                        />
                      </div>
                      <h4>
                        <span>Or</span>
                      </h4>
                      <TextValidator
                        style={{ width: "85%" }}
                        id="outlined-basic"
                        className={(classes.margin, classes.textField)}
                        variant="outlined"
                        label="Username"
                        onChange={this.handleChange("username")}
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        value={this.state.username}
                        color="secondary"
                        InputProps={{
                          className: classes.input,
                        }}
                      />
                      <br />
                      <TextValidator
                        style={{ width: "85%" }}
                        id="outlined-basict"
                        className={(classes.margin, classes.textField)}
                        variant="outlined"
                        label="Email"
                        onChange={this.handleChange("email")}
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        value={this.state.email}
                        color="secondary"
                        InputProps={{
                          className: classes.input,
                        }}
                      />
                      <br />
                      <TextValidator
                        style={{ width: "85%" }}
                        id="outlined-basic"
                        className={(classes.margin, classes.textField)}
                        variant="outlined"
                        label="Password"
                        onChange={this.handleChange("password")}
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        value={this.state.password}
                        color="secondary"
                        InputProps={{
                          className: classes.input,
                        }}
                      />
                      <br />
                      <Button
                        type="submit"
                        className={this.props.classes.myBtn}
                      >
                        Sign Up
                      </Button>
                    </center>
                    <p style={{ marginLeft: "45%", fontSize: 14 }}>
                      Have an account ?{" "}
                      <span>
                        <Button
                          className={this.props.classes.hasAccountBtn}
                          onClick={() => {
                            this.setState({ hasAccount: true });
                          }}
                        >
                          Sign In
                        </Button>
                      </span>
                    </p>
                  </>
                )}
              </ValidatorForm>
              <br />
              <br />
            </Paper>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Navbar);
