import React,{useState} from 'react'
import '../app/globals.css'
import RefineryData from './data.json'

const Header = () => {
    // const [refName, setRefName] = useState("");
    console.log("REfinery data is" , RefineryData)


    // function handleChange(e) {
    //     setRefName(e.target.value);
    //     console.log("recieved header name " , e.target.value.match(/\d+/));
    //     // console.log("header id is: ", id);
    //     props.setGraphId(e.target.value.match(/\d+/))
    //    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-2 w-100">
            <div>
                    <h2>Chasing Methane</h2>
            </div>
            {/* <option value={selectedFruit}>Apple</option> */}
            {/* <label>
                    Select A Refinery:
                    <select  onChange={handleChange}>
                    <option>Select a Region</option>
                    {RefineryData.map((data) => (
                        <option >{data.id}: {data.Refinery}</option>
                    ))}
                    </select>
                    </label>
                 */}
            </nav>
        </div>
    )
}

export default Header