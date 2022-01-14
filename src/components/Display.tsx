import { useState, useEffect, MouseEvent } from 'react';
import Pagination from './Pagination';
import Post from './Post';

export interface Message {
    uuid: string;
    sentAt: string;
    senderUuid: string;
    content: string
};

const Display = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortType, setSortType] = useState('asc');


    // Retrieve data

    useEffect(() => {
        fetch('data.json', {
            headers: {'Content-Type': 'application/json',
            'Accept': 'application/json'}
        })
        .then(function(response){
            setLoading(true);
            return response.json();
        })
        .then(function(responseJson) {
            const sortedResponse = responseJson.messages.sort((a: Message, b: Message) => new Date(b.sentAt).valueOf() - new Date(a.sentAt).valueOf());
            console.log(responseJson.messages);
            setMessages(sortedResponse);
            setLoading(false);
        });

    }, []);

    // Change page
    
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)     // this current page number was passed up from the onClick event in the Paginate component

    // Get current posts

    const postsPerPage = 5;
    const indexOfLastPost = currentPage * postsPerPage;     // ex. 1 * 5 = 5
    const indexOfFirstPost = indexOfLastPost - postsPerPage;       // ex. 5 - 5 = 0
    const currentPosts = messages.slice(indexOfFirstPost, indexOfLastPost);     // ex. messages.slice(0,5)
    
    // Sort messages by date

    useEffect(() => {  
        const sortMessages = (sortType: string) => {
            if(sortType==='desc'){
                const sorted = [...messages].sort((a: Message, b: Message) => new Date(a.sentAt).valueOf() - new Date(b.sentAt).valueOf());       // Making a copy of the array, so that React doesn't think setMessage is being called with the same array that it already had, therefore no re-render.
                setMessages(() => sorted);
            } else if (sortType==='asc'){
                const sorted = [...messages].sort((a: Message, b: Message) => new Date(b.sentAt).valueOf() - new Date(a.sentAt).valueOf());
                setMessages(() => sorted);
            } else {
                return;
            }
        }

        sortMessages(sortType);

    }, [sortType]);

    // Delete message
    
    const deleteHandler = ( uuid: string, event: MouseEvent ) => {                                             // Function called from the Post component
        event.preventDefault();
        setMessages(messages.filter((message: Message) => message.uuid !== uuid))            
    }

    return (
        <div className='display'>
            <div className='wrapper'>
                <div className='header'>
                    <div className='sort'>
                        <h1><i className="fas fa-comment fa-sm"></i>iChat</h1>
                        <select name="sort" id="sort" value={sortType} onChange={ e => setSortType(e.target.value)}>
                            <option value="asc">Sorted by most recent</option>
                            <option value="desc">Sorted by oldest</option>
                        </select>
                    </div>
                </div>
                <div className='messages--container'>
                    <Post messages={currentPosts} loading={loading} deleteHandler={deleteHandler} />
                    <Pagination postsPerPage={postsPerPage} totalPosts={messages.length} paginate={paginate} currentPage={currentPage} />
                </div>
            </div>
        </div>
    )
}

export default Display;