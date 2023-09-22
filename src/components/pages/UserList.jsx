import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet } from '../../services/apiService';

const UserList = ({socket}) => {

    const [userList, setUserList] = useState();

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
    }, [socket])

    return (
        <div>
            {userList?<div style={{ height: '50vh', width: '35%', backgroundColor: "#eee" }}>
                <div className="header bg-success text-white p-2 text-center rounded-1" style={{ height: '50px', width: '250px' }}>
                    <h5>יש {userList.length} משתמשים סה"כ</h5>
                </div>
                <div className="list fw-bolder fs-5" style={{ fontFamily: 'monospace' }}>
                    {userList.map((item, i) => {
                        return (
                            <div className='d-flex justify-content-between align-items-center rounded-1' style={{ height: '60px', width: '250px', backgroundColor: 'lightgray', padding: '5px', borderBottom: '3px solid white' }}>
                                <p className='ps-1'>{item.name}</p>
                                <div style={{ height: '13px', width: '13px', boxShadow: '0px 0px 10px 5px white', backgroundColor: `${item.isOnline ? 'rgb(0,250,0)' : 'rgb(255,0,0)'}` }} className={`rounded-5 me-2`}></div>
                            </div>
                        )
                    })}
                </div>
            </div>:''}
        </div>

    )
}

export default UserList