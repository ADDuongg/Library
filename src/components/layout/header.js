import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import CSS từ Bootstrap
import Button from 'react-bootstrap/Button'; // Import component Button từ thư viện Bootstrap
import { FaUserShield } from 'react-icons/fa';
import { AiFillCaretDown, AiOutlineSearch } from 'react-icons/ai';
import styles from '../layout/header.module.css'
import img1 from './book.jpg';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, } from 'react-router-dom';

const Header = () => {
  const nagivate = useNavigate()
  const [showSetting, setShowSetting] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [valueInput, setValueInput] = useState('');
  const [dataBook, setDataBook] = useState([])
  const searchInput = useRef(null);
  const searchResult = useRef(null);
  useEffect(() => {
    fetch('https://test-d15a.onrender.com/book')
      .then(res => res.json())
      .then(function (data) {
        var search_value = data.filter(function (items) {
          return items.name.toUpperCase().includes(valueInput.toUpperCase());
        });
        /* console.log(search_value); */
        setDataBook(search_value);
      })
      .catch(error => console.error("Có lỗi xảy ra", error));
  }, [valueInput]);

  

  const toggleBefore = () => {
    setShowSetting(!showSetting);
  };
  const logOut = () => {
    nagivate('/')
  }
  const backToHome = () => {
    nagivate('/Home', {state: {}})
  }
  const handleFocus = () => {
    /* e.target.classList.add(styles.changeBorder) */
    setShowDetail(true)
    /* alert('dm') */
  }
  const btnShow = useRef()
  const btnToDetail = useRef()
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchResult.current &&
        !searchResult.current.contains(event.target) &&
        !searchInput.current.contains(event.target)
      ) {
       setShowDetail(false)
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  function searchToDetail(id) {
    nagivate(`/Detail/${id}`, {state:{}})
    setShowDetail(false)
    
  }
  /* function handleBlur() {
    setShowDetail(false)
  } */
  const userInfo = JSON.parse(localStorage.getItem('user_infor'))
  /* console.log((dataBook));
  console.log("ValueInput: " + valueInput); */
  /* console.log(dataBook); */

  return (
    <div>
      <div className={styles.divHeader}>
        <img onClick={backToHome} src={img1} className={styles.imgHome} alt='img' />
        
        <div ref={btnShow}  className={styles.divSearch}>
          <input
            ref={searchInput}
            type='search'
            placeholder='   Search what you want...'
            className={styles.inputSearch}
            onFocus={() => handleFocus()}
            /* onBlur={() => handleBlur()} */
            onChange={(e) => { setValueInput(e.target.value) }}
          />
          <AiOutlineSearch style={{
            height: 30,
            width: 30,
            marginBottom: 5
          }} />
        </div>
        <div ref={searchResult} className={`${styles.divInfor}`}>
          <div className={`${styles.menu} ${showSetting ? styles.showDiv : ''}`}>
            <div>
              <button className={styles.divs} style={
                {
                  width: 120,
                  height: 40
                }
              }>Setting</button>
            </div>
            <div>
              <button className={styles.divs} onClick={logOut} style={
                {
                  width: 120,
                  height: 40
                }
              }>Log out</button>
            </div>
          </div>
          <FaUserShield className={styles.iconUser} />
          <p className={styles.userName}>{userInfo.username}</p>
          <AiFillCaretDown
            style={{ cursor: 'pointer' }}
            className={styles.iconShow}
            onClick={toggleBefore}
          />
        </div>
      </div>
      <div className={`${styles.detailInput} ${showDetail ? styles.showDivDetail : ''}`}>
      <div className={styles.divChildren}>
        {dataBook.map((items) => {
          return <div  onClick={() =>{searchToDetail(items.id)}}  className={styles.divBookSearch}>
          <img src={`${process.env.PUBLIC_URL}${items.picture_url}`} style={{
            width: 100,
            height: 150,
          }} />
          <div className={styles.detailBookSearch}>
            <p><strong>Tên sách:</strong> {items.name}</p>
            <p><strong>Tác giả:</strong> {items.author}</p>
            <p><strong>Thể loại:</strong> {items.type}</p>
          </div>
      </div>
        })}
      </div>
      </div>

    </div>
  );
}

export default Header;
