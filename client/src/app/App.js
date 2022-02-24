import './App.css';
import { Switch } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';
import Home from './home/Home';
import SignUp from './auth/SignUp';
import Profile from './profile/Profile';
import { useContext, useEffect, useState} from 'react';
import { AuthContext, AuthContextProvider } from '../context/AuthContext';


//import firebase from "./firebase";
import Navbar from '../components/Navbar';
import Explore from './explore/Explore';
import { Web3Context, Web3ContextProvider } from '../context/Web3Context';
//import SignIn from './components/SignIn';
import Mint from './nft-business/mint/Mint';
import { IPFSContextProvider } from '../context/IPFSContext';
import { allAccessoryArrays } from '../core';


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
            
            {(addr && addr !== "undefined" && addr !== "0x2EcFfb31E2EA4a2b59cb131820c2EC29C3Bcb65C")? 
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
            {/* <IPFSContextProvider> */}
              {(localStorage.getItem("address") || true)?
              <>
              <Navbar />
              <Explore />
              </>:
              <Redirect to = "/sign-up?redirect=/explore" />}
            {/* </IPFSContextProvider> */}
          </Route>
          
          <Route path = "/mint">
            {
            
             <Mint />
           }
          </Route>
        </Switch>
     //</div> </Web3ContextProvider>)}
      )}
    </div>
  );
}

export default App;
