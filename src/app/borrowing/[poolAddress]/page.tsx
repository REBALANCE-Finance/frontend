import { getPools } from "@/api/pools/queries";
import { BorrowAsset } from "@/pagesComponents/AssetsPages/BorrowAsset"

const BorrowingAssetPage = async () => {
  const pools = await getPools('lending');

  return <BorrowAsset pools={pools}/>
}

export default BorrowingAssetPage