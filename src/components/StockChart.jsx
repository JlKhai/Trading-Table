import { useState } from "react";
import Chart from "react-apexcharts";
import StockData from "./StockData";

const StockChart = ({ chartData, symbol }) => {
  const [dataFormat, setDateFormat] = useState("24h");

  const { day, week, year } = chartData;

  const determineTimeFormat = () => {
    switch (dataFormat) {
      case "24":
        return day;
      case "7d":
        return week;
      case "1y":
        return year;
      default:
        return day;
    }
  };
  const color =
    determineTimeFormat()[determineTimeFormat().length - 1].y -
      determineTimeFormat()[0].y >
    0
      ? "#26C281"
      : "#ed3419";

  const options = {
    colors: [color],
    title: {
      text: symbol,
      align: "center",
      style: {
        fontSize: "24px",
      },
    },
    chart: {
      id: "stock data",
      animations: {
        speed: 1300,
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
      },
    },
    tooltip: {
      x: {
        format: "MMM dd HH:MM",
      },
    },
  };

  const series = [
    {
      name: symbol,
      data: determineTimeFormat(),
    },
  ];

  const renderButton = (btn) => {
    const classes =
      "p-2 select-none rounded mr-1 shadow-lg hover:text-white hover:bg-blue-500 border ";
    if (btn === dataFormat) {
      return classes + "bg-blue-700 text-white";
    } else {
      return classes;
    }
  };
  return (
    <div className=" mt-8 p-4 shadow-sm bg-white">
      <Chart options={options} series={series} type="area" width="100%" />
      <div className=" mt-4">
        <button
          className={renderButton("24h")}
          onClick={() => setDateFormat("24h")}
        >
          24h
        </button>
        <button
          className={renderButton("7d")}
          onClick={() => setDateFormat("7d")}
        >
          7d
        </button>
        <button
          className={renderButton("1y")}
          onClick={() => setDateFormat("1y")}
        >
          1y
        </button>
      </div>
      <StockData symbol={symbol} />
    </div>
  );
};

export default StockChart;
