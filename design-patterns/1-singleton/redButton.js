// import Counter from "./counter-class.js";
import { counter } from "./counter-object.js";

const button = document.getElementById("red");
button.addEventListener("click", () => {
  // Counter.increment();
  // console.log("Counter total: ", Counter.getCount());
  console.log("Counter total: ", counter.increment());
});
