import { useEffect, useState } from "react";

const Fetch  = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://swapi.dev/api/people/1/')
        .then(response => response.json())
        .then(data => {
           
            setData(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []);
    return (
        <>
         <div>
            {/* Render the data or show a loading state */}
            {data ? <div>{data.name}</div> : <div>Loading...</div>}
        </div>
        </>
    )

console.log(data)
}

export default Fetch ;