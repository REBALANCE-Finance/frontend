import { getChartData, getPools } from "@/api/pools/queries";
import { PoolLayout } from "@/layout/PoolLayout";
import { PoolsLending } from "@/pagesComponents/Pools/PoolsLending";

const LendingPage = async ({searchParams} : {
  searchParams: any
}) => {
  const pools = await getPools('lending');
  const { interval, intervals} = searchParams;
  const chartData = await getChartData(+interval || 1, +intervals || 30);  

  return (
    <PoolLayout pools={pools} chartData={chartData.chartData}>
      <PoolsLending pools={pools} />
    </PoolLayout>
  );
};

export default LendingPage;