import { getChartData, getPools } from "@/api/pools/queries";
import { BorrowAsset } from "@/pagesComponents/AssetsPages/BorrowAsset"

const BorrowingAssetPage = async ({ searchParams } : {
  searchParams: any
}) => {
  const pools = await getPools('lending');
  console.log(pools);
  
  const { interval, intervals} = searchParams;
  const chartData = await getChartData(+interval || 1, +intervals || 30); 
  

  return <BorrowAsset pools={pools} chartData={chartData}/>
}

export default BorrowingAssetPage