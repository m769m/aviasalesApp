import { useSelector, useDispatch } from "react-redux/es/exports";

import { setIsPressBtn, setSorting } from "../../store/slices/filtersSlice";

import classes from "./Sorting.module.scss";

const Sorting = () => {
  const dispatch = useDispatch();

  const { isPressBtn } = useSelector((state) => state.filtersData);

  const changeSortingConfig = (event) => {
    const { name } = event.target;
    const resetSortingConfig = {
      btnPrice: false,
      btnFast: false,
      btnOptimal: false,
    };

    dispatch(setSorting(name.split("btn")[1].toLowerCase()));
    dispatch(
      setIsPressBtn({
        ...resetSortingConfig,
        [name]: true,
      }),
    );
  };

  const sortingOptions = [
    {
      id: 0,
      name: "btnPrice",
      content: "Самый дешевый",
    },
    {
      id: 1,
      name: "btnFast",
      content: "Самый быстрый",
    },
    {
      id: 2,
      name: "btnOptimal",
      content: "Оптимальный",
    },
  ];

  return (
    <div className={`${classes.sorting} ${classes["sorting-position"]}`}>
      {Object.keys(isPressBtn).map((btn, i, arr) => {
        let classNamesBtn = `${classes.sorting__btn} ${isPressBtn[btn] ? `${classes["sorting__btn--active"]}` : ""}`;

        if (i === 0) {
          classNamesBtn = `${classNamesBtn} ${classes["sorting__btn--left"]}`;
        } else if (i === arr.length - 1) {
          classNamesBtn = `${classNamesBtn} ${classes["sorting__btn--right"]}`;
        }

        return (
          <button
            key={sortingOptions[i].id}
            className={classNamesBtn}
            onClick={changeSortingConfig}
            type="button"
            name={sortingOptions[i].name}
          >
            {sortingOptions[i].content}
          </button>
        );
      })}
    </div>
  );
};

export default Sorting;
