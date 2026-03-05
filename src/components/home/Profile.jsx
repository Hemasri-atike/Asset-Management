function Profile() {
  const username = localStorage.getItem("username") || "User";

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Profile Page</h1>
      <p>Username: {username}</p>
    </div>
  );
}

export default Profile;