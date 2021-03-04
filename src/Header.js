import React,{useContext} from 'react'
import './Header.css'
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { auth } from "./firebaseconfig";

import {ProductContext} from './ProductContext'
function Header() {
    
    const [product,SetProducts]=useContext(ProductContext).products
    const [user,SetUser]=useContext(ProductContext).user_amazon
    const handelAuth=()=>{
        if(user){
            auth.signOut();
        }
    }

    return (
        <div className="header">
            <Link to="/">
            <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="logo"
          />
            </Link>
          
            <div className="header__search">
            <input className="header__searchInput" type="text" />
            <SearchIcon className="header__searchIcon" />
             </div>
             <div className="nav">
                 <Link className="link" to={user.length===0 && '/login'}>
                  <div onClick={handelAuth}  className="header_option">
                    <span className="line_one">
                    Hello {user.length===0 ? 'Guest' : user.email}
                    </span>
                    <span className="line_two">
                    {user.length===0? 'Sign In' : 'Sign Out'}
                    </span>
                </div>
                 </Link>
                 <Link  className="link" to='/orders'>
          <div className="header_option">
            <span className="line_one">Returns</span>
            <span className="line_two">& Orders</span>
          </div>
        </Link>
        
               
                <Link to="/checkout">
                <div className="header__optionBasket">
                      <ShoppingBasketIcon />

                    <span className="linetwo basketCount">
                        {product.length}
                    </span>
                </div>
                </Link>
                
             </div>
        </div>
    )
}

export default Header
