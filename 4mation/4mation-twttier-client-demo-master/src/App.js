import React from 'react';
import { Route, Switch } from 'react-router';

import './styles/main.scss';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import TwitterCallback from './pages/TwitterCallback';
import SearchTwitter from './pages/SearchTwitter';
import SearchTweets from './pages/SearchTweets';
import Twitter from './pages/Twitter';
import Tweets from './pages/Tweets';
import Error404 from './pages/404';

function App() {
  return (
    <Route>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/twitter_callback" component={TwitterCallback}/>
        <PrivateRoute path="/">
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/search-twitter" component={SearchTwitter}/>
            <Route path="/post-tweet" component={Tweets}/>
            <Route path="/search-tweets" component={SearchTweets}/>
            <Route path="/twitters/:id" component={Twitter}/>
            <Route component={Error404}/>
          </Switch>
        </PrivateRoute>
      </Switch>
    </Route>
  );
}

export default App;
