import { getTotalProfit } from "@/api/pools/queries";
import { performWagmiChainName } from "@/utils";
import { formatNumber } from "@/utils/formatNumber";
import { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";

const UserProfit = ({ address }: { address: `0x${string}` }) => {
  const { chain } = useAccount();
  const [userProfit, setUserProfit] = useState(0);

  const chainName = useMemo(() => {
    return performWagmiChainName(chain?.name || "Arbitrum");
  }, [chain?.name]);

  useEffect(() => {
    getTotalProfit("lending", address, chainName).then(data => {
      setUserProfit(data);
    });
  }, [address, chainName]);

  return <div>{Number(formatNumber(userProfit)).toFixed(2)} $</div>;
};

export default UserProfit;
