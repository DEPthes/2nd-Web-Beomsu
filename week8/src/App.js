import { useSelector } from "react-redux";

import Start from "./component/Start";
import CardGame from "./component/CardGame";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div>
      {!isAuth && <Start />}
      {isAuth && <CardGame />}
    </div>
  );
}

export default App;
