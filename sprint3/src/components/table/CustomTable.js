import React from 'react'
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
  Text
} from "@chakra-ui/react";

const CustomTable = ({
  thead = [],
  tbody: CustomTBody = () => <></>,
  tfoot: Tfoot = () => <></>,
  data = null,
  maxNumOfItems = 6,
  ...rest
}) => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <TableContainer maxW={{ xl: '60vw' }}
        m="0 auto"
        w={'60vw'}>
        <Table>
          <Thead>
            <Tr>
              {thead.map((item, index) => (
                <Th textAlign={'center'} key={index}>{item}</Th>
              ))}
            </Tr>
          </Thead>
          {
            data ? (
              <Tbody>
                {data?.map((item, index) => (
                  <CustomTBody key={index} data={item} index={index} />
                ))}
              </Tbody>
            ) : (
              <Tbody>
                <Tr >
                  <Td colSpan={thead.length}>
                    <Box textAlign="center" py={4} >
                      <Text fontSize="xl" fontWeight="bold" color={'red'}>
                        No data found
                      </Text>
                    </Box>
                  </Td>
                </Tr>
              </Tbody>
            )
          }
          {
            Array.from({ length: maxNumOfItems - data?.length }, (_, i) => i + 1).map((_, index) => (
              <CustomTBody key={index} index={index} />
            ))


          }
        </Table>
      </TableContainer>

    </Flex>
  )
}

export default CustomTable