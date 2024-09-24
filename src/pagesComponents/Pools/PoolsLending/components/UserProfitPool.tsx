import { getProfitPool } from "@/api/pools/queries";
import { performWagmiChainName } from "@/utils";
import { formatNumber } from "@/utils/formatNumber";
import { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";

const UserProfitPool = ({
  address,
  token,
  noSymbol
}: {
  address: `0x${string}`;
  token: string;
  noSymbol?: boolean;
}) => {
  const { chain } = useAccount();
  const [userProfit, setUserProfit] = useState(0);

  const chainName = useMemo(() => {
    return performWagmiChainName(chain?.name || "Arbitrum");
  }, [chain?.name]);

  useEffect(() => {
    getProfitPool("lending", address, token, chainName).then(data => {
      setUserProfit(data);
    });
  }, [address, chainName]);

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
