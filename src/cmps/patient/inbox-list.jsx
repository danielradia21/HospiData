export function InboxList({ mail, openMailPrev }) {
    function getDate(timestamp) {
        let date = new Date(timestamp);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hour =
            date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        const minute =
            date.getMinutes() < 10
                ? '0' + date.getMinutes()
                : date.getMinutes();
        return (
            <div className="mail-date">
                {day}/{month}/{year} | {hour}:{minute}
            </div>
        );
    }

    return (
        <div
            className={`inbox-msg-content ${mail.isOpened ? 'seen' : ''}`}
            onClick={() => openMailPrev(mail)}
        >
            <div className="mail-profile-info">
                <img src={mail.by.imgUrl} />
                <p className="mail-by">{mail.by.fullname}</p>
            </div>
            <div className="mail-msg">{`${mail.msg.slice(0,40)}`}</div>
            {getDate(+mail.date)}

        </div>
    );
}
