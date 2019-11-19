import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoginPage from './pages/LoginPage/LoginPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import PrivateRoute from './PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="container mx-auto">
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <PrivateRoute exact path="/dashboard" component={DashboardPage}/>       
          <Route render={() => <h3>Not Found!</h3>} />
        </Switch>
        <ToastContainer
          position="top-right"
          autoClose={false}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;
