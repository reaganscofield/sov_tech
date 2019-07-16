import {
  HOME_CATEGORIES_BEGIN,
  HOME_CATEGORIES_SUCCESS,
  HOME_CATEGORIES_FAILURE,
  HOME_CATEGORIES_DISMISS_ERROR,
} from './constants';
import axios from 'axios';


export function categories(args = {}) {
  return (dispatch) => { 
    dispatch({
      type: HOME_CATEGORIES_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {

      const doRequest = args.error ? Promise.reject(new Error()) : Promise.resolve();
      doRequest.then(
        (res) => {
          dispatch({
            type: HOME_CATEGORIES_SUCCESS,
            data: res,
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
