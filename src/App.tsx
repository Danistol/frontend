import React from "react";
import CatsList from "./components/Cats";
import TodosList from "./components/TODO";

const MainView = () => {
  return (
    <div>
      <h2>Cats</h2>
      <CatsList />

      <h2>TODOs</h2>
      <TodosList />
    </div>
  );
};

export default MainView;
