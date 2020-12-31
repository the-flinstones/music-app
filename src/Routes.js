import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Genres from "./components/Genres";
import UserProfile from "./pages/my-account-pages/UserProfile";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar";
import Albums from "./components/Albums";
import Artists from "./pages/artist-pages/Artists"
import Actors from "./pages/actor-page/Actors"
import Category from "./pages/category-page/Category"
import SongsPage from "./pages/song-page/SongsPage"
import Drawer from "./components/Drawer";
import Cookies from "js-cookie";
import FooterContainer from "./components/Footer/containers/footer"
import Premium from "./pages/Premium";
import MyAccountPage from "./pages/my-account-pages/UserProfile";
import AccountDetailsPage from "./pages/my-account-pages/AccountDetailsPage";
import LikedSongsPage from "./pages/my-account-pages/LikedSongsPage";
import MyPlaylists from "./pages/my-account-pages/MyPlaylists";
import RecentlyPlayed from "./pages/my-account-pages/RecentlyPlayed";
import SongsInPlaylist from "./pages/my-account-pages/SongsInPlaylist";

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
      
      <PrivateRoute
          path="/user-profile"
          component={MyAccountPage}
          auth={auth}
        />
        <PrivateRoute path="/account-details" component={AccountDetailsPage} auth={auth} />
        <PrivateRoute path="/liked" component={LikedSongsPage} auth={auth} />
        <PrivateRoute path="/playlists" component={MyPlaylists} auth={auth} />
        <PrivateRoute path="/recently-played" component={RecentlyPlayed} auth={auth} />
        <PrivateRoute path="/playlist-songs" component={SongsInPlaylist} auth={auth} />
        <PrivateRoute exact path="/premium" component={Premium} auth={auth} />
        <Route exact path="/:category" component={Category} />
        <Route exact path="/songs/:category/:subcategory" component={SongsPage} />
        
        
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
