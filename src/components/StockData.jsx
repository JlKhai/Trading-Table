import React, { useEffect, useState } from "react";
import finnHub from "../apis/finnHub";

const StockData = ({ symbol }) => {
  const [stockData, setStockData] = useState();
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const { data } = await finnHub.get("/stock/profile2", {
          params: {
            symbol,
          },
        });
        console.log(data);
        if (isMounted) {
          setStockData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => (isMounted = false);
  }, [symbol]);
  return (
    <div className="mt-9 shadow flex justify-between p-2 ">
      <div className="p-2">
        <p>
          <span className=" font-bold">name : </span>
          {stockData?.name}
        </p>
        <p>
          <span className=" font-bold">country : </span> {stockData?.country}
        </p>
        <p>
          <span className=" font-bold">ticker : </span> {stockData?.ticker}
        </p>
      </div>
      <div className="p-2">
        <p>
          <span className=" font-bold">Exchange : </span> {stockData?.exchange}
        </p>
        <p>
          <span className=" font-bold">industry : </span>
          {stockData?.finnhubIndustry}
        </p>
        <p>
          <span className=" font-bold">IPO : </span> {stockData?.ipo}
        </p>
      </div>
      <div className="p-2">
        <p>
          <span className=" font-bold">MakerCap : </span>
          {stockData?.marketCapitalization}
        </p>
        <p>
          <span className=" font-bold">Share Outstanding : </span>
          {stockData?.shareOutstanding}
        </p>
        <p>
          <span className=" font-bold">url : </span>{" "}
          <a href={stockData?.weburl}>"https://www.amazon.com/"</a>
        </p>
      </div>
    </div>
  );
};

export default StockData;
