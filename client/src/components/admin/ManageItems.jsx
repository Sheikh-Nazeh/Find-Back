import AdminSidebar from "./AdminSidebar";

export default function ManageItems() {
  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold">
          Manage Items
        </h1>
      </div>
    </div>
  );
}