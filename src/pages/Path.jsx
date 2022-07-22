import { useContext, useState } from "react";
import PathCard from "../components/PathCard";
import AddPath from "../components/AddPath";
import { PathContext } from "../contexts/PathContext";
import { IconButton, Input } from "@chakra-ui/react";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";

const Path = () => {
  const { paths, filterPaths, fetchPaths } = useContext(PathContext);
  const [tagName, setTagName] = useState("");

  const applyFilter = async () => {
    await filterPaths(tagName);
  };

  const clearFilter = async () => {
    setTagName("");
    await fetchPaths();
  };

  return (
    <div className="bg-slate-50 h-screen w-full py-5 ">
      <div className="flex max-w-7xl flex-col items-center justify-between mx-auto space-y-10">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-5xl font-bold tracking-tight">All Paths</h1>
          <AddPath />
        </div>

        <div className="flex space-x-1">
          <Input
            placeholder="Search"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            className="!w-full"
          />
          <IconButton
            disabled={!tagName}
            size="md"
            aria-label="Search database"
            icon={<SearchIcon />}
            onClick={applyFilter}
          />
          <IconButton
            size="md"
            aria-label="Clear filter"
            icon={<CloseIcon />}
            onClick={clearFilter}
          />
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
