import React, {lazy, Suspense} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css';
import './assets/font_awesome/css/fontawesome-all.min.css';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";

import Header from './components/Header';

const Home = lazy(()=>import('./pages/Home'));
const Auth = lazy(()=>import('./pages/auth/Auth'));


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('auth') === 'true' ? (
        <Component {...props} />
      ) : (
        <Redirect to="/auth" />
      )
    }
  />
);


function App() {
  return (
    <div className="App">
      <Suspense fallback={<div className="loader">Loading...</div>}>
        <Router>
          <Header />         
            <PrivateRoute exact path='/' component={Home} />
            <Route path='/auth' component={Auth} />            
        </Router>       
      </Suspense>
    </div>
  );
}

export default App;
