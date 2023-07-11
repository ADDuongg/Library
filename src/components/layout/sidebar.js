import { React } from "react";
import styles from './sidebar.module.css'
import { AiFillHome } from "react-icons/ai";
import { BsFillJournalBookmarkFill, BsFillCreditCard2BackFill } from 'react-icons/bs'
import { FaWarehouse } from 'react-icons/fa'
import { useNavigate } from "react-router-dom";
function Sidebar() {
    const navigate = useNavigate()
    const dataLocal = JSON.parse(localStorage.getItem('user_infor'))
    console.log(dataLocal);
    return (
        <div className={styles.divSidebar}>

            <div className={`${styles.divBtn} ${styles.div1} `}>
                <AiFillHome className={styles.iconSidebar} />
                <button className={styles.btnSidebar} onClick={()=> {navigate('/Home', {state: {}})}} >HOME</button>
            </div>

            
            {dataLocal.role === "user"? <div className={`${styles.divBtn} ${styles.div2} `}>
                <BsFillJournalBookmarkFill className={styles.iconSidebar} />
                <button onClick={()=>{navigate('/borrowUser')}} className={styles.btnSidebar}>Thông tin mượn sách của bạn</button>
            </div>
             : <div className={`${styles.divBtn} ${styles.div2} `}>
                <BsFillJournalBookmarkFill className={styles.iconSidebar} />
                <button onClick={()=>{navigate('/DetailBorrow')}} className={styles.btnSidebar}>Chi tiết mượn sách</button>
            </div>}
           
            
            <div className={`${styles.divBtn} ${styles.div3} `}>
                <BsFillCreditCard2BackFill className={styles.iconSidebar} />
                <button onClick={dataLocal.role === "user" ? ()=>{navigate('/Giveback')}: ()=>{navigate('/GivebackAdmin')}} className={styles.btnSidebar}>{dataLocal.role === "user" ? "Thông tin mượn/trả sách": "Thông tin trả sách"}</button>
            </div>

            
            {dataLocal.role === "user"? <div></div> : <div className={`${styles.divBtn} ${styles.div4} `}>
                <FaWarehouse className={styles.iconSidebar} />
                <button className={styles.btnSidebar} onClick={()=> {navigate('/store')}} >Kho sách</button>
            </div>}

        </div>
    );
}

export default Sidebar;