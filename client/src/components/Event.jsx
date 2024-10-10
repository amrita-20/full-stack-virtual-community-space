import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import "../css/Event.css";
import EventsAPI from "../services/EventsAPI";

const Event = (props) => {
  return (
    <article className="event-information">
      <img src={props.image} />

      <div className="event-information-overlay">
        <div className="text">
          <h3>{props.title}</h3>
          <p>
            <i className="fa-regular fa-calendar fa-bounce"></i>{" "}
            {format(new Date(props.date), "MM/dd/yyyy")} <br /> {props.time}
          </p>
          <p id={`remaining-${props.id}`}>{props.type}</p>
          <p>{props.status}</p>
        </div>
      </div>
    </article>
  );
};

export default Event;
