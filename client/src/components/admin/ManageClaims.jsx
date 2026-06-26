import AdminSidebar from "./AdminSidebar";

export default function ManageClaims() {
  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold">
          Manage Claims
        </h1>
      </div>
    </div>
  );
}