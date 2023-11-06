import React from 'react'
import { Tr, Td, Text } from '@chakra-ui/react'

import { Tooltip } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { editProduct } from '../../../slicers/modalSlice';
import useUtilQuery from '../../../hooks/useUtilQuery';
import API_URL from '../../../constants/apiConst';
import Actions from './Actions';
import { selectUser } from '../../../slicers/userSlice';
import { useAlert } from '../../../hooks/useAlert';
import { selectPages, setPages } from '../../../slicers/tablesSlice';

const TBodyProducts = ({ data }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser)
  const { mutation: { mutate } } = useUtilQuery({}, { queryKey: ['products'], invalidateQueries: true });
  const { products: productPage } = useSelector(selectPages);
  const { openAlert } = useAlert();

  const handleDelete = async () => {
    mutate({
      data: {
        endpoint: API_URL.DELETE_PRODUCT,
        method: 'DELETE',
        resourceIdentifier:
          data?._id,
        token: user?.token
      },
    }, {
      onSuccess: (data) => {
        console.log({ dataDelete: data })
        openAlert({
          type: "success",
          message: `Product ${data?.data?.name} deleted successfully`,
        })
      },
    })
  }

  return (
    <Tr key={data?._id ?? ''}>
      <Td h={14} textAlign={'center'}>{data?.name ?? ''}</Td>
      <Td h={14} textAlign={'center'}>
        {data?.description && data?.description?.length > 50 ? (
          <Tooltip label={data?.description}>
            {data?.description?.slice(0, 50) + '...'}
          </Tooltip>
        ) : (
          data?.description ?? ''
        )}
      </Td>
      <Td h={14} textAlign={'center'}>{data?.price ?? ''}</Td>
      <Td h={14} textAlign={'center'}>{data?.stock ?? ''}</Td>
      <Td h={14} textAlign={'center'}>
        {data?.image && data?.image[0]?.length > 20 ? (
          <React.Fragment>
            {data?.image[0]?.slice(0, 20)}
            <Tooltip label={data?.image[0]?.length > 500 ? data?.image[0].slice(0, 500) + "..." : data?.image[0]} placement={'top'}
              hasArrow={true}
            >
              ...
            </Tooltip>
          </React.Fragment>

        ) : (
          data?.image ?? ''
        )}
      </Td>
      <Td h={14} textAlign={'center'}>
        {
          data ? (
            <Actions
              onEdit={() => dispatch(editProduct({ product: data, endpoint: API_URL.UPDATE_PRODUCT, method: 'PUT' }))}
              onDelete={handleDelete}
            />
          ) : (
            ""
          )
        }
      </Td>
    </Tr>
  );
};


export default TBodyProducts