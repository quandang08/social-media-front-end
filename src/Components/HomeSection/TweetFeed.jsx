import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "../../Store/Twit/Action";
import TweetCard from "./TweetCard";

const TweetFeed = () => {
  const dispatch: any = useDispatch(); 
  const { tweets, loading, error } = useSelector((state: any) => state.twit); // Đảm bảo đúng reducer

  useEffect(() => {
    dispatch(getAllTweets()); // Gọi API
  }, [dispatch]);

  if (loading) return <p>Đang tải tweet...</p>;
  if (error) return <p>Lỗi: {error}</p>;

  return (
    <div>
      {tweets.length ? tweets.map((tweet: any, index: number) => (
        <TweetCard key={index} item={tweet} />
      )) : <p>Không có tweet nào.</p>}
    </div>
  );
};

export default TweetFeed;
