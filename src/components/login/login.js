import styles from '../login/login.module.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {clsx} from 'clsx'
export default function Login() {
    
    const nagivate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [idUser, setIdUser] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState('')
    
    useEffect(() => {
        fetch('http://localhost:8080/login')
            .then(res => res.json())
            .then((data) => {
                const isLogin = data.some(function (item) {
                    return item.username === username && item.password === password;
                });
                const foundUser = data.find(item => item.username === username && item.password === password);
                if (foundUser) {
                    setRole(foundUser.role);
                    setIdUser(foundUser.id)
                }
                setIsLoggedIn(isLogin);
            }
            );

    }, [username, password]);
    console.log(username, password, role);
    console.log(isLoggedIn);
    
    function handleLogin() {
        if (isLoggedIn) {
           /*  navigate (`/Admin/${role}`)
            setShow(true) */
            alert('Đăng nhập thành công');
            const dataUser = {username, password, role, idUser}
            let localData = localStorage.setItem('user_infor', JSON.stringify(dataUser))
            console.log(localData);
            /* role === 'admin'? nagivate('/Admin'): nagivate('/User') */
            nagivate('/Home' , {state: {idUser}})
        }
    }
    console.log(idUser);
    /* console.log(localData); */
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleShowPasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    /*  console.log(username, password); */

    return (
            
            <div className={styles.container}>
                
            <div className={styles.main}>
                <div className={styles.inputDiv}>
                    <div className={styles.inputForm}>
                        <label>
                            Username
                            <input
                                value={username}
                                onChange={(e) => { setUsername(e.target.value) }}
                                className={styles.myInput}
                                placeHolder='Your username...'
                                type='text'
                            />
                        </label>
                    </div>
                    <div className={styles.inputForm}>
                        <label>
                            Password
                            <input
                                value={password}
                                onChange={handlePasswordChange}
                                className={styles.myInput}
                                placeholder='Your password...'
                                type={showPassword ? 'text' : 'password'}
                            />
                        </label>

                    </div>
                    <button className={styles.btnShow} onClick={handleShowPasswordToggle}>
                        {showPassword ? 'Hide' : 'Show'} Password
                    </button>
                </div>
                <button onClick={handleLogin}
                    className={styles.BtnLogin}>Log in
                </button>


            </div>

        </div>
        
        
    )
}