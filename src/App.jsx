import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Reviews from "./pages/Reviews";
import Path from "./pages/Path";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/paths" component={Path} />

        <Route exact path="/reviews" component={Reviews} />

        <Route path="*" render={() => <Redirect to="/reviews" />} />
      </Switch>
    </>
  );
}

export default App;
