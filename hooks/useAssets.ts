import { gql } from "graphql-request";
import { GraphQLResponse } from "graphql-request/dist/types";
import graphqlRequestClient from "../lib/clients/graphqlRequestClient";
import { useQuery } from "react-query";
import { Assets } from "../lib/interfaces/Assets";

const GET_ALL_ASSEST_QUERY = gql`
  query GetAllAssets {
    asalist {
      result {
        assetId
        URL
        logo
        available
        name
      }
    }
  }
`;

const useAssets = () => {
  const { isLoading, isError, error, data } = useQuery<GraphQLResponse, Error, Assets[]>(
    "assets",
    async () => {
      return graphqlRequestClient.request(GET_ALL_ASSEST_QUERY);
    },
    {
      select: (response) => response.asalist.result,
    }
  );

  return { isLoading, isError, error, data };
};

export default useAssets;
