import { createContext, useState, useEffect } from "react";
import { db } from "../utils/db";
import { Center, Spinner } from "@chakra-ui/react";
import firebase from "firebase";

export const PathContext = createContext(null);

export const PathProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [paths, setPaths] = useState(null);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    fetchPaths();
  }, []);

  //const addReview = async (data) => {
  //  setIsLoading(true);
  //  let error;
  //  try {
  //    await db.collection("reviews").add({
  //      ...data,
  //      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //    });
  //  } catch (err) {
  //    error = err.message;
  //  }
  //  fetchReviews();
  //  setIsLoading(false);
  //  return {
  //    error: error ? error : null,
  //  };
  //};

  const addPath = async (data) => {
    setIsLoading(true);
    let error;
    try {
      await db.collection("paths").add({
        ...data,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } catch (err) {
      error = err.message;
    }
    fetchPaths();
    setIsLoading(false);
    return {
      error: error ? error : null,
    };
  };

  const fetchPaths = async () => {
    setIsLoading(true);
    let data = [];
    try {
      const res = await db
        .collection("paths")
        .orderBy("timestamp", "desc")
        .get();
      res.docs.map((path) => {
        data.push({ ...path.data(), pathId: path.id });
      });
      setPaths(data);
    } catch (err) {
      console.log(err.message);
    }
    setIsLoading(false);
  };

  //const fetchReviews = async () => {
  //  setIsLoading(true);
  //  let data = [];
  //  try {
  //    const res = await db
  //      .collection("reviews")
  //      .orderBy("timestamp", "desc")
  //      .get();

  //    res.docs.map((review) => {
  //      data.push({ ...review.data(), reviewId: review.id });
  //    });
  //    setReviews(data);
  //  } catch (err) {
  //    console.log(err.message);
  //  }

  //  setIsLoading(false);
  //};

  //const fetchReview = async (reviewId) => {
  //  try {
  //    const res = await db.collection("reviews").doc(reviewId).get();
  //    const data = res.data();
  //    return data;
  //  } catch (err) {
  //    console.log(err.message);
  //  }
  //};

  //const addComment = async (reviewId, comment) => {
  //  try {
  //    await db.collection("reviews").doc(reviewId).collection("comments").add({
  //      comment,
  //      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //    });
  //    await fetchComments(reviewId);
  //  } catch (err) {
  //    console.log(err.message);
  //  }
  //};

  //const fetchComments = async (reviewId) => {
  //  let data = [];
  //  try {
  //    const res = await db
  //      .collection("reviews")
  //      .doc(reviewId)
  //      .collection("comments")
  //      .orderBy("timestamp", "desc")
  //      .get();

  //    res.docs.map((comment) => {
  //      data.push({ ...comment.data(), commentId: comment.id });
  //    });

  //    setComments(data);
  //    console.log(comments);
  //  } catch (err) {
  //    console.log(err.message);
  //  }
  //};

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
    <PathContext.Provider
      value={{
        addPath,
        paths,
      }}
    >
      {!isLoading && children}
    </PathContext.Provider>
  );
};
