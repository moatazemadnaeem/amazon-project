import React,{useContext,useState,useEffect} from 'react'
import './Payment.css'
import axios from './axios.js'
import { useHistory } from "react-router-dom";
import {ProductContext} from './ProductContext'
import { db } from "./firebaseconfig";
import CurrencyFormat from "react-currency-format";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import StarRateIcon from '@material-ui/icons/StarRate';
function Payment() {
    const [user,SetUser]=useContext(ProductContext).user_amazon
    const [disabled,makeitdisable]=useState(true);
    const stripe = useStripe();
    const elements = useElements();
    const [product,SetProducts]=useContext(ProductContext).products;
    const [clientSecret, setClientSecret] = useState(true);
    const history = useHistory();
    let price=0;
    useEffect(() => {
        
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${price * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [price])
    console.log('THE SECRET IS >>>', clientSecret)
    const handleSubmit = async (event) => {
       
        event.preventDefault();
     
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
         //users collection --> id record --> order collection for multi records that contain id for the order
            db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket: product,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            })
            SetProducts([]);
            makeitdisable(true)
            history.replace('/orders')
        })

    }
   
    const RemoveItem=(key)=>{
        let NewProducts=[];
        product.map((value,index)=>{
          if(index!==key){
            NewProducts.push(value);
          }
        })
        SetProducts(NewProducts);
      }
    return (
        <div className="payment">
            <div className="payment__container">

                <div className="section">
                    <div className="title">
                        <h3>Delivery Addres</h3>
                        
                    </div>

                    <div className="address">

                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>

                    </div>

                </div>

                <div className="section">

                <div className="title">

                <h3>Review items and delivery</h3>

                </div>

                <div className="items">
                {
  product.map((value,key)=>{
    let elm=[]
    function makeStar(x){
        for(let i=0;i<x;i++){
            elm.push(<StarRateIcon/>)
        }
        return elm
    }
    return(
      <div className="product">
      <div className="product_info">
          <p>
          {value.title}
          </p>
          <p>
               $
              <strong>{value.price}</strong>
          </p>
         <div  className="star">
              {
                   makeStar(value.star).map((value)=>{return value})
              }
         </div>
         
        
         
      </div>
      <img className="home_image" src={value.image} alt=""/>
      <button  onClick={()=>{RemoveItem(key)}} className="btn">Remove from the basket</button>
  </div>
    )
  })
}
                </div>

                </div>

                <div className="section">
                <div className="title">
                    <h3>Payment Method</h3>
                </div>
                <div className="details">
                {
                  product.forEach(element => {
                    price=price+element.price
                  })
               }  
                <form onSubmit={handleSubmit}>
                                <CardElement onChange={(e)=>{e.empty?makeitdisable(true):makeitdisable(false)}} />
                                <div className='payment__priceContainer'>
                                    <CurrencyFormat
                                        renderText={(value) => (
                                            <h3>Order Total: {value}</h3>
                                        )}
                                        decimalScale={2}
                                        value={price}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"$"}
                                    />
                                    </div>
                                    <button className="payment__btn" disabled={disabled}>
                     Buy now
                 </button>
                 </form>
                
                </div>
                </div>

            </div>
        </div>
    )
}

export default Payment
