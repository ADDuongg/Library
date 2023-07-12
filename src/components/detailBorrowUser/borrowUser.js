import styles from './borrowUser.module.css'
import React, { useState, useEffect, useRef } from 'react';
function BorrowUser() {
    const checkBox = useRef(null)
    const localdata = JSON.parse(localStorage.getItem('user_infor'));
    let idUser = localdata.idUser
    const [valueInput, setValueInput] = useState('');
    const [dataGiveBack, setdataGiveBack] = useState([]);
    const [dataGiveBack1, setdataGiveBack1] = useState([]);
    const [dataBookBorrow, setDataBookBorrow] = useState([]);
    const [numberBorrow, setNumberBorrow] = useState('');

    /* const [dataBook, setDataBook] = useState([]); */
    useEffect(() => {
        fetch(`https://test-d15a.onrender.com/detailBorrow`)
            .then(res => res.json())
            .then((data) => {
                const filteredData = data.filter(items => {
                    if (numberBorrow) {
                        return items.id_user === idUser;
                    } else {
                        return items.id_user === idUser && items.name.toUpperCase().includes(valueInput.toUpperCase());
                    }
                });
                setdataGiveBack(filteredData);
                setdataGiveBack1(filteredData);
            });
    }, [valueInput, numberBorrow, dataBookBorrow]);



    function handleDelete(idBorrow, numberBorrow, idBook) {
        setNumberBorrow(numberBorrow)
        let option2 = {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
        }
        fetch(`https://test-d15a.onrender.com/detailBorrow/${idBorrow}`, option2)
            .then(res => res.json())
            .then(() => {
                fetch(`https://test-d15a.onrender.com/book`)
                    .then(res => res.json())
                    .then(data => {
                        const currenBookSelect = data.find((items) => {
                            return items.id === idBook
                        })
                        setDataBookBorrow(currenBookSelect)
                        
                    })}
            )
            .then(()=>{alert("Hủy mượn sách thành công")})
    }
    useEffect(() => {
        let bookSelect = {
            ...dataBookBorrow,
            number: Number(dataBookBorrow.number) + Number(numberBorrow)
        }
        let option = {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookSelect),
        }
        fetch(`https://test-d15a.onrender.com/book/${dataBookBorrow.id}`, option)
            .then(res => res.json())
            .catch(err => console.log('lỗi rồi'))
    }, [dataBookBorrow])
    function handleSort() {
        if (checkBox.current && checkBox.current.checked) {
            fetch('https://test-d15a.onrender.com/detailBorrow')
                .then(res => res.json())
                .then(data => {
                    const sort = data.filter(items => {
                        return items.id_user === idUser
                    })
                    const sortData = sort.sort((a, b) => {
                        if (a.name.toUpperCase() > b.name.toUpperCase()) {
                            return 1;
                        }
                        if (a.name.toUpperCase() < b.name.toUpperCase()) {
                            return -1;
                        }
                        return 0;
                    })
                    setdataGiveBack(sortData);
                });

        }
        else (setdataGiveBack(dataGiveBack1))
    }
    return (
        <div>
            <div className={styles.divDetailBorrow}>
            <strong>Thông tin mượn sách</strong>
            <div className={styles.divSearchTable}>
                <input
                    style={{ width: 300 }}
                    placeholder='Search name book borrow...'
                    type='text'
                    value={valueInput}
                    onChange={(e) => setValueInput(e.target.value)}
                ></input>
                <div className={styles.divSearchInput}>
                    <input ref={checkBox} style={{ marginLeft: 20 }} type='checkbox' />
                    <div className={styles.bookName}>Sắp xếp theo tên sách</div>
                    <button onClick={() => { handleSort() }} style={{ marginLeft: 20 }}>Sắp xếp</button>
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
                        {dataGiveBack.map((items, index) => (
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
                                        <button  onClick={() => { handleDelete(items.id, items.numBerBorrow, items.id_book) }} className={`${styles.btn} ${styles.btnUpdate}`}>Hủy mượn</button>
                                        {/* <button onClick={() => { handleGiveback(items.id) }} className={`${styles.btn} ${styles.btnDelete}`}>Trả sách</button> */}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
        
    );
}


export default BorrowUser;
