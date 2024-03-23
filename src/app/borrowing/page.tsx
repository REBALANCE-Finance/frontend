import { PoolLayout } from "@/layout/PoolLayout";
import { PoolsBorrow } from "@/pagesComponents/Pools/PoolsBorrow";

const LendingPage = () => {
  return (
    <PoolLayout>
      <PoolsBorrow />
    </PoolLayout>
  );
};

export default LendingPage;