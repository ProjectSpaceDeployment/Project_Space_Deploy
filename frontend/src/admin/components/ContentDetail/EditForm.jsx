import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa"; // Import the close icon
import AxiosInstance from "../../../AxiosInstance";

const EditForm = ({ eventId, onClose, isDarkMode }) => {

  const [event, setEvent] = useState({ name: "", rubrics: [] });

    useEffect(() => {
    if (eventId) {
        AxiosInstance.get(`/assessmentevent/${eventId}/`)
        .then((res) => setEvent(res.data))
        .catch((err) => console.error("Error fetching event:", err));
    }
    }, [eventId]);

    const handleSubmit = async () => {
  try {
    await AxiosInstance.put(`/assessmentevent/${eventId}/update_event_with_rubrics/`, event);
    alert("Event updated successfully!");
    onClose();
  } catch (error) {
    console.error("Error updating event:", error);
    alert("Failed to update event");
  }
};

  

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 ${isDarkMode ? "bg-opacity-80" : "bg-opacity-50"}`}
    >
      <div
        className={`bg-white rounded-lg p-8 shadow-lg max-w-xl w-full ${
          isDarkMode ? "bg-[#02022b] text-white border-2 border-[#5cc800]" : "bg-white text-[#2c3e50] border-2 border-[#5cc800]"
        }`}
        style={{ maxHeight: "90vh", overflowY: "auto", position: "relative" }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500 ${isDarkMode ? 'hover:text-white' : ''} z-10`}
        >
          <FaTimes />
        </button>

        <h2 className="text-3xl font-bold mb-6">Update Assessment Event</h2>

        <div className="mb-6">
            <label className="block text-lg font-medium mb-2">Event Name:</label>
            <input
                type="text"
                value={event.name}
                onChange={(e) => setEvent({ ...event, name: e.target.value })}
                className={`w-full p-3 text-lg border rounded-md focus:outline-none ${
                isDarkMode ? "bg-[#444] text-white" : "bg-[#f1f5f9] text-[#2c3e50]"
                }`}
            />
        </div>
        {event.rubrics.map((rubric) => (
  <div key={rubric.id} className="flex items-center space-x-4 mb-4">
    <input
      type="text"
      value={rubric.name}
      onChange={(e) =>
        setEvent({
          ...event,
          rubrics: event.rubrics.map((r) =>
            r.id === rubric.id ? { ...r, name: e.target.value } : r
          ),
        })
      }
      className={`flex-1 p-3 text-lg border rounded-md ${
        isDarkMode ? "bg-[#444] text-white" : "bg-[#f1f5f9] text-[#2c3e50]"
      }`}
    />

    <input
      type="number"
      value={rubric.max_marks}
      min={1}
      onChange={(e) =>
        setEvent({
          ...event,
          rubrics: event.rubrics.map((r) =>
            r.id === rubric.id ? { ...r, max_marks: parseInt(e.target.value) } : r
          ),
        })
      }
      className={`w-24 p-3 text-lg border rounded-md ${
        isDarkMode ? "bg-[#444] text-white" : "bg-[#f1f5f9] text-[#2c3e50]"
      }`}
    />
  </div>
))}

          {/* Buttons */}
          <div className="mt-6 flex justify-end space-x-4">
            <button
              className={`px-6 py-3 rounded-md font-semibold text-lg ${
                isDarkMode ? "bg-[#707070] text-white hover:bg-[#333]" : "bg-[#707070] text-white hover:bg-[#333]"
              }`}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className={`px-6 py-3 rounded-md font-semibold text-lg ${
                isDarkMode ? "bg-[#5cc800] text-white hover:bg-[#78f709]" : "bg-[#5cc800] text-white hover:bg-[#78f709]"
              }`}
              onClick={handleSubmit} // Handle form submission logic here
            >
              Submit
            </button>
          </div>
      </div>
    </div>
  );
};

export default EditForm;
