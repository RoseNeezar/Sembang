import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import Layout from "../components/Layout";
import { Link, Stack, Box, Heading, Text, Flex, Button } from "@chakra-ui/core";
import NextLink from "next/link";
import { useState } from "react";
import UpvoteSection from "../components/UpvoteSection";
import EditDeletePostButton from "../components/EditDeletePostButton";

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
      {data && !fetching ? (
        <Box>
          <Stack spacing={8}>
            {data.posts.posts.map((res) =>
              !res ? null : (
                <Flex key={res.id} p={5} shadow="md" borderWidth="1px">
                  <UpvoteSection post={res} />
                  <Box flex={1}>
                    <NextLink href="/post/[id]" as={`/post/${res.id}`}>
                      <Link>
                        <Heading fontSize="xl">{res.title}</Heading>
                      </Link>
                    </NextLink>
                    <Text>Posted by {res.creator.username}</Text>
                    <Flex align="center">
                      <Text flex={1} mt={4}>
                        {res.textSnippet}
                      </Text>
                      <EditDeletePostButton
                        id={res.id}
                        creatorId={res.creatorId}
                      />
                    </Flex>
                  </Box>
                </Flex>
              )
            )}
          </Stack>
        </Box>
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
