import AutoComplete from "../components/AutoComplete";
import StockList from "../components/StockList";

const StockOverviewPage = () => {
  return (
    <div className="flex justify-center flex-col items-center">
      StockOverviewPage
      <AutoComplete />
      <StockList />
    </div>
  );
};

export default StockOverviewPage;
