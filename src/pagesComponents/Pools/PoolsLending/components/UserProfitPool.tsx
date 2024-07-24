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
      {formatNumber(userProfit)} {!noSymbol && "$"}
    </div>
  );
};

export default UserProfitPool;
