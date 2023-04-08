
import { React, useState, useEffect } from "react";
import axios from "axios";
import "../assests/css/choose.css";

const Chooseseat = () => {
    const options = ['a', 'b', 'c', 'd','e','f'];
    const [IsChecked, setIsChecked] = useState(false);
    const [value, setValue] = useState();
    const [checked, setChecked] = useState(() => {
      const saved = localStorage.getItem('checked');
      return saved ? JSON.parse(saved) : [];
    });
  
    useEffect(() => {
      localStorage.setItem('checked', JSON.stringify(checked));
      console.log(checked)
    }, [checked]);
  
    function handleChange(e) {
     setIsChecked(e.target.checked)
     setValue(e.target.value)

     
    }
  
    function handleSubmit(event) {
      event.preventDefault();
      setIsChecked(true)
      if (IsChecked) {
        setChecked([...checked, value]);
      } else {
        setChecked(checked.filter((item) => item !== value));
      }
      console.log('Checked values:', checked);
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <div>
          {options.map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                value={option}
                checked={IsChecked}
                onChange={handleChange}
                disabled={checked.includes(option)}
              />
              {option}
            </label>
          ))}
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }

export default Chooseseat;
