import { PoolLayout } from "@/layout/PoolLayout";
import { PoolsLending } from "@/pagesComponents/Pools/PoolsLending";

const LendingPage = () => {
  return (
    <PoolLayout>
      <PoolsLending />
    </PoolLayout>
  );
};

export default LendingPage;