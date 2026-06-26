import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { getAllUsers } from "../../services/authService";

export default function ManageUsers() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex">

      <AdminSidebar />

      <div className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-8">
          Manage Users
        </h1>

        <table className="w-full border">

          <thead className="bg-gray-100">

            <tr>
              <th className="border p-3">Name</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Role</th>
              <th className="border p-3">Joined</th>
            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr key={user.id}>

                <td className="border p-3">
                  {user.full_name}
                </td>

                <td className="border p-3">
                  {user.email}
                </td>

                <td className="border p-3">
                  {user.role}
                </td>

                <td className="border p-3">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}