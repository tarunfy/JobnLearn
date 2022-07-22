import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReviewContext } from "../contexts/ReviewContext";
import moment from "moment";
import AddComment from "../components/AddComment";

const ReviewDetails = () => {
  const [review, setReview] = useState(null);

  const { fetchReview, comments, fetchComments } = useContext(ReviewContext);
  const { id } = useParams();

  useEffect(() => {
    const getComments = async () => {
      await fetchComments(id);
    };
    getComments();
  }, []);

  useEffect(() => {
    const getReview = async () => {
      const data = await fetchReview(id);
      setReview(data);
    };
    getReview();
  }, []);

  return (
    <div className="max-w-[1000px] pt-8 mx-auto space-y-20">
      <div className="space-y-4">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-5xl font-bold">{review?.title}</h1>
          <p className="text-sm">
            {moment(review?.timestamp.toDate()).startOf("ss").fromNow()}
          </p>
        </div>
        <h4 className="text-2xl font-semibold capitalize">
          {review?.companyName}
        </h4>
        <h3>
          Headline: <span className="font-semibold">{review?.headline}</span>
        </h3>
        <p>
          Rating: <span className="font-medium">{review?.rating}</span>
        </p>
        <p>
          Pros: <span className="font-medium">{review?.pros}</span>
        </p>
        <p>
          Cons: <span className="font-medium">{review?.cons}</span>
        </p>
        <p>
          Employment status:{" "}
          <span className="font-medium capitalize">
            {review?.employmentStatus}
          </span>
        </p>

        <div className="flex justify-between items-center w-full">
          <p>
            Review posted by ~{" "}
            <span className="font-semibold bg-yellow-200 text-black p-1">
              {review?.name === "yes" ? "anonymous" : review?.name}
            </span>
          </p>
          <AddComment id={id} type="review" />
        </div>
      </div>

      <div className="w-full space-y-2">
        <h1 className="text-3xl font-semibold mb-2">Comments</h1>
        {comments && comments?.length > 0 ? (
          comments?.map((comment, index) => (
            <div
              key={index}
              className="space-y-2 bg-white border p-4 rounded-md"
            >
              <div className="flex items-center w-full justify-between">
                <h3 className="font-semibold text-lg">{comment?.comment}</h3>
                <p>
                  {moment(comment?.timestamp.toDate()).startOf("ss").fromNow()}
                </p>
              </div>
              <p className="text-sm">~ {comment?.commentedBy}</p>
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

export default ReviewDetails;
