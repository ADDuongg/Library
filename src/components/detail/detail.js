import { useParams, useLocation } from 'react-router-dom';
import styles from "./detail.module.css";
import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
function Detail() {
    const localdata = JSON.parse(localStorage.getItem('user_infor'));
    let idUser = localdata.idUser
    /* const dataLocal = JSON.parse(localStorage.getItem('user-infor')) */
    const valueInput = useRef()
    const btnBorrow = useRef()
    const { idBook } = useParams();
    const [currenBook, setCurrenBook] = useState([])
    const [numberInput, setNumberInput] = useState(0)
    const [numberBook, setNumberBook] = useState(0)
    /* const [dataBook, setDataBook] = useState({}) */
    useEffect(() => {
        fetch('https://test-d15a.onrender.com/book')
            .then(res => res.json())
            .then((data) => {
                const curren = data.find((items) => {
                    return items.id == idBook
                })
                /* console.log(typeof idBook); */
                setCurrenBook(curren)
                setNumberBook(curren.number)
                
            })

            .catch((error) => {
                console.error('Có lỗi xảy ra khi lấy dữ liệu:', error);
            });
    }, [idBook])
    /* useEffect(()=>{
        
    }, [numberInput])
 */

    function handleBorrow() {
        
        const dataBorrowBook = {
            name: currenBook.name,
            author: currenBook.author,
            type: currenBook.type,
            numBerBorrow: numberInput,
            id_user: idUser,
            id_book: currenBook.id
        }
        const dataBook = {
            ...currenBook,
            number: currenBook.number - numberInput
        }
        let option1 = {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataBorrowBook),
        }
        let option2 = {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataBook),
        }
        if (numberInput > Number(numberBook)) {
            alert("Bạn đã mượn quá số lượng");
            setNumberInput(0)
        } else if (numberInput < 0) {
            alert("Lỗi mượn sách");
            setNumberInput(0)
        } else {
            fetch('https://test-d15a.onrender.com/detailBorrow', option1)
                .then(res => res.json())
                .then(() => {
                    alert(`Mượn ${numberInput} cuốn ${currenBook.name} thành công`);
                });
                setNumberBook(numberBook - numberInput)
                setNumberInput(0)
            
            fetch(`https://test-d15a.onrender.com/book/${currenBook.id}`, option2)
                .then(res => res.json())
                .then(() => {
                })
                .catch(()=>{console.log("Lỗi update số lượng");})
        }
    }
    /* console.log(idUser); */
    
    return (
        <div className={styles.divDetail}>
            <div className={styles.divImage}>
                <img src={currenBook.picture_url} alt='' className={styles.imgBook} />
            </div>
            <div className={styles.divInfoBook}>
                <p><strong>Tên sách: </strong> {`${currenBook.name}`}</p>
                <p><strong>Tác giả: </strong>{`${currenBook.author}`}</p>
                <p><strong>Năm xuất bản: </strong>{`${currenBook.year}`}</p>
                <p><strong>Thể loại: </strong>{`${currenBook.type}`}</p>
                <p><strong>Nội dung: </strong>{`${currenBook.detail}`}</p>
                <div className={styles.divButton}>
                    <input type='number' className={styles.inputNumber} ref={valueInput} value={numberInput} onChange={(e)=>{setNumberInput(e.target.value)}} />{numberBook == 0 ? `${currenBook.number}` : numberBook}
                    <Button ref={btnBorrow} className={styles.btnDetail} variant="primary" onClick={()=> handleBorrow()} >Mượn sách</Button>
                    {/* <Button className={styles.btnDetail} variant="primary" >Detail</Button> */}
                </div>
            </div>
        </div>
    );
}

export default Detail;


