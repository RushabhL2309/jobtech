import lobby from "@/assets/lobby.jpg";
import dining from "@/assets/dining.jpg";
import banquet from "@/assets/banquet.jpg";
import spa from "@/assets/spa.jpg";
import pool from "@/assets/pool.jpg";
import exterior from "@/assets/hero-exterior.jpg";
import suite from "@/assets/room-suite.jpg";
import deluxe from "@/assets/room-deluxe.jpg";
import officeMeeting from "@/assets/office-meeting.jpg";
import interview from "@/assets/interview.jpg";
import meetingTable from "@/assets/meeting-table.jpg";
import hospitalityStaff from "@/assets/hotel-lobby-people.jpg";
import officePeople from "@/assets/office-people.jpg";

const src = (img: { src: string }) => img.src;

export const photos = {
  lobby: src(lobby),
  dining: src(dining),
  banquet: src(banquet),
  spa: src(spa),
  pool: src(pool),
  exterior: src(exterior),
  suite: src(suite),
  deluxe: src(deluxe),
  officeMeeting: src(officeMeeting),
  interview: src(interview),
  meeting: src(meetingTable),
  hospitalityStaff: src(hospitalityStaff),
  officePeople: src(officePeople),
};

export const serviceVisuals: Record<
  string,
  { tint: string; iconBg: string; photo: string }
> = {
  "manpower-staffing": {
    tint: "from-violet-500/15 to-brand/10",
    iconBg: "bg-violet-600",
    photo: photos.officePeople,
  },
  "payroll-management": {
    tint: "from-amber-400/20 to-orange-100",
    iconBg: "bg-amber-500",
    photo: photos.officeMeeting,
  },
  "labour-law-compliance": {
    tint: "from-teal-400/20 to-cyan-50",
    iconBg: "bg-teal-600",
    photo: photos.meeting,
  },
  "compliance-audit": {
    tint: "from-rose-400/20 to-pink-50",
    iconBg: "bg-rose-500",
    photo: photos.interview,
  },
  "hr-outsourcing": {
    tint: "from-indigo-400/20 to-violet-50",
    iconBg: "bg-indigo-600",
    photo: photos.officePeople,
  },
  "labour-law-consulting": {
    tint: "from-sky-400/20 to-blue-50",
    iconBg: "bg-sky-600",
    photo: photos.meeting,
  },
};

export const industryVisuals: Record<
  string,
  { photo: string; accent: string; overlay: string }
> = {
  corporate: {
    photo: photos.officePeople,
    accent: "bg-indigo-600",
    overlay: "from-indigo-950/90 via-brand/45 to-transparent",
  },
  hospitality: {
    photo: photos.hospitalityStaff,
    accent: "bg-violet-600",
    overlay: "from-[#2a1658]/92 via-violet-800/40 to-transparent",
  },
  "logistics-shipping": {
    photo: photos.officeMeeting,
    accent: "bg-teal-600",
    overlay: "from-teal-950/90 via-cyan-900/35 to-transparent",
  },
  manufacturing: {
    photo: photos.meeting,
    accent: "bg-amber-600",
    overlay: "from-amber-950/85 via-orange-900/30 to-transparent",
  },
  education: {
    photo: photos.interview,
    accent: "bg-sky-600",
    overlay: "from-sky-950/90 via-blue-900/35 to-transparent",
  },
  government: {
    photo: photos.officePeople,
    accent: "bg-rose-600",
    overlay: "from-rose-950/88 via-violet-900/35 to-transparent",
  },
};
