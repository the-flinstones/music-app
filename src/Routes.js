import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Genres from "./components/Genres";
import UserProfile from "./components/UserProfile";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar";
import Albums from "./components/Albums";
import Artists from "./pages/artist-pages/Artists"
import Actors from "./pages/actor-page/Actors"
import Category from "./pages/category-page/Category"
import SongsPage from "./pages/song-page/SongsPage"
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
        {/* <Route path="/mood" component={Genres} />
        <Route path="/albums" component={Albums} />
        <Route path="/artist" component={Artists} />
        <Route path="/top-actors" component={Actors} /> */}
      
        <Route exact path="/:category" component={Category} />
        <Route exact path="/songs/:category/:subcategory" component={SongsPage} />
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
