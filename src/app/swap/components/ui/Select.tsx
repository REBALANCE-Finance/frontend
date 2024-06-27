"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Text,
  Image,
  Skeleton,
  Input,
  InputGroup,
  InputLeftElement,
  SelectProps as ChakraSelectProps,
  Flex,
  ButtonProps
} from "@chakra-ui/react";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { IToken } from "@/api/tokens/types";

export type SelectProps = {
  options: IToken[];
  value: IToken | null;
  setSelected: (token: IToken) => void;
  ButtonProps?: ButtonProps;
};

const Select: React.FC<SelectProps> = ({ options = [], value, setSelected, ButtonProps }) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(
    option =>
      option.symbol.toLowerCase().includes(search.toLowerCase()) ||
      option.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedToken = options.find(option => option.symbol === value?.symbol);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setIsOpen(true);
  };

  const handleMenuItemClick = (option: IToken) => {
    setSelected(option);
    setIsOpen(false);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <Box ref={containerRef} position="relative" zIndex={999}>
      <Button
        border="1px solid #202327"
        backgroundColor="#202327"
        padding="6px 12px"
        borderRadius="4px"
        onClick={() => setIsOpen(!isOpen)}
        rightIcon={<ChevronDownIcon />}
        width="100%"
        {...ButtonProps}
        textAlign="left"
      >
        <Flex alignItems="center">
          {selectedToken ? (
            selectedToken.logoURI ? (
              <Image
                borderRadius={100}
                src={selectedToken.logoURI}
                alt={selectedToken.symbol}
                boxSize="20px"
                mr="4px"
              />
            ) : (
              <Box boxSize="20px" bg="gray.200" mr="4px" />
            )
          ) : (
            <Skeleton boxSize="20px" mr="4px" />
          )}
          <Text ml="4px">{selectedToken?.symbol || <Skeleton width="30px" />}</Text>
        </Flex>
      </Button>
      {isOpen && (
        <Box
          position="absolute"
          mt="2"
          borderRadius="4px"
          bg="#151619"
          maxH="200px"
          overflowY="auto"
          zIndex={9999}
          width="100%"
        >
          <InputGroup mb="4px" p="4px">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Search token..."
              value={search}
              onChange={handleInputChange}
              size="sm"
              ref={inputRef}
            />
          </InputGroup>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option: IToken) => (
              <Box
                key={option.symbol}
                display="flex"
                alignItems="center"
                p="4px"
                cursor="pointer"
                _hover={{ background: "gray.700" }}
                onClick={() => handleMenuItemClick(option)}
              >
                {option.logoURI ? (
                  <Image
                    src={option.logoURI}
                    borderRadius={100}
                    alt={option.symbol}
                    boxSize="20px"
                    mr="4px"
                  />
                ) : (
                  <Box boxSize="20px" bg="gray.200" mr="4px" />
                )}
                <Text ml="4px">{option.symbol}</Text>
              </Box>
            ))
          ) : (
            <Box p="6px">
              <Text>No tokens found</Text>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Select;
