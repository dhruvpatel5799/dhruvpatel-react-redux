import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchProducts } from './productsSlice'
import { fetchCategories } from './categorySlice'

export const Products = () => {
    const dispatch = useDispatch()
    const [productDetails, setProductDetails] = useState([])
    const [categories, setCategories] = useState([])
    const [dropDownValue, setDropDownValue] = useState('Choose Category')
    const [displayProducts, setDisplayProducts] = useState([])

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
            <Row>
                {
                    displayProducts.map(product =>
                        <Col key={product.id}>
                            <Card style={{ width: '18rem' }}>
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