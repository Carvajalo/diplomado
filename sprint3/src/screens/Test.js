import React from 'react'
import { Container } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, incrementAsync } from '../slicers/productSlice'

const Home = () => {
  const count = useSelector((state) => state.products.value)
  const dispatch = useDispatch()
  return (
    <Container maxW='container.2xl' bg='green.400' color='#262626'>
     { <div>
        <div>
          <button
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>
          <button
            onClick={() => dispatch(incrementAsync(Number(10) || 0))}
          >
            Add Async
          </button>
          <span>{count}</span>
          <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
        </div>
      </div>}
    </Container>
  )
}

export default Home


