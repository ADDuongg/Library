import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './update.module.css'
import { useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import { FaHeadSideCough } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
function UpdateBook() {
    const navigate = useNavigate()
    const location = useLocation()
    let datalocal = JSON.parse(localStorage.getItem('user_infor'))
    /* console.log(datalocal.role); */
    const [bookName1, setBookName] = useState(location.state.bookName)
    const [bookAuthor1, setBookAuthor] = useState(location.state.bookAuthor)
    const [bookType1, setBookType] = useState(location.state.bookType)
    const [bookNumberBorrow1, setNumberBookBorrow] = useState(location.state.bookNumberBorrow)
    const [currenBookSelect, setCurrenBookSelect] = useState([])
    const [currenBook, setCurrenBook] = useState([])
    /* console.log(bookNumberBorrow1);
    console.log(location); */
    function handleSubmit(e) {
        e.prevenDefault()
    }
    useEffect(()=>{
        fetch('https://test-d15a.onrender.com/detailBorrow')
        .then(res => res.json())
        .then(data =>{
            const currenBorrow = data.find(items => {
                return items.id === location.state.idBorrow
            })
            setCurrenBookSelect(currenBorrow)
        })
        fetch('https://test-d15a.onrender.com/book')
        .then(res => res.json())
        .then(data =>{
            const currenBorrow = data.find(items => {
                return items.id === location.state.idBook
            })
            setCurrenBook(currenBorrow)
        })
    },[])
    function handleUpdate() {
        let bookSelect = {
            ...currenBookSelect,
            numBerBorrow: bookNumberBorrow1
        }
        let option = {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookSelect),
        }
        fetch(`https://test-d15a.onrender.com/detailBorrow/${location.state.idBorrow}`, option)
        .then(()=>{alert("Update thành công")})
        .then(() => {navigate('/DetailBorrow')})


        let BookUpdate = {
            ...currenBook,
            number: bookNumberBorrow1 > location.state.bookNumberBorrow ? Number(currenBook.number - (bookNumberBorrow1 - location.state.bookNumberBorrow)): Number(currenBook.number + (location.state.bookNumberBorrow - bookNumberBorrow1))
        }

        let option1 = {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(BookUpdate),
        }
        fetch(`https://test-d15a.onrender.com/book/${location.state.idBook}`, option1)
       
    }
    console.log(currenBook);
    return ( 
        <div className= {styles.divUpdate}>
            <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3, mt-3" controlId="">
        <Form.Label>Tên sách</Form.Label>
        <Form.Control disabled={datalocal.role === "user"} value={bookName1} onChange={(e) => { setBookName(e.target.value) }} type="text" placeholder="" />
      </Form.Group>

      <Form.Group className="mb-3, mt-3" controlId="">
        <Form.Label>Tác giả</Form.Label>
        <Form.Control disabled={datalocal.role === "user"} value={bookAuthor1} onChange={(e)=>{setBookAuthor(e.target.value)}} type="text" placeholder="" />
      </Form.Group>
      
      <Form.Group className="mb-3, mt-3" controlId="">
        <Form.Label>Thể loại</Form.Label>
        <Form.Control disabled={datalocal.role === "user"} value={bookType1} onChange={(e)=>{setBookType(e.target.value)}} type="text" placeholder="" />
      </Form.Group>

      <Form.Group className="mb-3, mt-3" controlId="">
        <Form.Label>Số lượng mượn</Form.Label>
        <Form.Control  value={bookNumberBorrow1} onChange={(e)=>{setNumberBookBorrow(e.target.value)}} type="text" placeholder="" />
      </Form.Group>
      <div className={styles.divBtn}>
      <Button onClick={()=>{navigate('/DetailBorrow')}} style={{
        width: 130,
        height: 40
      }} className='mt-3' variant="primary" >
        Back
      </Button>
      <Button onClick={()=> {handleUpdate()}} style={{
        width: 130,
        height: 40
      }} className='mt-3' variant="primary" >
        Update
      </Button>
      </div>
    </Form>
        </div>
     );
}

export default UpdateBook;
