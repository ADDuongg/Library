import styles from './giveback.module.css'
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap'
function Giveback() {
    const checkBox = useRef(null)
    const localdata = JSON.parse(localStorage.getItem('user_infor'));
    let idUser = localdata.idUser
    const navigate = useNavigate()
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
    function handleGiveback(idBorrow, numberBorrow, idBook) {
        setNumberBorrow(numberBorrow)
        let option2 = {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
        }
        fetch(`https://test-d15a.onrender.com/detailBorrow/${idBorrow}`, option2)
            .then(res => res.json())
            .then((data) => {
                setDataBookBorrow(data)
            }
            )
        const dataWillGiveback = dataGiveBack.filter(items => {
            return items.id === idBorrow;
        });
    
        if (dataWillGiveback.length > 0) {
            let items = dataWillGiveback[0];
            const dataGiveback = {
                id_borrow: items.id,
                id_book: items.id_book,
                id_user: items.id_user,
                name: items.name,
                author: items.author,
                type: items.type,
                numBerBorrow: numberBorrow
            };
            console.log(items.numBerBorrow);
            const option = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataGiveback)
            };
    
            fetch('https://test-d15a.onrender.com/detailGiveback', option)
                .then(res => res.json())
                .then(() => {
                    alert("Trả sách thành công");
                });
        }
        
    }
    
    /* console.log(dataBookBorrow.id); */
    /* console.log(`datagiveback1: ${dataGiveBack1}`); */
    return (
        <div>
        <div className={styles.divDetailBorrow}>
        <strong>Thông tin sách đã mượn</strong>
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
                                        <button onClick={() => { handleGiveback(items.id, items.numBerBorrow, items.id_book) }} className={`${styles.btn} ${styles.btnDelete}`}>Trả sách</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        <p>Thông tin sách đã trả thành công</p>
        </div>
    );
}


export default Giveback;
