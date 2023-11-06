import React from 'react'
import { Button, Text, useStyleConfig, Flex, Spinner, Tooltip } from '@chakra-ui/react'
import styled from 'styled-components'
import { Icon } from '@chakra-ui/react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

const CurstomButton = styled(Button)`
width: 'auto';
`

const StyledButtons = ({ isCurrent, isFocused, onClick, page, ...props }) => {
  return (
    <CurstomButton
      borderRadius={'100%'}
      size={'sm'}
      bg={isCurrent ? '#4299E1' : "#fff"}
      color={isCurrent ? 'white' : 'blue'}
      textAlign={'center'}
      fontWeight={'bold'}
      _focus={{ bg: '#4299E1', color: 'white' }}
      onClick={onClick}
      {...props}
    >
      {page}
    </CurstomButton>
  )
}


const CustomIcon = styled(Icon)`
width: 1.5rem;
height: 1.5rem;
`
export const StyledIcon = ({ icon, ...props }) => {

  return (
    <CustomIcon
      bg={'#4299E1'}
      color={'white'}
      rounded={'100%'}
      as={icon}
      {...props}
    />
  )
}


const Pagination = ({ page = 6, setPage = () => { }, maxPage = 6, isLoading = false, pageRange = 3 }) => {

  Math.max(1, Math.floor(page - pageRange / 2) + 1)
  const startPage = maxPage === page ? Math.max(1, Math.floor(page - pageRange / 2)) : Math.max(1, Math.floor(page - pageRange / 2) + 1);
  const endPage = maxPage === page ? maxPage : Math.min(maxPage, startPage + pageRange - 1);

  if (isLoading) return (
    <Spinner />
  )

  return (
    <>
      <Flex
        direction="row"
        alignItems="center"
        justifyContent="center"
        gap={1}
      >
        <StyledIcon icon={MdKeyboardArrowLeft} onClick={() => setPage(1)} />
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((pageNumber) => (
          <StyledButtons
            key={pageNumber}
            isCurrent={pageNumber === page}
            isFocused={true}
            onClick={() => setPage(pageNumber)}
            page={pageNumber}
          />
        ))}
        <StyledIcon icon={MdKeyboardArrowRight} onClick={() => setPage(maxPage)} />
      </Flex>
    </>
  );
};

export default Pagination