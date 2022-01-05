import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Image, Row, Col } from 'react-bootstrap';
import Lenovo1 from '../Images/Lenovo1.jpg'
import MSI from '../Images/MSI.jpg'
import Lenovo2 from '../Images/Lenovo2.jpg'
import HP from '../Images/HP.jpg'
import Vivo from '../Images/Vivo.jpg'
import Pixel from '../Images/Pixel4a.jpg'
import Lenovo3 from '../Images/Lenovo3.jpg'
import Mi from '../Images/Mi.jpg'
import iPhone from '../Images/iPhone.jpg'

import { selectProductById } from './productsSlice'

export const ProductDetails = ({ match }) => {

    const product = useSelector((state) => selectProductById(state, match.params.id))
    const Images = [Lenovo1, MSI, Lenovo2, HP, HP, Vivo, Pixel, Lenovo3, Mi, iPhone]

    if (!product) {
        return (
            <>
                <h2>Product not found</h2>
                <Link to={`/`} className="btn btn-primary">Home</Link>
            </>
        )
    }

    return (
        <>
        <br />
        <Row style={{maxWidth : "100%"}}>
            <Col lg={8}>
            <Image src={Images[product.id]} fluid />
            </Col>
            <Col lg={4}>
            <h2>{product.name}</h2>
            <p>Model : {product.model}</p>
            <p>Price : ₹{product.price}</p>
            <p>Description : {product.description}</p>
            <Link to={`/`} className="btn btn-primary">
                Back
            </Link>
            </Col>
        </Row>
        </>
    )
}