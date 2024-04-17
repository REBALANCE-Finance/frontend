import { motion } from "framer-motion";
import { Button } from "@chakra-ui/react";

const DepositButton = ({isDisabled, variant} : {isDisabled: boolean, variant: string}) => {
  return (
    <motion.div
      initial={{ backgroundColor: !isDisabled ? 'rgba(76, 255, 148, .3)' : 'rgb(21, 22, 25)' }}
      animate={{ backgroundColor: !isDisabled ? 'rgba(76, 255, 148, .7)' : 'rgb(21, 22, 25)' }}
      transition={{
        duration: .8,
        repeat: !isDisabled ? Infinity : 0,
        repeatType: "reverse",
      }}
      style={{ borderRadius: "4px" }}
    >
      <Button
        width={"100%"}
        variant={'#4CFF94'}
        type="submit"
        isDisabled={isDisabled}
      >
        Deposit
      </Button>
    </motion.div>
  );
};

export default DepositButton;