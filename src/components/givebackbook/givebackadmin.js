import styles from './givebackadmin.module.css'
import React, { useState, useEffect, useRef } from 'react';
function GivebackAdmin() {
    const checkBox = useRef(null)
    const [valueInput, setValueInput] = useState('');
    const [dataGiveBack, setdataGiveBack] = useState([]);
    const [dataGiveBack1, setdataGiveBack1] = useState([]);
    const [dataGiveBack2, setdataGiveBack2] = useState([]);
    const [dataBook1, setDataBook] = useState([]);
    /* const [dataBook, setDataBook] = useState([]); */
    useEffect(() => {
        fetch(`https://test-d15a.onrender.com/detailGiveback`)
            .then(res => res.json())
            .then((data) => {
                const filteredData = data.filter(items => {
                    return items.name.toUpperCase().includes(valueInput.toUpperCase());
                });
                setdataGiveBack(filteredData);
                setdataGiveBack1(filteredData);
            });
    }, [valueInput, dataGiveBack2]);
    
    useEffect(() => {
        fetch(`https://test-d15a.onrender.com/book`)
            .then(res => res.json())
            .then(data => { setDataBook(data) })
    }, [])


    function handleConfirm(idBook, numberBook, idGiveback) {
        const realdata = dataBook1.find(items => { return items.id === idBook })
        let dataBook = {
            ...realdata,
            number: Number(realdata.number) + Number(numberBook)
        }
        let option = {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataBook)
        }
        fetch(` https://test-d15a.onrender.com/book/${idBook}`, option)
            .then(() => { alert("Xác nhận thành công") })

        let option1 = {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
        }
        fetch(`https://test-d15a.onrender.com/detailGiveback/${idGiveback}`, option1)
            .then(res => res.json())
            .then(data => { setdataGiveBack2(data) })

    }
    function handleSort() {
        if (checkBox.current && checkBox.current.checked) {
            fetch('https://test-d15a.onrender.com/detailGiveback')
                .then(res => res.json())
                .then(data => {
                    const sortData = data.sort((a, b) => {
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
        <div className={styles.divDetailBorrow}>
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
                            <th className={styles.thead}>Mã phiếu trả</th>
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
                                <td className={styles.tdata}>{items.id_borrow}</td>
                                <td className={styles.tdata}>{items.id_book}</td>
                                <td className={styles.tdata}>{items.id_user}</td>
                                <td className={styles.tdata}>{items.name}</td>
                                <td className={styles.tdata}>{items.author}</td>
                                <td className={styles.tdata}>{items.type}</td>
                                <td className={styles.tdata}>{items.numBerBorrow}</td>
                                <td className={styles.tdataLast}>
                                    <div className={styles.divBtn}>
                                        <button onClick={() => { handleConfirm(items.id_book, items.numBerBorrow, items.id) }} className={`${styles.btn} ${styles.btnDelete}`}>Confirm</button>
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


export default GivebackAdmin;
