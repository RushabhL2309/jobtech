export type Job = {
  id: string;
  title: string;
  location: string;
  type: string;
  industry: string;
  pay: string;
  summary: string;
};

export type Enquiry = {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  city: string;
  service: string;
  workforce: string;
  message: string;
  createdAt: string;
};

export type Application = {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: string;
  message: string;
  resumeUrl: string;
  resumeName: string;
  createdAt: string;
};
