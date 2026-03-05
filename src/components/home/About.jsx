

function About() {
  const username = localStorage.getItem("username") || "User";

  return (
    <div>
     

      <div className="p-10 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="text-gray-700">
          We are a growing company focused on building amazing web applications
          using React and modern technologies.
        </p>
      </div>
    </div>
  );
}

export default About;