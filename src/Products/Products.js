import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
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
            <Row style={{maxWidth : "100%"}}>
                {
                    displayProducts.map(product =>
                        <Col key={product.id}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={Images[product.id]} />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{product.model}</Card.Subtitle>

                                    <Card.Text>Price : ₹{product.price}</Card.Text>
                                    <Link to={`/products/${product.id}`}>view details</Link>
                                </Card.Body>
                            </Card> <br />
                        </Col>
                    )
                }
            </Row>
        </>
    )
}