import { getPools } from "@/api/pools/queries";
import { PoolLayout } from "@/layout/PoolLayout";
import { PoolsLending } from "@/pagesComponents/Pools/PoolsLending";

const LendingPage = async () => {
  const pools = await getPools('lending');

  return (
    <PoolLayout pools={pools}>
      <PoolsLending pools={pools} />
    </PoolLayout>
  );
};

export default LendingPage;