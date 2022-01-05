import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { selectProductById } from './productsSlice'

export const ProductDetails = ({ match }) => {

    const product = useSelector((state) => selectProductById(state, match.params.id))

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
            <h2>{product.name}</h2>
            <p>Model : {product.model}</p>
            <p>Price : ₹{product.price}</p>
            <p>Description : {product.description}</p>
            <Link to={`/`} className="btn btn-primary">
                Back
            </Link>
        </>
    )
}