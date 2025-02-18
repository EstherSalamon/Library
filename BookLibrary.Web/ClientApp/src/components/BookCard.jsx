import react from 'react';
import "./bookcard.css";

const BookCard = ({id, title, author, img }) => {



    return (
        <div>
              {/*  <div className='col'>*/}
                <div className='card h-100' style={{height: 300} }>
                        <img className='card-img-top' src={img} height="250" />
                        <div className='card-body'>
                            <h4 className='card-title'>{title}</h4>
                            <h6 className='card-title'>{author}</h6>
                        </div>
                    </div>
                </div>
          
    )
};

export default BookCard;