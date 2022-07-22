import { useContext } from "react";
import { ReviewContext } from "../contexts/ReviewContext";
import AddReview from "../components/AddReview";
import ReviewCard from "../components/ReviewCard";

const Reviews = () => {
  const { reviews } = useContext(ReviewContext);

  return (
    <div className="bg-slate-50 h-screen w-full py-5 ">
      <div className="flex max-w-7xl flex-col items-center justify-between mx-auto space-y-10">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-5xl font-bold tracking-tight">All Reviews</h1>
          <AddReview />
        </div>
        {/* reviews */}
        {reviews?.length > 0 ? (
          <ul className="w-full bg-white">
            {reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </ul>
        ) : (
          <p className="text-center text-lg !mt-44">No reviews available...</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
