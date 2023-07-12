import styles from './detailBorrow.module.css'
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function DetailBorrowAdmin() {
    const checkBox = useRef(null)
    const localdata = JSON.parse(localStorage.getItem('user_infor'));
    let idUser = localdata.idUser
    /* console.log(localdata); */
    const navigate = useNavigate()
    /* const idSelectBook = useRef() */
    /* const [idBookSelect, setIdBookSelect] = useState();
    const [idBorrow, setIdBorrow] = useState(); */
    /* const [selectBookNumber, setSelectBookNumber] = useState(); */
    const [valueInput, setValueInput] = useState('');
    const [searchType, setSearchType] = useState("ASC");
    const [dataBorrow, setDataBorrow] = useState([]);
    const [dataBorrow1, setDataBorrow1] = useState([]);
    const [numberBorrow, setNumberBorrow] = useState();
    const [dataBookSelect, setDataBookSelect] = useState([]);
    /* const [dataBook, setDataBook] = useState([]); */
    useEffect(() => {
        fetch(`https://test-d15a.onrender.com/detailBorrow`)
            .then(res => res.json())
            .then((data) =>{
                /* const currenUser = data.filter((items) =>{
                    return items.id_user === idUser
                }) */
                setDataBorrow(data)
                setDataBorrow1(data)
            });
    }, [numberBorrow])
    useEffect(()=>{
        fetch('https://test-d15a.onrender.com/detailBorrow')
        .then(res => res.json())
        .then(data => {
            const dataSearch = data.filter(items => {
                return items.name.toUpperCase().includes(valueInput.toUpperCase())
            })
            setDataBorrow(dataSearch)
        })
    },[valueInput])
    /* console.log(dataBorrow); */
    const handleDelete = (idBorrow, idBook, numberBorrow, type) => {
        setNumberBorrow(numberBorrow)
        /* const idBookSelect = idSelectBook.current.textContent; */
        let option2 = {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        }
        fetch(`https://test-d15a.onrender.com/detailBorrow/${idBorrow}`, option2)
            .then(res => res.json())
            .then(() => {
                fetch(`https://test-d15a.onrender.com/book`)
                    .then(res => res.json())
                    .then((data) => {
                        /* setDataBook(data) */
                        const currenBookSelect = data.find((items) => {
                            return items.id === idBook
                        })
                        setDataBookSelect(currenBookSelect)
                    });
                type === "delete"? alert("Xóa thành công"): alert("Phiếu mượn đã dc xác nhận")
            });
    }
    function hendleUpdate(idBorrow, bookName, bookAuthor, bookType, bookNumberBorrow, idBook) {
        navigate('/Updatebook', {state: {idBorrow, bookName, bookAuthor, bookType, bookNumberBorrow, idBook }})
    }
    useEffect(() => {
        let bookSelect = {
            ...dataBookSelect,
            number: Number(dataBookSelect.number) + Number(numberBorrow)
        }
        let option = {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookSelect),
        }
        fetch(`https://test-d15a.onrender.com/book/${dataBookSelect.id}`, option)
            .then(res => res.json())
            .catch(err => console.log('lỗi rồi'))
    }, [dataBorrow])
    
    
    function handleSort() {
        if (checkBox.current && checkBox.current.checked) {
          fetch('https://test-d15a.onrender.com/detailBorrow')
            .then(res => res.json())
            .then(data => {
              if (searchType === "ASC") {
                const sortedData = data.sort((a, b) => {
                  /* if (a.name.toUpperCase() > b.name.toUpperCase()) {
                    return 1;
                  }
                  if (a.name.toUpperCase() < b.name.toUpperCase()) {
                    return -1;
                  }
                  return 0; */
                  if (a.id_book > b.id_book) {
                    return 1;
                  }
                  if (a.id_book < b.id_book) {
                    return -1;
                  }
                  return 0;
                });
                setDataBorrow(sortedData);
                /* setSearchType("DSC"); */
              }
            });
        } else {
          /* setDataBorrow1(dataBorrow) */
          setDataBorrow(dataBorrow1)
        }
      }
      
      
    
    return (
        <div className={styles.divDetailBorrow}>
            <div className={styles.divSearchTable}>
                <input
                    style={{width:300}}
                    placeholder='Search name book borrow...'
                    type='text'
                    value={valueInput}
                    onChange={(e) => setValueInput(e.target.value)}
                ></input>
                <div className={styles.divSearchInput}>
                <input ref={checkBox} style={{marginLeft: 20}} type='checkbox'/>
                <div className={styles.bookName}>Sắp xếp theo tên sách</div>
                <button onClick={()=>{handleSort()}} style={{marginLeft:20}}>Sắp xếp</button>
                </div>
                
            </div>
            <div className={styles.divTable}>
                <table className={styles.tableBorrow}>
                    <thead>
                        <tr>
                            <th className={styles.thead}>Mã phiếu mượn</th>
                            <th className={styles.thead}>Mã Sách</th>
                            <th className={styles.thead}>Mã Khách hàng</th>
                            <th className={styles.thead}>Tên sách</th>
                            <th className={styles.thead}>Tác giả</th>
                            <th className={styles.thead}>Thể loại</th>
                            <th className={styles.thead}>Số lượng mượn</th>
                            <th className={styles.thead}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataBorrow.map((items, index) => (
                            <tr className={styles.trow} /* key={index} */>
                                <td className={styles.tdata}>{items.id}</td>
                                <td className={styles.tdata}>{items.id_book}</td>
                                <td className={styles.tdata}>{items.id_user}</td>
                                <td className={styles.tdata}>{items.name}</td>
                                <td className={styles.tdata}>{items.author}</td>
                                <td className={styles.tdata}>{items.type}</td>
                                <td className={styles.tdata}>{items.numBerBorrow}</td>
                                <td className={styles.tdataLast}>
                                    <div className={styles.divBtn}>
                                        <button onClick={() => { handleDelete(items.id, items.id_book, items.numBerBorrow, 'confirm') }}  className={`${styles.btn} ${styles.btnConfirm}`}>Confirm</button>
                                        <button onClick={()=> {hendleUpdate(items.id, items.name, items.author, items.type, items.numBerBorrow, items.id_book)}} className={`${styles.btn} ${styles.btnUpdate}`}>Update</button>
                                        <button onClick={() => { handleDelete(items.id, items.id_book, items.numBerBorrow, 'delete') }} className={`${styles.btn} ${styles.btnDelete}`}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
}


export default DetailBorrowAdmin;
