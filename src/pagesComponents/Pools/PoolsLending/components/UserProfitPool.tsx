import { getProfitPool } from "@/api/pools/queries";
import { useStore } from "@/hooks/useStoreContext";
import { formatNumber } from "@/utils/formatNumber";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

const UserProfitPool = observer(
  ({ address, token, noSymbol }: { address: `0x${string}`; token: string; noSymbol?: boolean }) => {
    const [userProfit, setUserProfit] = useState(0);
    const { activeChain } = useStore("poolsStore");

    useEffect(() => {
      getProfitPool("lending", address, token, activeChain).then(data => {
        setUserProfit(data);
      });
    }, [address, activeChain, token]);

    // Format with 4 decimals if < $10, otherwise 2 decimals
    const formatProfit = (value: number) => {
      if (value === 0) return "0";
      if (value < 0.0001) return "<0.0001";
      if (value < 10) return value.toFixed(4);
      return Number(formatNumber(value)).toFixed(2);
    };
    
    return (
      <div>
        {formatProfit(userProfit)}{" "}
        {!noSymbol && "$"}
      </div>
    );
  }
);

export default UserProfitPool;
