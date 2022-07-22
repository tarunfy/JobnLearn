import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Button } from "@chakra-ui/react";
import BannerImg from "../assets/banner.jpeg";
import GoogleImg from "../assets/google.svg";
import { useHistory } from "react-router-dom";

const Home = () => {
  const { signin, currentUser } = useContext(AuthContext);

  const history = useHistory();

  const handleClick = async () => {
    await signin();
    history.push("/reviews");
  };

  return (
    <>
      <div className="h-screen bg-slate-100 w-full">
        <div className="h-full w-full relative">
          <img
            src={BannerImg}
            alt="Banner"
            className="h-full w-full object-cover"
          />
          <div className="absolute top-0 left-0 h-full w-full bg-black/50 flex items-center justify-start flex-col space-y-4">
            <h1 className="text-white font-semibold text-4xl mt-52">
              It's time to start living the life we've imagined.
            </h1>
            <Button disabled={currentUser} onClick={handleClick}>
              <img src={GoogleImg} alt="google logo" className="h-5 w-5 mr-2" />{" "}
              Continue with google
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
