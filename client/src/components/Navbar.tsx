import React from "react";
import { Box, Flex, Link, Button } from "@chakra-ui/core";
import NextLink from "next/link";
import { useProfileQuery, useLogoutMutation } from "../generated/graphql";
import { isServer } from "../utils/isServer";

const Navbar = () => {
  const [{ fetching: logoutFetch }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useProfileQuery({
    pause: isServer(),
  });

  let body = null;
  if (fetching) {
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link color="#fff" mr={2}>
            login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="#fff">register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex alignItems="center">
        <Box mr={2}>{data.me.username}</Box>
        <Button
          variant="ghost"
          onClick={() => logout()}
          isLoading={logoutFetch}
        >
          Logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex bg="tomato" p={4} position="sticky" zIndex={1}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};

export default Navbar;
