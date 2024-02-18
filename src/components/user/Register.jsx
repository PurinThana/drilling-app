// Register.js
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2'
import { auth, createUserWithEmailAndPassword } from '../../firebaseConfic';
import { Link, useNavigate } from 'react-router-dom';


import '../../firebaseConfic'; // Add this line prevent firebase not loading error
import { getFirestore, } from "firebase/firestore";
import { doc, setDoc } from 'firebase/firestore';

const Register = () => {
    const db = getFirestore();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordC, setPasswordC] = useState('');


    const handleRegister = async () => {
        if (email === '' || password === '' || passwordC === '') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "กรุณากรอก",
            }).then(() => {
                // ในที่นี้, คุณสามารถทำอะไรก็ตามหลังจากที่ผู้ใช้กดปุ่ม OK ใน SweetAlert
                // เช่น รีเซ็ตค่าหรือทำให้สมบูรณ์ตัวกรอกข้อมูล
            });
        } else {
            if (password === passwordC) {
                try {
                    // Create user in Firebase Authentication
                    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

                    // Extract UID (User ID) from the userCredential
                    const uid = userCredential.user.uid;

                    // Create user document in Firestore with the same UID as the Auth UID
                    const userDocRef = doc(db, "drilling_db", uid);
                    await setDoc(userDocRef, {
                        username: username,
                        email: email,
                        user_db: []
                    });
                    console.log('id', uid);
                    console.log('User registered successfully:', userDocRef.id);

                    // Navigate to login page
                    navigate("/login");
                } catch (error) {
                    console.error('Registration failed:', error.message);

                    // Show error message to the user using SweetAlert
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: error.message,
                    }).then(() => {
                        // Additional actions after the user clicks OK
                    });
                }

            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Password not match!",
                }).then(() => {
                    // ในที่นี้, คุณสามารถทำอะไรก็ตามหลังจากที่ผู้ใช้กดปุ่ม OK ใน SweetAlert
                    // เช่น รีเซ็ตค่าหรือทำให้สมบูรณ์ตัวกรอกข้อมูล
                });
            }
        }

    };


    return (
        <div className='w-75 mx-auto'>
            <h2>Register</h2>
            <Form>
                <Form.Group className="mb-3" >
                    <Form.Label>User name</Form.Label>
                    <Form.Control type="text" placeholder="User name" onChange={(e) => setUsername(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Comfirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Comfirm Password" onChange={(e) => setPasswordC(e.target.value)} required />
                </Form.Group>
            </Form>
            <div className="d-flex">
                <Button variant='success' className='me-2' onClick={handleRegister}>Register</Button>
                <Link to={'/Login'}><Button variant='primary' >Back</Button></Link>
            </div>

        </div>
    );
};

export default Register;
