function Profile() {
  const username = localStorage.getItem("username") || "User";

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Profile Page</h1>
      <p>Username: {username}</p>
      <h2>hello shravani</h2>
    </div>
  );
}

export default Profile;