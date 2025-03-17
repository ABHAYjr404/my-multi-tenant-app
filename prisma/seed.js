const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs'); // For hashing passwords

async function main() {
    // Fetch an existing school ID
    const school = await prisma.school.findFirst();
    
    if (!school) {
        console.log("No school found. Please add a school first.");
        return;
    }

    // Insert Profile Data
    await prisma.profile.create({
        data: {
            userId: "admin@school2.com",
            name: "Admin User 2",
            password: await bcrypt.hash("admin", 10), // Hash password
            role: "admin",
            schoolId: school.id, // Associate with a school
        }
    });

    console.log("Profile added successfully!");
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
