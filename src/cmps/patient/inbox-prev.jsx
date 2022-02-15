import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export function InboxPrev({ mail, closeMailPrev }) {
    return (
        <div className="prev-inbox-msg-container">
            <div className={`prev-container ${mail && 'open-prev'}`}>
                <button onClick={closeMailPrev}>
                    <KeyboardArrowUpIcon />
                </button>
                <div className="prev-inbox-content">
                    <div className="prev-mail-name">
                        <span>From </span>: {mail.by.fullname}
                    </div>
                    <div className="prev-mail-msg">
                        <span>Message</span> : {mail.msg}
                    </div>
                </div>
            </div>
        </div>
    );
}
