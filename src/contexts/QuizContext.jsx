import { createContext, useContext, useReducer } from "react";
import { ACTION, initialState, reducer } from "../reducers/QuizReducer";

const QuizContext = createContext();

const QuizProvide = ({ children }) => {
  const [{ questions, status, index, answer, points, highScore }, dispatch] =
    useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );
  return (
    <QuizContext.Provider
      value={{
        ACTION,
        initialState,
        dispatch,
        reducer,
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        numQuestions,
        maxPossiblePoints,
      }}>
      {children}
    </QuizContext.Provider>
  );
};

const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) throw new Error("can not use quiz context");
  return context;
};

export { QuizProvide, useQuiz };
