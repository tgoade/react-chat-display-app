import data from './data/Data.json';
import { useState, useEffect, MouseEvent } from 'react';
import Pagination from './Pagination';
import Post from './Post';

export interface Message {
    uuid: string;
    sentAt: string;
    senderUuid: string;
    content: string
};

const Display: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>(data.messages);     // We're setting the default state to be that messages array within the data object.
    const [currentPage, setCurrentPage] = useState(1);
    const [sortType, setSortType] = useState('desc');

    // Change page

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)     // This current page number was passed up from the onClick event in the Paginate component

    // Get current posts

    const postsPerPage = 5;
    const indexOfLastPost = currentPage * postsPerPage;     // ex. 1 * 5 = 5
    const indexOfFirstPost = indexOfLastPost - postsPerPage;       // ex. 5 - 5 = 0
    const currentPosts = messages.slice(indexOfFirstPost, indexOfLastPost);     // ex. messages.slice(0,5)
    
    // Sort messages by date

    useEffect(() => {  
        const sortMessages = (sortType: string) => {
            if(sortType==='asc'){
                const sorted = [...messages].sort((a: Message, b: Message) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime());       // Making a copy of the array, so that React doesn't think setMessage is being called with the same array that it already had, therefore no re-render.
                setMessages(() => sorted);
            } else if (sortType==='desc'){
                const sorted = [...messages].sort((a: Message, b: Message) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime());       // We use the comparison function of function(a, b) { return a - b }. If return value is position, then b before a, if 0, then the same, if negative, then a before b
                setMessages(() => sorted);                                                                                                        // The comparison function that will be able to sort dates must first convert string representations of dates (ISO format) into Date objects and then compare two dates. We convert the Date objects into numeric values using valueOf() before comparing them. number of milliseconds since January 1, 1970, 00:00 UTC. We can't compare the Date objects directly because in js, two different objects are never equal.
            } else {
                return;
            }
        }

        sortMessages(sortType);

    }, [sortType]);

    // Delete message
    
    const deleteHandler = ( uuid: string, event: MouseEvent ) => {                                             // Function called from the Post component
        event.preventDefault();
        setMessages(messages.filter((message: Message) => message.uuid !== uuid))                              // Take the messages array and return all the elements who's uuid does not equal to the uuid passed in from the click event  
    }

    return (
        <div className='display'>
            <div className='wrapper'>
                <div className='header'>
                    <div className='sort'>
                        <h1><i className="fas fa-comment fa-sm"></i>iChat</h1>
                        <select name="sort" id="sort" value={sortType} onChange={ e => setSortType(e.target.value)} data-testid='select-btn'>       {/* We're updating the sortType value/state when there's a change to the dropdown. */}
                            <option value="desc" data-testid='select-desc'>Sorted by most recent</option>
                            <option value="asc" data-testid='select-asc'>Sorted by oldest</option>
                        </select>
                    </div>
                </div>
                <div className='messages--container'>
                    <Post messages={currentPosts} deleteHandler={deleteHandler} />
                    <Pagination postsPerPage={postsPerPage} totalPosts={messages.length} paginate={paginate} currentPage={currentPage} />       {/* We've passing data through the paginate function, by doing that, we're listing that data/state up to this Display parent component. */}
                </div>                                                                                                                          {/* With paginate, we're passing a pointer to the function, so that the child Pagination component receives it as a prop, then executes the function inside the Pagination component when a click event happens. When we call that function, we can pass data to that function as a parameter, and that's how we can communicate up from child to parent. */}
            </div>
        </div>
    )
}

export default Display;