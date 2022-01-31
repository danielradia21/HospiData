import { LabTable } from "./lab-table"



export function Lab(){

    const labResults = [
        {date:Date.now(),title:'Foot X-Ray'},
        {date:Date.now()+1000*60*24*7,title:'Hand X-Ray'},
        {date:Date.now()+1000*60*24*14,title:'Blood test'},
        {date:Date.now()+1000*60*24*21,title:'Iron test'},
        {date:Date.now()+1000*60*24*28,title:'Weight test'},
    ]


    return (
        <div className="lab-main-container">
            <div className="main-content-header">Labs Results</div>
      <LabTable labResults={labResults}/>
            </div>
    )
}

