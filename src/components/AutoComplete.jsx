import React, { useContext, useEffect, useState } from "react";
import finnHub from "../apis/finnHub";
import { WatchListContext } from "../context/watchListContext";

const AutoComplete = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  // console.log(results);
  const { addStock } = useContext(WatchListContext);

  const renderDropdown = () => {
    const dropDownClass = search ? null : "hidden";
    return (
      <ul
        className={`z-10 ${dropDownClass} py-2 text-sm text-gray-700 dark:text-gray-200 p-2 h-44 overflow-x-hidden w-72 bg-gray-50`}
      >
        {results.map((result, index) => {
          return (
            <li
              onClick={() => {
                addStock(result.symbol);
                setSearch("");
              }}
              className="text-sm w-fit cursor-pointer hover:bg-gray-200"
              key={index}
            >
              {result?.description} ({result?.symbol})
            </li>
          );
        })}
      </ul>
    );
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const { data } = await finnHub.get("/search", {
          params: {
            q: search,
          },
        });
        // console.log(data.result);
        if (isMounted) {
          setResults(data.result);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (search.length > 0) {
      fetchData();
    } else {
      setResults([]);
    }
    return () => {
      isMounted = false;
    };
  }, [search]);

  return (
    <div className="mb-14 w-50  rounded mx-auto">
      <div className=" bg-white divide-y divide-gray-100 shadow">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text "
          placeholder="Search"
          autoComplete="off"
          className="
       bg-gray-100 p-2 text-gray-800 outline-none rounded w-72"
        />
        {renderDropdown()}
      </div>
    </div>
  );
};

export default AutoComplete;
