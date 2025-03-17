import { getSchoolBySubdomain } from "@/lib/db";

export default async function SchoolPage({ params }) {
  const school = params.school;
  const schoolData = await getSchoolBySubdomain(school);

  if (!schoolData) {
    return (
      <div className="container mx-auto p-6">
        <p className="text-red-500">School not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{schoolData.name}</h1>
      <p className="mb-2">{schoolData.description}</p>
      <p className="text-gray-600">Contact: {schoolData.contact}</p>
    </div>
  );
}

