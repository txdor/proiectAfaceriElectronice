import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import DropDownMenu from '../components/DropDownMenu'

const ProduseScreen = ({ match }: {match: any}) => {
  const dispatch = useDispatch()

  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const productList = useSelector((state: any) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />
      <Container
        style={{
          marginTop: '-70px',
        }}
      >
        <DropDownMenu />
      </Container>

      <Container
        style={{
          marginTop: '50px',
        }}
      >
      </Container>

      <h1>Ultimele produse</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product: any) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          {/* <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          /> */}
        </>
      )}
    </>
  )
}

export default ProduseScreen
