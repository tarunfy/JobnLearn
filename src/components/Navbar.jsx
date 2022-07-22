import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Avatar, Button, Tooltip } from "@chakra-ui/react";

const Navbar = () => {
  const { logout, currentUser } = useContext(AuthContext);

  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push("/");
  };

  return (
    <div className="bg-slate-100 border-b border-gray-700 w-full flex items-center justify-between px-10 py-5">
      <Link to="/">
        <h1 className="text-2xl font-bold underline decoration-wavy">
          JobnLearn
        </h1>
      </Link>
      <div className="flex items-center space-x-4">
        <div className="space-x-2">
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
        </div>
        {currentUser && (
          <Tooltip hasArrow label="Logout" bg="black" color="white">
            <Avatar
              className="cursor-pointer"
              name={currentUser.name}
              src={currentUser?.profilePhoto}
              onClick={handleLogout}
            />
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default Navbar;
