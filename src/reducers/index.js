import { combineReducers } from "redux";

const timerReducer = (state = {}, action) => {
  switch (action.type) {
    case "INC":
      if (!(state.minutes === 0) || !(state.seconds === 0)) {
        if (state.seconds === 0) {
          return {
            minutes: state.minutes - 1,
            seconds: 59,
          };
        } else {
          return {
            ...state,
            seconds: state.seconds - 1,
          };
        }
      }
      return state;
    case "SET":
      return action.payload;
    default:
      return state;
  }
};

const lapTimerReducer = (state = [], action) => {
  switch (action.type) {
    case "LAP":
      return [...state, action.payload];
    default:
      return state;
  }
};

export default combineReducers({
  timer: timerReducer,
  lapTimers: lapTimerReducer,
});
