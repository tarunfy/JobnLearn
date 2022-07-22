import { useContext } from "react";
import PathCard from "../components/PathCard";
import AddPath from "../components/AddPath";
import { PathContext } from "../contexts/PathContext";

const Path = () => {
  const { paths } = useContext(PathContext);

  return (
    <div className="bg-slate-50 h-screen w-full py-5 ">
      <div className="flex max-w-7xl flex-col items-center justify-between mx-auto space-y-10">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-5xl font-bold tracking-tight">All Paths</h1>
          <AddPath />
        </div>

        {paths && paths?.length > 0 ? (
          <ul className="w-full bg-white">
            {paths.map((path, index) => (
              <PathCard key={index} path={path} />
            ))}
          </ul>
        ) : (
          <p className="text-center text-lg !mt-44">No paths available...</p>
        )}
      </div>
    </div>
  );
};

export default Path;
