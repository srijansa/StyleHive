import './checkout.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import CartItem from '../../components/cart-item/cart-item.component';

const Checkout = () => {
    const { cartItems, addItemToCart, deleteItemFromCart } = useContext(CartContext);
    return (
        <div>
            <h1>Hi! Check out page</h1>
            <div>
                {
                    cartItems.map((cartItem) =>{
                        const { id, name, quantity } = cartItem;
                        return (
                            <div key={id}>
                                <h2>{name}</h2>
                                <span onClick={()=>deleteItemFromCart(cartItem)}>{'<'}</span>
                                <span>{quantity}</span>
                                <span onClick={()=>addItemToCart(cartItem)}>{'>'}</span>
                            </div>
                        );}
                    )
                }
            </div>
        </div>
    );
};
export default Checkout;