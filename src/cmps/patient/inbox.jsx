import { useEffect, useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { patientService } from "../../services/patient.service"
import { getLoggedInUser } from "../../store/actions/user.actions"
import { InboxList } from "./inbox-list"
import { InboxPrev } from "./inbox-prev"
import {Loader} from "../loader"




export function Inbox(){
    const { user } = useSelector((state) => state.userModule)
    const [inbox,setInbox] = useState([])
    const [mailPrev,setMailPrev] = useState(null)
    const [page,setPage] = useState(0)
   

    const dispatch = useDispatch()

    const maxPage = 6

    // const inbox=[
    //     {
    //     "_id":"m21566",
    //     "appId":"a110",
    //     "date":"1642508355660",
    //     "isOpened":false,
    //     "by":{
    //         "_id": "u103",
    //         "fullname": "David Davidov",
    //         "imgUrl": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80"
    //     },
    //     "msg":"Your appointment got approved, By doctor David Davidov"
    //     },  {
    //         "_id":"m21516",
    //         "appId":"a110",
    //         "date":"1642508355660",
    //         "isOpened":false,
    //         "by":{
    //             "_id": "u103",
    //             "fullname": "David Davidov",
    //             "imgUrl": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80"
    //         },
    //         "msg":"Your appointment got approved, By doctor David Davidov"
    //     }
    // ]
  
  
    useEffect(() => {
      const userInbox = user.inbox.filter((msg) =>msg )
      setInbox((prevInbox)=>prevInbox = userInbox)
    }, [])
  
    const paging = (num) => {
        if (page === 0 && num === -1) setPage(Math.floor(user.inbox.length/(maxPage+1)));
        setPage((prev) => (prev += num));
        pagination();
    };

    const pagination = () => {
        
        let cards = inbox || user.inbox;
        let cardToRender = page * maxPage;
        if (cards.slice(cardToRender, cardToRender + maxPage).length === 0)
            setPage((prev) => (prev = 0));
        return page === 0
            ? cards.slice(cardToRender, cardToRender + maxPage)
            : cards.slice(cardToRender, cardToRender + maxPage + 1);
    };

    const openMailPrev = async (mail)=>{
        console.log(mail)
        setMailPrev((prev)=>prev=mail)
        const idx = user.inbox.findIndex((mail)=>mail._id===mail._id)
        let updatedUser = {...user}
        if(idx>-1 && !user.inbox[idx].isOpened){
            updatedUser.inbox[idx].isOpened = true
           await patientService.updateSelfPatient(updatedUser)
           dispatch(getLoggedInUser())
        }
    }

    const closeMailPrev = ()=>{
        setMailPrev((prev)=>prev=null)
    }


    return (
        <div className="inbox-main-container">
            <div className="main-content-header">Inbox</div>
        <div className="inbox-content">
            {!user&&<Loader/>}
            {!inbox.length && <div>You have no messages</div>}
            {inbox.length && pagination().map(mail=>{
                return (
                    <div key={mail._id}>
                    <InboxList mail={mail}  openMailPrev={openMailPrev}/>
                    {mailPrev?._id===mail._id&&<div className={`inbox-prev-animator ${mailPrev&&'open-prev'}`}>
                        <InboxPrev mail={mailPrev} closeMailPrev={closeMailPrev}/></div>
                        }
                    <div className="line-seperator" ></div>
                    </div>
                )
            })}
        </div>
        <div className="btns-container">
                    <button className="sub-btn" onClick={() => paging(-1)}>
                        Previous
                    </button>
                    <div>{page + 1}</div>
                    <button className="sub-btn" onClick={() => paging(1)}>
                        Next
                    </button>
                </div>
            </div>
    )
}

