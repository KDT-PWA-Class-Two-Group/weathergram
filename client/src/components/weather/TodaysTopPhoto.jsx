import PostCard from "../common/PostCard";
import "./TodaysTopPhoto.css"; 

function TodaysTopPhoto() {
  return (
    <div className="todays-top-photo-container">
      <h3 className="todays-top-photo-title">오늘의 인기 사진</h3>
      <PostCard />
    </div>
  );
}

export default TodaysTopPhoto;