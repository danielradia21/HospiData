

export function AdminProfile ({admin}) {
    return <div className="admin-profile flex column justify-center ">
               <div className="admin-profile-img-continer">
                 <img src={admin.imgUrl} alt="admin.png" />
               </div>
            <h1>{admin.fullname}</h1>
            <p>Admin</p>
        </div>
}