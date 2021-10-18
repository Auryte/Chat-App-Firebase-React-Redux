import styles from "./styles.module.css";


const User = ({user, onClick}) => {

    console.log(user);
    return (
        <div onClick={()=> onClick(user)} className={styles.UserInfo}>
            
            {user.avatar !== ""
                    ? <img className={styles.UserDisplayAvatar} src={user.avatar} alt={user.firstName} />
                    : <div className={styles.UserDisplayAvatar}>
                    <p>{user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase()}</p>
                </div>
                }

            <div className={styles.UserDisplayName}>
                <span>{user.firstName} {user.lastName}</span>
                <span className={user.isOnline ? styles.onlineStatus : styles.off}></span>
            </div>
        </div>
    )
}
export default User;