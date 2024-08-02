import { getProfitPool } from "@/api/pools/queries";
import { formatNumber } from "@/utils/formatNumber";
import { useEffect, useState } from "react";

const UserProfitPool = ({
  address,
  token,
  noSymbol
}: {
  address: `0x${string}`;
  token: string;
  noSymbol?: boolean;
}) => {
  const [userProfit, setUserProfit] = useState(0);
  useEffect(() => {
    getProfitPool("lending", address, token).then(data => {
      setUserProfit(data);
    });
  }, [address]);

  return (
    <div>
      {userProfit > 0.01
        ? Number(formatNumber(userProfit)).toFixed(2)
        : userProfit > 0 && userProfit < 0.01
        ? "<0.01"
        : 0}{" "}
      {!noSymbol && "$"}
    </div>
  );
};

export default UserProfitPool;
