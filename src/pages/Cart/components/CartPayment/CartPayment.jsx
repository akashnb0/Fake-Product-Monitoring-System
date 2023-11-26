    import React from 'react';
    import { useSelector, useDispatch } from 'react-redux';
    import { Link } from 'react-router-dom';
    import CartItem from '../CartItem/CartItem';
    import { incrementCartItem, decrementCartItem, removeFromCart } from './actions'; // Replace with your actual Redux actions.
    import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
    import axios from 'axios'; // Import Axios

    import "./cartPayment.scss";

    const CartPayment = () => {
        const cart = useSelector((state) => state.cart.cart);
        const dispatch = useDispatch();

        const getTotalQuantity = () => {
            let total = 0;
            cart.forEach((item) => {
                total += item.quantity;
            });
            return total;
        };

        const getTotalPrice = () => {
            let total = 0;
            cart.forEach((item) => {
                total += Math.round(item.price) * item.quantity;
            });
            return total;
        };

        const handleIncrement = (item) => {
            dispatch(incrementCartItem(item)); // Dispatch the increment action
            // Make an Axios PUT request to update the backend with the new quantity
            // Replace 'YOUR_BACKEND_API_URL' with the actual API endpoint.
            axios.put('YOUR_BACKEND_API_URL', {
                id: item.id,
                quantity: item.quantity + 1,
            })
            .then((response) => {
                // Handle the response if needed
            })
            .catch((error) => {
                // Handle errors if any
            });
        };

        const handleDecrement = (item) => {
            if (item.quantity === 1) {
                // If quantity is 1, remove the item from the cart.
                dispatch(removeFromCart(item.id)); // Dispatch the remove action
                // Make an Axios DELETE request to delete the item from the backend
                // Replace 'YOUR_BACKEND_API_URL' with the actual API endpoint.
                axios.delete(`YOUR_BACKEND_API_URL/${item.id}`)
                .then((response) => {
                    // Handle the response if needed
                })
                .catch((error) => {
                    // Handle errors if any
                });
            } else {
                dispatch(decrementCartItem(item)); // Dispatch the decrement action
                // Make an Axios PUT request to update the backend with the new quantity
                // Replace 'YOUR_BACKEND_API_URL' with the actual API endpoint.
                axios.put('YOUR_BACKEND_API_URL', {
                    id: item.id,
                    quantity: item.quantity - 1,
                })
                .then((response) => {
                    // Handle the response if needed
                })
                .catch((error) => {
                    // Handle errors if any
                });
            }
        };

        return (
            <div className="cart-payment">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12">
                            <div className="card card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                                <div className="card-body p-0">
                                    <div className="row g-0">
                                        <div className="col-lg-8">
                                            <div className="p-5">
                                                <div className="cart-head d-flex justify-content-between align-items-center mb-5">
                                                    <h1 className="fw-bold mb-0 text-black">Shopping Cart</h1>
                                                    <h6 className="mb-0 text-muted">{getTotalQuantity()} items</h6>
                                                </div>

                                                <div className="cart-products">
                                                    {cart.map((item) => (
                                                        <CartItem
                                                            key={item.id}
                                                            item={item}
                                                            quantity={item.quantity}
                                                            image={item.image}
                                                            title={item.title}
                                                            category={item.category}
                                                            price={item.price}
                                                            onIncrement={() => handleIncrement(item)}
                                                            onDecrement={() => handleDecrement(item)}
                                                        />
                                                    ))}
                                                </div>

                                                <div className="pt-5 back-shop">
                                                    <h6 className="mb-0"><Link to="/shop"><HiOutlineArrowNarrowLeft />Back to Shop</Link></h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 bg-grey">
                                            <div className="p-5">
                                                <h3 className="fw-bold mb-5 mt-2 pt-1 cart-head">Summary</h3>

                                                <h5 className="text-uppercase mb-3">Give code</h5>

                                                <div className="mb-5 cart-head">
                                                    <div className="form-outline">
                                                        <input type="text" id="form3Examplea2" className="form-control form-control-lg" />
                                                        <label className="form-label" htmlFor="form3Examplea2">Enter your code</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex justify-content-between mb-5">
                                                    <h5 className="text-uppercase">Total price</h5>
                                                    <h5>Rs {getTotalPrice()}.00</h5>
                                                </div>
                                                <button type="button" className="general-button">Proceed To Checkout</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    export default CartPayment;
