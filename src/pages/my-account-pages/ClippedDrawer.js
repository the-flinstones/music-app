import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HeadsetIcon from "@material-ui/icons/Headset";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Component } from "react";

const drawerWidth = 240;

const useStyles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: "280px",
    position: "absolute",
    top: "10%",
    background: "linear-gradient(45deg, #0a192f 30%, #172a45 90%)",
    webkitBackgroundClip: "text",
    webkitTextFillColor: "transparent",
    //backgroundColor: '#060C12',
    color: "#ccd6f6",
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  iconStyle: {
    color: "#ccd6f6",
  },
  topIcon: {
    color: "#303C55",
    marginLeft: "30%",
    fontSize: "90px",
  },
  link: {
    textDecoration: "none",
    color: "#ccd6f6",
  },
  premiumBtn: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    textDecoration: "none",
    borderRadius: 3,
    color: "white",
    fontSize: "15px",
    marginLeft: "12%",
    marginTop: "5%",
    padding: "10px 30px 10px 30px",
    letterSpacing: "0.15em",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    "&:hover": {
      background: "linear-gradient(45deg, #FE3762 30%, #FF742B 90%)",
    },
  },
});

class ClippedDrawer extends Component {
  // const classes = useStyles();
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <AccountCircleIcon className={classes.topIcon} />
            <Divider style={{ backgroundColor: "#303C55", marginTop: "5%" }} />
            <List>
              <Link to="/account-details" className={classes.link}>
                <ListItem button>
                  <ListItemIcon>
                    <AccountBoxIcon className={classes.iconStyle} />
                  </ListItemIcon>
                  <ListItemText primary={"Account Details"} />
                </ListItem>
              </Link>
              <Link to="/liked" className={classes.link}>
                <ListItem button>
                  <ListItemIcon>
                    <FavoriteIcon className={classes.iconStyle} />
                  </ListItemIcon>
                  <ListItemText primary={"Liked"} />
                </ListItem>
              </Link>
              <Link to="/recently-played" className={classes.link}>
                <ListItem button>
                  <ListItemIcon>
                    <PlaylistAddCheckIcon className={classes.iconStyle} />
                  </ListItemIcon>
                  <ListItemText primary={"Recently Played"} />
                </ListItem>
              </Link>
              <Link to="/playlists" className={classes.link}>
                <ListItem button>
                  <ListItemIcon>
                    <HeadsetIcon className={classes.iconStyle} />
                  </ListItemIcon>
                  <ListItemText primary={"My Playlists"} />
                </ListItem>
              </Link>
              <Divider
                style={{
                  backgroundColor: "#303C55",
                  marginTop: "7%",
                  marginBottom: "7%",
                }}
              />
              <Link to="/premium" className={classes.link}>
                <ListItem button>
                  <Button className={classes.premiumBtn}>PREMIUM </Button>
                </ListItem>
              </Link>
            </List>
          </div>
        </Drawer>
      </div>
    );
  }
}
export default withStyles(useStyles)(ClippedDrawer);
