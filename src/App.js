  
import React, { useEffect,useContext } from "react";
import './App.css';
import Header from './Header'
import Home from './Home'
import Checkout from './Checkout'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Payment from './Payment'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {ProductContext} from './ProductContext'
import { auth } from "./firebaseconfig";
import Login from './Login'
import Orders from './Orders'
const promis=loadStripe("pk_test_51I4BCXAwGqqor8yU8oQ9YRzf53kgVZJO1dpKQxBhVDVqgZQ7zuan4pKovltDUNK2C7GdE5pTQmyVlowpl73RQBiO00IJ14qYLK");

function App() {
  const [user,SetUser]=useContext(ProductContext).user_amazon
 
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
         SetUser(authUser)
      // console.log(amazon_user)
      } else {
    
        console.log("the user loged out ")
      }
    });
  }, []);
console.log(user)
  return (

       <Router>
         <div  className="app__container">
            <div className="app">
    
      <Switch>
          <Route exact path="/login">
             <Login/>
          </Route>
          <Route exact path="/">
          <Header/>
            <Home/>
          </Route>
          <Route exact path="/orders">
          <Header/>
            <Orders/>
          </Route>
          <Route exact path="/payment">
          <Header/>
          <Elements stripe={promis}>
              <Payment />
            </Elements>
          </Route>
          <Route exact path="/checkout">
          <Header/>
            <Checkout/>
          </Route>
      </Switch>
      </div>
         </div>
     
    </Router>
   
   
  );
}

export default App;
