import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");
function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const sendMessage = () => {
    socket.emit("sendMessage", { message: message });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);
  return (
    <>
      <input
        placeholder="Message..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
      <h1>{messageReceived}</h1>
    </>
  );
}

export default App;
