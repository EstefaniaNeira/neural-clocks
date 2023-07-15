import React, { useState } from "react";
import Timer from "./Timer";
import Header from "./Header/Header";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState(25);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleTimeChange = (newTime) => {
    setTime(newTime);
  };

  return (
    <div>
      <Header/>
      <Timer />
    </div>
  );
};

export default App;