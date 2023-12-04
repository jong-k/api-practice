import { useDogImages } from "./useDogImages";

// interface DogImagesProps {
//   dogs: string[];
// }

// export default function DogImages({ dogs }: DogImagesProps) {
export default function DogImages() {
  const { dogs } = useDogImages();

  return dogs.map((dog: string, i: number) => <img src={dog} key={i} alt="댕댕이" />);
}
