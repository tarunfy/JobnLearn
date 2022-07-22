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
    <div className="max-w-[1000px] pt-10 mx-auto space-y-20">
      <div className="space-y-4">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-5xl font-bold">{path?.headline}</h1>
          <p className="text-sm">
            {moment(path?.timestamp.toDate()).startOf("ss").fromNow()}
          </p>
        </div>
        <h4 className="text-xl font-semibold text-gray-600">{path?.path}</h4>

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
        <div className="flex justify-between w-full items-center">
          <p>
            Created by ~{" "}
            <span className="font-semibold bg-yellow-200 text-black p-1">
              {path.createdBy}
            </span>
          </p>
          <AddComment id={id} type="path" />
        </div>
      </div>

      <div className="w-full space-y-2">
        <h1 className="text-3xl font-semibold mb-2">Comments</h1>
        {comments && comments?.length > 0 ? (
          comments.map((comment, index) => (
            <div
              key={index}
              className="space-y-2 bg-white border p-4 rounded-md"
            >
              <div className="flex items-center w-full justify-between">
                <h3 className="font-semibold text-lg">{comment.comment}</h3>
                <p>
                  {moment(comment?.timestamp.toDate()).startOf("ss").fromNow()}
                </p>
              </div>
              <p className="text-sm">~ {comment.commentedBy}</p>
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
