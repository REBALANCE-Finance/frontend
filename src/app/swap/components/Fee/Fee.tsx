"use client";
import { Box, Text } from "@chakra-ui/react"
import { useState } from "react";

const Fee = () => {
  const [selected, setSelected] = useState();
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      background="#09090B"
      p="20px 24px"
      borderRadius="4px"
      mt="12px">
      <Text fontSize="18px">1 Eth = 1,999999 ARB</Text>
      <Text fontSize="16px" color="grey">Gaz Fee 0.04</Text>
    </Box>
  )
}

export default Fee;