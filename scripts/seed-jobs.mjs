import { readFileSync } from "fs";
import { MongoClient } from "mongodb";

function loadEnv() {
  const raw = readFileSync(new URL("../.env", import.meta.url), "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const i = trimmed.indexOf("=");
    if (i === -1) continue;
    const key = trimmed.slice(0, i).trim();
    const val = trimmed.slice(i + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

const jobs = [
  {
    id: "seed-1",
    title: "Front Office Executive",
    location: "Mumbai",
    type: "Full-time",
    industry: "Hospitality",
    pay: "As per industry norms",
    summary:
      "Guest-facing role for hotels and corporate receptions. Shift-based work with structured documentation and payroll support.",
  },
  {
    id: "seed-2",
    title: "Payroll Coordinator",
    location: "Mumbai",
    type: "Full-time",
    industry: "Corporate HR",
    pay: "As per experience",
    summary:
      "Support salary processing, attendance, payslips and employee queries under Jobtech payroll operations.",
  },
  {
    id: "seed-3",
    title: "Compliance Executive",
    location: "Navi Mumbai",
    type: "Full-time",
    industry: "Labour compliance",
    pay: "As per experience",
    summary:
      "Assist with statutory records, returns and audit coordination for client establishments as applicable.",
  },
  {
    id: "seed-4",
    title: "Warehouse Support Staff",
    location: "Panvel",
    type: "Contract",
    industry: "Logistics",
    pay: "As per minimum wages",
    summary:
      "Semi-skilled and support manpower for logistics and warehouse operations in the Panvel / Navi Mumbai belt.",
  },
  {
    id: "seed-5",
    title: "Housekeeping Supervisor",
    location: "Mumbai",
    type: "Full-time",
    industry: "Hospitality",
    pay: "As per industry norms",
    summary:
      "Supervise housekeeping teams for hospitality and facility operations with attendance and statutory documentation.",
  },
  {
    id: "seed-6",
    title: "Back-Office Executive",
    location: "Andheri",
    type: "Full-time",
    industry: "Corporate",
    pay: "As per experience",
    summary:
      "Administrative and back-office support for commercial workplaces, including records and employee coordination.",
  },
  {
    id: "seed-7",
    title: "F&B Steward",
    location: "Mumbai",
    type: "Full-time",
    industry: "Hospitality",
    pay: "As per industry norms",
    summary:
      "Support dining operations in hospitality units with shift-based deployment, attendance tracking and statutory documentation.",
  },
  {
    id: "seed-8",
    title: "Industrial Helper",
    location: "Taloja",
    type: "Contract",
    industry: "Manufacturing",
    pay: "As per minimum wages",
    summary:
      "Semi-skilled support manpower for industrial and warehouse floors, coordinated with payroll and labour compliance.",
  },
];

loadEnv();
const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI missing");
  process.exit(1);
}

const client = new MongoClient(uri);
await client.connect();
const col = client.db("jobtech").collection("jobs");

for (const job of jobs) {
  await col.updateOne({ id: job.id }, { $setOnInsert: job }, { upsert: true });
}

const count = await col.countDocuments();
const titles = await col.find({}, { projection: { title: 1, id: 1, _id: 0 } }).toArray();
console.log(`Jobs in MongoDB: ${count}`);
for (const j of titles) console.log(`- ${j.id}: ${j.title}`);
await client.close();
