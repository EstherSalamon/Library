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
        <div style={{margin: 75} }>
            <h1>{book.title}</h1>
            <hr />

        </div>
    )
};

export default SpecificBook;