import React from "react";
import classes from "./FinishedQuiz.module.css";
import Button from "./../UI/Button/Button";
import { Link } from "react-router-dom";

const FinishedQuiz = (props) => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === "success") {
      total++;
    }
    return total;
  }, 0);

  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {props.quiz.map((quizItem, index) => {
          const item = props.results[quizItem.id];
          const cls = [
            "fa",
            item === "error" ? "fa-times" : "fa-check",
            classes[item],
          ];
          return (
            <li key={index}>
              <strong>{index + 1}</strong>. &nbsp;
              {quizItem.question}
              <i className={cls.join(" ")} />
            </li>
          );
        })}
      </ul>
      <p>
        Correct {successCount} out of {props.quiz.length}
      </p>

      <div>
        <Button onClick={props.onRetry} type="primary">
          Again
        </Button>
        <Link to='/'>
          <Button onClick={props.onRetry} type="success">
            Go to the list of tests
          </Button>
        </Link>
        
      </div>
    </div>
  );
};
export default FinishedQuiz;
