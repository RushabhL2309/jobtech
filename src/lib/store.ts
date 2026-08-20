import { jobs as seedJobs } from "@/data/site";
import { getDb } from "@/lib/mongo";
import type { Application, Enquiry, Job } from "@/lib/types";

function nid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function seededJobs(): Job[] {
  return seedJobs.map((job, i) => ({
    id: `seed-${i + 1}`,
    ...job,
  }));
}

function plainJob(doc: Job): Job {
  return {
    id: String(doc.id),
    title: String(doc.title),
    location: String(doc.location),
    type: String(doc.type),
    industry: String(doc.industry),
    pay: String(doc.pay),
    summary: String(doc.summary ?? ""),
  };
}

function plainEnquiry(doc: Enquiry): Enquiry {
  return {
    id: String(doc.id),
    name: String(doc.name),
    company: String(doc.company ?? ""),
    phone: String(doc.phone),
    email: String(doc.email ?? ""),
    city: String(doc.city ?? ""),
    service: String(doc.service ?? ""),
    workforce: String(doc.workforce ?? ""),
    message: String(doc.message ?? ""),
    createdAt: String(doc.createdAt),
  };
}

function plainApplication(doc: Application): Application {
  return {
    id: String(doc.id),
    name: String(doc.name),
    phone: String(doc.phone),
    email: String(doc.email ?? ""),
    role: String(doc.role),
    message: String(doc.message ?? ""),
    resumeUrl: String(doc.resumeUrl ?? ""),
    resumeName: String(doc.resumeName ?? ""),
    createdAt: String(doc.createdAt),
  };
}

async function jobsCol() {
  return (await getDb()).collection<Job>("jobs");
}

async function enquiriesCol() {
  return (await getDb()).collection<Enquiry>("enquiries");
}

async function applicationsCol() {
  return (await getDb()).collection<Application>("applications");
}

export async function getJobs(): Promise<Job[]> {
  try {
    const col = await jobsCol();
    const list = await col.find({}).sort({ _id: -1 }).toArray();
    if (list.length) return list.map(plainJob);
    const seed = seededJobs();
    if (seed.length) await col.insertMany(seed);
    return seed.map(plainJob);
  } catch (err) {
    console.error("Mongo getJobs failed:", err);
    return seededJobs();
  }
}

export async function addJob(input: Omit<Job, "id">): Promise<Job> {
  const job: Job = { id: nid(), ...input };
  await (await jobsCol()).insertOne(job);
  return job;
}

export async function deleteJob(id: string): Promise<boolean> {
  const res = await (await jobsCol()).deleteOne({ id });
  return res.deletedCount > 0;
}

export async function getEnquiries(): Promise<Enquiry[]> {
  try {
    return (await enquiriesCol()).find({}).sort({ createdAt: -1 }).toArray().then((rows) => rows.map(plainEnquiry));
  } catch (err) {
    console.error("Mongo getEnquiries failed:", err);
    return [];
  }
}

export async function addEnquiry(input: Omit<Enquiry, "id" | "createdAt">): Promise<Enquiry> {
  const row: Enquiry = { id: nid(), createdAt: new Date().toISOString(), ...input };
  await (await enquiriesCol()).insertOne(row);
  return row;
}

export async function getApplications(): Promise<Application[]> {
  try {
    return (await applicationsCol()).find({}).sort({ createdAt: -1 }).toArray().then((rows) => rows.map(plainApplication));
  } catch (err) {
    console.error("Mongo getApplications failed:", err);
    return [];
  }
}

export async function addApplication(
  input: Omit<Application, "id" | "createdAt">,
): Promise<Application> {
  const row: Application = { id: nid(), createdAt: new Date().toISOString(), ...input };
  await (await applicationsCol()).insertOne(row);
  return row;
}
