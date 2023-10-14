import { ACTION } from "../App";
const Option = ({ option, dispatch, answer, index, correctOption }) => {
  console.log(correctOption);
  const isAnswered = answer !== null;
  return (
    <button
      className={`btn btn-option ${index === answer ? "answer" : ""} ${
        isAnswered ? (index === correctOption ? "correct" : "wrong") : ""
      }`}
      onClick={() => {
        dispatch({ type: ACTION.UPDATE_ANSWER, payload: index });
      }}
      disabled={isAnswered}>
      {option}
    </button>
  );
};

export default Option;
