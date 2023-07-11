import { authConstant, clubConstant } from "../constants";

const initialState = {
  club: [],
  coin: [],
  errors: [],
  loading: false,
  portLoading: false,
  message: "",
  sessionExpireError: "",
  page: 1,
  totalPages: 1,
};

const clubReducer = (state = initialState, action) => {
  switch (action.type) {
    case clubConstant.GET_CLUB_REQUEST:
    case clubConstant.ADD_CLUB_REQUEST:
    case clubConstant.GET_COIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case clubConstant.ADD_PORTFOLIO_REQUEST:
      return {
        ...state,
        portLoading: true,
      };
    case clubConstant.GET_CLUB_SUCCESS:
      return {
        ...state,
        loading: false,
        club: action.payload.results,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
      };
    case clubConstant.GET_COIN_SUCCESS:
      return {
        ...state,
        loading: false,
        coin: action.payload.results,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
      };
    case clubConstant.ADD_CLUB_SUCCESS:
    case clubConstant.ADD_PORTFOLIO_SUCCESS:
      return {
        ...state,
        portLoading: false,
        loading: false,
        message: action.payload,
      };
    case clubConstant.GET_CLUB_FAILURE:
    case clubConstant.ADD_CLUB_FAILURE:
    case clubConstant.GET_COIN_FAILURE:
    case clubConstant.ADD_PORTFOLIO_FAILURE:
      return {
        ...state,
        portLoading: false,
        loading: false,
        errors: action.payload.err,
      };
    case authConstant.SESSION_EXPIRE:
      return {
        ...state,
        portLoading: false,
        loading: false,
        sessionExpireError: action.payload.err,
      };
    case authConstant.CLEAR_MESSAGES:
      return {
        ...state,
        portLoading: false,
        loading: false,
        message: "",
      };
    case authConstant.CLEAR_ERRORS:
      return {
        ...state,
        portLoading: false,
        loading: false,
        errors: [],
        sessionExpireError: "",
      };
    default:
      return state;
  }
};

export default clubReducer;