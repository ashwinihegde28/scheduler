import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Empty from "components/Appointment/Empty.js";
import Show from "components/Appointment/Show.js";
import useVisualMode from "../../hooks/useVisualMode.js";
import Form from "./Form";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
  //When props.interview contains a value, then we want to pass useVisualMode the SHOW mode, if it is empty then we should pass EMPTY.
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={[props.interview.interviewer]}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} />}
    </article>
  );
}
