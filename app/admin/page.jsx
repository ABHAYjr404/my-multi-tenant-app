"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const { data: session } = useSession();
  const [credentials, setCredentials] = useState({ userId: "", password: "" });
  const [error, setError] = useState(null);
  const [schoolData, setSchoolData] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "", contact: "" });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    const res = await signIn("credentials", {
      redirect: false,
      userId: credentials.userId,
      password: credentials.password,
    });
    if (res?.error) {
      setError("Invalid credentials");
    }
  };

  // Fetch school data once the session is available and has a valid schoolId
  useEffect(() => {
    async function fetchSchoolData() {
      if (session?.user?.schoolId) {
        setLoading(true);
        try {
          const response = await fetch(`/api/schools/${session.user.schoolId}`);
          if (!response.ok) throw new Error("Failed to fetch school data");
          const data = await response.json();
          setSchoolData(data);
          setFormData({
            name: data.name,
            description: data.description,
            contact: data.contact,
          });
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchSchoolData();
  }, [session]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch(`/api/schools/${session.user.schoolId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.error || "Update failed");
      } else {
        setSchoolData(result);
        alert("School updated successfully!");
      }
    } catch (err) {
      console.error("Error updating school:", err);
      setError("Update failed!");
    }
  };

  // If not logged in, show the login form
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
        <h1 className="text-3xl font-bold mb-6">Admin Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          <input
            type="text"
            placeholder="Admin Email"
            value={credentials.userId}
            onChange={(e) =>
              setCredentials({ ...credentials, userId: e.target.value })
            }
            className="w-full p-3 border rounded shadow-sm"
          />
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            className="w-full p-3 border rounded shadow-sm"
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  // After login, display the admin dashboard with edit form
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Welcome, {session.user.name} (Admin)</h1>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {loading ? (
          <p className="text-center text-xl">Loading school data...</p>
        ) : schoolData ? (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Edit {schoolData.name}</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-gray-700">School Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="mt-1 w-full p-3 border rounded shadow-sm"
                />
              </div>
              <div>
                <label className="block text-gray-700">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="mt-1 w-full p-3 border rounded shadow-sm"
                />
              </div>
              <div>
                <label className="block text-gray-700">Contact</label>
                <input
                  type="text"
                  value={formData.contact}
                  onChange={(e) =>
                    setFormData({ ...formData, contact: e.target.value })
                  }
                  className="mt-1 w-full p-3 border rounded shadow-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-green-600 text-white rounded shadow hover:bg-green-700 transition"
              >
                Update School Info
              </button>
            </form>
          </div>
        ) : (
          <p className="text-center text-xl">No school data found.</p>
        )}
      </div>
    </div>
  );
}
