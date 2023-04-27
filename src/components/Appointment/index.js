import React from "react";
import Header from "components/Appointment/Header.js";
import Empty from "components/Appointment/Empty.js";
import Show from "components/Appointment/Show.js";
import Confirm from "components/Appointment/Confirm.js";
import useVisualMode from "../../hooks/useVisualMode.js";
import Form from "./Form";
import Status from "./Status.js";
import Error from "components/Appointment/Error.js";
import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  //When props.interview contains a value, then we want to pass useVisualMode the SHOW mode, if it is empty then we should pass EMPTY.
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  // This function will call the cancelInterview function in the Application component and wait for it to complete before displaying a new mode with deleting status, then render empty component.
  function deleteAppointment() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((err) => {
        transition(ERROR_DELETE, true);
      });
  }
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          interviewer={props.interviewer}
          onSave={save}
          bookInterview={props.bookInterview}
          onCancel={() => back(EMPTY)}
          name={props.name}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onConfirm={deleteAppointment}
          onCancel={back}
        />
      )}
      {/* When user confirms to delete the appointmnet. */}
      {mode === DELETING && <Status message="Deleting..." />}

      {/* When user confirms to delete the appointmnet. */}
      {mode === SAVING && <Status message="Saving..." />}

      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          name={props.interview.name}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === ERROR_SAVE && <Error message={"Error Save"} onClose={back} />}
      {mode === ERROR_DELETE && (
        <Error message={"Error Deleting"} onClose={back} />
      )}
    </article>
  );
}
