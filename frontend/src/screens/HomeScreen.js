import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { listProducts } from "../actions/productActions";
import ProductEditScreen from "./ProductEditScreen";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  // Hooks to control product filtering
  const [currentProducts, setCurrentProducts] = useState([]);
  const [lowerPriceBoundary, setLowerPriceBoundary] = useState(0);
  const [upperPriceBoundary, setUpperPriceBoundary] = useState(1000);

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  // update currentProducts when they are loaded in from Redux
  useEffect(() => {
    setCurrentProducts(products);
  }, [products])

  const handleFilterClicked = () => {
    const filteredProductList = products.filter(
      (product) => product.price >= lowerPriceBoundary && product.price <= upperPriceBoundary
    );
    setCurrentProducts(filteredProductList);
  }


  const renderLoadingOrProducts = () => {
    if (loading) {
      return <Loader />;
    } else if (error) {
      return <Message variant="danger">{error}</Message>;
    } else {
      return (
        <>
          <Row>
            {currentProducts.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )
    }
  }

  const renderPriceFilters = () => {
    return (
      <>
        <Row>
          <Col sm={12} md={6} lg={4} xl={3} className="d-flex align-items-center">
            <h3>Filter by Price</h3></Col>
          <Col sm={12} md={6} lg={4} xl={3} className="d-flex align-items-center">
            <input type="numeric" placeholder="Min" value={lowerPriceBoundary} onChange={(e) => setLowerPriceBoundary(e.target.value)} />
          </Col>
          <Col sm={12} md={6} lg={4} xl={3} className="d-flex align-items-center">
            <input type="numeric" placeholder="Max" value={upperPriceBoundary} onChange={(e) => setUpperPriceBoundary(e.target.value)} />
          </Col>
          <Col sm={12} md={6} lg={4} xl={3} className="d-flex align-items-center">
            <button className="btn btn-light" onClick={handleFilterClicked}>Filter</button>
          </Col>
        </Row>
      </>
    )
  }

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
          <Link to="/" className="btn btn-light">
            Go Back
          </Link>
        )}
      {renderPriceFilters()}
      <h1>Latest Products</h1>
      {renderLoadingOrProducts()}
    </>
  );
};

export default HomeScreen;
