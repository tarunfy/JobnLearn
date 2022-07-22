import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import AddComment from "../components/AddComment";
import { PathContext } from "../contexts/PathContext";
import { HStack, Tag, TagLabel } from "@chakra-ui/react";

const PathDetails = () => {
  const [path, setPath] = useState(null);

  const { fetchPath, comments, fetchComments } = useContext(PathContext);
  const { id } = useParams();

  useEffect(() => {
    const getComments = async () => {
      await fetchComments(id);
    };
    getComments();
  }, []);

  useEffect(() => {
    const getPaths = async () => {
      const data = await fetchPath(id);
      setPath(data);
    };
    getPaths();
  }, []);

  return (
    <div className="max-w-[1000px] pt-8 mx-auto space-y-4">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-5xl font-bold">{path?.headline}</h1>
        <p className="text-sm">
          {moment(path?.timestamp.toDate()).startOf("ss").fromNow()}
        </p>
      </div>
      <h4 className="text-2xl font-semibold">{path?.path}</h4>

      <p className="font-semibold">
        <HStack spacing={4}>
          {path?.tags.map((tag, index) => (
            <Tag
              size="lg"
              key={index}
              borderRadius="full"
              variant="solid"
              color="white"
              bgColor="green.500"
            >
              <TagLabel>{tag}</TagLabel>
            </Tag>
          ))}
        </HStack>
      </p>
      <div className="flex justify-end w-full">
        <AddComment id={id} type="path" />
      </div>

      <div className="!mt-10 w-full">
        <h1 className="text-2xl font-semibold">Comments</h1>
        {comments && comments?.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index}>
              <p>{comment.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-center font-semibold text-lg !mt-4">
            No comments...
          </p>
        )}
      </div>
    </div>
  );
};

export default PathDetails;
