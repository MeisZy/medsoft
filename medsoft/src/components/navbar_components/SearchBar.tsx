import {useState} from 'react';
import {FaSearch} from "react-icons/fa";
import './SearchBar.css'
                           //@ts-expect-error sqg
export const SearchBar = ({setResults}) => {

  const [input,setInput] = useState("");
                    //@ts-expect-error sqg
  const fetchData = (value) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user) => {
          return (
            value &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(value.toLowerCase())
          );
        });
        console.log(results);
      });
  }
                         //@ts-expect-error sqg
  const handleChange = (value) =>{
      setInput(value)
      fetchData(value)
  }

  return (
    <>
      <div className='searchbarcontainer'>
          <FaSearch id="search-icon" className="searchicon" />
          <input placeholder="Search up." value={input} onChange={(e) => handleChange(e.target.value)}></input>
      </div>
    </>
  )
}

export default SearchBar;