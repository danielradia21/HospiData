import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { patientService } from '../../services/patient.service';
import { InboxList } from './inbox-list';
import { InboxPrev } from './inbox-prev';
import { Loader } from '../loader';

export function Inbox() {
    const { user } = useSelector((state) => state.userModule);
    const [inbox, setInbox] = useState([]);
    const [mailPrev, setMailPrev] = useState(null);
    const [page, setPage] = useState(0);


    const maxPage = 6;

    useEffect(() => {
        const userInbox = user.inbox.filter((msg) => msg);
        setInbox((prevInbox) => (prevInbox = userInbox));
    }, []);

    const paging = (num) => {
        if (page === 0 && num === -1)
            setPage(Math.floor((user.inbox.length / (maxPage)))+1);
        setPage((prev) => (prev += num));
        pagination();
    };

    const pagination = () => {
        let cards = inbox || user.inbox;
        let cardToRender = page * maxPage ;
        if (cards.slice(cardToRender, cardToRender + maxPage ).length === 0)
            setPage((prev) => (prev = 0));
        return page === 0
            ? cards.slice(cardToRender, cardToRender + maxPage)
            : cards.slice(cardToRender, cardToRender + maxPage+1 );
    };

    const openMailPrev = async (mail)=>{
        setMailPrev((prev)=>prev=mail)
        const updatedUser = {...user}
        const inbox = user.inbox.map(inbox=>{
              if(inbox.appId===mail.appId)  inbox.isOpened = true
              return inbox
          })
          updatedUser.inbox = inbox

           await patientService.updateSelfPatient(updatedUser)

        
    }

    const closeMailPrev = ()=>{
        setMailPrev((prev)=>prev=null)
    }


    return (
        <div className="inbox-main-container">
            <div className="main-content-header">Inbox</div>
            <div className="inbox-content">
                {!user && <Loader />}
                {!inbox.length && <div>You have no messages</div>}
                {inbox.length &&
                    pagination().map((mail) => {
                        return (
                            <div key={mail._id}>
                                <InboxList
                                    mail={mail}
                                    openMailPrev={openMailPrev}
                                />
                                {mailPrev?._id === mail._id && (
                                    <div
                                        className={`inbox-prev-animator ${
                                            mailPrev && 'open-prev'
                                        }`}
                                    >
                                        <InboxPrev
                                            mail={mailPrev}
                                            closeMailPrev={closeMailPrev}
                                        />
                                    </div>
                                )}
                                <div className="line-seperator"></div>
                            </div>
                        );
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
    );
}
