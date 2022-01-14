import { MouseEvent } from 'react';
import { Message } from './Display';

interface PostProps {
    messages: Message[];
    loading: boolean; 
    deleteHandler: (uuid: string, event: MouseEvent) => void
}

const Post = ({messages, loading, deleteHandler}: PostProps) => {
    

    if(loading){
        return <div>Loading...</div>;
    }

    return (
        <div className='message--wrap'>
            {messages && messages.map((message, i) => {
                const d = new Date (message.sentAt);
                const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
                const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                const colors = ['yellow', 'green', 'pink', 'blue', 'orange'];
                let day = days[d.getDay()];
                let month = months[d.getMonth()];
                let date = d.getDate();
                let year = d.getFullYear();
                let time = d.toLocaleTimeString();

                return (
                    <div className='card fade-in' key={message.uuid}>
                        <div className='side'>
                            <div className={`userId ${colors[i]}`}>{message.senderUuid}</div>
                        </div>
                        <div className='main'>
                            <div className='main--top'>
                                <div className='timestamp'>{day} {month} {date}, {year} at {time}</div>
                                <div className='delete-icon'><a href="!#" onClick = { (event) => deleteHandler(message.uuid, event) }><i className="far fa-trash-alt"></i></a></div>
                            </div>
                            <div className='content'>{message.content}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Post;