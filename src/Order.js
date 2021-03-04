import React from 'react'
import StarRateIcon from '@material-ui/icons/StarRate';
import moment from "moment"; 
import './Order.css'
function Order({ order }) {
    return (
        <div className="order">
            <div className="order__info">
                <h2>Order</h2>

                <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
                                
                                    <p className="order__id">
                                    <small>{order.id}</small>
                                    </p>
            </div>
                    

                    {
  order.data.basket.map((value,key)=>{
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
     
  </div>
    )
  })
}

        </div>
    )
}

export default Order
