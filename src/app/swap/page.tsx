
import { Box } from "@chakra-ui/react";
import Header from "./components/Header/Header";
import Pay from "./components/Pay/Pay";
import Receive from "./components/Receive/Receive";
import Fee from "./components/Fee/Fee";
import { ICON_NAMES } from "@/consts";
import Icon from "@/components/icon";

const Swap = () => {
  return (
    <Box
      borderRadius="4px"
      w="540px"
      m="60px auto auto"
      background="#151619"
      p="24px 20px">
      <Header />
      <Box position="relative">
        <Box
          cursor="pointer"
          border="6px solid #151619"
          borderRadius="8px"
          padding="4px"
          position="absolute"
          top="50%" left="50%" transform="translate(-50%, -50%)">
          <Icon name={ICON_NAMES.swap} />
        </Box>
        <Pay />
        <Receive />
      </Box>
      <Fee />
    </Box>
  );
}

export default Swap;