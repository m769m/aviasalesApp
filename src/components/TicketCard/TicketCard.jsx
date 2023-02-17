import React from "react";
import sha256 from "crypto-js/sha256";
import Base64 from "crypto-js/enc-base64";
import PropTypes from "prop-types";
import { format } from "date-fns";

import classes from "./TicketCard.module.scss";

const TicketCard = ({ carrier, price, segments }) => {
  const getTimeDuration = (mins) => {
    const hours = Math.trunc(mins / 60);
    const minutes = mins % 60;

    return `${hours}Ч ${minutes}М`;
  };

  const formattingTimeEndPoint = (date, duration) => {
    return format(new Date(new Date(date).getTime() + duration * 60000), "HH:mm");
  };

  const formattingTimeStartPoint = (date) => {
    return format(new Date(date), "HH:mm");
  };

  return (
    <div className={`${classes.ticketCard} ${classes["ticketCard-position"]}`}>
      <div className={`${classes.ticketCard__header} ${classes["ticketCard__header-position"]}`}>
        <span className={classes.ticketCard__price}>{price} р</span>
        <img className={classes.ticketCard__img} src={`https://pics.avs.io/99/36/${carrier}.png`} alt="logo" />
      </div>

      {segments.map((element, i) => {
        const segmentId = Base64.stringify(sha256(JSON.stringify(i)));

        return (
          <div
            key={segmentId}
            className={`${classes["ticketCard__info-block"]} ${classes["ticketCard__info-block-position"]}`}
          >
            <div>
              <div className={classes["ticketCard__info-block-title"]}>
                {element.origin} – {element.destination}
              </div>

              <div className={classes["ticketCard__info-block-text"]}>
                {formattingTimeStartPoint(element.date)} – {formattingTimeEndPoint(element.date, element.duration)}
              </div>
            </div>

            <div>
              <div className={classes["ticketCard__info-block-title"]}>в пути</div>
              <div className={classes["ticketCard__info-block-text"]}>{getTimeDuration(element.duration)}</div>
            </div>

            <div>
              <div className={classes["ticketCard__info-block-title"]}>{element.stops.length} пересадки</div>
              <div className={classes["ticketCard__info-block-text"]}>{element.stops.join(", ")}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

TicketCard.propTypes = {
  carrier: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  segments: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};

export default TicketCard;
