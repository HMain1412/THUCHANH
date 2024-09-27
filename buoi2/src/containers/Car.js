import { useState } from 'react';

function Car() {
  // Khởi tạo state cho thông tin của chiếc xe
  const [car, setCar] = useState({
    brand: "Ford",
    model: "Mustang",
    year: "1964",
    color: "red"
  });

  // Hàm cập nhật màu sắc của chiếc xe
  const updateColor = () => {
    setCar((previousState) => {
      return { ...previousState, color: "blue" };
    });
  };

  return (
    <>
      <h1>My brand: {car.brand}</h1>
      <p>Color: {car.color}, Model: {car.model}, Year: {car.year}.</p>
      <button type="button" onClick={updateColor}>Update color: blue</button>
    </>
  );
}

export default Car;
