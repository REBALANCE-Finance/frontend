import { FC, useRef, useState, useEffect } from "react";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Box,
  Flex,
  Image,
  useDisclosure,
  useOutsideClick
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

export interface SelectOption {
  value: string;
  label: string;
  imageUrl?: string;
}

interface VaultFormSelectProps {
  options: SelectOption[];
  value: SelectOption;
  onChange: (value: SelectOption) => void;
  placeholder?: string;
  defaultImageUrl?: string;
}

const VaultFormSelect: FC<VaultFormSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select option",
  defaultImageUrl
}) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const selectRef = useRef<HTMLDivElement>(null);
  const [triggerWidth, setTriggerWidth] = useState<number>(0);

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, [isOpen]);

  useOutsideClick({
    ref: selectRef,
    handler: () => isOpen && onClose()
  });

  const handleSelect = (optionValue: SelectOption) => {
    onChange(optionValue);
    onClose();
  };

  const displayImageUrl = value?.imageUrl || defaultImageUrl;

  return (
    <Box ref={selectRef}>
      <Popover
        isOpen={isOpen}
        onClose={onClose}
        placement="bottom-start"
        autoFocus={false}
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Button
            ref={triggerRef}
            onClick={onOpen}
            rightIcon={<ChevronDownIcon />}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            padding={3}
          >
            <Flex align="center" fontWeight={500}>
              {displayImageUrl && <Image src={displayImageUrl} alt="" boxSize="20px" mr={2} />}
              {value?.label || placeholder}
            </Flex>
          </Button>
        </PopoverTrigger>

        <PopoverContent width={`${triggerWidth}px`} bg="black.40">
          <PopoverBody padding={0}>
            <Flex flexDir="column" gap={3} role="listbox" padding={[2, 3]}>
              {options.map(option => (
                <Flex
                  key={option.value}
                  role="option"
                  // aria-selected={value === option.value}
                  onClick={() => handleSelect(option)}
                  align="center"
                  cursor="pointer"
                >
                  {option.imageUrl && <Image src={option.imageUrl} alt="" boxSize="20px" mr={2} />}
                  <Box>{option.label}</Box>
                </Flex>
              ))}
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default VaultFormSelect;
