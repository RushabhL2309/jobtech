import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { jobs as seedJobs } from "@/data/site";
import type { Application, Enquiry, Job } from "@/lib/types";

const DATA_DIR = path.join(process.cwd(), "data");

function nid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

async function ensureDir() {
  await mkdir(DATA_DIR, { recursive: true });
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  await ensureDir();
  try {
    const raw = await readFile(path.join(DATA_DIR, file), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(file: string, value: unknown) {
  await ensureDir();
  await writeFile(path.join(DATA_DIR, file), JSON.stringify(value, null, 2), "utf8");
}

function seededJobs(): Job[] {
  return seedJobs.map((job, i) => ({
    id: `seed-${i + 1}`,
    ...job,
  }));
}

export async function getJobs(): Promise<Job[]> {
  const list = await readJson<Job[]>("jobs.json", []);
  if (list.length) return list;
  const seed = seededJobs();
  await writeJson("jobs.json", seed);
  return seed;
}

export async function addJob(input: Omit<Job, "id">): Promise<Job> {
  const list = await getJobs();
  const job: Job = { id: nid(), ...input };
  list.unshift(job);
  await writeJson("jobs.json", list);
  return job;
}

export async function deleteJob(id: string): Promise<boolean> {
  const list = await getJobs();
  const next = list.filter((j) => j.id !== id);
  if (next.length === list.length) return false;
  await writeJson("jobs.json", next);
  return true;
}

export async function getEnquiries(): Promise<Enquiry[]> {
  return readJson<Enquiry[]>("enquiries.json", []);
}

export async function addEnquiry(input: Omit<Enquiry, "id" | "createdAt">): Promise<Enquiry> {
  const list = await getEnquiries();
  const row: Enquiry = { id: nid(), createdAt: new Date().toISOString(), ...input };
  list.unshift(row);
  await writeJson("enquiries.json", list);
  return row;
}

export async function getApplications(): Promise<Application[]> {
  return readJson<Application[]>("applications.json", []);
}

export async function addApplication(
  input: Omit<Application, "id" | "createdAt">,
): Promise<Application> {
  const list = await getApplications();
  const row: Application = { id: nid(), createdAt: new Date().toISOString(), ...input };
  list.unshift(row);
  await writeJson("applications.json", list);
  return row;
}
