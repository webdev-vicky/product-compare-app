import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from "./views/Home";
import store from './store';

function App() {
  return (
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>
  );
}

export default App;
