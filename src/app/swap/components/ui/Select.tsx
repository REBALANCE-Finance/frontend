"use client";
import React from 'react';
import { Box, Button, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';
import Icon from "@/components/icon";
import { ICON_NAMES } from "@/consts";

// Определите типы пропсов
interface SelectProps {
  options: { [key: string]: string };
  value: string;
  setSelected: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({ options, value, setSelected }) => {
  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            border="1px solid #202327"
            padding="6px 12px"
            borderRadius="4px"
            isActive={isOpen}
            as={Button}
            rightIcon={<ChevronDownIcon />}>
            <Box display="flex" alignItems="center">
              <Icon name={ICON_NAMES[value]} size="sm" />
              <Text ml="4px">{value}</Text>
            </Box>
          </MenuButton>
          <MenuList w="fit" background="#151619">
            {Object.keys(options).map(key => (
              <MenuItem
                background="inherit"
                key={key}
                onClick={() => setSelected(key)}>
                <Icon name={ICON_NAMES[key]} size="sm" />
                <Text ml="4px">{options[key]}</Text>
              </MenuItem>
            ))}
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default Select;
