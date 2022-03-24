import React from 'react';
import { MouseEvent } from 'react';
import { Message } from './Display';

interface PostProps {
    messages: Message[];
    deleteHandler: (uuid: string, event: MouseEvent) => void
}

const Post: React.FC<PostProps> = ({messages, deleteHandler}) => {
    
    return (
        <div className='message--wrap'>
            {messages && messages.map((message, index) => {
                const d = new Date (message.sentAt);
                let date = d.toLocaleString('en-US', {weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'} );
                let time = d.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', timeZoneName: 'short', timeZone: 'America/Los_Angeles'} );
                const colors = ['yellow', 'turquoise', 'red', 'blue', 'purple'];

                return (
                    <div className='card fade-in' key={message.uuid} aria-label='post'>
                        <div className='side'>
                            <div className={`userId ${colors[index]}`} aria-label={`user ${index+1} id`}><img src={`${message.senderUuid}`} alt="" /></div>
                        </div>
                        <div className='main'>
                            <div className='main--top'>
                                <div className='timestamp'>{date} at {time}</div>
                                <button className='delete-icon' aria-label={`delete button ${index}`} onClick = { (event) => deleteHandler(message.uuid, event) }><i className="far fa-trash-alt"></i></button>
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