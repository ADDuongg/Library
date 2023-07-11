import styles from './store.module.css'
import { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import { AiFillCloseCircle } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
function Store() {
    const navigate = useNavigate()
    const [store, setStore] = useState([])
    const [book, setBook] = useState([])
    const [book1, setBookTake] = useState({})
    const [book2, setBookTakeAll] = useState({})
    const [numberTake, setNumberTake] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [showModal1, setShowModal1] = useState(false)
    useEffect(() => {
        fetch('http://localhost:8080/storeBook')
            .then(res => res.json())
            .then(data => {
                setStore(data)
            })

        fetch('http://localhost:8080/book')
            .then(res => res.json())
            .then(data => { setBook(data) })
    }, [])
    /* const [selectedImage, setSelectedImage] = useState(null);

    function handleImageUpload(event) {
        const file = event.target.files[0];
        setSelectedImage(file);
        console.log(URL.createObjectURL(file));
    } */
    function handleTakeBook(idBookSelect) {
        const bookData = book.find(items => {
            return items.id === idBookSelect
        })
        const bookStore = store.find(items => {
            return items.id_book === idBookSelect
        })
        setBookTake(bookData)
        setBookTakeAll(bookStore)
        const hasStore = book.some(items => { return items.id === idBookSelect })
        if (hasStore) {
            setShowModal(true)
            alert("Loại sách này đã có, vui lòng chọn số lượng muốn bày")
        }
        else {
            setShowModal1(true)
            alert("Loại sách này chưa được bày, vui lòng cập nhật thông tin sách để lấy")
        }
    }
    function closeModal(e, type) {
        e.stopPropagation()
        type === 'modal' ? setShowModal(false) : setShowModal1(false)
    }

    function takeAllBook() {
        const bookStore = store.find(items => {
            return items.id_book === book2.id
        })
        if (Number(book2.number) < numberTake || numberTake < 0) {
            alert("Lỗi")
        }
        else {
            let dataTakeAll = {
                ...book2,
                number: Number(numberTake)
            }
            let option = {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataTakeAll)
            }
            fetch('http://localhost:8080/book', option)


            let dataStore = {
                ...bookStore,
                number: Number(bookStore.number) - Number(numberTake)

            }
            let option1 = {
                method: "PUT", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataStore)
            }
            fetch(`http://localhost:8080/storeBook/${bookStore.id}`, option1)

                .then(() => { setShowModal(false) })
        }
    }
    function takeBook() {
        const bookTake = book.find(items => {
            return items.id === book1.id
        })
        const bookStore = store.find(items => {
            return items.id_book === book1.id
        })
        if (Number(book1.number) < numberTake || numberTake < 0) {
            alert("Lỗi")
        }
        else {
            let dataBook = {
                ...bookTake,
                number: Number(bookTake.number) + Number(numberTake)
            }
            let dataBookStore = {
                ...bookStore,
                number: Number(bookStore.number) - Number(numberTake)
            }
            let option = {
                method: "PUT", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataBook)
            }
            let option1 = {
                method: "PUT", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataBookStore)
            }
            fetch(`http://localhost:8080/book/${bookTake.id}`, option)
                .then(() => { alert(`Đã lấy thành công ${numberTake} quyển`) })
                .then(() => {
                    fetch(`http://localhost:8080/storeBook/${bookStore.id}`, option1)
                })
                .then(() => { setShowModal(false) })
        }
    }
    function handleAddBook(e) {
        e.preventDefault()
        navigate('/AddBook')
    }
    function handleDelete(idStore) {
        let option = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        };
        fetch(`http://localhost:8080/storeBook/${idStore}`, option)
            .then(() => {
                alert("Xóa thành công");
                // Gọi lại API để lấy danh sách cửa hàng mới và cập nhật state
                fetch('http://localhost:8080/storeBook')
                    .then(res => res.json())
                    .then(data => {
                        setStore(data);
                    });
            })
            .catch((error) => {
                console.log("Xóa không thành công: ", error);
            });
    }
    function handleUpdateStore(e, idStore, idBook, nameBook, typeBook, authorBook, numberBook, picktureBook, descriptionBook, yearBook, detailBook) {
        e.preventDefault()
        navigate('/StoreUpdate', { state: { idStore, idBook, nameBook, typeBook, authorBook, numberBook, picktureBook, descriptionBook, yearBook, detailBook } })
    }

    return (
        <div className={styles.divStore}>
            {/*  <input type="file" onChange={handleImageUpload} />
            {selectedImage && (
                <div>
                    <img src={URL.createObjectURL(selectedImage)} alt="Selected Image" />
                </div>
            )} */}
            {showModal && <div /* onClick={()=>{setShowModal(false)}} */ className={styles.overlay}>

                <div className={styles.modal}>
                    <div onClick={(e) => { closeModal(e, 'modal') }} className={styles.buttonClose}><AiFillCloseCircle style={{ color: 'red', cursor: 'pointer' }} /></div>
                    <div /* onClick={(e)=>{e.stopPropagation()}} */ className={styles.content}>
                        <div className={styles.divInput}><label>Mã sách</label><input disabled={true} value={book1.id} className={styles.iput} style={{ height: 40 }} type='text' /></div>
                        <div className={styles.divInput}><label>Tên sách</label><input disabled={true} value={book1.name} className={styles.iput} style={{ height: 40 }} type='text' /></div>
                        <div className={styles.divInput}><label>Thể loại</label><input disabled={true} value={book1.type} className={styles.iput} style={{ height: 40 }} type='text' /></div>
                        <div className={styles.divInput}><label>Tác giả</label><input disabled={true} value={book1.author} className={styles.iput} style={{ height: 40 }} type='text' /></div>
                        <div className={styles.divInput}><label>Số lương lấy</label><input value={numberTake} onChange={(e) => { setNumberTake(e.target.value) }} className={styles.iput} style={{ height: 40 }} type='number' /></div>
                        <div className={styles.divInput}><Button onClick={() => { takeBook() }} className={styles.btnConfirm} as='a' variant='primary'>Xác nhận</Button></div>
                    </div>
                </div>
            </div>
            }
            {
                showModal1 && <div /* onClick={()=>{setShowModal(false)}} */ className={styles.overlay}>

                    <div className={styles.modal}>
                        <div onClick={(e) => { closeModal(e, 'modal1') }} className={styles.buttonClose}><AiFillCloseCircle style={{ color: 'red', cursor: 'pointer' }} /></div>
                        <div /* onClick={(e)=>{e.stopPropagation()}} */ className={styles.content}>
                            <div className={styles.divInput}><label>Mã sách</label><input disabled={true} value={book2.id} className={styles.iput} style={{ height: 40 }} type='text' /></div>
                            <div className={styles.divInput}><label>Tên sách</label><input disabled={true} value={book2.name} className={styles.iput} style={{ height: 40 }} type='text' /></div>
                            <div className={styles.divInput}><label>Thể loại</label><input disabled={true} value={book2.type} className={styles.iput} style={{ height: 40 }} type='text' /></div>
                            <div className={styles.divInput}><label>Tác giả</label><input disabled={true} value={book2.author} className={styles.iput} style={{ height: 40 }} type='text' /></div>
                            <div className={styles.divInput}><label>Số lương lấy</label><input onChange={(e) => { setNumberTake(e.target.value) }} className={styles.iput} style={{ height: 40 }} type='number' /></div>
                            <div className={styles.divInput}><Button onClick={() => { takeAllBook() }} className={styles.btnConfirm} as='a' variant='primary'>Xác nhận lấy sách</Button></div>
                        </div>
                    </div>
                </div>
            }
            <div className={styles.divTable}>
                <table className={styles.tableBorrow}>
                    <thead>
                        <tr>
                            <th className={styles.thead}>ID sách</th>
                            <th className={styles.thead}>Tên sách</th>
                            <th className={styles.thead}>Thể loại</th>
                            <th className={styles.thead}>Tác giả</th>
                            <th className={styles.thead}>Số lương hiện tại</th>
                            <th className={styles.thead}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {store.map((items, index) => {
                            return <tr key={index}>
                                <td className={styles.tdata}>{items.id_book}</td>
                                <td className={styles.tdata}>{items.name}</td>
                                <td className={styles.tdata}>{items.type}</td>
                                <td className={styles.tdata}>{items.author}</td>
                                <td className={styles.tdata}>{items.number}</td>
                                <td className={styles.tdata}>
                                    <div className={styles.divBtn}>
                                        <Button onClick={() => { handleTakeBook(items.id_book) }} as='a' variant='primary' className={styles.btn}>Lấy sách</Button>
                                        <Button onClick={(e) => { handleAddBook(e, items.id, items.id_book, items.name, items.type, items.author, items.number, items.picture_url, items.description, items.year, items.detail) }} as='a' variant='primary' className={styles.btn}>Thêm sách</Button>
                                        <Button onClick={(e) => { handleUpdateStore(e, items.id, items.id_book, items.name, items.type, items.author, items.number, items.picture_url, items.description, items.year, items.detail) }} as='a' variant='primary' className={styles.btn}>Sửa sách</Button>
                                        <Button onClick={() => { handleDelete(items.id) }} as='a' variant='primary' className={styles.btn}>Xóa sách</Button>
                                    </div>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>


        </div>
    );
}

export default Store;