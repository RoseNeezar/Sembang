import React from "react";
import { Box, Flex, Link, Button, Heading } from "@chakra-ui/core";
import NextLink from "next/link";
import { useProfileQuery, useLogoutMutation } from "../generated/graphql";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const [{ fetching: logoutFetch }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useProfileQuery({});

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
        <Box mr={2} color="#fff">
          {data.me.username}
        </Box>
        <Button
          variant="ghost"
          onClick={async () => {
            await logout();
            router.reload();
          }}
          isLoading={logoutFetch}
        >
          Logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex
      bg="tomato"
      p={4}
      position="fixed"
      top="0"
      width="100%"
      zIndex={1}
      align="center"
    >
      <Flex flex={1} m="auto" maxW={800} align="center">
        <NextLink href="/">
          <Link color="#fff">
            <Heading color="#fff">Diskusi</Heading>
          </Link>
        </NextLink>
        <NextLink href="/create-post">
          <Button as={Link} ml="auto" color="#fff" variantColor="red">
            create Post
          </Button>
        </NextLink>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};

export default Navbar;
