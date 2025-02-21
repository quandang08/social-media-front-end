import { 
    GET_USER_PROFILE_FAILURE, GET_USER_PROFILE_REQUEST, GET_USER_PROFILE_SUCCESS, 
    LOGIN_USER_FAILURE, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, 
    REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS 
  } from "./ActionType";
  
  const initialState = {
      user: null,
      loading: false,  // Mặc định loading là false
      error: null,
      jwt: localStorage.getItem("jwt") || null, // Load JWT từ localStorage
  };
  
  export const authReducer = (state = initialState, action) => {
      switch (action.type) {
          case LOGIN_USER_REQUEST:
          case REGISTER_USER_REQUEST:
          case GET_USER_PROFILE_REQUEST:
              return { ...state, loading: true, error: null };
  
          case LOGIN_USER_SUCCESS:
          case REGISTER_USER_SUCCESS:
              return { 
                  ...state, 
                  loading: false, 
                  error: null, 
                  jwt: action.payload.jwt // Lưu đúng dữ liệu JWT 
              };
  
          case GET_USER_PROFILE_SUCCESS:
              return { 
                  ...state, 
                  loading: false, 
                  error: null, 
                  user: action.payload // Lưu đúng dữ liệu user
              };
  
          case LOGIN_USER_FAILURE:
          case REGISTER_USER_FAILURE:
          case GET_USER_PROFILE_FAILURE:
              return { ...state, loading: false, error: action.payload };
  
          default:
              return state;
      }
  };
  