import React, { useEffect } from "react";
import {
  Box,
  FormControl,
  Stack,
  Input,
  FormLabel,
  Button,
  Flex,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../slicers/userSlice.js";
import { useForm } from "react-hook-form";
import useUtilQuery from "../hooks/useUtilQuery.js";
import API_URL from "../constants/apiConst.js";
import { useAlert } from "../hooks/useAlert.js";
import { toast } from "react-toastify";

const Login = () => {
  const { openAlert } = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutation: { mutate, ...rest } } =
    useUtilQuery({}, { queryKey: ["user"] })

  const onSubmit = (data) => {
    const req = {
      endpoint: API_URL.LOGIN,
      method: "POST",
      body: data,
    };
    mutate(
      req, {
      onSuccess: ({ data }) => {
        openAlert({
          type: "info",
          message: `Welcome back ${data.name}!`,
        })
        dispatch(login(data));
        navigate("/");
      },
      onError: (error) => {
        console.log(error)
        openAlert({
          type: "error",
          message: error?.response?.data?.message || "Login error",
        })
      },
    }
    );
  }


  return (
    <Flex
      justifyContent="center" // Centrado horizontal
      alignItems="center" // Centrado vertical
      height="100vh" // 100% de la altura de la pantalla
    >
      <form style={{
        width: "30vw",
      }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack
          spacing={4}
          maxWidth="md"
          mx="auto"
          p={6}
          borderWidth={1}
          borderRadius={8}
        >
          <FormControl id="email" isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="text"
              {
              ...register("email", {
                required: "This is required",
              })
              }
            />
            {
              errors.email ? (
                <FormErrorMessage>
                  {errors.email.message}
                </FormErrorMessage>
              ) : (
                <FormHelperText textAlign={'start'}>
                  Type your email
                </FormHelperText>
              )
            }
          </FormControl>
          <FormControl id="password" isInvalid={errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              autoComplete="email"
              {
              ...register("password", {
                required: "This is required",
                minLength: {
                  value: 8,
                  message: "Password min length is 8",
                },
                maxLength: {
                  value: 20,
                  message: "Password max length is 20",
                },
              })
              }
            />
            {
              errors.password ? (
                <FormErrorMessage>
                  {errors.password.message}
                </FormErrorMessage>
              ) : (
                <FormHelperText textAlign={'start'}>
                  Password must be 8-20 characters long
                </FormHelperText>
              )
            }
          </FormControl>
          <Flex justifyContent="start" alignContent="center" w="100%" gap="1vh">
            <Button
              colorScheme="blue"
              type="submit"
            >
              Login
            </Button>
            <Button
              colorScheme="gray"
              onClick={() => {
                navigate("/");
              }}
            >
              Cancel
            </Button>
          </Flex>
        </Stack>
      </form>
    </Flex>
  );
};

export default Login;
