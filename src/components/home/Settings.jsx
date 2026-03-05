function Settings() {
  const username = localStorage.getItem("username") || "User";

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Settings Page</h1>
      <p>Settings for {username}</p>
    </div>
  );
}

export default Settings;