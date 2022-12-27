import { Link } from 'react-router-dom'
import { useContext, useState } from "react";
import { AppContext } from '../App';
import { FaCartArrowDown, FaMinus, FaPlus, FaTimes, FaCheck, FaRegTrashAlt, FaLongArrowAltLeft, FaAngleDoubleRight } from "react-icons/fa";



export const Cart = () => {
    const { item, setItem, setCart, total, setTotal } = useContext(AppContext)
    const [subTotal, setSubTotal] = useState(0);
    const [qty, setQty] = useState(1);

    const addToCart = (cartItem, bool) => {
        // TO CALCULATE SUBTOTAL
        if (!cartItem.qty) {
            cartItem.qty = 1
            cartItem.subTotal = cartItem.qty * cartItem.price
        } else {
            if (bool) {
                cartItem.qty++
            } else {
                cartItem.qty--
                if (cartItem.qty < 1) {
                    remove(cartItem.id)
                }
            }
            cartItem.subTotal = cartItem.qty * cartItem.price
        }
        // TO PUSH OBJECT INTO CART ARRAY
        let data = { id: cartItem.id, item: cartItem }
        if (!item.length) {
            item.push(data);
        }
        // TO CHECK IF ITEM IF ITEM EXISTS IN CART
        let shouldAdd = true
        // console.log(item)
        item.map((value) => {
            if (value.id === cartItem.id) {
                shouldAdd = false
            }
            return shouldAdd
        })
        if (shouldAdd) {
            item.push(data);
        }
    }
// FUNCTION TO DELETE AN ITEM FROM CART
    const remove = (deleteitem) => {
        const newItem = item.filter(id => id.id !== deleteitem)
        setItem(newItem);
    }
    let itemarr = item.length;
    setCart(itemarr);
// FUNCTION TO INCREASE AND DECREASE QUANTITY
    const increment = (item) => {
        addToCart(item, true)
        setSubTotal(item.subTotal)
        setQty(item.qty)
    }

    const decrement = (item) => {
        addToCart(item, false)
        setSubTotal(item.subTotal)
        setQty(item.qty)
    }
// TO CALCULATE THE SUM OF ALL THE SUBTOTALS
    let totalItem = 0;
    for (let i = 0; i < item.length; i++) {
        totalItem += item[i].item.subTotal;
    }
// TO CLEAR CART
    const clearCart = () => {
        let newItem = item;
        newItem = [];
        setItem(newItem);
    }
    const checkout = () =>{
        alert(`Thank you for shopping with us. Your total cost is N${total}`)
        clearCart();
    }
    setTotal(totalItem)

    return (
        <>
            <div className='cart-body'>
                <div className='top'>
                    <h2>Cart Page</h2>
                    <Link to='/' className='home_link'><FaLongArrowAltLeft /></Link>
                </div>
            </div>

            {
                item.length ? <div className='cart_section'>
                    {item.map((it) => <div key={it.id} className='it-card'>

                        <div className='it-image'>
                            <img className='it' src={`/images/${it.item.imageName}`} alt='' />
                        </div>
                        <div className='it-details'>
                            <div className='title'>
                                <h5 className='white'>{it.item.name}</h5>
                                <h6 className='h6' onClick={() => remove(it.id)}><FaTimes /></h6>
                            </div>
                            <div className='main-qty'>
                                <div className="qty">
                                    <h6 className='small-btn' onClick={() => decrement(it.item)}><FaMinus /></h6>
                                    <div className="amount">
                                        {it.item.qty}
                                    </div>
                                    <h6 className='small-btn' onClick={() => increment(it.item)} ><FaPlus /></h6>
                                </div>
                                <div className="price-subtotal">
                                    <h4 className='grey'>subTotal</h4>
                                    <h4 className='yellow'>N{it.item.subTotal}</h4>
                                </div>
                            </div>
                            <div className="price-cart grey">
                                <h4>N{it.item.price}</h4>
                            </div>
                        </div>
                    </div>)}
                    <div>
                        <div className='total'>
                            <h2 className='yellow'>
                                Total: N{total}
                            </h2>
                            <div className='emptyCart'>
                                <div className='emptyCart-Trash grey' onClick={clearCart}>
                                    <FaRegTrashAlt />
                                    <p >Empty Cart</p>
                                </div>
                                <button className=" checkout" onClick={checkout}><FaCheck /><h2>Checkout</h2> </button>
                            </div>
                        </div>
                    </div>
                </div> : <div className='cart-sec'>
                    <div className='cart-arrow'>
                        <FaCartArrowDown className='arrow-down'/>
                    </div>
                    <div className='cart-empty'>
                        <div>
                            <h1>Your Cart is Empty</h1>
                            <h4>How would you come to my page and return the same?, Get a new dress today to spice up your looks.</h4>
                           <Link to='/' className='home_link2'><button className='checkout'><h2>Continue Shopping</h2><FaAngleDoubleRight /></button></Link>
                        </div>
                    </div>
                </div>
            }



        </>
    )


} 