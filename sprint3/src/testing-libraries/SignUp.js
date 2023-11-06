import React from 'react'
import useQueryHelper from '../utils/useQueryHelper'
import useUtilQuery from '../utils/useUtilQuery';
import { useSelector } from 'react-redux';
import { selectUser } from '../slicers/userSlice';


const mutations = {
  delete: ({ endpoint, resourceIdentifier, token }) => {
    return {
      endpoint: endpoint,
      method: "DELETE",
      resourceIdentifier,
      token,
    }
  },
  create: ({ token, body }) => {
    return {
      endpoint: "http://localhost:3000/api/products",
      method: "POST",
      token,
      body,
    }
  }

};
const SignUp = () => {
  const user = useSelector(selectUser)

  const { query: { isLoading, data, error, isError }, mutation: {
    mutate, dataMutate, isLoadingMutate, isErrorMutate, isPendingMutate, isSuccessMutate
  } } = useUtilQuery({
    endpoint: "http://localhost:3000/api/products",
  }, {
    queryKey: ["products"],
    enabled: true,
    refetchOnWindowFocus: false,
    invalidateQueries: true,
  });

  const body = {
    "name": "Test2",
    "description": "Test1",
    "price": 49.99,
    "stock": 100,
    "image": "https://dummyimage.com/300.png/09f/fff",
    "category": "JS"
  }


  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>{error?.message}</p>

  console.log(data)
  return (
    <React.Fragment>
      <button onClick={() => mutate(
        { body, endpoint: "http://localhost:3000/api/products", method: "POST", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MzlkZDE5MjM5MzQ4NjIxNjQ3MDFjMCIsInJvbGUiOiJhZG1pbiIsIm5hbWUiOiJhZG1pbiIsImlhdCI6MTY5ODU1MDQ5MCwiZXhwIjoxNzAwMzY0ODkwfQ.wC5jMZgsR1-l6ICOnLstqQIa11XtvwpBjBPQnK4Yrsg" }
      )}>
        Create Product
      </button>
    </React.Fragment >
  )
}

export default SignUp