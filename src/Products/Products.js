import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Button, OverlayTrigger, Popover, Table } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Lenovo1 from '../Images/Lenovo1.jpg'
import MSI from '../Images/MSI.jpg'
import Lenovo2 from '../Images/Lenovo2.jpg'
import HP from '../Images/HP.jpg'
import Vivo from '../Images/Vivo.jpg'
import Pixel from '../Images/Pixel4a.jpg'
import Lenovo3 from '../Images/Lenovo3.jpg'
import Mi from '../Images/Mi.jpg'
import iPhone from '../Images/iPhone.jpg'

import { fetchProducts } from './productsSlice'
import { fetchCategories } from './categorySlice'

export const Products = () => {
    const dispatch = useDispatch()
    const [productDetails, setProductDetails] = useState([])
    const [categories, setCategories] = useState([])
    const [dropDownValue, setDropDownValue] = useState('Choose Category')
    const [displayProducts, setDisplayProducts] = useState([])
    const Images = [Lenovo1, MSI, Lenovo2, HP, HP, Vivo, Pixel, Lenovo3, Mi, iPhone]
    const [cart, setCart] = useState([])
    const [cartTotal, setCartTotal] = useState(0)

    const getProductDetails = async () => {
        const temp = await dispatch(fetchProducts())
        setProductDetails(temp.payload)
        setDisplayProducts(temp.payload)
        const data = await dispatch(fetchCategories())
        setCategories(data.payload)
    }

    useEffect(() => {
        getProductDetails()
    }, [])

    const handleSelect = (e) => {
        if (e !== 'default') {
            const copy_productDetails = [...productDetails]
            const temp = copy_productDetails.filter(product => product.categoryId === Number(e))
            setDisplayProducts(temp)
            setDropDownValue(categories[e].name)
        }
        else {
            setDisplayProducts(productDetails)
            setDropDownValue('Choose Category')
        }
    }

    const addToCart = (productId) => {
        let copy_cart = [...cart]

        if (copy_cart.length === 0) {
            const product = productDetails.find(product => product.id === productId)
            let cartItem = {
                id: productId,
                name: product.name,
                qty: 1,
                price: product.price
            }
            copy_cart.push(cartItem)
            let copy_cartTotal = cartTotal
            copy_cartTotal += product.price
            setCart(copy_cart)
            setCartTotal(copy_cartTotal)
        }
        else if (copy_cart.find(cartItem => cartItem.id === productId)) {
            const temp = copy_cart.find(cartItem => cartItem.id === productId)
            temp.qty += 1
            let copy_cartTotal = cartTotal
            copy_cartTotal += temp.price
            setCart(copy_cart)
            setCartTotal(copy_cartTotal)
        }
        else {
            const product = productDetails.find(product => product.id === productId)
            let cartItem = {
                id: productId,
                name: product.name,
                qty: 1,
                price: product.price
            }
            copy_cart.push(cartItem)
            let copy_cartTotal = cartTotal
            copy_cartTotal += product.price
            setCart(copy_cart)
            setCartTotal(copy_cartTotal)
        }

    }

    const checkOut = async() =>{
        let body = [
            {cart},
            {cartTotal}
        ]
        const requestParams = {
            method: 'POST',
            body: JSON.stringify(body)
        }
        try {
            const response = await fetch('https://janam.free.beeceptor.com', requestParams)
            alert('Order Placed Successfully!')
        }
        catch (err) {
            console.log(err)
            alert('Could not place your order at the moment!')
        }
    }

    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">My Cart</Popover.Header>
            <Popover.Body style={{ display: cart.length === 0 ? 'blok' : 'none' }}>
                You haven't added anything to cart.
                Lets go Shopping!
            </Popover.Body>
            <Popover.Body style={{ display: cart.length > 0 ? 'blok' : 'none' }}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Qty</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map(cartItem => 
                                <tr key={cartItem.id}>
                                <td>{cartItem.name}</td>
                                <td>{cartItem.qty}</td> 
                                <td>₹{cartItem.price}</td>
                                </tr>)
                        }
                    </tbody>
                </Table>
                <strong>Total : ₹{cartTotal}</strong>
                <div className="d-grid gap-2">
                <Button variant="success" size="sm" onClick={checkOut}>Checkout!</Button>
                </div>
            </Popover.Body>
        </Popover>
    );

    return (
        <>
            <Dropdown id="choose-category" onSelect={handleSelect}>
                <Dropdown.Toggle>{dropDownValue}</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item eventKey="default">Choose Category</Dropdown.Item>
                    {
                        categories.map(category =>
                            <Dropdown.Item eventKey={category.id} key={category.id}>{category.name}</Dropdown.Item>
                        )
                    }
                </Dropdown.Menu>
            </Dropdown> <br />
            <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                <Button variant="success">Cart</Button>
            </OverlayTrigger> 
            <Row style={{ maxWidth: "100%" }}>
                {
                    displayProducts.map(product =>
                        <Col key={product.id}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={Images[product.id]} />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{product.model}</Card.Subtitle>

                                    <Card.Text>Price : ₹{product.price}</Card.Text>
                                    <Link to={`/products/${product.id}`}>view details</Link><br />
                                    <Button variant="primary" size="sm" onClick={addToCart.bind(this, product.id)}>Add to Cart</Button>
                                </Card.Body>
                            </Card> <br />
                        </Col>
                    )
                }
            </Row>
        </>
    )
}