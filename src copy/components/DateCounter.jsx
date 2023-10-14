import { useReducer } from "react";

const ACTION = {
  DECREMENT: "decrement",
  INCREMENT: "increment",
  DEFINE_COUNT: "define-count",
  DEFINE_STEP: "define-step",
  RESET: "reset",
};
const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.DECREMENT:
      return { ...state, count: state.count - action.payload.step };
    case ACTION.INCREMENT:
      return { ...state, count: state.count + action.payload.step };
    case ACTION.DEFINE_COUNT:
      return { ...state, count: action.payload.count };
    case ACTION.DEFINE_STEP:
      return { ...state, step: action.payload.step };
    case ACTION.RESET:
      return { count: 0, step: 1 };
    default:
      return state;
  }
};

function DateCounter() {
  const initialState = { count: 0, step: 1 };
  const [state, dispatch] = useReducer(reducer, initialState);
  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + state.count);

  const dec = function () {
    dispatch({ type: ACTION.DECREMENT, payload: { step: state.step } });
  };

  const inc = function () {
    dispatch({ type: ACTION.INCREMENT, payload: { step: state.step } });
  };

  const defineCount = function (e) {
    dispatch({
      type: ACTION.DEFINE_COUNT,
      payload: { count: Number(e.target.value) },
    });
  };

  const defineStep = function (e) {
    dispatch({
      type: ACTION.DEFINE_STEP,
      payload: { step: Number(e.target.value) },
    });
  };

  const reset = function () {
    dispatch({ type: ACTION.RESET });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={state.step}
          onChange={defineStep}
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={state.count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
