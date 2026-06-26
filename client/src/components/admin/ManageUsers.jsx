import AdminSidebar from "./AdminSidebar";

export default function ManageUsers() {
  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-6">
          Manage Users
        </h1>

        <table className="w-full border">
          <thead>
            <tr>
              <th className="border p-3">ID</th>
              <th className="border p-3">Name</th>
              <th className="border p-3">Email</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="border p-3">1</td>
              <td className="border p-3">John Doe</td>
              <td className="border p-3">
                john@email.com
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}