

import { useEffect, useState } from "react";
import { adminService } from "../../services/admin.service";
import Table from "./patience-table"


export function AdminPatienceList() {

    const [patience,setPatience] = useState(null)

    useEffect( () => {
        getPatience();
    }, []);

    const getPatience = async () =>{
        const patience = await adminService.getPatience();
        setPatience(prevPatience => prevPatience = patience)
    }


    if (!patience) return <div>lodinng...</div>
    return  <>
    <div className="main-content-header">Patience List</div>
    <input placeholder="serch..."/>
        <Table items={patience}/>
    </>;
}