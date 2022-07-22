import { createContext, useState, useEffect } from "react";
import { db } from "../utils/db";
import { Center, Spinner } from "@chakra-ui/react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState([1, 3, 32, 4, 4, 5]);

  if (isLoading)
    return (
      <Center h="100vh" w="100vw" bg="#f6f6f6">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="green.600"
          size="xl"
        />
      </Center>
    );

  return (
    <DataContext.Provider value={{ reviews, isLoading }}>
      {children}
    </DataContext.Provider>
  );
};
