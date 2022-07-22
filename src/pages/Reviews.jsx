import { useContext } from "react";
import { DataContext } from "../contexts/DataContext";
import ReviewCard from "../components/ReviewCard";
import AddReview from "../components/AddReview";

const Reviews = () => {
  const { reviews } = useContext(DataContext);
  return (
    <div className="bg-slate-50 h-screen w-full py-5 ">
      <div className="flex max-w-7xl flex-col items-center justify-between mx-auto space-y-10">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-5xl font-bold tracking-tight">All Reviews</h1>
          <AddReview />
        </div>
        {/* reviews */}
        <ul className="w-full bg-red-50">
          {reviews.map((review, index) => (
            <ReviewCard key={index} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reviews;
