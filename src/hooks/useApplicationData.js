import { useState, useEffect } from "react";
import axios from "axios";

export default function useVisualMode(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });
  const setDay = (day) => setState({ ...state, day });
  useEffect(() => {
    const promiseDays = axios.get("/api/days");
    const promiseAppointments = axios.get("/api/appointments");
    const promiseInterviewers = axios.get("/api/interviewers");

    Promise.all([promiseDays, promiseAppointments, promiseInterviewers]).then(
      (values) => {
        setState((prev) => ({
          ...prev,
          days: values[0].data,
          appointments: values[1].data,
          interviewers: values[2].data,
        }));
      }
    );
  }, []);

  function numOfSpots(reqType) {
    const days = state.days.map((day) => {
      if (day.name === state.day) {
        // while creating new appointmnet
        if (reqType === "bookInterview") {
          return { ...day, spots: day.spots - 1 };
        } else {
          return { ...day, spots: day.spots + 1 };
        }
      }
      return day;
    });
    return days;
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
    };

    const preInterview = appointment.interview;
    appointment.interview = { ...interview };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    let days = state.days;

    return axios.put(`/api/appointments/${id}`, appointment).then((res) => {
      //In case of edit interview will not be null so we dont need to change the spots count.
      if (!preInterview) {
        days = numOfSpots("bookInterview");
      }

      setState({
        ...state,
        appointments,
        days,
      });
    });
  }

  // Remove the interview from the appointments state using DELETE request
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then((res) => {
      const days = numOfSpots();
      setState({
        ...state,
        appointments,
        days,
      });
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
