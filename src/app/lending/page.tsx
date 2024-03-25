import { getAreaChartAllIntervals, getChartData, getPools } from "@/api/pools/queries";
import { PoolLayout } from "@/layout/PoolLayout";
import { PoolsLending } from "@/pagesComponents/Pools/PoolsLending";

const LendingPage = async () => {
  const pools = await getPools('lending');
  const chartData = await getAreaChartAllIntervals(); 

  return (
    <PoolLayout pools={pools} chartData={chartData}>
      <PoolsLending pools={pools} />
    </PoolLayout>
  );
};

export default LendingPage;