import { Button } from "@chakra-ui/react";
import moment from "moment";
import { Link } from "react-router-dom";

const ReviewCard = ({ review }) => {
  return (
    <li className="px-5 py-3 border">
      <h1 className="text-3xl font-bold">{review.companyName}</h1>
      <p>
        Rating: <span className="font-semibold">{review.rating}</span>
      </p>
      <p>
        Posted at:{" "}
        <span className="font-semibold">
          {moment(review.timestamp.toDate()).startOf("ss").fromNow()}
        </span>
      </p>
      <div className="flex w-full justify-end">
        <Link to={`/reviews/${review.reviewId}`}>
          <Button>View Details</Button>
        </Link>
      </div>
    </li>
  );
};

export default ReviewCard;
