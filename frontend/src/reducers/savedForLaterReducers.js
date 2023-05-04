import {
  SAVE_FOR_LATER_ADD_ITEM,
  SAVE_FOR_LATER_REMOVE_ITEM,
  SAVE_FOR_LATER_CLEAR_ITEMS,
} from '../constants/savedForLaterConstants';

export const savedForLaterReducer = (
  state = { savedForLaterItems: [] },
  action
) => {
  switch (action.type) {
    case SAVE_FOR_LATER_ADD_ITEM:
      const item = action.payload;

      const existItem = state.savedForLaterItems.find(
        (x) => x.product === item.product
      );

      if (existItem) {
        return {
          ...state,
          savedForLaterItems: state.savedForLaterItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          savedForLaterItems: [...state.savedForLaterItems, item],
        };
      }
    case SAVE_FOR_LATER_REMOVE_ITEM:
      return {
        ...state,
        savedForLaterItems: state.savedForLaterItems.filter(
          (x) => x.product !== action.payload
        ),
      };
    case SAVE_FOR_LATER_CLEAR_ITEMS:
      return {
        ...state,
        savedForLaterItems: [],
      };
    default:
      return state;
  }
};
