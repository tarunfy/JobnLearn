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
    <div className="max-w-[1000px] pt-8 mx-auto space-y-4">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-5xl font-bold">{review?.title}</h1>
        <p className="text-sm">
          {moment(review?.timestamp.toDate()).startOf("ss").fromNow()}
        </p>
      </div>
      <h4 className="text-2xl font-semibold">{review?.companyName}</h4>
      <h3>
        Headline: <span className="font-semibold">{review?.headline}</span>
      </h3>
      <p>
        Pros: <span className="font-medium">{review?.pros}</span>
      </p>
      <p>
        Cons: <span className="font-medium">{review?.cons}</span>
      </p>
      <p>
        Employment status:{" "}
        <span className="font-medium">{review?.employmentStatus}</span>
      </p>
      <p>
        Review posted by ~{" "}
        <span className="font-medium">
          {review?.name === "yes" ? "Anonymous" : review?.name}
        </span>
      </p>
      <div className="flex justify-end w-full">
        <AddComment id={id} type="review" />
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

export default ReviewDetails;
