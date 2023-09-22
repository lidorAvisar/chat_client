import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/context'
import { API_URL, TOKEN_KEY, doApiGet, doApiMethod } from '../../services/apiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'


const UserNav = () => {

    const { userData } = useContext(AppContext);
    const [userList, setUserList] = useState([]);

    const doApiUserList = async () => {
        try {
            const url = API_URL + "/users/usersList";
            const data = await doApiGet(url);
            setUserList(data);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        doApiUserList();
    }, [])

    const isOffline = async () => {
        try {
            const url = API_URL + "/users/logout";
            const data = await doApiMethod(url, "PATCH", userData);
        }
        catch (error) {
            console.log(error);
        }
    }

    const circleStyle = {
        width: '35px',
        height: '35px',
        borderRadius: '50%',
        background: 'linear-gradient(to right, rgb(250, 0, 0) 50%, rgb(0, 250, 0) 50%)',
    };

    return (
        <div dir='rtl' className='bg-secondary d-flex justify-content-around align-items-center'>
            {userData?<div className='dropdown-center'>
                <img src={userData?.profileImage} className='dropdown-toggle rounded-5 m-1' type="button" data-bs-toggle="dropdown" aria-expanded="false" alt="user img" height="35px" width="35px" />
                <ul dir='ltr' className='dropdown-menu list-unstyled mt-1'>
                    <li onClick={() => {
                        setTimeout(() => {
                            if (window.confirm('האם אתה בטוח?')) {
                                isOffline();
                                localStorage.removeItem(TOKEN_KEY);
                                window.location.reload();
                            }
                        }, 100)
                    }} className='ps-3 fw-bold' style={{ cursor: 'pointer' }}>התנתק <span className='ps-5'><FontAwesomeIcon icon={faRightFromBracket} size="lg" style={{color: "#e24040",}} /></span></li>
                    
                </ul>
            </div>:''}
            <div className='dropdown-center d-lg-none'>
                <p style={circleStyle} className='m-1' type="button" data-bs-toggle="dropdown" aria-expanded="false" />
                <ul className='dropdown-menu list-unstyled mt-1'>
                    {userList.map((item, i) => {
                        return (
                            <div dir='ltr' key={i} className='d-flex justify-content-between align-items-center p-1'>   
                                    <span className='fw-bolder'>{item.name}</span>
                                    <div style={{ height: '13px', width: '13px', backgroundColor: `${item.isOnline ? 'rgb(0,250,0)' : 'rgb(255,0,0)'}` }} className={`rounded-5 me-2`}></div>
                            </div>
                        )
                    })}
                </ul>
            </div>
            <div>
                <h4 className='text-white'>{userData?.name} ברוך הבא לצ'אט</h4>
            </div>
        </div>
    )
}

export default UserNav