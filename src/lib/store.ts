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
    const seed = seededJobs();
    for (const job of seed) {
      await col.updateOne({ id: job.id }, { $setOnInsert: job }, { upsert: true });
    }
    return col.find({}).sort({ createdAt: -1, _id: -1 }).toArray();
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
    return (await enquiriesCol()).find({}).sort({ createdAt: -1 }).toArray();
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
    return (await applicationsCol()).find({}).sort({ createdAt: -1 }).toArray();
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
