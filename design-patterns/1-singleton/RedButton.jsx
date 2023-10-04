// import Counter from "./counter-class.js";
import { counter } from "./counter-object.js";

export default function RedButton() {
  return (
    <button
      className="singleton-button"
      id="red"
      onClick={() => console.log("Counter total: ", counter.decrement())}
    >
      Red button
    </button>
  );
}
