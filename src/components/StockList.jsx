import { useContext, useEffect, useState } from "react";
import finnHub from "../apis/finnHub";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { WatchListContext } from "../context/watchListContext";
import { useNavigate } from "react-router-dom";

const StockList = () => {
  const [stock, setStock] = useState();
  const { watchList } = useContext(WatchListContext);
  // console.log(value);

  const nav = useNavigate();
  const handleStockSelete = (stock) => {
    nav(`detail/${stock}`);
  };

  const changeColor = (change) => {
    return change > 0 ? "text-green-500" : "text-red-500";
  };

  const renderIcon = (showIcon) => {
    return showIcon > 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />;
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const responses = [];
      try {
        const responses = await Promise.all(
          watchList.map((stock) => {
            return finnHub.get("/quote", {
              params: {
                symbol: stock,
              },
            });
          })
        );
        // console.log(responses);

        const data = responses.map((response) => {
          return {
            data: response.data,
            symbol: response.config.params.symbol,
          };
        });

        console.log(data);

        if (isMounted) {
          setStock(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    return () => (isMounted = false);
  }, [watchList]);

  return (
    <div className=" z-0">
      <table className="table-auto mt-5">
        <thead className=" bg-gray-200 border-b-2 border-gray-200 ">
          <tr>
            <th className=" p-3 text-sm font-semibold tracking-wide text-left">
              Name
            </th>
            <th className=" p-3 text-sm font-semibold tracking-wide text-left">
              Last
            </th>
            <th className=" p-3 text-sm font-semibold tracking-wide text-left">
              Chg
            </th>
            <th className=" p-3 text-sm font-semibold tracking-wide text-left">
              Chg%
            </th>
            <th className=" p-3 text-sm font-semibold tracking-wide text-left">
              High
            </th>
            <th className=" p-3 text-sm font-semibold tracking-wide text-left">
              Low
            </th>
            <th className=" p-3 text-sm font-semibold tracking-wide text-left">
              Open
            </th>
            <th className=" p-3 text-sm font-semibold tracking-wide text-left">
              Pclose
            </th>
          </tr>
        </thead>
        <tbody>
          {stock?.map((stockData) => {
            return (
              <tr
                onClick={() => handleStockSelete(stockData.symbol)}
                className="border-b-2 bg-gray-50"
                key={stockData.symbol}
              >
                <th className="p-3 text-sm  font-semibold tracking-wide text-left text-blue-500 hover:underline cursor-pointer">
                  {stockData.symbol}
                </th>
                <td className=" p-3 text-sm text-gray-700">
                  {stockData.data.c}
                </td>
                <td className={`${changeColor(stockData.data.d)} p-3 text-sm`}>
                  <span className="flex justify-center items-center gap-2 ">
                    {stockData.data.d} {renderIcon(stockData.data.d)}
                  </span>
                </td>
                <td className={`${changeColor(stockData.data.d)}  p-3 text-sm`}>
                  <span className="flex justify-center items-center gap-2 ">
                    {stockData.data.dp}
                    {renderIcon(stockData.data.d)}
                  </span>
                </td>
                <td className=" p-3 text-sm text-gray-700">
                  {stockData.data.h}
                </td>
                <td className=" p-3 text-sm text-gray-700">
                  {stockData.data.l}
                </td>
                <td className=" p-3 text-sm text-gray-700">
                  {stockData.data.o}
                </td>
                <td className=" p-3 text-sm text-gray-700">
                  {stockData.data.pc}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StockList;
