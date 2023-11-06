import React, { useEffect } from 'react'
import useUtilQuery from '../hooks/useUtilQuery';
import {
  FormControl,
  Stack,
  Input,
  FormLabel,
  Button,
  Flex,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAlert } from '../hooks/useAlert';

const SignUp = () => {
  const { mutation: {
    mutate, isPendingMutate,
  } } = useUtilQuery({}, {
    queryKey: ["products"],
    enabled: true,
    refetchOnWindowFocus: false,
    invalidateQueries: true,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      password: "",
      email: "",
    }
  })

  const [currentErrors, setCurrentErrors] = React.useState({})
  const { openAlert } = useAlert();

  const onSubmit = (data) => {
    const req = {
      endpoint: "http://localhost:3000/api/auth/signup",
      method: "POST",
      body: data,
    }
    mutate(
      req, {
      onSuccess: (success) => {
        openAlert({
          type: "info",
          message: `User ${success.data.name} created successfully. Please login`,
        })
        navigate("/")
      },
      onError: (error) => {
        console.log({ error })
        setCurrentErrors(error?.response?.data?.message)
      },
    })

  };




  const navigate = useNavigate();

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <form style={{ width: "30vw" }} onSubmit={handleSubmit(onSubmit)}>
        <Stack
          spacing={4}
          maxWidth="md"
          mx="auto"
          p={6}
          borderWidth={1}
          borderRadius={8}
        >

          <FormControl id="name" isInvalid={errors?.name || currentErrors?.name}
            onFocus={() => {
              setCurrentErrors({
                ...currentErrors,
                name: null
              })
            }}
          >
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder='username'
              {...register("name", {
                required: "Username is required",
                minLength: { value: 5, message: "Username min length is 5" },
                maxLength: { value: 20, message: "Username max length is 20" },
              })}
            />
            {errors?.name || currentErrors?.name ? (
              <FormErrorMessage>{errors?.name?.message || currentErrors?.name}</FormErrorMessage>
            ) : (
              <FormHelperText textAlign={'start'}>
                Username must be 5-20 characters long
              </FormHelperText>
            )
            }
          </FormControl>
          <FormControl id="email"
            isInvalid={errors?.email || currentErrors?.email}
            onFocus={() => {
              setCurrentErrors({
                ...currentErrors,
                email: null
              })
            }}
          >
            <FormLabel>email</FormLabel>
            <Input
              type="text"
              placeholder='miemail@domain.com'
              {...register("email", {
                required: "Email is required",
                minLength: { value: 5, message: "Email min length is 5", },
                maxLength: { value: 40, message: "Email max length is 40", },
                pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address", }
              })}
            />
            {errors?.email || currentErrors?.email ? (
              <FormErrorMessage>{errors?.email?.message || currentErrors?.email}</FormErrorMessage>
            ) : (
              <FormHelperText textAlign={'start'}>
                Email must be 5-40 characters long
              </FormHelperText>

            )}

          </FormControl>
          <FormControl id="password" isInvalid={errors?.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder='**********'
              autoComplete="username"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password min length is 5", },
              })}
            />
            {errors?.password ? (
              <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
            ) : (
              <FormHelperText textAlign={'start'}>
                Password must be 6 characters long
              </FormHelperText>
            )}
          </FormControl>
          <Flex justifyContent="start" alignContent="center" w="100%" gap="1vh">
            <Button
              colorScheme="blue"
              type='submit'
              isLoading={isPendingMutate}
              loadingText="Submitting"
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
}

export default SignUp