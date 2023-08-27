import { useParams } from "react-router-dom";
import finnHub from "../apis/finnHub";
import { useEffect } from "react";

const StockDetailPage = () => {
  const { symbol } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date();
      const currentTime = Math.floor(date.getTime() / 1000);

      let oneDay;
      if (date.getDay() === 6) {
        oneDay = currentTime - 1 * 24 * 60 * 60;
      } else if (date.getDay() === 0) {
        oneDay = currentTime - 2 * 24 * 60 * 60;
      } else {
        oneDay = currentTime - 24 * 60 * 60;
      }

      const oneWeek = currentTime - 7 * 24 * 60 * 60;
      const oneYear = currentTime - 365 * 24 * 60 * 60;

      try {
        const responses = await Promise.all([
          finnHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneDay,
              to: currentTime,
              resolution: 30,
            },
          }),
          finnHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneWeek,
              to: currentTime,
              resolution: 60,
            },
          }),
          finnHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneYear,
              to: currentTime,
              resolution: "W",
            },
          }),
        ]);
        console.log(responses);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log(symbol);
  return <div>StockDetailPage : {symbol}</div>;
};

export default StockDetailPage;
