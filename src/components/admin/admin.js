import { useNavigate } from "react-router-dom"
import Alert from 'react-bootstrap/Alert';
export default function Admin() {
    const dataLocal = JSON.parse(localStorage.getItem('user_infor'))
    /* console.log(dataLocal); */
    const nagivate = useNavigate()
    return (
        <div>
            <p>{`Welcome ${dataLocal.username}`}</p>
            <p>{`This is ${dataLocal.role}`}</p>
            <button onClick={() => {
                nagivate('/')
            }}>
                Back to login
            </button>
            <Alert dismissible variant="danger">
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>Change this and that and try again.</p>
            </Alert>
        </div>
    )
}