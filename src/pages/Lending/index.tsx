import { Box } from "@chakra-ui/react";
import { Icon } from "../../components/common/icon";
import { ICON_NAMES } from "../../consts";

export const Lending = () => {
  return (
    <Box w="24px" h="24px">
      <Icon name={ICON_NAMES.notification} />
    </Box>
  );
};
