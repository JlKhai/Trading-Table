import { useEffect, useState } from "react";
import finnHub from "../apis/finnHub";

const StockList = () => {
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);
  const [stock, setStock] = useState();

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
  }, []);

  return (
    <div>
      <table className="table-auto mt-5">
        <thead>
          <tr>
            <th>Name</th>
            <th>Last</th>
            <th>Chg</th>
            <th>Chg%</th>
            <th>High</th>
            <th>Low</th>
            <th>Open</th>
            <th>Pclose</th>
          </tr>
        </thead>
        <tbody>
          {stock?.map((stockData) => {
            return (
              <tr key={stockData.symbol}>
                <th>{stockData.symbol}</th>
                <td>{stockData.data.c}</td>
                <td>{stockData.data.d}</td>
                <td>{stockData.data.dp}</td>
                <td>{stockData.data.h}</td>
                <td>{stockData.data.l}</td>
                <td>{stockData.data.o}</td>
                <td>{stockData.data.pc}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StockList;
