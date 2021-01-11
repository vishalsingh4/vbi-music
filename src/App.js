import React, { useState } from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { getPersistor } from '@rematch/persist';
import { PersistGate } from 'redux-persist/lib/integration/react';

import store from './store';

// import LoadingSpinner from './atoms/LoadingSpinner';

import HeaderComponent from './organisms/HeaderComponent';
import FooterComponent from './organisms/FooterComponent';

import SongListComponent from './molecules/SongListComponent';
import PlayListComponent from './molecules/PlayListComponent';
import PlayListDetailComponent from './molecules/PlayListDetailComponent';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={getPersistor()}>
        <Router>
          {/* <LoadingSpinner /> */}
          <HeaderComponent />
          <div className="main-component">
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/songs" />} />
              {/* <Route path="/" component={SongListComponent} /> */}
              <Route path="/songs" component={SongListComponent} />
              <Route exact path="/playlists" component={PlayListComponent} />
              <Route
                path="/playlists/:id"
                component={PlayListDetailComponent}
              />
            </Switch>
          </div>
          <FooterComponent />
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
