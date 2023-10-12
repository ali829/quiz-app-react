import "./index.css";
import Container from "./components/Container";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextQuestion from "./components/NextQuestion";
import FinishScreen from "./components/FinishScreen";
import { useEffect, useReducer } from "react";
import Progress from "./components/Progress";

const initialState = {
  questions: [],
  // loading , error , ready , active , finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
};
export const ACTION = {
  DATA_RECEIVED: "data-received",
  DATA_FAILED: "data-failed",
  START_QUIZ: "start-quiz",
  UPDATE_ANSWER: "update-answer",
  MOVE_TO_NEXT: "move-to-next",
  FINISH_QUIZ: "finish-quiz",
  RESTART_QUIZ: "restart-quiz",
};
const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.DATA_RECEIVED:
      return { ...state, questions: action.payload.data, status: "ready" };
    case ACTION.DATA_FAILED:
      return { ...state, status: "error" };
    case ACTION.START_QUIZ:
      return { ...state, status: "active" };
    case ACTION.UPDATE_ANSWER:
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case ACTION.MOVE_TO_NEXT:
      return { ...state, index: state.index + 1, answer: null };
    case ACTION.FINISH_QUIZ:
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case ACTION.RESTART_QUIZ:
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highScore: state.highScore,
      };

    default:
      throw new Error("something goes wrong...");
  }
};

function App() {
  const [{ questions, status, index, answer, points, highScore }, dispatch] =
    useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) =>
        dispatch({ type: ACTION.DATA_RECEIVED, payload: { data } })
      )
      .catch(() => dispatch({ type: ACTION.DATA_FAILED }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Container>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <NextQuestion
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestions={numQuestions}
            />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Container>
    </div>
  );
}

export default App;
