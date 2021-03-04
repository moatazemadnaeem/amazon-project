import React,{useContext} from 'react'
import './Product.css'
import StarRateIcon from '@material-ui/icons/StarRate';
import {ProductContext} from './ProductContext'
function Product({ id, title, image, price, star }) {
    let elm=[]
    function makeStar(x){
        for(let i=0;i<x;i++){
            elm.push(<StarRateIcon/>)
        }
        return elm
    }
    const [product,SetProducts]=useContext(ProductContext).products
    const SetBasket=()=>{
        SetProducts(prevProducts=>[...prevProducts,{ id:id,title:title,image:image,price:price,star:star}])
    }
    return (
        
        <div className="product">
            <div className="product_info">
                <p>
                {title}
                </p>
                <p>
                     $
                    <strong>{price}</strong>
                </p>
               <div  className="star">
                    {
                         makeStar(star).map((value)=>{return value})
                    }
               </div>
               
              
               
            </div>
            <img className="home_image" src={image} alt=""/>
            <button onClick={SetBasket} className="btn">Add to basket</button>
        </div>
    )
}

export default Product
