import { getAreaChartAllIntervals, getPools } from "@/api/pools/queries";
import { LendingAsset } from "@/pagesComponents/AssetsPages/LendingAsset"

const LendingAssetPage = async ({ params } : {
  params: { [key: string]: string }
}) => {
  const pools = await getPools('lending');
  const token = pools?.find(item => item.rebalancerAddress === params.poolAddress)?.token;
  const chartData = await getAreaChartAllIntervals(token); 

  return <LendingAsset pools={pools} chartData={chartData}/>
}

export default LendingAssetPage