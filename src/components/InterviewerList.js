import React from "react";
import InterviewerListItem from "components/InterviewerListItem.js";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  //  we have-interviews,value and onChange passes in props
  const { value, onChange } = props;
  let interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === value}
        setInterviewer={() => onChange(interviewer.id)}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewers</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}
