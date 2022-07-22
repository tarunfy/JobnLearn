import { createContext, useState, useEffect } from "react";
import { auth } from "../utils/db";
import firebase from "firebase";
import { Center, Spinner } from "@chakra-ui/react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [fetchingUser, setFetchingUser] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    setFetchingUser(true);
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser({
          userId: user.uid,
          name: user.displayName,
          profilePhoto: user.photoURL,
          email: user.email,
        });
      } else {
        setCurrentUser(null);
      }
      setFetchingUser(false);
    });
  }, []);

  const signin = async () => {
    setIsLoading(true);
    let provider = new firebase.auth.GoogleAuthProvider();

    try {
      await auth.signInWithPopup(provider);
    } catch (err) {
      setAuthError(err.message);
    }
    setIsLoading(false);
  };

  const logout = async () => {
    await auth.signOut();
  };

  if (isLoading || fetchingUser)
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
    <AuthContext.Provider
      value={{
        signin,
        isLoading,
        currentUser,
        authError,
        logout,
      }}
    >
      {!fetchingUser && children}
    </AuthContext.Provider>
  );
};
