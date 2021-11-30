import React from "react";
import Home from "./Components/Home/Home";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import News from "./Components/news/News";
import CSTC from "./Components/CSTC/CSTC";
import EventsTimeline from "./Components/EventsTimeline/EventsTimeline";
import Error from "./Components/Error/Error";
import Activities from "./Components/Activities/Activities";
import MemberOfTheWeek from "./Components/MemberOfTheWeek/MemberOfTheWeek";
import Newsletter from "./Components/Newsletter";
import Portfolio from "./Components/Portfolio/Portfolio";
function App() {
  return (
    <>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/member-of-the-month" component={MemberOfTheWeek} />
          <Route exact path="/news" component={News} />
          <Route exact path={"/activities"} component={Activities} />
          <Route path={"/eventstimeline"} component={EventsTimeline} />
          <Route path={"/error"} component={Error} />
          <Route render={() => <Redirect to="/error" />} />
        </Switch>
      </HashRouter>
    </>
  );
}

export default App;
