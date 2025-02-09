import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const AddBook = () => {
    const [book, setBook] = useState({
        title: '',
        author: '',
        imgURL: '',
        base64: '',
        totalAmt: '',
        backText: '',
        tags: []
    });
    const imgRef = useRef();
    const [allTags, setAllTags] = useState([]);

    useEffect(() => {

        const getData = async () => {
            const { data } = await axios.get('/api/book/getalltags');
            console.log(data);
            setAllTags(data);
        };
        getData();

    }, []);

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const onTextChange = e => {
        const copy = { ...book };
        copy[e.target.name] = e.target.value;
        setBook(copy);
    };

    const onTagAdd = e => {
        const copy = [...book.tags];
        copy.push(e.target.value);
        const bookCopy = { ...book };
        bookCopy.tags = copy;
        setBook(bookCopy);
    }

    const onImgChange = e => {
        const copy = { ...book };
        copy.imgURL = e.target.files[0];
        setBook(copy);
    }

    const onAddBook = () => {
        const file = imgRef.current.files[0];
        const base64 = toBase64(file);
        const copy = { ...book };
        copy.base64 = base64;
        setBook(copy);
        console.log(copy);
    }

    return (
        <div style={{ margin: 75 }}>
            <h1>Add Book</h1>
            <hr />
            <input type='text' name='title' placeholder='Title' className='form-control' value={book.title} onChange={e => onTextChange(e)} />
            <br />
            <input type='text' name='author' placeholder='Author' className='form-control' value={book.author} onChange={e => onTextChange(e)} />
            <br />
            <input type='number' name='totalAmt' min='1' placeholder='Total' className='form-control' value={book.totalAmt} onChange={e => onTextChange(e)} />
            <br />
            <textarea className='form-control' rows='8' name='backText' value={book.backText} onChange={e => onTextChange(e)}></textarea>
            <br />
            <input type='text' name='tags' placeholder='Tags' className='form-control' value={book.tags} onChange={e => onTagAdd(e)} />
            <br />
            <input type='file' name='coverImg' className='form-control' ref={imgRef} onChange={e => onImgChange(e)} />
            <br />
            <button className='btn btn-info w-100' onClick={onAddBook}>Add Book</button>
        </div>
    )
};

export default AddBook;