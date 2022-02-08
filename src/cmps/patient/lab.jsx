import { useState } from "react";
import { LabTable } from "./lab-table"



export function Lab(){

    const [filteredRes, setFilterRes] = useState(null);

    const labResults = [
        {date:Date.now(),title:'Foot X-Ray'},
        {date:Date.now()+1000*60*24*7,title:'Hand X-Ray'},
        {date:Date.now()+1000*60*24*14,title:'Blood test'},
        {date:Date.now()+1000*60*24*21,title:'Iron test'},
        {date:Date.now()+1000*60*24*28,title:'Weight test'},
    ]

    
  const filterResults = ({target}) => {
    const filteredResults = labResults.filter((res) =>
        res.title.toLowerCase().includes(target.value) 
    );
    setFilterRes((prev) => (prev = filteredResults));
};

    return (
        <div className="lab-main-container">
            <div className="main-content-header">Labs Results</div>
            <input
                    onChange={filterResults}
                    className="patient-search-input"
                    type="text"
                    placeholder="Serach Appointments..."
                />
      <LabTable labResults={filteredRes||labResults}/>
            </div>
    )
}

