import React,{useContext} from 'react'
import './Checkout.css'
import Subtotal from './Subtotal'
import {ProductContext} from './ProductContext'
import StarRateIcon from '@material-ui/icons/StarRate';
function Checkout() {
  const [product,SetProducts]=useContext(ProductContext).products
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
      <div className="checkout__content">
<div className="checkout">
            
 <div className="checkout__left">
                    <img
                    className="checkout__ad"
                    src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
                    alt=""
                    />
                     <h2 className="checkout__title">Your shopping Basket</h2>
                    
            </div>
            
          
           
            
      <div className="checkout__right">
        <Subtotal />
      </div>
        </div>

        <div className="checkout__product">
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
        
    )
}

export default Checkout


