import React, { Component } from "react";
import MyAccountSerivces from "../../service/MyAccountSerivces";
import ClippedDrawer from "./ClippedDrawer";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";
import {
  TextField,
  InputAdornment,
  Button,
  Paper,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";
import { blue, pink } from "@material-ui/core/colors";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import Cookies from "js-cookie";


const theme = createMuiTheme({
  overrides: {
    MuiOutlinedInput: {
      root: {
        position: "relative",
        "& $notchedOutline": {
          borderColor: "rgba(0, 0, 0, 0.23)",
          borderColor: "#a8b2d1",
        },
        "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
          borderColor: "#FE6B8B",
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            borderColor: "rgba(0, 0, 0, 0.23)",
          },
        },
        "&$focused $notchedOutline": {
          borderColor: "#FE6B8B",
          borderWidth: 1,
        },
      },
    },
    MuiFormLabel: {
      root: {
        color: "#a8b2d1",
        "&:hover": {
          color: "#FE6B8B",
        },
        "&$focused": {
          color: "#FE6B8B",
        },
      },
    },
  },
});

const useStyles = (theme) => ({
  root: {
    margin: "7% 5% 5% 26%",
  },
  palette: {
    secondary: {
      main: pink[500],
    },
  },
  title: {
    fontSize: "45px",
    fontWeight: 700,
  },
  subtitle: {
    fontSize: "24px",
    fontWeight: 700,
  },
  table: {
    textIndent: "initial",
    borderSpacing: "2px",
    borderColor: "white",
    fontSize: "18px",
    lineHeight: "1.5",
    color: "#ccd6f6",
  },
  row: {
    textAlign: "left",
    width: "100%",
    maxWidth: "100%",
  },
  column: {
    borderBottom: "1px solid #303C55",
    padding: "1em 1em 1em 0px",
    whiteSpace: "nowrap",
    textAlign: "left",
    width: "75%",
  },
  outlinedBtn: {
    textDecoration: "none",
    borderRadius: 3,
    color: "#FE6B8B",
    fontSize: "15px",
    padding: "8px 20px 8px 20px",
    letterSpacing: "0.15em",
    border: "2px solid #FE6B8B",
    textDecoration: "none",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    "&:hover": {
      backgroundColor: "rgba(254, 107, 139, 0.7)",
      color: "white",
      border: "2px solid rgba(254, 107, 139, 0.7)",
    },
    margin: "3% 0% 3% 0%",
  },
  containedBtn: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    textDecoration: "none",
    borderRadius: 3,
    border: "none",
    color: "white",
    fontSize: "15px",
    padding: "10px 18px 10px 18px",
    letterSpacing: "0.15em",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    "&:hover": {
      background: "linear-gradient(45deg, #FE3762 30%, #FF742B 90%)",
    },
    margin: "3% 0% 3% 3%",
  },
  headBox: {
    height: "230px",
    display: "flex",
    height: "144px",
    webkitBoxAlign: "center",
    alignItems: "center",
    border: "none",
    background: "linear-gradient(-108deg, #FE6B8B 0%, #FF8E53 100%)",
  },
  planHeader: {
    fontSize: "45px",
    fontWeight: "700",
    color: "white",
    paddingLeft: "3%",
  },
  subHeadBox: {
    borderBottom: "1px solid #303C55",
    borderLeft: "1px solid #303C55",
    borderRight: "1px solid #303C55",
    marginBottom: "5%",
    textAlign: "left",
  },
  card: {
    textAlign: "left",
    padding: "3% 3% 3% 0%",
    display: "-webkit-box",
    display: "-ms-flexbox",
    display: "flex",
    webkitBoxOrient: "vertical",
    webkitBoxDirection: "normal",
    msFlexDirection: "column",
    flexDirection: "column",
    color: "#ccd6f6",
    borderBottom: "1px solid #303C55",
    margin: "0px 20px 20px 20px",
  },
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    flexBasis: 950,
    width: "92%",
    color: "secondary",
    margin: "3%",
    borderColor: "#fff",
  },
  paper: {
    justifyContent: "center",
    padding: "2%",
    margin: "10% 5% 2%",
    backgroundColor: "#172a45",
    color: "#ffffff",
  },
  input: {
    color: "white",
  },
});

class AccountDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      userId: "d677b5a9-4f73-4ed5-b6a4-de2400303985",
      dob: "",
      country: "",
      type: "",
      open_edit: false,
      open_delete: false
    };
  }
  componentDidMount() {
    MyAccountSerivces.getAccountDetails().then((response) => {
      this.setState({
        users: response.data,
      });
    });

    MyAccountSerivces.getAccountDetailsById(this.state.userId).then(
      (response) => {
        this.setState({
          username: response.data.username,
          email: response.data.useremail,
          dob: response.data.dob,
          country: response.data.country,
          type: response.data.type,
        });
      }
    );
  }

  handleEdit = () => {
    var user = {
      username: this.state.username,
      useremail: this.state.email,
      dob: this.state.dob,
      country: this.state.country,
      type: this.state.type,
    };
    console.log(user);

    MyAccountSerivces.editAccountDetailsById(this.state.userId, user).then(
      (response) => {
        this.setState({
          open_edit: false,
        });
        console.log(response);
      }
    );
  };

  handleDelete = () => {

    MyAccountSerivces.deleteAccountDetails(this.state.userId).then(
      (response) => {
        this.setState({ open_delete: false });
        console.log(response);
      }
    );
              Cookies.remove("auth");
Cookies.remove("name");
Cookies.remove("role");
window.location.reload();
  };

  handleClose = () => {
    this.setState({ open_edit: false });
  };

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };
  render() {
    const { classes } = this.props;
    const formattedDate = moment(this.state.dob).format("LL");
    const dateOfBirth = moment(this.state.dob).format("YYYY-MM-DD");
    const subType = "";
    if (this.state.type === "PREMIUM_USER") {
      this.subType = "Premium Plan";
    } else {
      this.subType = "Free";
    }
    return (
      <div className={classes.root}>
        <div>
          <h1
            className={classes.title}
            style={{
              background: "linear-gradient(45deg, #FE3762 30%, #FF742B 90%)",
              webkitBackgroundClip: "text",
              webkitTextFillColor: "transparent",
            }}
          >
            Account Details
          </h1>
          <h3
            className={classes.subtitle}
            style={{
              background: "linear-gradient(45deg, #FE3762 30%, #FF742B 90%)",
              webkitBackgroundClip: "text",
              webkitTextFillColor: "transparent",
            }}
          >
            Profile
          </h3>

          <table className={classes.table}>
            <tbody>
              <tr className={classes.row}>
                <td className={classes.column} style={{ color: "#8892b0" }}>
                  Username
                </td>
                <td className={classes.column}>{this.state.username}</td>
              </tr>
              <tr className={classes.row}>
                <td className={classes.column} style={{ color: "#8892b0" }}>
                  Email
                </td>
                <td className={classes.column}>{this.state.email}</td>
              </tr>
              <tr className={classes.row}>
                <td className={classes.column} style={{ color: "#8892b0" }}>
                  Date of birth
                </td>
                <td className={classes.column}>{formattedDate}</td>
              </tr>
              <tr className={classes.row}>
                <td className={classes.column} style={{ color: "#8892b0" }}>
                  Country or region
                </td>
                <td className={classes.column}>{this.state.country}</td>
              </tr>
            </tbody>
          </table>
          <span>
          <Button
            className={classes.outlinedBtn}
            onClick={() =>
              this.setState({
                open_edit: true,
              })
            }
          >
            Edit
          </Button>
          <Button
            className={classes.outlinedBtn}
            style={{marginLeft: '45%'}}
            onClick={() =>
              this.setState({
                open_delete: true,
              })
            }
          >
            Delete
          </Button>
          </span>
          <div>
            <h3
              className={classes.subtitle}
              style={{
                background: "linear-gradient(45deg, #FE3762 30%, #FF742B 90%)",
                webkitBackgroundClip: "text",
                webkitTextFillColor: "transparent",
              }}
            >
              Your plan
            </h3>
            <div className={classes.headBox}>
              <div className={classes.planHeader}>
                <span>{this.state.type.replace(/_/g, " ")}</span>
              </div>
            </div>
            <div className={classes.subHeadBox}>
              <div className={classes.card}>
                Play any song, anytime, anywhere, with ads.
              </div>
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  paddingLeft: "3%",
                  background:
                    "linear-gradient(45deg, #FE3762 30%, #FF742B 90%)",
                  webkitBackgroundClip: "text",
                  webkitTextFillColor: "transparent",
                }}
              >
                {this.subType}
              </h3>
            </div>
          </div>
        </div>
        <div>
          <Dialog
            open={this.state.open_edit}
            // TransitionComponent={Transition}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogContent
              style={{ backgroundColor: "#0a192f", color: "white" }}
            >
              <Paper className={classes.paper}>
                <center>
                  <h3
                    className={classes.title}
                    style={{
                      background:
                        "linear-gradient(45deg, #FE3762 30%, #FF742B 90%)",
                      webkitBackgroundClip: "text",
                      webkitTextFillColor: "transparent",
                    }}
                  >
                    Account Details
                  </h3>
                </center>
                <MuiThemeProvider theme={theme}>
                  <TextField
                    id="outlined-simple-start-adornment"
                    className={(classes.margin, classes.textField)}
                    variant="outlined"
                    label="Username"
                    value={this.state.username}
                    onChange={this.handleChange("username")}
                    InputProps={{
                      className: classes.input,
                    }}
                  />

                  <TextField
                    id="outlined-simple-start-adornment"
                    className={(classes.margin, classes.textField)}
                    variant="outlined"
                    label="Email"
                    value={this.state.email}
                    onChange={this.handleChange("email")}
                    InputProps={{
                      className: classes.input,
                    }}
                  />

                  <br></br>
                  <TextField
                    id="outlined-simple-start-adornment"
                    variant="outlined"
                    className={(classes.margin, classes.textField)}
                    label="Date of birth"
                    value={dateOfBirth}
                    type="date"
                    color="white"
                    format={"DD/MM/YYYY"}
                    onChange={this.handleChange("dob")}
                    InputProps={{
                      shrink: true,
                      className: classes.input,
                    }}
                  />
                  <TextField
                    className={(classes.margin, classes.textField)}
                    variant="outlined"
                    label="Country or region"
                    value={this.state.country}
                    onChange={this.handleChange("country")}
                    InputProps={{
                      className: classes.input,
                    }}
                  />
                </MuiThemeProvider>
                <br></br>
                <br></br>
              </Paper>
            </DialogContent>
            <DialogActions
              style={{ backgroundColor: "#0a192f", float: "left" }}
            >
              <Button
                variant="contained"
                color="primary"
                style={{ width: "150px" }}
                className={classes.containedBtn}
                onClick={this.handleEdit}
              >
                Update
              </Button>
              <Button
                onClick={this.handleClose}
                className={classes.outlinedBtn}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={this.state.open_delete}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            
            <DialogContent
              style={{ backgroundColor: "#0a192f", color: "white" }}
            >
              <DialogTitle className={classes.title}
                    style={{
                      background:
                        "linear-gradient(45deg, #FE3762 30%, #FF742B 90%)",
                      webkitBackgroundClip: "text",
                      webkitTextFillColor: "transparent",
                    }}>
                      <h3>Do you want to delete you account?</h3></DialogTitle>
                <center>
                   <div style={{color: '#ccd6f6'}}>Your account will be deleted permanantly. You will not be able to undo this action.
                   </div> 

                </center>
                

            <DialogActions>
              <Button
                onClick={() => {
                    this.handleDelete()
                }}
                className={classes.containedBtn}
              >
                Yes
              </Button>
              <Button
                onClick={() => {
                  this.setState({ open_delete: false });
                }}
                className={classes.outlinedBtn}
              >
                No
              </Button>
            
</DialogActions>
</DialogContent>
</Dialog>
        </div>
        <ClippedDrawer />
      </div>
    );
  }
}
export default withStyles(useStyles)(AccountDetailsPage);
