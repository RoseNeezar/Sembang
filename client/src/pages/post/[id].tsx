import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import Layout from "../../components/Layout";
import { Box, Heading } from "@chakra-ui/core";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";
import EditDeletePostButton from "../../components/EditDeletePostButton";

const Post = () => {
  const [{ data, fetching, error }] = useGetPostFromUrl();
  if (error) {
    return <div>error...</div>;
  }
  if (!data?.post) {
    return (
      <Layout>
        <Box>could not find post</Box>
      </Layout>
    );
  }
  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }
  return (
    <Layout>
      <Heading>{data.post.title}</Heading>
      <Box mb={4}>{data?.post?.text}</Box>

      <EditDeletePostButton id={data.post.id} creatorId={data.post.creatorId} />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
