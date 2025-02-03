import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

    return (
        <div style={{ margin: 65 }}>
            <h1>All Books</h1>
            <hr />
            <br />
            <button className='btn btn-info' onClick={_ => navigate('/addbook') }>Add Book</button>
            {!books ?
                <div>
            <h1>Loading...</h1>
            </div> : 
            <table className='table table-striped table-hover'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Total Amount</th>
                        <th>Back of Book</th>
                        <th>Tags</th>
                    </tr>
                </thead>
                <tbody>
                    {books && books.map(b =>
                        <tr key={b.id}>
                            <td>{b.id}</td>
                            <td onClick={_ => navigate(`/book/${b.id}`)} style={{ cursor: 'pointer', textDecorationColor: 'coral', textDecorationLine: 'underline', color: 'coral' }}>{b.title}</td>
                            <td>{b.author}</td>
                            <td>{b.totalAmt}</td>
                            <td>{b.backText.length < 105 ? b.backText : b.backText.substring(0, 105) + '...'}</td>
                            <td>{b.tags}</td>
                        </tr>)}
                </tbody>
                </table>}
        </div>
    )
};

export default AllBooks;