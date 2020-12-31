import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  premiumBtn: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    marginTop: "5%",
    marginLeft: "6%",
    width: "40%",
    fontSize: "15px",
    letterSpacing: "0.15em",
    padding: '15px 15px 15px 15px',
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    "&:hover": {
      background: "linear-gradient(45deg, #FE3762 30%, #FF742B 90%)",
    },
  },
}));

function Premium() {
    const classes = useStyles();

    return (
      <div>
        <h1 style={{fontWeight: '750', fontSize: '40px', textAlign: 'center', marginTop: '10%'}}>Get Premium Family</h1>
        <h6 style={{fontWeight: '600', fontSize: '25px',textAlign: 'center'}}>
          Family members living under one roof can enjoy up to 6 Premium
          accounts.
        </h6>
        <h5 style={{fontWeight: '650', fontSize: '30px',textAlign: 'center'}}>Try 1 month free, only ₹179/month after.</h5>
        <center>
          <Button className={classes.premiumBtn}>GET PREMIUM FAMILY</Button>
        </center>
      </div>
    );
  
}
export default Premium;
