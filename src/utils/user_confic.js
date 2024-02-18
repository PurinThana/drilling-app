// // // Import necessary Firebase modules
import '../firebaseConfic'; // Add this line prevent firebase not loading error
import { getFirestore, addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
const db = getFirestore(); 

const addUser = async (username, email, password) => {
    const usersCollectionRef = collection(db, 'drilling_db');
     
    try {
        const newUserDocRef = await addDoc(usersCollectionRef, {
            username: username,
            email: email,
            password: password,
            user_db: [],
        });

        console.log('New user added with ID:', newUserDocRef.id);
    } catch (error) {
        console.error('Error adding user:', error);
    }
};

// Function to get a user by username
const getUserByUsername = async (username) => {
    const db = getFirestore();  
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

const getUserByID = async (ID) => {
    const db = getFirestore();
    const usersCollectionRef = collection(db, 'drilling_db');
    const userDocRef = doc(usersCollectionRef, ID);

    try {
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
            // Access the document data using userDocSnapshot.data()
  
            return userDocSnapshot.data();
        } else {
            console.log('Document not found');
        }
    } catch (error) {
        console.error('Error querying user by ID:', error);
    }
};

// Function to update a user's database field
const updateFieldInDoc = async ( docId, fieldName, updatedValue) => {
    const db = getFirestore();
    const docRef = doc(db, 'drilling_db', docId);

    try {
        // Get the current data in the document
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            // Retrieve the current data
            const data = docSnapshot.data();

            // Check if the field to be updated exists in the document
            if (fieldName in data) {
                // Update the specified field with the new value
                await updateDoc(docRef, {
                    [fieldName]: updatedValue,
                });

                console.log(`Field '${fieldName}' in document '${docId}' updated successfully`);
            } else {
                console.log(`Field '${fieldName}' does not exist in document '${docId}'`);
            }
        } else {
            console.log(`Document with ID '${docId}' does not exist`);
        }
    } catch (error) {
        console.error(`Error updating field in document '${docId}':`, error);
    }
};
const getFieldFromDoc = async ( docId, fieldName) => {
    const db = getFirestore();
    const docRef = doc(db, 'drilling_db', docId);

    try {
        // Get the current data in the document
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            // Retrieve the current data
            const data = docSnapshot.data();

            // Check if the field exists in the document
            if (fieldName in data) {
                // Return the value of the specified field
                // console.log(data[fieldName]);
                return data[fieldName];
            } else {
                console.log(`Field '${fieldName}' does not exist in document '${docId}'`);
            }
        } else {
            console.log(`Document with ID '${docId}' does not exist`);
        }
    } catch (error) {
        console.error(`Error retrieving field from document '${docId}':`, error);
    }
};
const updateUser = async (userId, newUsername) => {
    const userDocRef = doc(db, 'users', userId);

    try {
        await updateDoc(userDocRef, {
            username: newUsername,
        });

    } catch (error) {
        console.error('Error updating user:', error);
    }
};

// Function to delete a user
const deleteUser = async (userId) => {
    const userDocRef = doc(db, 'users', userId);

    try {
        await deleteDoc(userDocRef);

       
    } catch (error) {
        console.error('Error deleting user:', error);
    }
};

// Export the functions to be used in other files
export {
    addUser,
    getUserByUsername,
    updateFieldInDoc,
    updateUser,
    deleteUser,
    getUserByID,
    getFieldFromDoc
};


// getUserByUsername('purin');