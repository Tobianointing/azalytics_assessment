import React from "react";
import { Assets } from "../lib/interfaces/Assets";
import cardStyles from "../styles/Card.module.css";

/* eslint-disable @next/next/no-img-element */
const Card: React.FC<Assets> = (props) => {
  const cardStatusStyle = `
        ${cardStyles.card_status} ${!props.available ? cardStyles.unavailable : ""}
      `;

  return (
    <a href={props.URL} className={cardStyles.card_link} target="_blank"  rel="noreferrer" >
      <div className={cardStyles.card}>
        <img
          className={cardStyles.card_img}
          src={props.logo ? props.logo : "/crypto-placeholder.jpg"}
          alt={"asset-img"}
        />
        <p className={cardStyles.card_text}>{props.name}</p>
        <div className={cardStatusStyle}>
          {props.available ? "Available" : "Unavailable"}
        </div>
      </div>
     </a>
  );
};

export default Card;
