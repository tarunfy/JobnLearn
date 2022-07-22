import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Reviews from "./pages/Reviews";
import Path from "./pages/Path";
import Navbar from "./components/Navbar";
import ReviewDetails from "./pages/ReviewDetails";
import PathDetails from "./pages/PathDetails";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/paths" component={Path} />
        <Route exact path="/paths/:id" component={PathDetails} />

        <Route exact path="/reviews" component={Reviews} />
        <Route exact path="/reviews/:id" component={ReviewDetails} />

        <Route path="*" render={() => <Redirect to="/reviews" />} />
      </Switch>
    </>
  );
}

export default App;
