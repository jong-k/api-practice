import { Link } from "react-router-dom";

export default function App() {
  return (
    <>
      <div>
        <Link to="/singleton">
          <h2>1. 싱글턴 패턴</h2>
        </Link>
        <h2>2. 프록시 패턴</h2>
        <Link to="/provider">
          <h2>3. 프로바이더 패턴</h2>
        </Link>
      </div>
    </>
  );
}
