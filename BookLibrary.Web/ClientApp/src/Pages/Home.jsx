import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import axios from 'axios';
import BookCard from '../components/BookCard';
import {Offcanvas} from 'react-bootstrap';

const Home = () => {

    const [books, setBooks] = useState([]);
    const [users, setUsers] = useState([]);
    //have deconstructed lending action here
    const [user, setUser] = useState({});
    const [searchUser, setSearchUser] = useState('');
    const [selectedBooks, setSelectedBooks] = useState([]);

    useEffect(() => {

        const loadBooks = async () => {
            const { data } = await axios.get('/api/book/getall');
            setBooks(data);
        };

        const loadUsers = async () => {
            const { data } = await axios.get('/api/user/getall');
            setUsers(data);
        };

        loadBooks();
        loadUsers();

    }, []);

    const onSelectChange = e => {
        setUser(e.target.value);
    };

    const onSelectBook = id => {
        let copy = [...selectedBooks];
        if (copy.includes(id)) {
            copy = copy.filter(c => c !== id);
        } else {
            copy.push(id);
        }
        setSelectedBooks(copy);
    }
    
    return (
        <div style={{margin: 90} }>
            <div>
                <h1>Borrow a book</h1>
                <div>                <h4>User</h4>
                <select className='form-control' onChange={e => onSelectChange(e) }>
                    <option key={-1}>
                        <input type='text' name='searchUser' value={searchUser} className='form-control' onChange={e => setSearchUser(e.target.value) } placeholder='Search'/>
                    </option>
                    {users.map(u =>
                        <option key={u.id}>{u.id} - {u.name}</option>)}
                </select>
                {user.outstandingBooks >= 8 && <h2>Too many books borrowed, return some before taking out more</h2>}
                <br />
                <br/>
                <hr />
                <br />
                <br/>
                <div className='row row-cols-5 '>
                    {books && books.map(b =>
                            <BookCard
                            key={b.id}
                            id={b.id}
                            title={b.title}
                            author={b.author}
                            img={`/api/book/getimg?img=${b.img}`}
                            handleClick={_ => onSelectBook(b.id)}
                            selected={selectedBooks.includes(b.id) }
                            />)}
                    </div>
                </div>
                <div name="trayOfSomeSort">
                    <Offcanvas show={selectedBooks.length}>
                        <Offcanvas.body>
                            {selectedBooks && selectedBooks.map(b =>
                                <h1>{b}</h1>)}
                        </Offcanvas.body>
                    
                    </Offcanvas>
                </div>


                {/*have a grid of cards showing all books which can also be a component cuz i want to change the all books page to be like that too
                    and it should be searchable and selectable to 'borrow this one' or what, then a button to check out, which confirms the books borrowed.
                    if the selected user has 8 books taken out, they can't take out more, so shld the grid dissappear or shld the buttons all be
                    disabled with a message to return books before taking out more? i like the second one.*/}
            </div>
        </div>
    );
};

export default Home;