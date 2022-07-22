import { createContext, useState, useEffect, useContext } from "react";
import { db } from "../utils/db";
import { Center, Spinner } from "@chakra-ui/react";
import firebase from "firebase";
import { AuthContext } from "./AuthContext";

export const ReviewContext = createContext(null);

export const ReviewProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState(null);
  const [comments, setComments] = useState(null);

  const { currentUser } = useContext(AuthContext);

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

  const fetchReview = async (reviewId) => {
    try {
      const res = await db.collection("reviews").doc(reviewId).get();
      const data = res.data();
      return data;
    } catch (err) {
      console.log(err.message);
    }
  };

  const addComment = async (reviewId, comment) => {
    try {
      await db.collection("reviews").doc(reviewId).collection("comments").add({
        commentedBy: currentUser.name,
        comment,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      await fetchComments(reviewId);
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchComments = async (reviewId) => {
    let data = [];
    try {
      const res = await db
        .collection("reviews")
        .doc(reviewId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .get();

      res.docs.map((comment) => {
        data.push({ ...comment.data(), commentId: comment.id });
      });

      setComments(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  if (isLoading)
    return (
      <Center h="100vh" w="100vw" bg="#f6f6f6">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        isLoading,
        addReview,
        fetchReviews,
        fetchReview,
        addComment,
        fetchComments,
        comments,
      }}
    >
      {!isLoading && children}
    </ReviewContext.Provider>
  );
};
