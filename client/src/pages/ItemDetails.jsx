import { useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

import { items } from "../data/items";

export default function ItemDetails() {
  const { id } = useParams();

  const item = items.find(
    (item) => item.id === Number(id)
  );

  if (!item) {
    return (
      <>
        <Navbar />
        <div className="max-w-4xl mx-auto py-20">
          <h1 className="text-3xl font-bold">
            Item Not Found
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
                item.type === "Lost"
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {item.type}
            </span>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {item.title}
            </h1>

            <p className="text-gray-600 mb-8">
              This item was reported through
              Find Back. If you believe this item
              belongs to you, submit a claim request.
            </p>

            <div className="space-y-4 mb-8">
              <div>
                <strong>Location:</strong>{" "}
                {item.location}
              </div>

              <div>
                <strong>Date:</strong>{" "}
                {item.date}
              </div>

              <div>
                <strong>Status:</strong>{" "}
                {item.type}
              </div>
            </div>

            <div className="flex gap-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl">
                Claim Item
              </button>

              <button className="border border-gray-300 px-6 py-3 rounded-xl">
                Contact Reporter
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}