import React, { useState, useEffect } from "react";

export default function UseState() {
  const [car, setCar] = useState({
    brand: "Ford",
    model: "Mustang",
    year: "1964",
    color: "red",
  });
  const [count, setCount] = useState(0);

  useEffect(() => {
    let timer = setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const updateColor = () => {
    setCar((sebelumnya) => {
      console.log(sebelumnya);
      return { ...sebelumnya, color: "blue" };
    });
  };

  return (
    <>
      <h1>My {car.brand}</h1>
      <p>
        It is a {car.color} {car.model} from {car.year}.
      </p>
      <button type="button" onClick={updateColor}>
        Blue
      </button>
    </>
  );
}
