import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <div className="bg-slate-100 w-full flex items-center justify-between px-10 py-5">
      <h1 className="text-2xl font-bold">JobnLearn</h1>
      <div className="flex items-center space-x-2">
        <Link to="/reviews">
          <Button className="!bg-green-500 hover:!bg-green-600 !text-white/90">
            Reviews
          </Button>
        </Link>
        <Link to="/paths">
          <Button className="!bg-transparent !border-[1px] !border-green-500 !text-green-500 hover:!text-green-600">
            Paths
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
