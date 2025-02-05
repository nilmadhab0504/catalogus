"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [tasks, setTasks] = useState<any>([]);

  // Fetch all tasks on component mount and periodically every minute
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("/api/get-tasks");
      const data = await response.json();
      console.log(data,"task")
      setTasks(data.tasks);
    };
    fetchTasks();

    const intervalId = setInterval(fetchTasks, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSubmit = async () => {
    const response = await fetch("/api/submit-task", {
      method: "POST",
      body: JSON.stringify({ url }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    const newTask = {
      taskId: data.taskId,
      imageUrl: url,    
      status: 'Pending',
    };

    setTasks((prevTasks: any) => [...prevTasks, newTask]);
    setUrl(""); 
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full space-y-6">
        {/* Input Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Image Task Submission</h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter image URL"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Submit
            </button>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {tasks.length > 0 ? (
            tasks.map((task: any) => (
              <div
                key={task.taskId}
                className="bg-white shadow-lg rounded-lg p-4 border-l-4 border-blue-500"
              >
                <p className="text-lg font-semibold text-gray-700">Task ID: {task.taskId}</p>
                <p className="text-sm text-gray-500">Image URL: <a href={task.imageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{task.imageUrl}</a></p>
                <p className="text-sm font-medium text-gray-600">Status: <span className={`font-bold ${task.status === 'Completed' ? 'text-green-600' : 'text-yellow-500'}`}>{task.status}</span></p>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">
              <p>No tasks submitted yet. Start by adding an image URL above!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
