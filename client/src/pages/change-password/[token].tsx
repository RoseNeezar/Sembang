import React from "react";
import { NextPage } from "next";
import Wrapper from "../../components/Wrapper";
import { Formik, Form } from "formik";
import login from "../login";
import { toErrorMap } from "../../utils/toErrorMap";
import InputField from "../../components/InputField";
import { Box, Button } from "@chakra-ui/core";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  return (
    <Wrapper variants="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {}}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              label="New Password"
              name="newPassword"
              placeholder="new password"
              type="password"
            />

            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              variantColor="teal"
            >
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default ChangePassword;
