import React, { useEffect, useState } from 'react'
import nike from '../assets/nike.png'
import check from '../assets/check.png'
import trash from '../assets/trash.png'
import API from '../API'


export default function Home() {
    const [product, setProduct] = useState([]);
    const [cart, setCart] = useState([]);
    const [refresh, setfresh] = useState(false);
    const [price, setPrice] = useState(0);
    useEffect(() => {
        API({
            method: 'get',
            url: 'products',
        }).then((res) => {
            setProduct(res.data.products)
            console.log(res.data.products)
        })
    }, [refresh]);

    useEffect(() => {
        API({
            method: 'get',
            url: 'carts',
        }).then((res) => {
            setCart(res.data.carts)
            setPrice(res.data.sumPrice)
        })
    }, [refresh]);

    const handleAdd = (id) => {
        API({
            method: 'post',
            url: `upload-status/${id}`,
        }).then((res) => {
        })
        setfresh(!refresh);
    }

    const handleQuantity = (status, id) => {
        API({
            method: 'post',
            url: `upload-quantity/${status}/${id}`,
        }).then((res) => {
        })
        setfresh(!refresh);

    }

    const handleDelete = (id) => {
        API({
            method: 'post',
            url: `delete-cart/${id}`,
        }).then((res) => {
        })
        setfresh(!refresh);
    }
    return (
        <div className='app_container'>
            <div className='box_product'>
                <div class="product_nike">
                    <img src={nike} class="product_nike_image" />
                </div>
                <div className='title'>
                    Our Products
                </div>
                <div className='list'>
                    <div>

                        {
                            product.map((item, index) => {
                                return (
                                    <div className='list_Product'>
                                        <div>
                                            <div className="list_product-app">
                                                <div class="list_product-image" style={{ backgroundColor: `${item.color}` }}>
                                                    <img src={item.image} />
                                                </div>
                                                <div className="list_product-name">{item.name}</div>
                                                <div className="list_product-description">{item.description}</div>
                                                <div className="box_addCart">
                                                    <div className="addCart_price">${item.price}</div>
                                                    {
                                                        item.status == 1 ?
                                                            <div className='addCart_button' style={{ borderRadius: "50%", width: '50px', height: '50px', }} >
                                                                <img src={check} style={{ width: "24px", textAlign: "center", marginLeft: "-5px" }} />
                                                            </div> : <div className="addCart_button" onClick={(e) => { handleAdd(item.id) }}>
                                                                <p>ADD TO CART</p>
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='box_product'>
                <div class="product_nike">
                    <img src={nike} class="product_nike_image" />
                </div>
                <div className='title'>
                    Your cart
                    <span class="sumprice" style={{ float: "right" }}>${parseFloat(price).toFixed(2)}</span>
                </div>
                <div className='list'>
                    <div>
                        <div className='list_Product'>
                            <div>
                                <div className="list_product-app">
                                    {
                                        cart.map((item, index) => {
                                            return (
                                                <div className="cart_item">
                                                    <div className="cart_item-img" style={{ backgroundColor: `${item.product.color}` }}>
                                                        <div className="img-cart">
                                                            <img src={item.product.image} />
                                                        </div>
                                                    </div>
                                                    <div className="text" style={{ flex: 1 }}>
                                                        <div className="cart_name">
                                                            {item.product.name}
                                                        </div>
                                                        <div className="cart_price"
                                                        >${item.product.price}
                                                        </div>
                                                        <div className="cart_quantity">
                                                            <div className="quantity_button">
                                                                <div className="quantity_button-icon" onClick={() => handleQuantity("min", item.id)}>-</div>
                                                                <div className="quantity_button-text">{item.quantity}</div>
                                                                <div className="quantity_button-icon"
                                                                    onClick={() => handleQuantity("plus", item.id)}>+</div>
                                                            </div>
                                                            <div className="cart_delete" onClick={() => handleDelete(item.id)}>
                                                                <img src={trash} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
