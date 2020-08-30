import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import Layout from "../../../components/Layout";
import { Formik, Form } from "formik";
import InputField from "../../../components/InputField";
import { Box, Button } from "@chakra-ui/core";
import { useRouter } from "next/router";
import {
  usePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import { useGetIntId } from "../../../utils/useGetIntId";

const EditPost = () => {
  const router = useRouter();
  const intId = useGetIntId();
  const [{ data, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
  const [, updatePost] = useUpdatePostMutation();
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
    <Layout variants="small">
      <Formik
        initialValues={{ title: data.post.title, text: data.post.text }}
        onSubmit={async (values) => {
          await updatePost({
            id: intId,
            text: values.text,
            title: values.title,
          });
          router.back();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField label="Title" name="title" placeholder="title" />
            <Box mt={4}>
              <InputField
                textarea
                label="Body"
                name="text"
                placeholder="text..."
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              variantColor="teal"
            >
              Update Post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditPost);
