import React from 'react';

// Function hiển thị alert cho tất cả
const hiAll = () => {
  alert("hello everyone");
};

// Function hiển thị alert với tên được truyền vào
const hiYou = (name) => {
  alert("Hello " + name);
};

function Hello() {
  return (
    <span>
      <button onClick={hiAll}>Hi All</button>
      <button onClick={() => hiYou("Peter")}>Hi you</button>
    </span>
  );
}

export default Hello;
