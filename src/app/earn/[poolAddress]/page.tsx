import { getAreaChartAllIntervals, getPools } from "@/api/pools/queries";
import { LendingAsset } from "@/pagesComponents/AssetsPages/LendingAsset";
import { IPoolData, IAreaChartData } from "@/api/pools/types";

const LendingAssetPage = async ({ params }: { params: { [key: string]: string } }) => {
  let pools: IPoolData[] = [];
  let chartData: IAreaChartData | null = null;
  let loading = true;
  let error: string | null = null;

  try {
    pools = await getPools("lending");
    if (!pools) {
      throw new Error("Failed to fetch pools data");
    }

    const token = pools.find(item => item.rebalancerAddress === params.poolAddress)?.token;
    if (!token) {
      throw new Error("Token not found for the provided pool address");
    }

    chartData = await getAreaChartAllIntervals(token);
    if (!chartData) {
      throw new Error("Failed to fetch chart data");
    }

    loading = false;
  } catch (err) {
    console.error("Error loading lending asset page:", err);

    if (err instanceof Error) {
      error = err.message;
    } else {
      error = "An unknown error occurred";
    }

    loading = false;
  }

  return <LendingAsset pools={pools} chartData={chartData} loading={loading} error={error} />;
};

export default LendingAssetPage;
