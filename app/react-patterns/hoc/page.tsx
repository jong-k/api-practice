"use client";
import DogImages from "./DogImages";

export default function HocPage() {
  return (
    <div>
      <h1>
        Browse Dog Images{" "}
        <span role="img" aria-label="emoji">
          🐕
        </span>
      </h1>
      {/* dog image url을 받아서 6개를 출력만 해주는 컴포넌트 */}
      <DogImages />
    </div>
  );
}
