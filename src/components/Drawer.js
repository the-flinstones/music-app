import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import QueueMusicOutlinedIcon from "@material-ui/icons/QueueMusicOutlined";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#0a192f",
    color: "#ccd6f6",
    marginTop: 60,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}));

export default function PermanentDrawerLeft() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar
        style={{ backgroundColor: "#0a192f" }}
        position="fixed"
        className={classes.appBar}
      ></AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <List>
          {["Liked", "My Playlist"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon style={{ color: "#ccd6f6" }}>
                {index % 2 === 0 ? (
                  <FavoriteBorderIcon />
                ) : (
                  <QueueMusicOutlinedIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider style={{ color: "#ccd6f6" }} />
        <List>
          {["Senorita", "Perfect", "Bang Bang"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon style={{ color: "#ccd6f6" }}>
                0{index + 1}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
