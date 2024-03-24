import { getChartData, getPools } from "@/api/pools/queries";
import { LendingAsset } from "@/pagesComponents/AssetsPages/LendingAsset"

const LendingAssetPage = async ({ searchParams } : {
  searchParams: any
}) => {
  const pools = await getPools('lending');
  const { interval, intervals} = searchParams;
  const chartData = await getChartData(+interval || 1, +intervals || 30); 

  return <LendingAsset pools={pools} chartData={chartData}/>
}

export default LendingAssetPage