import React, { useState } from 'react';
import '../../firebaseConfic'; // Add this line prevent firebase not loading error
import { getFirestore, addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { doc, getDoc, updateDoc } from 'firebase/firestore';

function Confic() {
    const [Usename, setUsername] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [User_db, setUser_db] = useState([]);

    const [Search, setSearch] = useState('');

    const db = getFirestore();
    const resdata = localStorage.getItem('resdata');


    //funtion here......
    const Handleonchang = (e) => {
        if (e.target.name == 'username') {
            setUsername(e.target.value);
        } else if (e.target.name == 'email') {
            setEmail(e.target.value);
        } else if (e.target.name == 'password') {
            setPassword(e.target.value);
        } else if (e.target.name == 'search') {
            setSearch(e.target.value);
        }
        console.log(Search)



    }

    const HandleCreated = (e) => {
        e.preventDefault();
        addUser(Usename, Email, Password);


    }
    const HandleSearch = (e) => {
        e.preventDefault();
        console.log(Search)
        getUserByUsername(Search);
    }
    const HandleUpdate = (e) => {
        e.preventDefault();
        updateUserDbField('purineiei', 'save1', 'resname', 'แม่เมาะ');
    }
    const updateUserDbField = async (username, savename, fieldToBeUpdated, updatedValue) => {
        try {
            // Get the reference to the user document using username
            const userDocRef = doc(db, 'drilling_db', username);

            // Get the reference to the 'user_db' subcollection within the user document
            const userDbRef = doc(userDocRef, 'user_db', savename);

            // Retrieve the current data from the document
            const userDbSnapshot = await getDoc(userDbRef);
            const userData = userDbSnapshot.data();

            // Check if 'userArray' exists and is an array
            const userArray = Array.isArray(userData?.userArray) ? userData.userArray : [];

            // Find the object in the array based on the savename
            const updatedArray = userArray.map(obj => {
                if (obj.savename === savename) {
                    // Update the specific field with the new value
                    obj[fieldToBeUpdated] = updatedValue;
                }
                return obj;
            });

            // Update the entire array in Firestore
            await updateDoc(userDbRef, { userArray: updatedArray });

            console.log('User DB field updated successfully');
        } catch (error) {
            console.error('Error updating user DB field:', error);
        }
    };

    const getUserByUsername = async (username) => {
        const usersCollectionRef = collection(db, 'drilling_db');
        const userQuery = query(usersCollectionRef, where('username', '==', username));

        try {
            const querySnapshot = await getDocs(userQuery);

            querySnapshot.forEach((doc) => {
                // Access the document data using doc.data()
                console.log(doc.id, ' => ', doc.data());
            });
        } catch (error) {
            console.error('Error querying user by username:', error);
        }
    };

    const addUser = async (username, email, password) => {
        const usersCollectionRef = collection(db, 'drilling_db');

        try {
            const newUserDocRef = await addDoc(usersCollectionRef, {
                username: username,
                email: email,
                password: password,
                user_db: []
            });

            console.log('New user added with ID:', newUserDocRef.id);
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    // Function to update a user's username
    const updateUser = async (userId, newUsername) => {
        const userDocRef = doc(db, 'users', userId);

        try {
            await updateDoc(userDocRef, {
                username: newUsername,
            });

            console.log('User updated successfully');
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    // Function to delete a user
    const deleteUser = async (userId) => {
        const userDocRef = doc(db, 'users', userId);

        try {
            await deleteDoc(userDocRef);

            console.log('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };


    return (
        <div className="App">
            <h4>Fetch data</h4>
            <form action="" >
                <input type="text" name='search' placeholder='enter username' onChange={(e) => Handleonchang(e)} />
                <button onClick={HandleSearch}>search</button>
            </form>

            <form action="" >
                <input type="text" name='username' placeholder='enter username' onChange={(e) => Handleonchang(e)} />
                <input type="text" name='email' placeholder='enter email' onChange={(e) => Handleonchang(e)} />
                <input type="text" name='password' placeholder='enter password' onChange={(e) => Handleonchang(e)} />

                <button onClick={HandleCreated}>Create</button>
            </form>
            <button onClick={HandleUpdate}>Test</button>
        </div>
    );

}

export default Confic;

// [
//     {
//         savename: "save1",
//         resname: "eiei",
//         casingData: "hoya"
//     }
//     {
//         savename: "save2",
//         resname: "uiui",
//         casingData: "heelo"
//     }
// ]