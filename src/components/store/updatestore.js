import styles from './updatestore.module.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLocation, useNavigate } from 'react-router-dom';
import {AiOutlineArrowRight} from 'react-icons/ai'
import { useState, useEffect } from 'react';
function SroreUpdate() {
    const navigate = useNavigate()
    const location = useLocation()
    const name = location.state.nameBook
    const author = location.state.authorBook
    const type = location.state.typeBook
    const detail = location.state.detailBook
    const description = location.state.descriptionBook
    const year = location.state.yearBook
    const pic = location.state.picktureBook
    const number = Number(location.state.numberBook)
    const [nameBook, setNameBook] = useState(name)
    const [authorBook, setAuthorBook] = useState(author)
    const [typeBook, setTypeBook] = useState(type)
    const [detailBook, setDetailBook] = useState(detail)
    const [descriptionBook, setDescriptionBook] = useState(description)
    const [yearBook, setYearBook] = useState(year)
    const [pictureBook, setPictureBook] = useState(pic)
    const [numberBook, setNumberBook] = useState(number)
    const [bookChange, setBookChange] = useState([])
    const [book, setBook] = useState([])
    console.log(numberBook);
    function handleImageUpload(event) {
        const file = event.target.files[0];
        setPictureBook(URL.createObjectURL(file));
    }
    useEffect(()=>{
        fetch("http://localhost:8080/storeBook")
        .then(res => res.json())
        .then(data =>{
            const dataChange = data.find(items => {
                return items.id === location.state.idStore
            })
            setBookChange(dataChange)
        })

        fetch("http://localhost:8080/book")
        .then(res => res.json())
        .then(data =>{
            const dataBook = data.find(items => {
                return items.id === location.state.idBook
            })
            setBook(dataBook)
        })
    },[])
    /* console.log(book); */
    function handleUpdate() {

        let dataBookChange1 = {
            ...book,
            name: nameBook,
            picture_url: pictureBook,
            description: descriptionBook,
            type: typeBook,
            author: authorBook,
            year: yearBook,
            detail: detailBook,
        }
        let option1 = {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataBookChange1)
        }
        fetch(`http://localhost:8080/book/${location.state.idBook}`, option1)


        
        let dataBookChange = {
            ...bookChange,
            name: nameBook,
            picture_url: pictureBook,
            description: descriptionBook,
            type: typeBook,
            author: authorBook,
            year: yearBook,
            detail: detailBook,
            number: numberBook
        }
        let option = {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataBookChange)
        }
        fetch(`http://localhost:8080/storeBook/${location.state.idStore}`, option)
        .then(()=>{alert("Cập nhật thông tin sách thành công")})
        .then(()=>{navigate('/store')})
        .catch(err => console.log(err))
        
        


    }
    return ( 
            <div className= {styles.divUpdate}>
            <Form >
      <Form.Group className="mb-3, mt-3" controlId="">
        <Form.Label className='ml-4'>Tên sách</Form.Label>
        <Form.Control   value={nameBook} onChange={(e) => { setNameBook(e.target.value) }} type="text"  />
      </Form.Group>

      <Form.Group className="mb-3, mt-1" controlId="">
        <Form.Label className='ml-4'>Tác giả</Form.Label>
        <Form.Control  value={authorBook}  onChange={(e)=>{setAuthorBook(e.target.value)}}  type="text"  />
      </Form.Group>
      
      <Form.Group className="mb-3, mt-1" controlId="">
        <Form.Label className='ml-4'>Thể loại</Form.Label>
        <Form.Control value={typeBook}   onChange={(e)=>{setTypeBook(e.target.value)}}  type="text"  />
      </Form.Group>

      <Form.Group className="mb-3, mt-1" controlId="">
        <Form.Label className='ml-4'>Số lượng</Form.Label>
        <Form.Control value={numberBook}   onChange={(e)=>{setNumberBook(e.target.value)}}  type="text"  />
      </Form.Group>
      <Form.Group className="mb-3, mt-3" controlId="">
        <Form.Label className='ml-4'>Chi tiết sách</Form.Label>
        <Form.Control className={styles.inputMore} value={detailBook}   onChange={(e) => { setDetailBook(e.target.value) }}  type="text"  />
      </Form.Group>

      <Form.Group className="mb-3, mt-1" controlId="">
        <Form.Label className='ml-4'>Miêu tả sách</Form.Label>
        <Form.Control className={styles.inputMore} value={descriptionBook}   onChange={(e)=>{setDescriptionBook(e.target.value)}}  type="text"  />
      </Form.Group>
      
      <Form.Group className="mb-3, mt-1" controlId="">
        <Form.Label className='ml-4'>Năm xuất bản</Form.Label>
        <Form.Control value={yearBook}   onChange={(e)=>{setYearBook(e.target.value)}}  type="text"  />
      </Form.Group>

      <Form.Group className="mb-3, mt-1" controlId="">
        <Form.Label className='ml-4'>File ảnh</Form.Label>
        <Form.Control  /* value={pictureBook} */  onChange={(e)=>{handleImageUpload(e)}}  type="file"  />
      </Form.Group>
      <div className={styles.divBtn}>
      <Button /* onClick={()=>{navigate('/DetailBorrow')}} */ style={{
        width: 130,
        height: 40
      }} className='mt-3' variant="primary" >
        Back
      </Button>
      <Button onClick={()=>{handleUpdate()}} style={{
        width: 130,
        height: 40
      }} className='mt-3' variant="primary" >
        Update
      </Button>
      </div>
    </Form>
    <div className={styles.divIcon}>
        <AiOutlineArrowRight style={{
            height: 30,
            width: 100
        }}/>
    </div>
    <div className={styles.divImg}>
    <img src={`${pictureBook}`} alt='' style={{
        height: 200,
        width: 150
    }}/>
    </div>
        </div>
     );
}

export default SroreUpdate;