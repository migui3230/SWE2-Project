import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Dropdown } from "react-bootstrap";
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
  const [categoryFilter, setCategoryFilter] = useState(null);

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  // update currentProducts and categories when they are loaded in from Redux
  useEffect(() => {
    setCurrentProducts(products);
  }, [products])

  useEffect(() => {
    if (categoryFilter != null) {
      const filteredProductList = currentProducts.filter(
        (product) => product.category === categoryFilter
      );
      setCurrentProducts(filteredProductList);
    } else {
      handlePriceFilterClicked();
    }

  }, [categoryFilter])

  const handlePriceFilterClicked = () => {
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
        <Row className="d-flex align-items-center">
          <Col sm={12} md={6} lg={4} xl={3} className="d-flex align-items-center">
            <h3>Filter by Price</h3>
          </Col>
          <Col sm={12} md={6} lg={4} xl={3} className="d-flex align-items-center">
            <input type="numeric" placeholder="Min" value={lowerPriceBoundary} onChange={(e) => setLowerPriceBoundary(e.target.value)} />
          </Col>
          <Col sm={12} md={6} lg={4} xl={3} className="d-flex align-items-center">
            <input type="numeric" placeholder="Max" value={upperPriceBoundary} onChange={(e) => setUpperPriceBoundary(e.target.value)} />
          </Col>
          <Col sm={12} md={6} lg={4} xl={3} className="d-flex align-items-center">
            <button className="btn btn-dark" onClick={handlePriceFilterClicked}>Filter</button>
          </Col>
        </Row>
      </>
    )
  }

  const renderCategoryFilters = () => {
    const categories = Array.from([...new Set(products.map((prod) => prod.category))]);
    return (
      <>
        <Row className="d-flex align-items-center">
          <Col sm={12} md={6} lg={4} xl={3} className="d-flex align-items-center">
            <h3>Filter by Category</h3>
          </Col>
          <Dropdown onSelect={(eKey, e) => setCategoryFilter(eKey)}>
            <Dropdown.Toggle variant='secondary' id='category-filter-dropdown'>
              Category
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {categories.map((cat, i) => {
                return (
                  <Dropdown.Item
                    key={i}
                    eventKey={cat}
                  >
                    {cat}
                  </Dropdown.Item>
                )
              })
              }
            </Dropdown.Menu>
          </Dropdown>
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
      {renderCategoryFilters()}
      <h1>Latest Products</h1>
      {categoryFilter &&
        <Row className="d-flex justify-content-center align-items-center">
          <button className="category-filter-btn" onClick={() => setCategoryFilter(null)}>
            &#10005;
            </button>
          {categoryFilter}
        </Row>
      }
      {renderLoadingOrProducts()}
    </>
  );
};

export default HomeScreen;
