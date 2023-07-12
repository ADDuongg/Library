import styles from './addbook.module.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai'
import { useState, useEffect } from 'react';
function AddBook() {
  const navigate = useNavigate()
  const [nameBook, setNameBook] = useState('')
  const [authorBook, setAuthorBook] = useState('')
  const [typeBook, setTypeBook] = useState('')
  const [detailBook, setDetailBook] = useState('')
  const [descriptionBook, setDescriptionBook] = useState('')
  const [yearBook, setYearBook] = useState('')
  const [pictureBook, setPictureBook] = useState('')
  const [numberBook, setNumberBook] = useState('')
  const [idBookAdd, setIdBookAdd] = useState('')
  const [book, setBook] = useState()
  function handleImageUpload(event) {
    const file = event.target.files[0];
    setPictureBook(file)
  }
  useEffect(() => {
    fetch('https://test-d15a.onrender.com/book')
      .then(res => res.json())
      .then(data => setBook(data))
  }, [])
  function handleUpdate() {
    const check = book.some(items => {
      return items.id === idBookAdd
    })

    if (check) {
      alert("Đã tồn tại mã sách này")
    }
    else {
      
       let data = {
        id_book: idBookAdd,
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
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }
      fetch(`https://test-d15a.onrender.com/storeBook`, option)
        .then(() => { alert("Thêm sách thành công") })
        .then(() => { navigate('/store') })
        .catch(err => console.log(err))
    }
  }
  return (
    <div className={styles.divUpdate}>
      <Form >
        <Form.Group className="mb-3, mt-3" controlId="">
          <Form.Label className='ml-4'>Mã sách</Form.Label>
          <Form.Control value={idBookAdd} onChange={(e) => { setIdBookAdd(e.target.value) }} type="text" />
        </Form.Group>
        <Form.Group className="mb-3, mt-3" controlId="">
          <Form.Label className='ml-4'>Tên sách</Form.Label>
          <Form.Control value={nameBook} onChange={(e) => { setNameBook(e.target.value) }} type="text" />
        </Form.Group>

        <Form.Group className="mb-3, mt-1" controlId="">
          <Form.Label className='ml-4'>Tác giả</Form.Label>
          <Form.Control value={authorBook} onChange={(e) => { setAuthorBook(e.target.value) }} type="text" />
        </Form.Group>

        <Form.Group className="mb-3, mt-1" controlId="">
          <Form.Label className='ml-4'>Thể loại</Form.Label>
          <Form.Control value={typeBook} onChange={(e) => { setTypeBook(e.target.value) }} type="text" />
        </Form.Group>

        <Form.Group className="mb-3, mt-1" controlId="">
          <Form.Label className='ml-4'>Số lượng</Form.Label>
          <Form.Control value={numberBook} onChange={(e) => { setNumberBook(e.target.value) }} type="text" />
        </Form.Group>
        <Form.Group className="mb-3, mt-3" controlId="">
          <Form.Label className='ml-4'>Chi tiết sách</Form.Label>
          <Form.Control className={styles.inputMore} value={detailBook} onChange={(e) => { setDetailBook(e.target.value) }} type="text" />
        </Form.Group>

        <Form.Group className="mb-3, mt-1" controlId="">
          <Form.Label className='ml-4'>Miêu tả sách</Form.Label>
          <Form.Control className={styles.inputMore} value={descriptionBook} onChange={(e) => { setDescriptionBook(e.target.value) }} type="text" />
        </Form.Group>

        <Form.Group className="mb-3, mt-1" controlId="">
          <Form.Label className='ml-4'>Năm xuất bản</Form.Label>
          <Form.Control value={yearBook} onChange={(e) => { setYearBook(e.target.value) }} type="text" />
        </Form.Group>

        <Form.Group className="mb-3, mt-1" controlId="">
          <Form.Label className='ml-4'>File ảnh</Form.Label>
          <Form.Control  /* value={pictureBook} */ onChange={(e) => { handleImageUpload(e) }} type="file" />
        </Form.Group>
        <div className={styles.divBtn}>
          <Button /* onClick={()=>{navigate('/DetailBorrow')}} */ style={{
            width: 130,
            height: 40
          }} className='mt-3' variant="primary" >
            Back
          </Button>
          <Button onClick={() => { handleUpdate() }} style={{
            width: 130,
            height: 40
          }} className='mt-3' variant="primary" >
            Add
          </Button>
        </div>
      </Form>
      <div className={styles.divIcon}>
        <AiOutlineArrowRight style={{
          height: 30,
          width: 100
        }} />
      </div>
      <div className={styles.divImg}>
        {pictureBook ? <img src={URL.createObjectURL(pictureBook)} alt='' style={{
        height: 200,
        width: 150
    }}/> : <img  src='' alt=''/>   }
      </div>
    </div>
  );
}

export default AddBook;
