import "./index.css";
import Container from "./Container";
import Header from "./Header";
import { useEffect, useReducer } from "react";

const initialState = {
  questions: [],
  // loading , error , ready , active , finished
  status: "loading",
};
const ACTION = {
  DATA_RECEIVED: "data-received",
  DATA_FAILED: "data-failed",
};
const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.DATA_RECEIVED:
      return { ...state, questions: action.payload.data, status: "ready" };
    case ACTION.DATA_FAILED:
      return { ...state, status: "error" };

    default:
      throw new Error("something goes wrong...");
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
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
        <p>1/15</p>
        <p>Question ?</p>
      </Container>
    </div>
  );
}

export default App;
