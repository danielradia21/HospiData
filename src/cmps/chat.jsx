import { useEffect, useState } from "react"


export function chat({user}) {


    const [msgs,setMsgs] = useState([])
    

    useEffect(()=>{
        socketService.emit("chat topic", user._id);
        socketService.on("chat addMsg", addMsg);
        // socketService.on("user isTyping", userTyping);
    },[])

    const addMsg = (msg) =>{
        setMsgs((prev)=>prev.push(msg))
    }
   

    // needs to have socketService.off
  
  
    return <div className="chat">
        <div>

        </div>
            
    </div>
  }