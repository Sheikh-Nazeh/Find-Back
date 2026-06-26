import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/layout/Navbar";

import {
  getItemById,
  submitClaim,
} from "../services/itemService";

export default function ItemDetails() {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      const data = await getItemById(id);
      setItem(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClaim = async () => {
    try {
      await submitClaim({
        item_id: item.id,
        message,
      });

      alert("Claim submitted successfully");
      setMessage("");

    } catch (error) {
      console.error(error);
      alert("Failed to submit claim");
    }
  };

  if (!item) {
    return (
      <>
        <Navbar />

        <div className="max-w-4xl mx-auto py-20">
          <h1 className="text-3xl font-bold">
            Loading...
          </h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12">

        <div className="grid md:grid-cols-2 gap-10">

          <div>
            <img
              src={item.image}
              alt={item.title}
              className="w-full rounded-3xl"
            />
          </div>

          <div>

            <span
              className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 ${
                item.item_type === "lost"
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {item.item_type}
            </span>

            <h1 className="text-4xl font-bold mb-4">
              {item.title}
            </h1>

            <p className="text-gray-600 mb-8">
              {item.description}
            </p>

            <div className="space-y-3 mb-8">

              <p>
                <strong>Category:</strong> {item.category}
              </p>

              <p>
                <strong>Location:</strong> {item.location}
              </p>

              <p>
                <strong>Date:</strong> {item.reported_date}
              </p>

            </div>

            {item.item_type === "found" && (
  <>
    <textarea
      rows={4}
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Explain why this item belongs to you..."
      className="w-full border rounded-xl p-3 mb-4"
    />

    <button
      onClick={handleClaim}
      className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
    >
      Submit Claim
    </button>
  </>
)}

          </div>

        </div>

      </div>
    </>
  );
}