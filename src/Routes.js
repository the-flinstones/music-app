import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./components/Home";
import Genres from "./components/Genres";
import UserProfile from "./components/UserProfile";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar";
import Albums from "./components/Albums";
import Artists from "./components/Artists";
import Drawer from "./components/Drawer";
import Cookies from "js-cookie";

function Routes() {
  const auth = Cookies.get("auth");
  //const [auth, setAuth] = useState(false)
  return (
    <Router>
      {/* <Drawer /> */}
      <Navbar />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/genres" component={Genres} />
        <Route path="/albums" component={Albums} />
        <Route path="/artists" component={Artists} />
        <PrivateRoute
          path="/user-profile"
          component={UserProfile}
          auth={auth}
        />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

//Private Route
const PrivateRoute = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? <Component {...props} /> : <Redirect to={{ pathname: "/" }} />
      }
    />
  );
};

export default Routes;
