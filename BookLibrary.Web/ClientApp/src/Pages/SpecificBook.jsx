import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SpecificBook = () => {

    const { id } = useParams();
    const [book, setBook] = useState({
        id: '',
        title: '',
        author: '',
        totalAmt: '',
        backText: '',
        tags: ''
    });

    useEffect(() => {

        const getBook = async () => {
            const { data } = await axios.get(`/api/book/specific?id=${id}`);
            setBook(data);
        };

        getBook();

    }, []);

    return (
        <div style={{margin: 150} }>
            <h1>{book.title}</h1>
            <hr />
            <h4>By {book.author}</h4>
            <br />
            <img src='/Images/book.jpg' />
            <br/>
            <h4>Inventory: {book.totalAmt}</h4>
            <h4>Currently Available: figure out how to get</h4>
            <h4>Back of book:</h4>
            <p>{book.backText}</p>
            <h4>{book.tags}</h4>
        </div>
    )
};

export default SpecificBook;