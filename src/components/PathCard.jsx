import { Button, HStack, Tag, TagLabel } from "@chakra-ui/react";
import moment from "moment";
import { Link } from "react-router-dom";

const PathCard = ({ path }) => {
  return (
    <li className="px-5 py-3 border space-y-6 bg-white rounded-md">
      <div className="flex items-center justify-between w-full space-y-3">
        <h1 className="text-3xl font-bold">{path.headline}</h1>
        <p className="font-semibold">
          {moment(path.timestamp.toDate()).startOf("ss").fromNow()}
        </p>
      </div>
      <p className="font-semibold">
        <HStack spacing={4}>
          {path.tags.map((tag, index) => (
            <Tag
              size="lg"
              key={index}
              borderRadius="full"
              variant="solid"
              color="white"
              bgColor="green.400"
            >
              <TagLabel>{tag}</TagLabel>
            </Tag>
          ))}
        </HStack>
      </p>

      <div className="flex w-full justify-between items-center">
        <p>
          Created by ~{" "}
          <span className="font-semibold bg-yellow-200 text-black p-1">
            {path.createdBy}
          </span>
        </p>
        <Link to={`/paths/${path.pathId}`}>
          <Button>View Details</Button>
        </Link>
      </div>
    </li>
  );
};

export default PathCard;
