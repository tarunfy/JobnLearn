import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Button } from "@chakra-ui/react";

const Navbar = () => {
  const { logout, currentUser } = useContext(AuthContext);

  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push("/");
  };

  return (
    <div className="bg-slate-100 w-full flex items-center justify-between px-10 py-5">
      <Link to="/">
        <h1 className="text-2xl font-bold underline decoration-wavy">
          JobnLearn
        </h1>
      </Link>
      <div className="flex items-center space-x-2">
        <Link to="/reviews">
          <Button className="!bg-green-500 hover:!bg-green-600 !text-white/90">
            Reviews
          </Button>
        </Link>
        <Link to="/paths">
          <Button className="!bg-green-500 hover:!bg-green-600 !text-white/90">
            Paths
          </Button>
        </Link>
        {currentUser && (
          <Button
            onClick={handleLogout}
            className="!bg-transparent !border-[1px] !border-green-500 !text-green-500 hover:!text-green-600"
          >
            Logout
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
