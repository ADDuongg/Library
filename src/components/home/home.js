
import { useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react";
import styles from './home.module.css'
import Button from 'react-bootstrap/Button';

export default function Home() {
    /* const [imageUrl, setImageUrl] = useState([]); */
    const locationHome = useLocation()
    const iduser = locationHome.state.idUser
    
    /* console.log(idUser); */
    const nagivate = useNavigate()
    const [data, setData] = useState([])
    useEffect(() => {
        fetch('https://test-d15a.onrender.com/book')
            .then((res) => res.json())
            .then((data) => { setData(data) })
    }, [])
    function toDetail(id) {
        
        nagivate(`/Detail/${id}`, {state: {iduser}});
        /* console.log(id); */
    }
   /*  useEffect(()=>{
        const imgObj = data.map(items => URL.createObjectURL(items.picture_url))
        setImageUrl(imgObj)
        return () => {
            // Giải phóng các URL khi component bị hủy
            imgObj.forEach((url) => URL.revokeObjectURL(url));
          };
    },[]) */
    console.log(iduser);
    return (
        <div className={styles.divAdmin}>
            {data.map((items, index) => {
                    
                    return <div className={styles.divBook}>
                        <div className={styles.imgBook}>
                            {/* {imageUrl.map(url => {
                                return <img style={{
                                    width: 175,
                                    height: 175
                                }} src={url}/>
                            })} */}
                            <img style={{
                                    width: 175,
                                    height: 175
                                }} src={items.picture_url}/>
                            {/* {console.log(`${process.env.PUBLIC_URL}+${items.picture_url}`)} */}
                        </div>

                        <div className={styles.detailBook}>
                            <p className={styles.pName}><strong>Tên sách: </strong>{items.name}</p>
                            <p className={styles.pDescription}><strong>Mô tả: </strong>{items.description}</p>
                            <p className={styles.pNumber}><strong>Số lương: </strong>{items.number}</p>
                            <Button className={styles.btnDetail} variant="primary" onClick={()=>toDetail(items.id)}>Detail</Button>
                        </div>
                    </div>
                }
        
                
                )
            }
            </div>
    )
}
