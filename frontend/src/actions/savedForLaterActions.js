import axios from 'axios';
import {
  SAVE_FOR_LATER_ADD_ITEM,
  SAVE_FOR_LATER_REMOVE_ITEM,
  SAVE_FOR_LATER_CLEAR_ITEMS,
} from '../constants/savedForLaterConstants';

export const addTosavedForLater = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: SAVE_FOR_LATER_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem(
    'savedForLaterItems',
    JSON.stringify(getState().savedForLater.savedForLaterItems)
  );
};

export const removeFromsavedForLater = (id) => (dispatch, getState) => {
  dispatch({
    type: SAVE_FOR_LATER_REMOVE_ITEM,
    payload: id,
  });
  localStorage.setItem(
    'savedForLaterItems',
    JSON.stringify(getState().savedForLater.savedForLaterItems)
  );
};

export const clearsavedForLaterItems = () => (dispatch) => {
  dispatch({ type: SAVE_FOR_LATER_CLEAR_ITEMS });
  localStorage.removeItem('savedForLaterItems');
};
