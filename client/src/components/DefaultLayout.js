import '../resources/defaultlayout.css';
import { Button, Dropdown, Space } from 'antd';
import React from 'react';
import { Link, useNavigate } from "react-router-dom";
function DefalutLayout(props) {
    const navigate =useNavigate();
    const items = [
        {
            key: '1',
            label: (
                <Button type="text" danger
                onClick={()=>{
                    localStorage.removeItem('shey-money');
                    navigate('/login');
                }}
                >
                    Logout
                </Button>
            ),
        }
    ]
    const user = JSON.parse(localStorage.getItem('shey-money'));
  
    
    return (
        <div className="layout">
            <div className="header d-flex justify-content-between align-items-center">
                <div className="">
                    <h1 className="logo">
                        Shey money
                    </h1>
                </div>
                <div className='username'>
                    <Dropdown
                    className='username'
                        menu={{
                            items,
                        }}
                    >
                        <Link onClick={(e) => e.preventDefault()}>
                            <Space>
                                <h6 className='username'>{user.username}</h6>
                                
                            </Space>
                        </Link>
                    </Dropdown>
                </div>

            </div>
            <div className="content">
                {props.children}
            </div>
        </div>
    )
}

export default DefalutLayout;