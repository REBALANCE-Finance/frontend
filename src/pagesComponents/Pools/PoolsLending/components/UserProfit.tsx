import { getTotalProfit } from "@/api/pools/queries";
import { formatNumber } from "@/utils/formatNumber";
import { useEffect, useState } from "react";

const UserProfit = ({address} : {address: `0x${string}`}) => {
  const [ userProfit, setUserProfit ] = useState(0);
  useEffect(() => {
    getTotalProfit("lending", address)
      .then((data) => {
        setUserProfit(data);
      });
  }, [address])
  return (
    <div>
      {formatNumber(userProfit)} $
    </div>
  );
};

export default UserProfit;