import { getPools } from "@/api/pools/queries";
import { PoolLayout } from "@/layout/PoolLayout";
import { PoolsBorrow } from "@/pagesComponents/Pools/PoolsBorrow";

const BorrowingPage = async () => {
  const pools = await getPools('lending');

  return (
    <PoolLayout pools={pools}>
      <PoolsBorrow pools={pools}/>
    </PoolLayout>
  );
};

export default BorrowingPage;