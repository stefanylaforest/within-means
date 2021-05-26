import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";

function App() {
  // const [test, setTest] = useState(null);

  // useEffect(() => {
  //   fetch("/hello")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("success");
  //       setTest(data.message);
  //     });
  // }, []);

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
