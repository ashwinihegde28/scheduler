export function getAppointmentsForDay(state, day) {
  const res = [];
  const dayData = state.days.find((dayObj) => dayObj.name === day);
  if (!dayData) {
    return [];
  }
  return dayData.appointments.map((id) => state.appointments[id]);
}

// Add the info of the interviewer for an existing interview
export function getInterview(state, interview) {
  if (interview) {
    const interviewer = state.interviewers[interview.interviewer];
    return { ...interview, interviewer };
  }
  return null;
}

export function getInterviewersForDay(state, day) {
  const dayData = state.days.find((dayObj) => dayObj.name === day);
  if (!dayData) {
    return [];
  }
  return dayData.interviewers.map((id) => state.interviewers[id]);
}
