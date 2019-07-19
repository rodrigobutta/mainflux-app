
const INITIAL_STATE = {
  category: null,
  categories: []
};

// Actions
const SET_FORM_CATEGORY = 'RequestState/SET_FORM_CATEGORY';
const SET_CATEGORIES = 'RequestState/SET_CATEGORIES';


export function setCategory($category) {   
  return {
    type: SET_FORM_CATEGORY,
    payload: {
        category: $category
    }
  };

}


export function setCategories($parentCategory) {   
  return {
    type: SET_CATEGORIES,
    payload: {
      parentCategory: $parentCategory
    }
  };

}


export default function RequestStateReducer(state = INITIAL_STATE, action = {}) {

  switch (action.type) {
    
    case SET_FORM_CATEGORY:
      return { ...state, 
        category: action.payload.category
      };

    case SET_CATEGORIES:
      return { ...state, 
        categories: action.payload.parentCategory
      };
  
    default:
      return state;
  }

}