import AdminSidebar from "./AdminSidebar";

export default function ManageReports() {
  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-6">
          Manage Reports
        </h1>

        <div className="bg-white border rounded-2xl p-6">
          <h3 className="font-semibold mb-4">
            iPhone 14 Pro
          </h3>

          <div className="flex gap-3">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
              Approve
            </button>

            <button className="bg-red-600 text-white px-4 py-2 rounded-lg">
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}