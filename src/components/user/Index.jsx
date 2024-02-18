import React from 'react';
import Sidebar from '../Sidebar';
import User_index from './User_index';

function Index() {
    return (
        <div className='container main-component'>

            <div className="d-flex w-100">
                <div className="">
                    <Sidebar />
                </div>
                <div className="w-75">
                    <h2 className='title'>ระบบคำนวณการเจาะ</h2>
                    <User_index />


                </div>
            </div>

        </div>
    );
}

export default Index