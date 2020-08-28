import { TRACK_BU_SUCCESS, TRACK_BU_FETCHING, TRACK_BU_FAILED } from "../Constants";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TRACK_BU_FETCHING:
      return { ...state, isFetching: true, isError: false, result: null };
    case TRACK_BU_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    case TRACK_BU_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    default:
      return state;
  }
};
