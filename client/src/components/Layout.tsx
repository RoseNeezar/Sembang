import React, { FC } from "react";
import Wrapper, { WrapperVariant } from "./Wrapper";
import Navbar from "./Navbar";

interface IWrapper {
  variants?: WrapperVariant;
}

const Layout: FC<IWrapper> = ({ variants, children }) => {
  return (
    <>
      <Navbar />
      <Wrapper variants={variants}>{children}</Wrapper>
    </>
  );
};

export default Layout;
