import { getTotalProfit } from "@/api/pools/queries";
import { useStore } from "@/hooks/useStoreContext";
import { formatNumber } from "@/utils/formatNumber";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useState } from "react";

const UserProfit = observer(({ address }: { address: `0x${string}` }) => {
  const [userProfit, setUserProfit] = useState(0);
  const { activeChain } = useStore("poolsStore");

  useEffect(() => {
    getTotalProfit("lending", address, activeChain).then(data => {
      setUserProfit(data);
    });
  }, [address, activeChain]);

  // Format with 4 decimals if < $10, otherwise 2 decimals
  const formatProfit = (value: number) => {
    if (value === 0) return "0";
    if (value < 0.0001) return "<0.0001";
    if (value < 10) return value.toFixed(4);
    return Number(formatNumber(value)).toFixed(2);
  };

  return <div>{formatProfit(userProfit)} $</div>;
});

export default UserProfit;
