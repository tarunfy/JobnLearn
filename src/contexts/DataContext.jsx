import { createContext, useState, useEffect } from "react";
import { db } from "../utils/db";
import { Center, Spinner } from "@chakra-ui/react";
import firebase from "firebase";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const addReview = async (data) => {
    setIsLoading(true);
    let error;
    try {
      await db.collection("reviews").add({
        ...data,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } catch (err) {
      error = err.message;
    }
    fetchReviews();
    setIsLoading(false);
    return {
      error: error ? error : null,
    };
  };

  const fetchReviews = async () => {
    setIsLoading(true);
    let data = [];
    try {
      const res = await db
        .collection("reviews")
        .orderBy("timestamp", "desc")
        .get();

      res.docs.map((review) => {
        data.push({ ...review.data(), reviewId: review.id });
      });
      setReviews(data);
    } catch (err) {
      console.log(err.message);
    }

    setIsLoading(false);
  };

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
    <DataContext.Provider
      value={{ reviews, isLoading, addReview, fetchReviews }}
    >
      {children}
    </DataContext.Provider>
  );
};
