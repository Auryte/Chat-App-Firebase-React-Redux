import firebase from "./services/firebase";
const db = firebase.firestore();

export default class API {
    static createUser = async (user) => {
        try {
            return await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
        }
        catch (err) {
            throw err;
        }
    }

    static updateCurrentUser = async (user, userData) => {
        try {
            // Atnaujinimas lokaliai
            const currentUser = firebase.auth().currentUser;
            const name = `${userData.firstName} ${userData.lastName}`;
            // Atnaujinimas globaliai
            await currentUser.updateProfile({
                displayName: name
            });
        }
        catch (err) {
            throw (err);
        }
    }

    static patchUserDB = async (createdUser, userData) => {
        try {

            return await db.collection("users")
                .doc(createdUser.user.uid)
                .set({
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    uid: createdUser.user.uid,
                    createdAt: new Date(),
                    isOnline: true,
                    email: userData.email,
                    password: userData.password,
                    avatar: ""
                });
        }
        catch (err) {
            throw (err);
        }
    }

    static signInUser = async (userData) => {
        try {
            return await firebase.auth()
                .signInWithEmailAndPassword(userData.email, userData.password)
        } catch (err) {
            throw (err);
        }
    }

    static updateSignedInUser = async (loggedInUser) => {
        await db.collection("users")
            .doc(loggedInUser.user.uid)
            .update({
                isOnline: true,
            })
    }

    static updateLogoutUser = async (uid) => {
        try {
            return await db.collection("users")
                .doc(uid)
                .update({ isOnline: false })
        } catch (err) {
            throw (err);
        }
    }

    static logoutUser = async () => {
        try {
            await firebase.auth().signOut();
        } catch (err) {
            throw (err);
        }
    }
    static updateFile = async (file) => {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        return await fileRef.getDownloadURL();
    }

    static updateUsersAvatar = async (fileUrl, user) => {
        return await db.collection("users").doc(user.uid).update({
            avatar: fileUrl
        });
    }

    static updateUsersData = async (user, firstName, lastName, email, password) => {
        try {
            return await db.collection("users").doc(user.uid).update({
                firstName: firstName || user.firstName,
                lastName: lastName === "" ? user.lastName : lastName,
                email: email === "" ? user.email : email,
                password: password === "" ? user.password : password
            })
        } catch (err) {
            throw (err);
        }
    }

    static reauthenticate = async (user) => {
        const cred = firebase.auth.EmailAuthProvider.credential(
            user.email, user.password);
        return await firebase.auth().currentUser.reauthenticateWithCredential(cred);
    }

    static changePassword = async (user, newPassword) => {
        try {
            await this.reauthenticate(user)
            await firebase.auth().currentUser.updatePassword(newPassword);

        } catch (error) { throw error; }
    }

    static changeEmail = async (newEmail) => {
        try {
            await firebase.auth().currentUser.updateEmail(newEmail);
            console.log("Email updated!");

        } catch (error) {
            throw new Error("Neteisingas el. paštas");
        }
    }

    static updateUserDisplayName = async (user, firstName, lastName) => {
        try {
            const currentUser = firebase.auth().currentUser;
            const name = `${firstName === "" ? user.firstName : firstName} ${lastName === "" ? user.lastName : lastName}`;
            return await currentUser.updateProfile({
                displayName: name
            });
        }
        catch (err) {
            throw (err);
        }
    }

    static getRealTimeUsersOnSnapshot = (uid, callback) => {
        db.collection("users")
            .onSnapshot((querySnapshot) => {
                const users = [];
                const authenticatedUser = []
                querySnapshot.forEach((doc) => {

                    if (doc.data().uid !== uid) {
                        users.push(doc.data());
                    }
                    if (doc.data().uid === uid) {
                        authenticatedUser.push(doc.data());
                    }
                })
                callback(users, authenticatedUser);
            })
    }

    static updateUsermessage = async (msgObj) => {
        try {
            const messageAdded = await db.collection("conversations")
                .add({
                    ...msgObj,
                    isView: false,
                    createdAt: new Date(),
                })
            return db.collection("conversations").doc(messageAdded.id).update({
                id: messageAdded.id
            })
            // return db.doc("conversations/" + messageAdded.id).update({
            //     id: messageAdded.id
            // })
        } catch (error) { throw error; }
    }

    
    //chatUsers
    static getRealTimeConversationsOnSnapshot = (user, callback) => {
        db.collection("conversations")
            .where("user_uid_1", "in", [user.uid_1, user.uid_2]) //chatUsers
            .orderBy("createdAt", "asc")
            .onSnapshot((querySnapshot) => {
                const conversations = [];
                querySnapshot.forEach((doc) => {
                    console.log(doc.id)
                    if ((doc.data().user_uid_1 === user.uid_1 && doc.data().user_uid_2 === user.uid_2)
                        ||
                        (doc.data().user_uid_1 === user.uid_2 && doc.data().user_uid_2 === user.uid_1)
                    ) {
                        conversations.push(doc.data());
                    }
                })
                callback(conversations);
            })
    }

}