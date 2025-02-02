import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';

const UsersPage = () => {

    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState({
        name: '',
        email: ''
    });
    const [showModal, setShowModal] = useState(false);
    const [isAddMode, setIsAddMode] = useState(true);
    const [searchText, setSearchText] = useState('');

    const loadUsers = async () => {
        const { data } = await axios.get('/api/user/getall');
        setUsers(data);
    };

    useEffect(() => {

        loadUsers();

    }, []);

    const onTextChange = e => {
        const copy = { ...currentUser };
        copy[e.target.name] = e.target.value;
        setCurrentUser(copy);
    }

    const onAddClick = () => {
        setShowModal(true);
        setIsAddMode(true);
    }

    const onCancelClick = () => {
        setShowModal(false);
        setCurrentUser({
            name: '',
            email: ''
        });
        setIsAddMode(true);
    }

    const onSaveClick = async () => {
        await axios.post('/api/user/add', { User: currentUser });
        loadUsers();
        onCancelClick();
    }

    const onEditClick = async id => {
        const { data } = await axios.get(`/api/user/specific?id=${id}`);
        setCurrentUser(data);
        setIsAddMode(false);
        setShowModal(true);
    }

    const onUpdateClick = async () => {
        await axios.post('/api/user/update', { User: currentUser });
        loadUsers();
        onCancelClick();
    }

    return (
        <div style={{ margin: 75 }}>
            <h1>Users Page</h1>
            <hr />
            <br />
            <button className='btn btn-info' onClick={_ => onAddClick()}>Add User</button>
            <br/>
            <Modal show={showModal} onHide={_ => onCancelClick()}>
                <Modal.Header>
                    <Modal.Title>{isAddMode ? 'Add New User' : 'Edit User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type='text' name='name' placeholder='Name' className='form-control' style={{ margin: 5 }} value={currentUser.name} onChange={e => onTextChange(e) } />
                    <input type='email' name='email' placeholder='Email' className='form-control' style={{ margin: 5 }} value={currentUser.email} onChange={e => onTextChange(e) } />
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-warning' onClick={_ => onCancelClick()}>Cancel</button>
                    {isAddMode ? <button className='btn btn-success' onClick={_ => onSaveClick()} disabled={!currentUser.name || !currentUser.email}>Save</button> : 
                        <button className='btn btn-primary' onClick={_ => onUpdateClick() }>Update</button>}
                </Modal.Footer>
            </Modal>
            <br />
            <input type='text' name='search-text' placeholder="Search" className='form-control' value={searchText} onChange={e => setSearchText(e.target.value)} />
            <br/>
            <table className='table table-striped table-hover'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Outstanding Books</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.filter(u => u.name.toLowerCase().includes(searchText.toLowerCase())).map(u =>
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td onClick={_ => onEditClick(u.id)} style={{ cursor: 'pointer', textDecorationColor: 'coral', textDecorationLine: 'underline', color: 'coral' }} >{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.outstandingBooks}</td>
                            <td>
                                <button className='btn btn-outline-info' style={{width: 250 }}>See History for {u.name}</button>
                            </td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    )

};

export default UsersPage;