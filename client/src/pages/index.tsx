import Navbar from "../components/Navbar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import Layout from "../components/Layout";
import { Link, Stack, Box, Heading, Text, Flex, Button } from "@chakra-ui/core";
import NextLink from "next/link";
import { useState } from "react";

const Index = () => {
  const [variable, setVariable] = useState({
    limit: 10,
    cursor: null as string | null,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables: variable,
  });
  return (
    <Layout>
      {!fetching && !data && <Text>no data..</Text>}
      <Flex align="center" mb={4}>
        <Heading>Diskusi</Heading>
        <NextLink href="/create-post">
          <Link ml="auto">create Post</Link>
        </NextLink>
      </Flex>

      {data && !fetching ? (
        <div>
          <Stack spacing={8}>
            {data.posts.posts.map((res) => (
              <Box key={res.id} p={5} shadow="md" borderWidth="1px">
                <Heading fontSize="xl">{res.title}</Heading>
                <Text mt={4}>{res.textSnippet}</Text>
              </Box>
            ))}
          </Stack>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      {data && data.posts.hasMore && (
        <Flex>
          <Button
            onClick={() => {
              setVariable({
                limit: variable.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
            m="auto"
            my={8}
            isLoading={fetching}
          >
            Load More
          </Button>
        </Flex>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
