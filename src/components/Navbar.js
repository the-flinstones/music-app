import React from "react";
import { Redirect,Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { GoogleLogin } from "react-google-login";
import Cookies from "js-cookie";
import MyAccountSerivces from "../service/MyAccountSerivces";
import SongService from "../service/song-service"
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
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
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
    paddingLeft: `calc(1em + ${theme.spacing(3)}px)`,
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
    letterSpacing: '0.15em',
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
    marginBottom: "2%",
  },
  text: {
    letterSpacing: '0.15em',
  }
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
      openSignUpSnack: false,
      openError: false,
      account_details: [],
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
    //Cookies.set("auth", true);
    //window.location.reload();
  };

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      isSignedIn: false,
    });
   SongService.postRecentsByUserId(Cookies.get("userId"),localStorage.getItem("recents"))
   .then((res)=>{
     console.log(res)
   })
    Cookies.remove("auth");
    Cookies.remove("name");
    Cookies.remove("role");
    Cookies.remove("userId");
    Cookies.remove("email") 
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
      url: "http://localhost:8081/music-auth/google-auth",
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
          email:response.data.email
        }));
        Cookies.set("name", this.state.user_name);
        Cookies.set("role", this.state.user_role);
        Cookies.set("auth", true);
        Cookies.set("email", response.data.email)
        // window.location.reload();
        console.log(JSON.stringify(response.data));
      })
      .then(()=>{
        MyAccountSerivces.getAccountDetailsByEmail(Cookies.get("email")).then(
          (response) => {
            Cookies.set("userId", response.data.id);
             window.location.reload();
            this.handelFetchRecents()
          }
        );
      }      
      )
      .catch(
        function (error) {
          console.log(error);
          this.handleInvalid();
        }.bind(this)
      );  
   
  };
  handelFetchRecents = () =>{
    console.log("ggggggggggggggggggggggggggggggggggggggggggggggggggggg")
   SongService.getRecentsByUserId(Cookies.get("userId"))
   .then((recents)=>{
    localStorage.setItem("recents", JSON.stringify(recents.data.recentlyPlayedSongs));
   }
   )

  } 

  handleInvalid = () => {
    this.setState({ open: true });
  };

  handleMySignUp = (res) => {
    const user = {
      useremail: this.state.email,
      username: this.state.username,
      dob: this.state.dob,
      country: this.state.country,
      password: this.state.password,
      type: "BASIC_USER",
    };

    MyAccountSerivces.createNewUser(user).then((response) => {
      console.log(response);
    });
    this.setState({ openForm: false, openSignUpSnack: true, hasAccount: true });
    window.location.reload();
  };

  handleMyLogin = () => {
    const useremail = this.state.email;
    const password = this.state.password;

    MyAccountSerivces.getAccountDetailsByEmail(this.state.email).then(
      (response) => {
        this.setState({
          account_details: response.data,
        });
        if (
          response.data.useremail === useremail &&
          response.data.password === password
        ) {
          console.log("success");
          Cookies.set("name", response.data.username);
          Cookies.set("role", response.data.type);
          Cookies.set("auth", true);
          Cookies.set("email", response.data.useremail);
          window.location.reload();
        } else {
          this.setState({
            openError: true,
            email: "",
            password: "",
          });
        }
        console.log(this.state.account_details);
      }
    );
    //   if(this.state.account_details === useremail && item.password === password) {
    //     console.log("success")
    //     Cookies.set("name", item.username);
    // Cookies.set("role", "BASIC_USER");
    // Cookies.set("auth", true);
    //   }
  }

  render() {
    const auth = Cookies.get("auth");
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.roots}>
        <AppBar
          position="fixed"
          style={{ marginTop: 0, backgroundColor: "#0a192f",     width: '100%',
          height: '10%' }}
        >
          <Toolbar>
            <Link to="/" className="home-link" style={{maxWidth:"100px"}}>
            <img
              src={logo}
              alt="logo"
              style={{
                width: "40%",
                height: "40%",
                marginTop: 5,
                marginBottom: 5,
                animation: "App-logo-spin infinite 10s linear",
              }}
             
            />
            </Link>
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
              <Tab label="Home" className={classes.text}/>
              <Tab label="Genres" className={classes.text}/>
              <Tab label="Albums" className={classes.text}/>
              <Tab label="Artists" className={classes.text}/>
              <Tab label="My Account" className={classes.text} style={display(auth)} />
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
        {value === 1 && <Redirect to="/mood" />}
        {value === 2 && <Redirect to="/albums" />}
        {value === 3 && <Redirect to="/artist" />}
        {value === 4 && <Redirect to="/account-details" />}

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
        
        <Snackbar
          open={this.state.openSignUpSnack}
          autoHideDuration={5000}
          onClose={() => this.setState({ openSignUpSnack: false })}
          style={{ marginTop: "5%", marginRight: "15%" }}
        >
          <Alert severity="success">
            <AlertTitle>
              Account created successfully! Please Sign In.
            </AlertTitle>
          </Alert>
        </Snackbar>

        <Snackbar
          open={this.state.openError}
          autoHideDuration={5000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={() => this.setState({ openError: false })}
          style={{ marginTop: "5%", marginRight: "15%" }}
        >
          <Alert severity="error">
            <AlertTitle>Email/Password Incorrect! Please try again.</AlertTitle>
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
              <div>
                {this.state.hasAccount ? (
                  <ValidatorForm
                    onSubmit={this.handleSubmit}
                    autoComplete="off"
                  >
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
                          type="password"
                          color="secondary"
                          InputProps={{
                            className: classes.input,
                          }}
                        />
                        <br />
                        <Button
                          type="submit"
                          className={this.props.classes.myBtn}
                          onClick={this.handleMyLogin}
                        >
                          Sign In
                        </Button>
                      </center>
                      <p style={{ marginLeft: "45%", fontSize: 14 }}>
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
                  </ValidatorForm>
                ) : (
                  <ValidatorForm>
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
                          autoComplete="false"
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
                          label="Country"
                          onChange={this.handleChange("country")}
                          validators={["required"]}
                          errorMessages={["This field is required"]}
                          value={this.state.country}
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
                          label="Date of Birth (YYYY-MM-DD)"
                          onChange={this.handleChange("dob")}
                          validators={["required"]}
                          errorMessages={["This field is required"]}
                          value={this.state.dob}
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
                          type="password"
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
                          onClick={this.handleMySignUp}
                        >
                          Sign Up
                        </Button>
                      </center>
                      <p style={{ marginLeft: "50%", fontSize: 14 }}>
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
                  </ValidatorForm>
                )}
              </div>
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
