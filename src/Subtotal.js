import React,{useContext} from 'react'
import './Subtotal.css'
import CurrencyFormat from "react-currency-format";
import {ProductContext} from './ProductContext'
import {useHistory} from 'react-router-dom'
function Subtotal() {
  const [product,SetProducts]=useContext(ProductContext).products
  const history =useHistory();
  console.log(product)
  let price=0;
    return (
     
        <div className="subtotal">
           {
           product.forEach(element => {
            price=price+element.price
           })
           }  
             <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              {/* Part of the homework */}
              Subtotal ({product.length} items):<strong> {value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={price} // Part of the homework
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button onClick={()=>{history.push('/payment')}}>Proceed to Checkout</button>
     
     
        </div>
    )
}

export default Subtotal
