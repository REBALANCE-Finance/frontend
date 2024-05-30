import { getAreaChartAllIntervals, getChartData, getPools } from "@/api/pools/queries";
import { PoolLayout } from "@/layout/PoolLayout";
import { PoolsLending } from "@/pagesComponents/Pools/PoolsLending";

const LendingPage = async ({params} : {
  params: { [key: string]: string }
}) => {
  const pools = await getPools('lending');
  const token = pools?.find(item => item.rebalancerAddress === params.poolAddress)?.token || pools[0].token;
  const chartData = await getAreaChartAllIntervals(token);

  return (
    <Layout pools={pools} chartData={chartData}>
      <PoolsLending pools={pools} />
    </Layout>
  );
};

export default LendingPage;