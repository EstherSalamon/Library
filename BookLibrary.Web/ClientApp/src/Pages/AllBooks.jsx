import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';

const AllBooks = () => {

    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const loadBooks = async () => {
            const { data } = await axios.get('/api/book/getall');
            setBooks(data);
        };

        loadBooks();

    }, []);

    //search by title, grp by author

    return (
        <div style={{ margin: 65 }}>
            <h1>All Books</h1>
            <hr />
            <br />
            <button className='btn btn-info' onClick={_ => navigate('/addbook')}>Add Book</button>
            <br />
            <br />
          {/*  <div className='row row-cols-1 row-cols-md-3 g-4'>*/}
                <div className='row row-cols-5 '>
 {/*       <div className='card-group'>*/}
                {books && books.map(b => 
                    <a href={`/book/${b.id}`} style={{textDecoration: 'none'} }>
                    <BookCard
                        key={b.id}
                        id={b.id}
                        title={b.title}
                        author={b.author}
                        img={`/api/book/getimg?img=${b.img}` }
                        />
                    </a>)}
            </div>






            {/*{!books ?*/}
            {/*    <div>*/}
            {/*        <h1>Loading...</h1>*/}
            {/*    </div> :*/}
            {/*    <table className='table table-striped table-hover'>*/}
            {/*        <thead>*/}
            {/*            <tr>*/}
            {/*                <th style={{ width: 5 }}>Id</th>*/}
            {/*                <th style={{ width: 55 }}>Title</th>*/}
            {/*                <th style={{ width: 55 }}>Author</th>*/}
            {/*                <th style={{ width: 15 }}>Total Amount</th>*/}
            {/*                <th style={{ width: 85 }}>Back of Book</th>*/}
            {/*                <th style={{ width: 55 }}>Tags</th>*/}
            {/*            </tr>*/}
            {/*        </thead>*/}
            {/*        <tbody>*/}
            {/*            {books && books.map(b =>*/}
            {/*                <tr key={b.id}>*/}
            {/*                    <td>{b.id}</td>*/}
            {/*                    <td onClick={_ => navigate(`/book/${b.id}`)} style={{ cursor: 'pointer', textDecorationColor: 'coral', textDecorationLine: 'underline', color: 'coral' }}>{b.title}</td>*/}
            {/*                    <td>{b.author}</td>*/}
            {/*                    <td>{b.totalAmt}</td>*/}
            {/*                    <td>{b.backText.length < 105 ? b.backText : b.backText.substring(0, 105) + '... (read more)'}</td>*/}
            {/*                    <td>{b.tags}</td>*/}
            {/*                </tr>)}*/}
            {/*        </tbody>*/}
            {/*    </table>}*/}
        </div>
    )
};

export default AllBooks;