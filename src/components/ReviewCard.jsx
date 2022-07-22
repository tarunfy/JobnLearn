import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ReviewCard = ({ review }) => {
  return (
    <li className="px-5 py-3 border">
      <h>{review.companyName}</h>
      <p>
        Rating: <span>{review.rating}</span>
      </p>
      <p>
        Posted at: <span>{review.timestamp.toDate().toDateString()}</span>
      </p>
      <div className="flex w-full justify-end">
        <Link to={`/reviews/${review.reviewId}`}>
          <Button>View More</Button>
        </Link>
      </div>
    </li>
  );
};

export default ReviewCard;
