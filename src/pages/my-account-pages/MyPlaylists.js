import React, { Component } from "react";
import ClippedDrawer from "./ClippedDrawer";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
  Container,
} from "reactstrap";
import { Link } from "react-router-dom";

const useStyles = (theme) => ({
  root: {
    margin: "7% 5% 5% 26%",
  },
  row: {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    float: "left",
  },
  card: {
    cursor: 'pointer',
    border: "2px solid #282828",
    borderRadius: "5px",
    padding: "20px",
    background:
      "linear-gradient(-180deg, rgba(254, 107, 139, 0.7) 0%, rgba(255, 142, 83, 0.7) 100%)",
    color: "white",
    margin: "8px 5px 8px",
    height: "100px",
    width: "100px",
    textAlign: "center",
    "&:hover": {
      background:
        "linear-gradient(-180deg, rgb(254, 107, 139) 0%, rgb(255, 142, 83) 100%)",
      fontSize: "20px",
      height: "112px",
      width: "112px",
    },
  },
});

class MyPlaylists extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <h1
          style={{
            fontSize: "45px",
            fontWeight: 700,
            background: "linear-gradient(45deg, #FE3762 30%, #FF742B 90%)",
            webkitBackgroundClip: "text",
            webkitTextFillColor: "transparent",
          }}
        >
          Library
        </h1>

        <Container>
          <Row className={classes.row}>
            <Col md={3}>
            <Link to="/playlist-songs" style={{textDecoration: 'none'}}>
              <Card className={classes.card}>
                <CardBody>
                  <CardTitle>
                    <h3>Blue & Gold</h3>
                  </CardTitle>
                </CardBody>
              </Card>
              </Link>
            </Col>
            <Col md={3}>
            <Link to="/playlist-songs" style={{textDecoration: 'none'}}>
              <Card className={classes.card}>
                <CardBody>
                  <CardTitle>
                    <h3>Soft Jazz</h3>
                  </CardTitle>
                </CardBody>
              </Card>
              </Link>
            </Col>
            <Col md={3}>
            <Link to="/playlist-songs" style={{textDecoration: 'none'}}>
              <Card className={classes.card}>
                <CardBody>
                  <CardTitle>
                    <h3>Roadtrip</h3>
                  </CardTitle>
                </CardBody>
              </Card>
              </Link>
            </Col>
            <Col md={3}>
            <Link to="/playlist-songs" style={{textDecoration: 'none'}}>
              <Card className={classes.card}>
                <CardBody>
                  <CardTitle>
                    <h3>Workout</h3>
                  </CardTitle>
                </CardBody>
              </Card>
              </Link>
            </Col>
          </Row>
        </Container>

        <ClippedDrawer />
      </div>
    );
  }
}
export default withStyles(useStyles)(MyPlaylists);
