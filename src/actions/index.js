export const increaseTimer = () => {
  return { type: "INC" };
};

export const setTimerToReducer = (timer) => {
  return { type: "SET", payload: timer };
};

export const lapTimer = (timer) => {
  return { type: "LAP", payload: timer };
};
