import Create from "./components/Create";
import Exercises from "./components/ExercisesList";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import ExerciseDetails from "./components/ExerciseDetails";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddResult from "./components/AddResult";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import Account from "./components/Account";
import FullHistory from "./components/FullHistory";
import Cardio from "./components/Cardio";
function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/cardio">
              <Cardio />
            </Route>
            <Route exact path="/exercises">
              <Exercises />
            </Route>
            <Route exact path="/create">
              <Create />
            </Route>
            <Route exact path="/exercise/details/:id">
              <ExerciseDetails />
            </Route>
            <Route exact path="/addresult/:id">
              <AddResult />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/forgotpassword">
              <ForgotPassword />
            </Route>
            <Route exact path="/settings">
              <Account />
            </Route>
            <Route exact path="/fullHistory/:id">
              <FullHistory />
            </Route>
          </Switch>
          <Footer className="footer" />
        </div>
      </div>
    </Router>
  );
}

export default App;
