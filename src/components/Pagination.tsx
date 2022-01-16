import React from 'react';

interface PageineProps {
    postsPerPage: number;
    totalPosts: number;
    paginate: (number: number) => void;
    currentPage: number
}

const Pagination: React.FC<PageineProps> = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
    
    // Get the correct number of page numbers

    const pageNumbers = [];
     
    for(let i = 1, max = Math.ceil(totalPosts / postsPerPage); i <= max; i ++){
        pageNumbers.push(i);
    }

    return (
        <div className="pagination">
            <ul className='page--number-wrap'>
                {pageNumbers.map((number) => {
                    return (
                        <li key={number} className='page--number'>
                            <a href="!#" className={`page--link ${number === currentPage ? 'highlight' : ''}`} onClick={() => paginate(number)}>       {/* passing page number up to the paginate function in the Display component */}
                                {number}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Pagination;