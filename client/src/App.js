import './App.css';
import { Switch } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';
import Home from './routes/Home';
import SignUp from './routes/SignUp';

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
      </Switch>
    </div>
  );
}

export default App;
