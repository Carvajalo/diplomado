import React, { useEffect, useState } from 'react'
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Tfoot,
  TableContainer,
  Flex,
  Text,
} from "@chakra-ui/react";
import Header from '../components/header/Header';
import API_URL from '../constants/apiConst';
import useUtilQuery from '../hooks/useUtilQuery';
import CustomTable from '../components/table/CustomTable';
import TBodyProducts from '../components/table/TBodyCustoms/TBodyProducts';
import Pagination from '../components/Pagination/Pagination';
import CustomModal from '../components/Modal/CustomModal';
import useToggle from '../hooks/useToggle';
import { useDispatch, useSelector } from 'react-redux';
import { clearProductData, selectModal } from '../slicers/modalSlice';
import ProductForm from '../components/products/ProductForm';
import { useDisclosure } from '@chakra-ui/react';
import CustomAccordion from '../components/accordion/CustomAccordion';
import { selectPages, setPages } from '../slicers/tablesSlice';


const ProductsAdmin = () => {
  const dataModal = useSelector(selectModal)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch();
  const { products: productPage } = useSelector(selectPages)

  const { query: { data, isPending }, mutation: { dataMutate, mutate, isPending: isPendingMutation }, queryClient } = useUtilQuery({
    endpoint: API_URL.GET_PRODUCTS,
    method: 'GET',
    pageParam: productPage,
  }, { queryKey: ['products', productPage], invalidateQueries: true });

  useEffect(() => {
    if (dataModal) return onOpen()
  }, [dataModal, onOpen])

  useEffect(() => {
    if(productPage > data?.data?.pages){
      dispatch(setPages({
        products: data?.data?.pages,
      }))
    }
  }, [data?.data?.pages])

  return (
    <React.Fragment>
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        data={dataModal}
        clearData={() => dispatch(clearProductData())}
      >
        <ProductForm
          data={dataModal}
          onCancel={() => {
            dispatch(clearProductData())
            onClose()
          }}
        />
      </CustomModal>
      <Box height='fit-content'>
        <Header />
        <Box marginTop={'15vh'}>
          <Box w='full' h='fit-content' py={'10'}>
            <Text textAlign='center' fontSize='4xl' fontWeight='bold'>
              Admin view
            </Text>
          </Box>
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            minH={'70.5vh'}
          >
            <CustomAccordion onOpen={onOpen} >
              {
                isPending || isPendingMutation ? (
                  <CustomTable
                    thead={['Name', 'Description', 'Price', 'Stock', 'Image', 'Actions']}
                    data={[]}
                    tbody={TBodyProducts}
                    maxNumOfItems={6}
                  />
                ) : (
                  <CustomTable
                    thead={['Name', 'Description', 'Price', 'Stock', 'Image', 'Actions']}
                    data={data?.data?.products}
                    tbody={TBodyProducts}
                    maxNumOfItems={data?.data?.limit}
                  />
                )
              }
              <Pagination maxPage={data?.data?.pages} page={productPage} setPage={(page) => {
                dispatch(setPages({
                  products: page,
                }))
              }}
                isLoading={isPending || isPendingMutation}
              />

            </CustomAccordion>

          </Flex>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default ProductsAdmin