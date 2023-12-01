import WithLoader from "./WithLoader";
// import WithHover from "./WithHover";
import { useHover } from "./useHover";

const URL = "https://dog.ceo/api/breed/labrador/images/random/6";
// FIXME: props 타입 고치기
function DogImages(props: any) {
  const [hoverRef, isHovering] = useHover();

  return (
    <div {...props} ref={hoverRef}>
      {isHovering && <div>Hovering!!!</div>}
      <div>
        {props.data.message.map((dogImgSrc: string, index: number) => (
          <img src={dogImgSrc} alt="Dog" key={index} />
        ))}
      </div>
    </div>
  );
}

// export default WithHover(WithLoader(DogImages, URL));
export default WithLoader(DogImages, URL);
