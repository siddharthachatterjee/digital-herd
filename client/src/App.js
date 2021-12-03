import './App.css';
import { Switch } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';
import Home from './routes/Home';
import SignUp from './routes/SignUp';
import Profile from './routes/Profile';
import { useContext, useEffect, useState} from 'react';
import { AuthContext, AuthContextProvider } from './context/AuthContext';


//import firebase from "./firebase";
import Navbar from './components/Navbar';
import Explore from './routes/Explore';
import { Web3Context, Web3ContextProvider } from './context/Web3Context';
//import SignIn from './components/SignIn';
import Mint from './routes/Mint';
import { IPFSContextProvider } from './context/IPFSContext';

function App() {
 // const user = useContext(AuthContext);
 // const {address} = useContext(Web3Context);
  const addr = localStorage.getItem("address");
  const [load, setLoad] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoad(true)
    }, 100)
  }, [])
  return  (
    <div>
      {!load && <button onClick = {() => setLoad(true)}> Load </button>}
      {load && (
      // <Web3ContextProvider>
        <Switch>

          <Route exact path = "/">
            <Navbar />
            
            {(addr && addr !== "undefined")? 
            <AuthContextProvider>
              {/* <IPFSContextProvider> */}
                <Profile />
              {/* </IPFSContextProvider> */}
            </AuthContextProvider> : 
            <Home />}
          </Route>
          <Route path = "/sign-up">
            <SignUp />
          </Route>
          <Route path = "/explore">
            <IPFSContextProvider>
              {(localStorage.getItem("address") || true)?
              <>
              <Navbar />
              <Explore />
              </>:
              <Redirect to = "/sign-up?redirect=/explore" />}
            </IPFSContextProvider>
          </Route>
          
          <Route path = "/mint">
            {addr &&
            <IPFSContextProvider>
             <Mint />
            </IPFSContextProvider>}
          </Route>
        </Switch>
     //</div> </Web3ContextProvider>)}
      )}
    </div>
  );
}

export default App;
