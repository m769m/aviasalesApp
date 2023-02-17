import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";

import { setFilters, setActiveFilters } from "../../store/slices/filtersSlice";

import classes from "./Filters.module.scss";

const Filters = () => {
  const filters = useSelector((state) => state.filtersData.filters);
  const dispatch = useDispatch();

  const changeFilterConfig = (event) => {
    const { name, checked } = event.target;

    if (name === "All") {
      const tempFilter = filters.map((filter) => {
        return { ...filter, isChecked: checked };
      });

      dispatch(setFilters(tempFilter));
    } else {
      const tempFilter = filters.map((filter) => (filter.name === name ? { ...filter, isChecked: checked } : filter));

      dispatch(setFilters(tempFilter));
    }
  };

  useEffect(() => {
    const activeFilters = filters.map((el) => {
      if (el.isChecked) {
        return el.name;
      }

      return null;
    });

    dispatch(setActiveFilters(activeFilters));
  }, [filters]);

  return (
    <form className={classes.filters}>
      <h2 className={`${classes.filters__title} ${classes["filters__title-position"]}`}>Количество пересадок</h2>

      <ul>
        <li className={classes.filters__item}>
          <input
            id="All"
            name="All"
            type="checkbox"
            checked={filters.filter((item) => !item.isChecked).length < 1}
            onChange={changeFilterConfig}
          />
          <label className={classes["filters__item-label"]} htmlFor="All">
            Все
          </label>
        </li>

        {filters.map((filter) => (
          <li key={filter.name} className={classes.filters__item}>
            <input
              id={filter.name}
              type="checkbox"
              name={filter.name}
              checked={filter.isChecked}
              onChange={changeFilterConfig}
            />
            <label className={classes["filters__item-label"]} htmlFor={filter.name}>
              {filter.name}
            </label>
          </li>
        ))}
      </ul>
    </form>
  );
};

export default Filters;
