import React, { useEffect } from "react";
import {
  Box,
  FormControl,
  Stack,
  Input,
  FormLabel,
  Button,
  Flex,
} from "@chakra-ui/react";

import { fetchData } from "../services/tests.js";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../slicers/userSlice.js";
import { useMutation } from "@tanstack/react-query";

const Login = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();

  const mutations = {
    login: (data) => {
      return fetchData("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((data) => {
        dispatch(login(data));
        navigate("/");
      });
    },
  };

  const handleMutation = ({ type, data }) => {
    return mutations[type](data);
  };

  const mutation = useMutation({
    mutationFn: handleMutation,
    retry: 2,
    onSuccess: () => {},
    onError: () => {
      console.log("error");
    },
  });

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <Flex
      justifyContent="center" // Centrado horizontal
      alignItems="center" // Centrado vertical
      height="100vh" // 100% de la altura de la pantalla
    >
      <Box w="30vw">
        <Stack
          spacing={4}
          maxWidth="md"
          mx="auto"
          p={6}
          borderWidth={1}
          borderRadius={8}
        >
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Flex justifyContent="start" alignContent="center" w="100%" gap="1vh">
            <Button
              colorScheme="blue"
              onClick={() =>
                mutation.mutate({
                  type: "login",
                  data: { email: username, password },
                })
              }
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
      </Box>
    </Flex>
  );
};

export default Login;
