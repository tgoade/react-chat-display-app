import React from 'react';

interface PageineProps {
    postsPerPage: number;
    totalPosts: number;
    paginate: (number: number) => void;
    currentPage: number
}

const Pagination: React.FC<PageineProps> = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
    
    // Get the page numbers

    const pageNumbers = [];
     
    for(let i = 1, max = Math.ceil(totalPosts / postsPerPage); i <= max; i++){          // We're calculating the max no. of pages we need, we iterate to that maximum and pushing that counter variable into the array as we go.
        pageNumbers.push(i);
    }

    return (
        <div className="pagination">
            <ul className='page--number-wrap'>
                {pageNumbers.map((number, index) => {
                    return (
                        <li key={number} className='page--number'>
                            <button className={`page--link ${number === currentPage ? 'highlight' : ''}`} onClick={() => paginate(number)} aria-label={`page ${index + 1}`}>       {/* When there's a click event, we invoke the paginate function, passing the page number up to the paginate function in the Display component so we can use the data/state there. */}
                                {number}                 {/* Using template literal to add class dynamically.  Within it, we have an if else statement (using the ternary operator) to check whether the number is equal to the current page. */}                                                                     
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Pagination;