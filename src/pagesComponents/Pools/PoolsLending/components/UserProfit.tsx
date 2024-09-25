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

  return <div>{Number(formatNumber(userProfit)).toFixed(2)} $</div>;
});

export default UserProfit;
