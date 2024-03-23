import { getPools } from "@/api/pools/queries";
import { LendingAsset } from "@/pagesComponents/AssetsPages/LendingAsset"

const LendingAssetPage = async () => {
  const pools = await getPools('lending');

  return <LendingAsset pools={pools}/>
}

export default LendingAssetPage