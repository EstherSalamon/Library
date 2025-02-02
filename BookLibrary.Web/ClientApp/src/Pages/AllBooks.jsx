import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllBooks = () => {

    const [books, setBooks] = useState([]);

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
                            <td>{b.title}</td>
                            <td>{b.author}</td>
                            <td>{b.totalAmt}</td>
                            <td>{b.backText.count()}</td>
                            <td>{b.tags}</td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    )
};

export default AllBooks;