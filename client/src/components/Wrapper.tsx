import React, { FC } from "react";
import { Box } from "@chakra-ui/core";

interface IWrapper {
  variants?: "small" | "regular";
}

const Wrapper: FC<IWrapper> = ({ children, variants = "regular" }) => {
  return (
    <Box
      mt={8}
      mx="auto"
      maxW={variants === "regular" ? "800px" : "400px"}
      w="100%"
    >
      {children}
    </Box>
  );
};

export default Wrapper;
