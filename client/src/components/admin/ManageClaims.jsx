import AdminSidebar from "./AdminSidebar";
import { useEffect, useState } from "react";

import {
  getClaims,
  approveClaim,
  rejectClaim,
} from "../../services/itemService";

export default function ManageClaims() {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      const data = await getClaims();
      setClaims(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveClaim(id);

      alert("Claim approved");

      fetchClaims();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectClaim(id);

      alert("Claim rejected");

      fetchClaims();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8">
          Manage Claims
        </h1>

        {claims.length === 0 ? (
          <p className="text-gray-500">
            No pending claims.
          </p>
        ) : (
          claims.map((claim) => (
            <div
              key={claim.id}
              className="bg-white border rounded-2xl p-6 mb-5"
            >
              <h2 className="text-2xl font-semibold">
                {claim.item_title}
              </h2>

              <p className="mt-3">
                <strong>Claimant:</strong>{" "}
                {claim.claimant}
              </p>

              <p className="mt-2">
                <strong>Message:</strong>{" "}
                {claim.message}
              </p>

              <p className="mt-2">
                <strong>Status:</strong>{" "}
                {claim.status}
              </p>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() =>
                    handleApprove(claim.id)
                  }
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    handleReject(claim.id)
                  }
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}