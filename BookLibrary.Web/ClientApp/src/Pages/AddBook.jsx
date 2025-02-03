import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
    const [book, setBook] = useState({
        title: '',
        author: '',
        totalAmt: '',
        backText: '',
        tags: ''
    });

    return (
        <div style={{ margin: 75 }}>
            <h1>Add Book</h1>
            <hr />
            <input type='text' name='title' placeholder='Title' className='form-control' />
            <br/>
            <input type='text' name='author' placeholder='Author' className='form-control' />
            <br/>
            <input type='number' name='totalAmt' min='1' placeholder='Total' className='form-control' />
            <br/>
            <textarea className='form-control' rows='8' name='backText'></textarea>
            <br/>
            <input type='text' name='tags' placeholder='Tags' className='form-control' />
            <br/>
            <input type='file' name='coverImg' className='form-control'/>
        </div>
    )
};

export default AddBook;