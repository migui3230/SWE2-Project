// implement a saved for later screen that loads the saved items in from the redux store
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import Message from '../components/Message';
import {
  addTosavedForLater,
  removeFromsavedForLater,
} from '../actions/savedForLaterActions';

const SavedForLaterScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const savedForLater = useSelector((state) => state.savedForLater);
  const { savedForLaterItems } = savedForLater;

  useEffect(() => {
    if (productId) {
      dispatch(addTosavedForLater(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromSavedForLaterHandler = (id) => {
    dispatch(removeFromsavedForLater(id));
  };

  const addToCartHandler = (id) => {
    dispatch(removeFromsavedForLater(id));
    history.push(`/cart/${id}?qty=${qty}`);
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Saved For Later</h1>
        <h8>
          Note: Pressing the <i className='fas fa-plus'></i> to add an item to
          your cart will remove it from your Saved for Later
        </h8>
        {savedForLaterItems.length === 0 ? (
          <Message>
            Your saved for later is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {savedForLaterItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => addToCartHandler(item.product)}
                    >
                      <i className='fas fa-plus'></i>
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() =>
                        removeFromSavedForLaterHandler(item.product)
                      }
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
    </Row>
  );
};

export default SavedForLaterScreen;
