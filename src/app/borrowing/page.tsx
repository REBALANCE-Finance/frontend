import { getChartData, getPools } from "@/api/pools/queries";
import { PoolLayout } from "@/layout/PoolLayout";
import { PoolsBorrow } from "@/pagesComponents/Pools/PoolsBorrow";

const BorrowingPage = async ({searchParams} : {
  searchParams: any
}) => {
  const pools = await getPools('lending');
  const { interval, intervals} = searchParams;
  const chartData = await getChartData(+interval || 1, +intervals || 30, 'usdt');
  return (
    <PoolLayout pools={pools} chartData={chartData.chartData}>
      <PoolsBorrow pools={pools}/>
    </PoolLayout>
  );
};

export default BorrowingPage;