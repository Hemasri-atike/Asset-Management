
import { FaBell } from "react-icons/fa";

function Notifications() {
  const username = localStorage.getItem("username") || "User";

  const notifications = [
    "Your password was changed successfully.",
    "New user registered.",
    "System maintenance scheduled for tomorrow.",
  ];

  return (
    <div className="flex h-screen">
    

      <div className="flex-1 flex flex-col">
     

        <div className="p-8 bg-gray-100 flex-1 overflow-auto">
          <h1 className="text-2xl font-bold mb-6">Notifications</h1>

          <div className="space-y-4">
            {notifications.map((note, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-xl shadow flex items-center gap-4 hover:shadow-lg transition"
              >
                <FaBell className="text-yellow-500" />
                <p>{note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;