import { TRACK_LINE_SUCCESS, TRACK_LINE_FETCHING, TRACK_LINE_FAILED } from "../Constants";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TRACK_LINE_FETCHING:
      return { ...state, isFetching: true, isError: false, result: null };
    case TRACK_LINE_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    case TRACK_LINE_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    default:
      return state;
  }
};
