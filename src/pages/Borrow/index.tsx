import { Flex } from "@chakra-ui/react";
import React from "react";

export const Borrow = () => {
  return <Flex></Flex>;
};

// const Icon = ({ name, ...rest }: { name: string }) => {
//   const { SvgIcon } = useDynamicSVGImport(name);

//   if (SvgIcon) {
//     return <SvgIcon {...rest} />;
//   }
//   return null;
// };

// const useDynamicSVGImport = (iconName: string) => {
//   const importedIconRef = useRef<React.FC<React.SVGProps<SVGElement>>>();

//   useEffect(() => {
//     const importIcon = async () => {
//       importedIconRef.current = (
//         await import(`../../assets/icons/${iconName}-icon.svg`)
//       ).ReactComponent;
//     };

//     importIcon();
//   }, [iconName]);

//   return { SvgIcon: importedIconRef.current };
// };
