import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";

import { fetchData } from "../services/tests.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Endpoint: http://localhost:3001/api/users

const QueryReact = () => {
  const queryClient = useQueryClient();

  const { isLoading, data, error, isError } = useQuery({
    queryKey: "users",
    queryFn: () => fetchData("http://localhost:3001/api/users"),
  });

  const mutations = {
    delete: (data) => {
      console.log("data: ", data);
      return fetch(`http://localhost:3001/api/usersssss/${data}`, {
        method: "GET",
      });
    },
    create: (data) => {
      console.log(data);
      return fetch("http://localhost:3001/api/usersre", {
        method: "GET",
      });
    },
    update: (data) => {
      console.log(data);
      return fetch("http://localhost:3001/api/usersre", {
        method: "GET",
      });
    },
  };

  const handleMutation = ({ type, data }) => {
    console.log(type, data);
    return mutations[type](data);
  };

  const mutation = useMutation({
    mutationFn: handleMutation,
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error?.message}</p>;

  return (
    <Box>
      {data?.users?.map((user, index) => {
        return (
          <Box key={index}>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.password}</p>
          </Box>
        );
      })}

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          mutation.mutate({
            type: "delete",
            data: "60f8f1f5b0f6a83d4c4d5b7b",
          });
        }}
      >
        Refetch
      </button>
    </Box>
  );
};

export default QueryReact;
