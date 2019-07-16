import {
  HOME_CATEGORIES_BEGIN,
  HOME_CATEGORIES_SUCCESS,
  HOME_CATEGORIES_FAILURE,
  HOME_CATEGORIES_DISMISS_ERROR,
} from './constants';
import axios from 'axios';
const api_url = "https://api.chucknorris.io/jokes/categories";

export function categories() {
  return (dispatch) => { 
    dispatch({
      type: HOME_CATEGORIES_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      axios(api_url).then(
        (res) => {
          dispatch({
            type: HOME_CATEGORIES_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        
        (err) => {
          dispatch({
            type: HOME_CATEGORIES_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}


export function dismissCategoriesError() {
  return {
    type: HOME_CATEGORIES_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_CATEGORIES_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        categoriesPending: true,
        categoriesError: null,
      };

    case HOME_CATEGORIES_SUCCESS:
      // The request is success
      return {
        ...state,
        categoriesPending: false,
        categoriesError: null,
        categoriesData: action.data,
      };

    case HOME_CATEGORIES_FAILURE:
      // The request is failed
      return {
        ...state,
        categoriesPending: false,
        categoriesError: action.data.error,
      };

    case HOME_CATEGORIES_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        categoriesError: null,
      };

    default:
      return state;
  }
}
