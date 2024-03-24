import { getChartData, getPools } from "@/api/pools/queries";
import { LendingAsset } from "@/pagesComponents/AssetsPages/LendingAsset"

const LendingAssetPage = async () => {
  const pools = await getPools('lending');
  const chartData = await getChartData(1, 30);

  return <LendingAsset pools={pools} chartData={chartData}/>
}

export default LendingAssetPage