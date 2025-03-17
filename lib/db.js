import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;
export const db = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

export async function getSchoolBySubdomain(subdomain) {
  return db.school.findUnique({ where: { subdomain } });
}

export async function getSchoolById(id) {
  return db.school.findUnique({ where: { id } });
}

export async function updateSchoolById(id, data) {
  return db.school.update({
    where: { id },
    data,
  });
}
