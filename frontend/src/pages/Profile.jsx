function Profile() {
  return (
    <div className="container mt-5">

      <h2>My Profile</h2>

      <div className="card p-4 shadow">

        <h4>User Profile</h4>

        <p>Name : Demo User</p>

        <p>Email : demo@gmail.com</p>

        <button className="btn btn-primary">
          Edit Profile
        </button>

      </div>

    </div>
  );
}

export default Profile;