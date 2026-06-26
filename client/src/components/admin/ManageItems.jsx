import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { getAllItems } from "../../services/itemService";

export default function ManageItems() {

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await getAllItems();
      setItems(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex">

      <AdminSidebar />

      <div className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-8">
          Manage Items
        </h1>

        <table className="w-full border">

          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3">Title</th>
              <th className="border p-3">Category</th>
              <th className="border p-3">Type</th>
              <th className="border p-3">Location</th>
              <th className="border p-3">Status</th>
            </tr>
          </thead>

          <tbody>

            {items.map((item) => (

              <tr key={item.id}>

                <td className="border p-3">
                  {item.title}
                </td>

                <td className="border p-3">
                  {item.category}
                </td>

                <td className="border p-3">
                  {item.type}
                </td>

                <td className="border p-3">
                  {item.location}
                </td>

                <td className="border p-3">
                  {item.status}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}