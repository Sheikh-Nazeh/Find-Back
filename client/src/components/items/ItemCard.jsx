import { MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function ItemCard({ item }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition">
      <Link to={`/item/${item.id}`}>
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-52 object-cover"
        />
      

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-gray-900">
            {item.title}
          </h3>

          <span
            className={`text-xs px-3 py-1 rounded-full ${
              item.type === "Lost"
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {item.type}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <MapPin size={14} />
          {item.location}
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock size={14} />
          {item.date}
        </div>
      </div>
        </Link>
    </div>
  );
}