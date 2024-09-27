import { useState } from "react";
export default function Test(props) {
    const hello = ({ a, b }) => {
        alert(a)
        alert(b)
    }
    const [car, setCar] = useState({
        brand: "Ford",
        model: "Mustang",
        year: "1964",
        color: "red"
    });

    const updateColor = (color, year) => {
        setCar(previousState => {
            return { ...previousState, color1: color, year: year }
        });
    }

    return (
        <>{car.color}{car.year} {car.brand}{car.color1}
            <button onClick={() => updateColor("do", 2019)}>Click</button>



        </>
    )
}