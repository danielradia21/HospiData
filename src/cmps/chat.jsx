import { useEffect, useState } from 'react';

export function chat({ user }) {
    const [msgs, setMsgs] = useState([]);

    useEffect(() => {
        socketService.emit('chat topic', user._id);
        socketService.on('chat addMsg', addMsg);
    }, []);

    const addMsg = (msg) => {
        setMsgs((prev) => prev.push(msg));
    };



    return (
        <div className="chat">
            <div></div>
        </div>
    );
}
