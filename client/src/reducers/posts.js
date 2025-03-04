import { COMMENT, FETCH_POST, START_LOADING, END_LOADING, FETCH_BY_SEARCH, FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

export default (state = { isLoading: true, posts:[]}, action) => {
    switch(action.type){
        case START_LOADING:
            return { ...state, isLoading: true }
            case END_LOADING:
                return { ...state, isLoading: false }
        case FETCH_BY_SEARCH:
            return {
                ...state,
                posts: action.payload
            };
        case FETCH_POST:
            return {
                ...state,
                post: action.payload
            };
        case DELETE:
            return {...state, posts: state.posts.filter((post) => post._id !== action.payload)};        
        case UPDATE:
        case LIKE:
            // LIKE can do the same thing as update
            //mapping over state array and changing something in array
            return {...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))};
            case COMMENT:
                return {
                    ...state,
                    posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post)
                }
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            }
        case CREATE:
            return {...state, posts: [...state.posts, action.payload]};
        default:
            return state;
    }
}