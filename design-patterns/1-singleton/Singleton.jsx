import "./Singleton.css";
import BlueButton from "./BlueButton";
import RedButton from "./RedButton";

export default function Singleton() {
  return (
    <div className="singleton-box">
      <h2>Click on either of the buttons 🚀!</h2>
      <RedButton />
      <BlueButton />
    </div>
  );
}
