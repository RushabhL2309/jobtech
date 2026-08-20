export const servicePages: Record<
  string,
  { sections: { title: string; body: string }[]; faqs?: { q: string; a: string }[] }
> = {
  "manpower-staffing": {
    sections: [
      {
        title: "Overview",
        body: "Jobtech provides recruitment and manpower staffing for skilled, semi-skilled and unskilled roles. Deployment is structured around each client's operational environment, documentation and supervision requirements.",
      },
      {
        title: "Skilled & Semi-Skilled Manpower",
        body: "We support operational and technical support roles according to the client's job descriptions, shift patterns and workplace standards.",
      },
      {
        title: "Support & Administrative Staff",
        body: "Typical support categories include pantry staff, back-office executives, helpers and receptionists, along with other administrative manpower as specified in the service scope.",
      },
      {
        title: "Recruitment Process",
        body: "Sourcing, screening, documentation checks and client coordination precede deployment so that personnel match the agreed role profile.",
      },
      {
        title: "Workforce Deployment",
        body: "Personnel are deployed according to location, timing and reporting lines agreed with the client team.",
      },
      {
        title: "Employee Documentation",
        body: "Onboarding records, identity and statutory documentation are coordinated as part of workforce administration.",
      },
      {
        title: "Client Coordination",
        body: "We work with client supervisors on attendance, replacements and day-to-day workforce issues.",
      },
      {
        title: "Industries Served",
        body: "Staffing support is provided across corporate, hospitality, logistics and shipping, manufacturing, education and government-related establishments.",
      },
    ],
    faqs: [
      {
        q: "What types of manpower does Jobtech deploy?",
        a: "Skilled, semi-skilled and unskilled manpower, including pantry staff, back-office executives, helpers and receptionists, based on the client's requirement.",
      },
      {
        q: "Do you only serve hospitality?",
        a: "Hospitality is one industry we serve. We also support corporate, logistics, manufacturing, education and public-sector workplaces.",
      },
    ],
  },
  "payroll-management": {
    sections: [
      {
        title: "Payroll Processing",
        body: "Salary processing is coordinated from attendance and approved inputs so that payroll cycles remain structured and auditable.",
      },
      {
        title: "Salary & Wage Administration",
        body: "Wage administration follows the client's pay structure and applicable statutory deductions for the establishment.",
      },
      {
        title: "Leave Management",
        body: "Leave records are administered alongside attendance so payroll reflects approved leave as per policy.",
      },
      {
        title: "Payslip Management",
        body: "Payslips are generated as part of the payroll cycle for employee records and queries.",
      },
      {
        title: "Salary Disbursement",
        body: "Disbursement is coordinated according to the agreed payroll calendar and banking instructions.",
      },
      {
        title: "Employee Salary Support",
        body: "Queries on payslips, attendance and deductions are handled through a defined support process.",
      },
      {
        title: "Full & Final Settlement",
        body: "Exit processing includes full and final settlement calculations and related documentation such as termination letters where required.",
      },
    ],
  },
  "labour-law-compliance": {
    sections: [
      {
        title: "How we present labour laws",
        body: "The following areas are commonly part of workforce compliance in India. Jobtech supports the requirements that apply to the client's establishment — we do not claim that every statute applies to every business.",
      },
      {
        title: "EPF Compliance",
        body: "Provident fund registrations, contributions, records and returns as applicable to covered employees and establishments.",
      },
      {
        title: "ESIC Compliance",
        body: "ESIC contributions and related documentation where the establishment and employees fall under coverage.",
      },
      {
        title: "Professional Tax",
        body: "Professional tax registrations, deductions and filings as applicable in Maharashtra.",
      },
      {
        title: "Labour Welfare Fund",
        body: "Labour welfare fund contributions and records where the client's establishment is required to comply.",
      },
      {
        title: "Minimum Wages",
        body: "Wage administration aligned to applicable minimum wage notifications for the relevant scheduled employment.",
      },
      {
        title: "Bonus & Gratuity",
        body: "Support on bonus and gratuity processes where these statutes apply to the workforce in scope.",
      },
      {
        title: "Contract Labour Compliance",
        body: "Documentation and process support for contract labour arrangements as applicable to the principal employer and contractor relationship.",
      },
      {
        title: "Shops & Establishments Compliance",
        body: "Support relating to Shops and Establishments requirements for commercial workplaces that fall under the Act.",
      },
      {
        title: "Factory Compliance",
        body: "Where the workplace is a factory, compliance support is scoped to factory-related statutory requirements.",
      },
      {
        title: "Payment of Wages",
        body: "Payroll and records aligned to payment-of-wages obligations for covered employees.",
      },
      {
        title: "Maternity Benefit",
        body: "Guidance and process support on maternity benefit provisions as applicable.",
      },
      {
        title: "Apprenticeship Compliance",
        body: "Support where apprenticeship arrangements form part of the client's workforce plan.",
      },
    ],
  },
  "compliance-audit": {
    sections: [
      {
        title: "Current Compliance Assessment",
        body: "We review the current state of statutory processes for the workforce in scope, in coordination with client teams.",
      },
      {
        title: "Statutory Documentation Review",
        body: "Registers, returns, challans and related records are reviewed against the applicable compliance calendar.",
      },
      {
        title: "Employee Records Review",
        body: "Employee files and payroll-linked records are checked for completeness as part of the audit.",
      },
      {
        title: "Compliance Gap Identification",
        body: "Gaps and discrepancies are reported so that client teams can prioritise corrective action.",
      },
      {
        title: "Corrective Action",
        body: "We support the client in closing identified gaps through documentation and process updates.",
      },
      {
        title: "Monthly / Quarterly Reviews",
        body: "Audits can be structured as quarterly or yearly reviews, with monthly reporting where agreed in the service scope.",
      },
      {
        title: "Compliance Reporting",
        body: "Reports summarise findings, discrepancies and follow-up items for in-house stakeholders.",
      },
    ],
  },
  "hr-outsourcing": {
    sections: [
      {
        title: "Recruitment",
        body: "Hiring support is included where HR operations are outsourced as part of workforce management.",
      },
      {
        title: "Employee Documentation",
        body: "Onboarding and statutory documents are maintained in a structured file process.",
      },
      {
        title: "Payroll",
        body: "Salary processing sits inside the same operating model as attendance and employee support.",
      },
      {
        title: "Leave Management",
        body: "Leave is administered against policy and reflected in payroll inputs.",
      },
      {
        title: "Attendance",
        body: "Attendance data is coordinated with the client's site supervision.",
      },
      {
        title: "Employee Support",
        body: "Day-to-day employee queries are handled through an agreed helpdesk-style process.",
      },
      {
        title: "Statutory Compliance",
        body: "Applicable contributions, returns and registers are managed as part of the outsourced HR desk.",
      },
      {
        title: "Full & Final Settlement",
        body: "Exits include F&F calculation and related letters as required.",
      },
      {
        title: "HR Administration",
        body: "The objective is structured supervision of workforce administration without requiring the client to run every HR process in-house.",
      },
    ],
  },
  "labour-law-consulting": {
    sections: [
      {
        title: "Labour Law Advisory",
        body: "Practical opinions on labour-related questions affecting the client's workforce and contracts.",
      },
      {
        title: "Day-to-Day HR Guidance",
        body: "Guidance on routine HR and labour issues that arise on site and in payroll cycles.",
      },
      {
        title: "Regulatory Updates",
        body: "Communication of relevant amendments and updates that affect the client's compliance calendar.",
      },
      {
        title: "Compliance Interpretation",
        body: "Help interpreting how a requirement applies to a specific establishment, rather than generic checklists alone.",
      },
      {
        title: "Documentation Guidance",
        body: "Advice on registers, letters and records that typically accompany statutory processes.",
      },
      {
        title: "Forms & Returns",
        body: "Support on forms and returns associated with labour compliance filings.",
      },
      {
        title: "Compliance Support",
        body: "Consulting can sit alongside staffing, payroll and audit retainers where the client needs an ongoing advisory relationship.",
      },
    ],
  },
};

export const industryPages: Record<string, string> = {
  corporate:
    "Corporate and commercial workplaces typically require back-office, reception, pantry and facilities-related manpower together with payroll and statutory administration. Jobtech supports these requirements through staffing, HR outsourcing and compliance processes aligned to office establishments.",
  hospitality:
    "Hospitality operations need dependable guest-facing and back-of-house manpower, attendance discipline and payroll that can handle shifts. Jobtech provides operational manpower and HR support for hotels and related hospitality businesses as part of a broader workforce management model — not as a standalone facility-management catalogue.",
  "logistics-shipping":
    "Logistics and shipping workplaces — including terminals and related operations in Navi Mumbai and Panvel — often need industrial and support manpower plus documentation for contract labour and payroll. Jobtech's client experience includes organisations operating in this belt.",
  manufacturing:
    "Industrial sites require skilled, semi-skilled and support manpower with wage and factory-related compliance scoped to the establishment. Jobtech supports industrial manpower and statutory processes as applicable.",
  education:
    "Educational institutions need structured staffing and workforce administration that fits academic calendars and establishment rules. Jobtech provides staffing and HR support for institutions, including experience connected with the University of Mumbai as listed in our profile.",
  government:
    "Government and public-sector organisations operate in regulated environments. Jobtech provides structured workforce and compliance support according to the contract and statutory framework that applies — without overstating coverage.",
};
