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
  }
);

export default UserProfitPool;
