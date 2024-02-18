import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import '../../css/sidebar.css'
function User_sidebar() {
    const currentURL = window.location.href; // returns the absolute URL of a page

    const pathname = window.location.pathname;



    return (
        <div className='side-bar shadow'>
            {/* ปุ่มลิงก์ไปทุก path */}
            <div className="side-con">
                <Link className={`navlinkhome mt-1 ${pathname === '/' ? 'active' : ''}`} onChange={(e) => HandleOnclik('/')} to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={`bi bi-house-door-fill ${pathname === '/' ? 'activehome' : ''}`} viewBox="0 0 16 16">
                        <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
                    </svg>
                </Link>
                <Link className={`navlink mt-1 ${pathname === '/resform' ? 'active' : ''}`} to="/resform">แหล่งกักเก็บ</Link>
                <Link className={`navlink mt-1 ${pathname === '/casing' ? 'active' : ''}`} to="/casing">ข้อมูลท่อกรุ</Link>
                <Link className={`navlink mt-1 ${pathname === '/result' ? 'active' : ''}`} to="/result">ผลลัพธ์</Link>
                <Link className={`navlink mt-1 ${pathname === '/drilling_equipment' ? 'active' : ''}`} to="/drilling_equipment">อุปกรณ์การเจาะ</Link>
                <Link className={`navlink mt-1 ${pathname === '/pressurelost' ? 'active' : ''}`} to="/pressurelost">คำนวณปั๊ม</Link>
                <Link className={`navlink mt-1 ${pathname === '/cement' ? 'active' : ''}`} to="/cement">ซีเมนต์</Link>
                <Link className={`navlink mt-1 ${pathname === '/user' ? 'active' : ''}`} to="/user">Dashboard</Link>

            </div>



            {/* นอกจากนี้คือเนื้อหาของ Formcontact component */}
        </div>
    );
}

export default User_sidebar