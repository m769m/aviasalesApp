import React from "react";
import { useDispatch, useSelector } from "react-redux";
import sha256 from "crypto-js/sha256";
import Base64 from "crypto-js/enc-base64";

import TicketCard from "../TicketCard/TicketCard";
import { setCount } from "../../store/slices/cardSlice";

import classes from "./TicketsList.module.scss";

const TicketsList = () => {
  const dispatch = useDispatch();

  const { active, sorting } = useSelector((state) => state.filtersData);
  const { tickets, count } = useSelector((state) => state.ticketData);

  const updateCount = (oldCount) => {
    const newCount = oldCount + 5;
    dispatch(setCount(newCount));
  };

  const sortTickets = (dataTickets, filter) => {
    switch (filter) {
      case "price":
        return dataTickets.sort((a, b) => +a.price - +b.price);
      case "fast":
        return dataTickets.sort((a, b) => {
          const first = a.segments[0].duration + a.segments[1].duration;
          const second = b.segments[0].duration + b.segments[1].duration;

          return first - second;
        });
      case "optimal":
        return dataTickets.sort((a, b) => {
          const first = a.segments[0].duration + a.segments[1].duration + +a.price;
          const second = b.segments[0].duration + b.segments[1].duration + +b.price;

          return first - second;
        });
      default:
        return dataTickets;
    }
  };

  const activeTickets = (dataActive, dataTickets) => {
    let newDataTickets = [];

    if (dataActive.length === 0) {
      newDataTickets = [];
    }

    if (dataActive.length === 4) {
      newDataTickets = [...dataTickets];
    } else {
      if (dataActive.includes("Без пересадок")) {
        const filterData = dataTickets.filter((el) => {
          return el.segments[0].stops.length === 0 && el.segments[1].stops.length === 0;
        });

        newDataTickets = [...newDataTickets, ...filterData];
      }

      if (dataActive.includes("1 пересадка")) {
        const filterData = dataTickets.filter((el) => {
          return el.segments[0].stops.length === 1 && el.segments[1].stops.length === 1;
        });

        newDataTickets = [...newDataTickets, ...filterData];
      }

      if (dataActive.includes("2 пересадки")) {
        const filterData = dataTickets.filter((el) => {
          return el.segments[0].stops.length === 2 && el.segments[1].stops.length === 2;
        });

        newDataTickets = [...newDataTickets, ...filterData];
      }

      if (dataActive.includes("3 пересадки")) {
        const filterData = dataTickets.filter((el) => {
          return el.segments[0].stops.length === 3 && el.segments[1].stops.length === 3;
        });

        newDataTickets = [...newDataTickets, ...filterData];
      }
    }

    return newDataTickets;
  };

  const ticketsActive = activeTickets(active, tickets);
  const ticketsSorted = sortTickets(ticketsActive, sorting);

  if (ticketsSorted.length > 0) {
    return (
      <div className={classes.tickets}>
        <div className={classes["tickets__list--position"]}>
          {ticketsSorted?.slice(0, count).map((ticket) => {
            const ticketId = Base64.stringify(sha256(JSON.stringify(ticket)));

            return (
              <TicketCard key={ticketId} carrier={ticket.carrier} price={ticket.price} segments={ticket.segments} />
            );
          })}
        </div>

        <button onClick={() => updateCount(count)} className={classes["tickets__more-btn"]} type="button">
          показать ещё 5 билетов
        </button>
      </div>
    );
  }

  return (
    <div className={classes["tickets__not-found"]}>
      <span className={classes["tickets__not-found-text"]}>Рейсов, подходящих под заданные фильтры, не найдено</span>
    </div>
  );
};

export default TicketsList;
