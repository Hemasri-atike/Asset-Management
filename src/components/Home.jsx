function Home() {
  const username = localStorage.getItem("username") || "User";

  return (
    <h1 className="text-3xl font-bold">
      Welcome, {username} 
    </h1>
  );
}

export default Home;