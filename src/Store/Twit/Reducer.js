import {
    FIND_TWEET_BY_ID_FAILURE,
    FIND_TWEET_BY_ID_REQUEST,
    FIND_TWEET_BY_ID_SUCCESS,
    GET_ALL_TWEETS_SUCCESS,
    GET_USERS_TWEET_SUCCESS,
    LIKE_TWEET_FAILURE,
    LIKE_TWEET_REQUEST,
    LIKE_TWEET_SUCCESS,
    REPLY_TWEET_REQUEST,
    REPLY_TWEET_SUCCESS,
    REPLY_TWEET_FAILURE,
    RETWEET_FAILURE,
    RETWEET_REQUEST,
    RETWEET_SUCCESS,
    TWEET_CREATE_FAILURE,
    TWEET_CREATE_REQUEST,
    TWEET_CREATE_SUCCESS,
    TWEET_DELETE_FAILURE,
    TWEET_DELETE_REQUEST,
    TWEET_DELETE_SUCCESS,
    USER_LIKE_TWEET_FAILURE,
    USER_LIKE_TWEET_REQUEST,
    USER_LIKE_TWEET_SUCCESS,
  } from "./ActionType";
  
  const initialState = {
    loading: false,
    data: null,
    error: null,
    twits: [],
    twit: null,
    likedTwits: [],
    like: null,
    retwit: null,
  };
  
  const tweetReducer = (state = initialState, action) => {
    switch (action.type) {
      case TWEET_CREATE_REQUEST:
      case TWEET_DELETE_REQUEST:
      case USER_LIKE_TWEET_REQUEST:
      case LIKE_TWEET_REQUEST:
      case RETWEET_REQUEST:
      case FIND_TWEET_BY_ID_REQUEST:
      case REPLY_TWEET_REQUEST:
        return { ...state, loading: true, error: null };
  
      case TWEET_CREATE_FAILURE:
      case TWEET_DELETE_FAILURE:
      case USER_LIKE_TWEET_FAILURE:
      case LIKE_TWEET_FAILURE:
      case RETWEET_FAILURE:
      case FIND_TWEET_BY_ID_FAILURE:
      case REPLY_TWEET_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      case TWEET_CREATE_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
          twits: [action.payload, ...state.twits],
        };
  
        case GET_ALL_TWEETS_SUCCESS:
          return { 
            ...state, 
            loading: false, 
            error: null, 
            twits: action.payload 
          };
        
        case GET_USERS_TWEET_SUCCESS:
          return { 
            ...state, 
            loading: false, 
            error: null, 
            userTwits: action.payload  // Nếu cần lưu bài đăng riêng của user
          };
  
      case USER_LIKE_TWEET_SUCCESS:
        return { ...state, loading: false, error: null, likedTwits: action.payload };
  
      case LIKE_TWEET_SUCCESS:
        return { ...state, loading: false, error: null, like: action.payload };
  
      case TWEET_DELETE_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
          twits: state.twits.filter(twit => twit._id !== action.payload),
        };
  
      case RETWEET_SUCCESS:
        return { ...state, loading: false, error: null, retwit: action.payload };
  
      case FIND_TWEET_BY_ID_SUCCESS:
        return { ...state, loading: false, error: null, twit: action.payload };
  
      case REPLY_TWEET_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
          twits: state.twits.map(twit =>
            twit._id === action.payload.parentId ? { ...twit, replies: [...twit.replies, action.payload] } : twit
          ),
        };
  
      default:
        return state;
    }
  };
  
  export default tweetReducer;
  