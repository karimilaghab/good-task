import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import NoMatch from "./components/NoMatch";
import Cart from "./components/Cart";

import "./App.css";
import { Provider } from "react-redux";
import store from "./components/store";

const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route component={Home} path="/" exact={true} />
            <Route component={Cart} path="/cart" />
            <Route component={NoMatch} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
