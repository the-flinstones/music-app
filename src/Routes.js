import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./pages/home/Home";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar";
import Category from "./pages/category-page/Category";
import SongsPage from "./pages/song-page/SongsPage";
import Cookies from "js-cookie";
import FooterContainer from "./components/Footer/containers/footer";
import Premium from "./pages/Premium";
import AccountDetailsPage from "./pages/my-account-pages/AccountDetailsPage";
import LikedSongsPage from "./pages/my-account-pages/LikedSongsPage";
import MyPlaylists from "./pages/my-account-pages/MyPlaylists";
import RecentlyPlayed from "./pages/my-account-pages/RecentlyPlayed";
import SongsInPlaylist from "./pages/my-account-pages/SongsInPlaylist";

function Routes() {
  const auth = Cookies.get("auth");

  return (
    <Router>
      {/* <Drawer /> */}
      <Navbar />

      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute
          path="/account-details"
          component={AccountDetailsPage}
          auth={auth}
        />
        <PrivateRoute path="/liked" component={LikedSongsPage} auth={auth} />
        <PrivateRoute path="/playlists" component={MyPlaylists} auth={auth} />
        <PrivateRoute
          path="/recently-played"
          component={RecentlyPlayed}
          auth={auth}
        />
        <PrivateRoute
          path="/playlist-songs/:playlistId"
          component={SongsInPlaylist}
          auth={auth}
        />
        <PrivateRoute exact path="/premium" component={Premium} auth={auth} />
        <Route exact path="/:category" component={Category} />
        <Route
          exact
          path="/songs/:category/:subcategory"
          component={SongsPage}
        />

        <Route component={NotFound} />
      </Switch>
      {/* <FooterContainer /> */}
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
