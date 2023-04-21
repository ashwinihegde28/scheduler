export function getAppointmentsForDay(state, day) {
  const res = [];
  const dayData = state.days.find((dayObj) => dayObj.name === day);

  if (!dayData) {
    return [];
  }

  return dayData.appointments.map((id) => state.appointments[id]);
}
