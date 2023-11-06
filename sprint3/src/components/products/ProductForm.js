import React, { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form'
import useUtilQuery from '../../hooks/useUtilQuery';
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
  ButtonGroup,
} from "@chakra-ui/react";
import API_URL from '../../constants/apiConst';
import { selectUser } from '../../slicers/userSlice';
import { useSelector } from 'react-redux';
import { FaTruckMonster } from 'react-icons/fa';
import { useAlert } from '../../hooks/useAlert';

const ProductForm = ({ data, onCancel = () => { } }) => {
  const { mutation: { mutate, isPending, } } = useUtilQuery({}, { queryKey: ['products'], invalidateQueries: true });

  const product = data?.product
  const disableValidations = true;
  const [currentErrors, setCurrentErrors] = React.useState({})
  const user = useSelector(selectUser)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: product?.name ?? '',
      description: product?.description ?? '',
      price: product?.price ?? 0,
      image: product?.image[0] ?? '',
      stock: product?.stock ?? 0,
      category: product?.category ?? '',
    }
  })

  const { openAlert } = useAlert();

  const onSubmit = (data) => {
    mutate({
      endpoint: product ? API_URL.UPDATE_PRODUCT : API_URL.CREATE_PRODUCT,
      method: product ? 'PUT' : 'POST',
      body: data,
      ...(product && {
        resourceIdentifier: product?._id
      }),
      token: user?.token,
    }, {
      onSuccess: (data) => {
        console.log({ data })
        openAlert({
          type: "success",
          message: `Product ${data?.data?.name + ' ' ?? ''}${product ? 'updated' : 'created'} successfully`,
        })
        onCancel();
      },
      onError: (e) => {
        console.log({ e })
        setCurrentErrors({
          ...e?.response?.data?.messages
        })
      }
    }
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <Flex
        justifyContent="center"
        alignItems="center"
        height="fit-content"
        direction={'column'}
        w={'100%'}
        gap={'2vh'}

      >
        <FormControl id="name" isInvalid={errors?.name || currentErrors?.name}
          onFocus={() => {
            setCurrentErrors({
              ...currentErrors,
              name: null
            })
          }}
        >
          <FormLabel>Product name</FormLabel>
          <Input
            type="text"
            placeholder='Product name'
            {...register("name", {
              required: "Name is required",
              minLength: { value: 5, message: "Name min length is 5" },
              maxLength: { value: 20, message: "Name max length is 20" },
            })}
          />
          {errors?.name || currentErrors?.name ? (
            <FormErrorMessage>{errors?.name?.message || currentErrors?.name}</FormErrorMessage>
          ) : (
            <FormHelperText textAlign={'start'}>
              Name must be min 5 characters long. Also, is recommended to be max 20 characters long
            </FormHelperText>
          )
          }
        </FormControl>
        <FormControl id="description" isInvalid={errors?.description || currentErrors?.description}
          onFocus={() => {
            setCurrentErrors({
              ...currentErrors,
              description: null
            })
          }}
        >
          <FormLabel>Product description</FormLabel>
          <Input
            type="text"
            placeholder='Product description'
            {...register("description", {
              required: "description is required",
              minLength: { value: 5, message: "description min length is 5" },
              maxLength: { value: 600, message: "description max length is 600" },
            })}
          />
          {errors?.description || currentErrors?.description ? (
            <FormErrorMessage>{errors?.description?.message || currentErrors?.description}</FormErrorMessage>
          ) : (
            <FormHelperText textAlign={'start'}>
              description must be min 5 characters long. Also to be max 600 characters long
            </FormHelperText>
          )
          }
        </FormControl>
        <FormControl id="price" isInvalid={errors?.price || currentErrors?.price}
          onFocus={() => {
            setCurrentErrors({
              ...currentErrors,
              price: null
            })
          }}
        >
          <FormLabel>Product price</FormLabel>
          <Input
            placeholder='999'
            onKeyDown={(e) => {
              if (e.key === 'e' || e.key === 'E' || e.key === '+' || e.key === '-' || e.key === ',') e.preventDefault()
            }}
            {...register("price", {
              required: "price is required",
              pattern: { value: /^[0-9]+(\.[0-9]+)?$/, message: "price must be a number" },
              maxLength: { value: 20, message: "Price max length is 20" },
              type: { value: "Number", message: "price must be a number" },
              min: { value: 1, message: "price must be greater than 0" },
              validate: {
                isNumber: (value) => {
                  if (isNaN(value)) return setCurrentErrors({
                    ...currentErrors,
                    price: "price must be a number"
                  })
                }
              },
              valueAsNumber: false,

            })}
          />
          {errors?.price || currentErrors?.price ? (
            <FormErrorMessage>{errors?.price?.message || currentErrors?.price}</FormErrorMessage>
          ) : (
            <FormHelperText textAlign={'start'}>
              Price must be a number greater than 0
            </FormHelperText>
          )
          }
        </FormControl>
        <FormControl id="stock" isInvalid={errors?.stock || currentErrors?.stock}
          onFocus={() => {
            setCurrentErrors({
              ...currentErrors,
              stock: null
            })
          }}
        >
          <FormLabel>Product stock</FormLabel>
          <Input
            placeholder='1654'
            onKeyDown={(e) => {
              if (e.key === 'e' || e.key === 'E' || e.key === '+' || e.key === '-' || e.key === ',') e.preventDefault()
            }}
            {...register("stock", {

              valueAsNumber: true,
              required: "Stock is required",
              maxLength: { value: 20, message: "Stock max length is 20" },
              type: { value: "number", message: "Stock must be a number" },
              min: { value: 0, message: "Stock must be greater than 0" },
              validate: {
                isNumber: (value) => {
                  if (isNaN(value)) return setCurrentErrors({
                    ...currentErrors,
                    stock: "Stock must be a number"
                  })
                  if (/^[0-9]+$/.test(value) === false) return setCurrentErrors({
                    ...currentErrors,
                    stock: `Values must be either ${Math.floor(value || 0)} or ${Math.ceil(value || 0)} but not ${value}`
                  })
                }
              }
            })}
          />
          {errors?.stock || currentErrors?.stock ? (
            <FormErrorMessage>{errors?.stock?.message || currentErrors?.stock}</FormErrorMessage>
          ) : (
            <FormHelperText textAlign={'start'}>
              Stock must be a number greater or equal than 0
            </FormHelperText>
          )
          }
        </FormControl>
        <FormControl id="image" isInvalid={errors?.image || currentErrors?.image}
          onFocus={() => {
            setCurrentErrors({
              ...currentErrors,
              image: null
            })
          }}
        >
          <FormLabel>Product image</FormLabel>
          <Input
            type="text"
            placeholder='1654'
            {...register("image", {
              required: "image is required",
              minLength: { value: 5, message: "image min length is 5" },
              validate: {
                isUrl: (value) => {
                  try {
                    new URL(value)
                    return true
                  } catch (err) {
                    return false
                  }
                },
              },
            })}
          />
          {errors?.image || currentErrors?.image ? (
            <FormErrorMessage>{errors?.image?.message || currentErrors?.image || "Enter valid URL"}</FormErrorMessage>
          ) : (
            <FormHelperText textAlign={'start'}>
              Image must be a valid url
            </FormHelperText>
          )
          }
        </FormControl>
        <Flex
          placeContent={'flex-end'}
          w={'100%'}
          gap={3}
        >
          {
            onCancel && (
              <Button
                minW={'fit-content'}
                w={'6rem'}
                h={'3rem'}
                colorScheme="blackAlpha"
                onClick={() => {
                  onCancel()
                }}
              >
                Cancel
              </Button>
            )
          }
          <Button
            w={'6rem'}
            minW={'fit-content'}
            h={'3rem'}
            type="submit"
            isLoading={isPending}
            colorScheme="blue"
          >
            Submit
          </Button>
        </Flex>
      </Flex>
    </form>

  )
}

export default ProductForm