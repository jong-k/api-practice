// import Counter from "./counter-class.js";
import { counter } from "./counter-object.js";

export default function BlueButton() {
  return (
    <button
      className="singleton-button"
      id="blue"
      onClick={() => console.log("Counter total: ", counter.increment())}
    >
      Blue button
    </button>
  );
}
