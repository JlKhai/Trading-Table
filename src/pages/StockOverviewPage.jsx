import AutoComplete from "../components/AutoComplete";
import Contactme from "../components/ContactMe";
import StockList from "../components/StockList";

const StockOverviewPage = () => {
  return (
    <div className="flex justify-center flex-col items-center h-screen">
      <img
        src={
          "https://i.pinimg.com/236x/a9/76/02/a9760243f94345114cdf70626795ebcc.jpg"
        }
        alt=""
      />
      <AutoComplete />
      <StockList />
      <Contactme />
    </div>
  );
};

export default StockOverviewPage;
