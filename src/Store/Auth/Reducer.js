import {
  GET_USER_PROFILE_FAILURE,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOGOUT,
  FIND_USER_BY_ID_SUCCESS,
  FOLLOW_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  FIND_USER_BY_NAME_SUCCESS,
  RESET_FIND_USER,
  GET_UNFOLLOWED_USERS_SUCCESS,
  GET_UNFOLLOWED_USERS_FAILURE,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,
  MARK_AS_READ_SUCCESS,
  MARK_ALL_AS_READ_SUCCESS,
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION_SUCCESS,
  DELETE_ALL_NOTIFICATIONS_SUCCESS,
  CREATE_NOTIFICATION_SUCCESS,
  CREATE_NOTIFICATION_FAILURE,
  MARK_MESSAGE_AS_READ_REQUEST,
  MARK_MESSAGE_AS_READ_SUCCESS,
  SEND_MESSAGE_FAILURE,
  FETCH_CHAT_HISTORY_FAILURE,
  EDIT_MESSAGE_FAILURE,
  DELETE_MESSAGE_FAILURE,
  MARK_MESSAGE_AS_READ_FAILURE,
  DELETE_MESSAGE_SUCCESS,
  EDIT_MESSAGE_SUCCESS,
  FETCH_CHAT_HISTORY_SUCCESS,
  SEND_MESSAGE_SUCCESS,
  GET_ALL_USER_REQUEST,
  GET_ALL_USER_SUCCESS,
  GET_ALL_USER_FAILURE,
  FETCH_EXPLANATION_REQUEST,
  FETCH_EXPLANATION_SUCCESS,
  FETCH_EXPLANATION_FAILURE,
  SEND_MESSAGE_REQUEST,
  ADD_NEW_MESSAGE,
} from "./ActionType";

const initialState = {
  allUsers: [],
  user: null,
  loading: false,
  error: null,
  jwt: localStorage.getItem("jwt") || null,
  unfollowedUsers: [],
  notifications: [],
  messages: [],
  explanation: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
    case REGISTER_USER_REQUEST:
    case GET_ALL_USER_REQUEST:
    case GET_USER_PROFILE_REQUEST:
    case MARK_MESSAGE_AS_READ_REQUEST:
      return { ...state, loading: true, error: null };

    case SEND_MESSAGE_REQUEST:
      return {
        ...state,

        messages: [
          ...state.messages,
          {
            ...action.payload,
            isOptimistic: true,
            status: "sending",
            loading: true,
            _tempId: action.payload.id,
          },
        ],
      };

    case FETCH_EXPLANATION_REQUEST:
      return {
        ...state,
        error: null,
        explanation: null,
      };

    case LOGIN_USER_SUCCESS:
    case REGISTER_USER_SUCCESS:
      localStorage.setItem("jwt", action.payload.jwt);
      return {
        ...state,
        loading: false,
        error: null,
        jwt: action.payload.jwt,
        user: action.payload.user,
      };
    case GET_ALL_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        allUsers: action.payload,
      };

    case GET_ALL_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
        updateUser: true,
      };

    case FIND_USER_BY_ID_SUCCESS:
    case FIND_USER_BY_NAME_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        findUser: action.payload,
      };

    case FOLLOW_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        findUser: action.payload,
        user: {
          ...state.user,
          following: state.user.following.includes(action.payload.id)
            ? state.user.following.filter(
                (userId) => userId !== action.payload.id
              )
            : [...state.user.following, action.payload.id],
        },
      };

    case LOGIN_USER_FAILURE:
    case REGISTER_USER_FAILURE:
    case GET_USER_PROFILE_FAILURE:
    case GET_UNFOLLOWED_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case GET_UNFOLLOWED_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        unfollowedUsers: action.payload,
      };

    case RESET_FIND_USER:
      return { ...state, findUser: null };

    case FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        notifications: action.payload,
      };

    case FETCH_NOTIFICATIONS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case MARK_AS_READ_SUCCESS:
      return {
        ...state,
        notifications: state.notifications.map((notif) =>
          notif.id === action.payload.id ? { ...notif, read: true } : notif
        ),
      };

    case MARK_ALL_AS_READ_SUCCESS:
      return {
        ...state,
        notifications: state.notifications.map((notif) => ({
          ...notif,
          read: true,
        })),
      };

    case ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
      };

    case CREATE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        notifications: [action.payload, ...state.notifications],
      };

    case CREATE_NOTIFICATION_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case DELETE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notif) => notif.id !== action.payload
        ),
      };

    case DELETE_ALL_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: [],
      };

    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: state.messages.map((msg) =>
          msg._tempId === action.payload.tempId
            ? {
                ...action.payload,
                status: "sent",
                isOptimistic: false,
                loading: false,
              }
            : msg
        ),
      };

    case ADD_NEW_MESSAGE:
      const now = Date.now();
      const isDuplicate = state.messages.some(
        (msg) => msg.id === action.payload.id
      );

      if (isDuplicate) return state;

      const optimisticMsg = state.messages.find(
        (msg) =>
          msg.isOptimistic &&
          msg.senderId === action.payload.senderId &&
          Math.abs(now - new Date(msg.createdAt).getTime()) < 10000 &&
          (msg.content === action.payload.content ||
            msg._tempId === action.payload.tempId)
      );

      const newMessages = optimisticMsg
        ? state.messages.map((msg) =>
            msg.id === optimisticMsg.id
              ? {
                  ...action.payload,
                  status: "sent",
                  loading: false,
                }
              : msg
          )
        : [...state.messages, action.payload];

      return {
        ...state,
        messages: newMessages,
      };

    case FETCH_CHAT_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: action.payload || [],
        error: null,
      };

    case EDIT_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: state.messages.map((msg) =>
          msg.id === action.payload.id
            ? {
                ...action.payload,
                ...(msg.status === "sending" && { status: "sent" }),
              }
            : msg
        ),
      };

    case DELETE_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: state.messages.filter(
          (message) => message.id !== action.payload
        ),
      };

    case MARK_MESSAGE_AS_READ_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: (state.messages || []).map((msg) =>
          msg.id === action.payload.id ? { ...msg, isRead: true } : msg
        ),
      };
    case SEND_MESSAGE_FAILURE:
      return {
        ...state,
        messages: state.messages.map((msg) =>
          msg._tempId === action.payload.tempId
            ? {
                ...msg,
                status: "failed",
                loading: false,
              }
            : msg
        ),
        error: action.payload.error,
      };
    case FETCH_CHAT_HISTORY_FAILURE:
    case EDIT_MESSAGE_FAILURE:
    case DELETE_MESSAGE_FAILURE:
    case MARK_MESSAGE_AS_READ_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case FETCH_EXPLANATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        explanation: action.payload,
      };

    case FETCH_EXPLANATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};
