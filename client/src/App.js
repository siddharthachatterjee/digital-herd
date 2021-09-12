import './App.css';
import { Switch } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';
import Home from './routes/Home';
import SignUp from './routes/SignUp';
import Profile from './routes/Profile';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';


import firebase from "./firebase";
import Navbar from './components/Navbar';
import Explore from './routes/Explore';

function App() {
  const user = useContext(AuthContext);
  return firebase && (
    <div>
      <Switch>
        <Route exact path = "/">
          <Navbar />
          {localStorage.getItem("address")? <Profile /> : <Home />}
        </Route>
        <Route path = "/sign-up">
          <SignUp />
        </Route>
        <Route path = "/explore">
          <Navbar />
          <Explore />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
