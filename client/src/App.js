import './App.css';
import { Switch } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';
import Home from './routes/Home';
import SignUp from './routes/SignUp';
import Profile from './routes/Profile.jsx';

import firebase from "./firebase";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path = "/">
          <Home /> 
        </Route>
        <Route path = "/sign-up">
          <SignUp />
        </Route>
        {window.localStorage.getItem("address") && (
        <Route path = "/profile">
          <Profile />
        </Route>)}
      </Switch>
    </div>
  );
}

export default App;
