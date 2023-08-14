import React from "react";
import RandomCitizenGenerator from "./functions/RandomCitizenGenerator";
import "bootstrap/dist/css/bootstrap.min.css";
import { MainContext} from "./context/MainContext";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Random Citizen Generator</h1>
      <MainContext>
        <RandomCitizenGenerator />
      </MainContext>
    </div>
  );
};

export default App;
