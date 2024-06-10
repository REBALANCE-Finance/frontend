"use client";
import { TOKEN_ICONS } from "@/consts";
import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import Select from "../ui/Select";

const Receive = () => {
  const [selected, setSelected] = useState<string>(Object.keys(TOKEN_ICONS)[1]);
  return (
    <Box
      background="#09090B"
      p="20px 24px"
      borderRadius="4px"
      mt="12px">
      <Text color="gray">You receive</Text>
      <Box
        mt="12px"
        display="flex"
        alignItems="center"
        justifyContent="space-between">
        <Select options={TOKEN_ICONS} value={selected} setSelected={setSelected} />
        <Text textStyle="textMono16" color="white">0.40000</Text>
      </Box>

      <Box
        mt="12px"
        display="flex"
        alignItems="center"
        justifyContent="space-between">
        <Text textStyle="textMono16" ml="auto" color="white">$0.4</Text>
      </Box>
    </Box>
  )
};
export default Receive;