import { getTotalProfit } from "@/api/pools/queries";
import { formatNumber } from "@/utils/formatNumber";
import { useEffect, useState } from "react";

const UserProfit = ({ address }: { address: `0x${string}` }) => {
  const [userProfit, setUserProfit] = useState(0);
  useEffect(() => {
    getTotalProfit("lending", address).then(data => {
      setUserProfit(data);
    });
  }, [address]);
  return <div>{Number(formatNumber(userProfit)).toFixed(2)} $</div>;
};

export default UserProfit;
