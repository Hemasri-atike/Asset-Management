
import { FaUserCircle } from "react-icons/fa";

function Messages() {
  const username = localStorage.getItem("username") || "User";

  const messages = [
    { id: 1, name: "John Doe", text: "Hey! How are you?" },
    { id: 2, name: "Admin", text: "Your account was updated successfully." },
    { id: 3, name: "Support", text: "Let us know if you need help." },
  ];

  return (
    <div className="flex h-screen">
   

      <div className="flex-1 flex flex-col">
    

        <div className="p-8 bg-gray-100 flex-1 overflow-auto">
          <h1 className="text-2xl font-bold mb-6">Messages</h1>

          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition flex items-start gap-4"
              >
                <FaUserCircle size={40} className="text-blue-600" />
                <div>
                  <h3 className="font-semibold">{msg.name}</h3>
                  <p className="text-gray-600">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;