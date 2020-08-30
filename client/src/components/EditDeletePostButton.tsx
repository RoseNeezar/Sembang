import React, { FC } from "react";
import NextLink from "next/link";
import { Box, IconButton } from "@chakra-ui/core";
import { useDeletePostMutation, useProfileQuery } from "../generated/graphql";

interface IEditDeletePostButton {
  id: number;
  creatorId: number;
}

const EditDeletePostButton: FC<IEditDeletePostButton> = ({ id, creatorId }) => {
  const [, deletePost] = useDeletePostMutation();
  const [{ data: meData }] = useProfileQuery();
  if (meData?.me?.id !== creatorId) {
    return null;
  }

  return (
    <Box>
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton
          mr={4}
          variantColor="teal"
          ml="auto"
          icon="edit"
          aria-label="Edit Post"
        />
      </NextLink>

      <IconButton
        variantColor="red"
        ml="auto"
        icon="delete"
        aria-label="Delete Post"
        onClick={() => {
          deletePost({
            id,
          });
        }}
      />
    </Box>
  );
};

export default EditDeletePostButton;
