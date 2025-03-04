import './product-card.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import Button from '../button/button.component';

const ProductCard = ({product}) =>{
    const {id, name, imageUrl, price} = product;
    const { addItemToCart } = useContext(CartContext);
    const addProductToCart = () => addItemToCart(product);
    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`}/>
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='pirce'>${price}</span>
            </div>
            <Button buttonType='inverted' onClick={addProductToCart}>Add to Cart</Button>
        </div>
    );
};
export default ProductCard;