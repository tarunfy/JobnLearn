import { Button } from "@chakra-ui/react";
import moment from "moment";
import { Link } from "react-router-dom";

const ReviewCard = ({ review }) => {
  return (
    <li className="px-5 py-3 border">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-bold">{review.companyName}</h1>
        <p className="font-semibold">
          {moment(review.timestamp.toDate()).startOf("ss").fromNow()}
        </p>
      </div>
      <p>
        Rating: <span className="font-semibold">{review.rating}</span>
      </p>
      <p>
        Pros: <span className="font-semibold">{review.pros}</span>
      </p>
      <p>
        Cons: <span className="font-semibold">{review.cons}</span>
      </p>

      <div className="flex w-full justify-between items-center">
        <p>
          Posted by ~{" "}
          <span className="font-semibold bg-yellow-200 text-black p-1">
            {review.name === "yes" ? "anonymous" : review.name}
          </span>
        </p>

        <Link to={`/reviews/${review.reviewId}`}>
          <Button>View Details</Button>
        </Link>
      </div>
    </li>
  );
};

export default ReviewCard;
