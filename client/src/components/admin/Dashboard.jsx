import AdminSidebar from "./AdminSidebar";

export default function Dashboard() {
  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8">
          Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white border rounded-2xl p-6">
            <h3 className="text-gray-500">
              Total Users
            </h3>

            <p className="text-4xl font-bold">
              120
            </p>
          </div>

          <div className="bg-white border rounded-2xl p-6">
            <h3 className="text-gray-500">
              Total Reports
            </h3>

            <p className="text-4xl font-bold">
              85
            </p>
          </div>

          <div className="bg-white border rounded-2xl p-6">
            <h3 className="text-gray-500">
              Pending Claims
            </h3>

            <p className="text-4xl font-bold">
              12
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}