import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setSearchId } from "../../store/slices/cardSlice";
import fetchTickets from "../../store/slices/ActionAsyncCreater";
import logo from "../../assets/images/Logo.svg";
import Filter from "../Filters/Filters";
import Sorting from "../Sorting/Sorting";
import TicketsList from "../TicketsList/TicketsList";

import classes from "./App.module.scss";

function App() {
  const dispatch = useDispatch();
  const { tickets, isLoading, searchId, isError } = useSelector((state) => state.ticketData);

  const fetchId = async () => {
    const { data } = await axios.get("https://aviasales-test-api.kata.academy/search");
    return data.searchId;
  };

  useEffect(() => {
    fetchId().then((id) => {
      dispatch(setSearchId(id));
    });
  }, []);

  useEffect(() => {
    if (isLoading) {
      dispatch(fetchTickets(searchId));
    }
  }, [isError, tickets, isLoading]);

  return (
    <div className={`${classes.app} ${classes["app-container"]}`}>
      <header className={`${classes["app__logo-container"]} ${classes["app__logo-container-position"]}`}>
        {isLoading ? (
          <TailSpin height={89} width={60} ariaLabel="loading-indicator" />
        ) : (
          <img src={logo} alt="логотип" />
        )}
      </header>

      <main className={classes.app__main}>
        <section>
          <Filter />
        </section>

        <section>
          <Sorting />
          <TicketsList />
        </section>
      </main>
    </div>
  );
}

export default App;
