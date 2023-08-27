import React, { useContext, useEffect, useState } from "react";
import finnHub from "../apis/finnHub";
import { WatchListContext } from "../context/watchListContext";

const AutoComplete = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const renderDropdown = () => {
    const dropDownClass = search ? null : "hidden";

    const { addStock } = useContext(WatchListContext);

    return (
      <ul
        className={`${dropDownClass} py-2 text-sm text-gray-700 dark:text-gray-200`}
      >
        {/* {results?.map((result,index) => {
          return <li key={index}>{result?.symbol}</li>;
        })} */}
        <li>abc</li>
        <li>def</li>
        <li>abc</li>
      </ul>
    );
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finnHub.get("/search", {
          params: {
            q: search,
          },
        });
        // console.log(response.data);
        if (isMounted) {
          setResults(response.data);
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
    <div className="w-50 p-5 rounded mx-auto">
      <div className=" bg-white  divide-y divide-gray-100 shadow">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text "
          placeholder="Search"
          className="
       bg-gray-50 p-3 outline-none rounded "
        />
        {renderDropdown()}
      </div>
    </div>
  );
};

export default AutoComplete;
