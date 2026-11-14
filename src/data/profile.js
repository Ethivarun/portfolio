// Single source of truth for everything shown on the site AND used by the chatbot.
// Edit details here once — every section updates automatically.

export const profile = {
  name: "Madaka Ethivarun",
  shortName: "Varun",
  roles: ["Full Stack Developer", "Frontend Engineer", "Low-Code & Automation Developer"],
  tagline:
    "I build clean, reliable web applications — from React interfaces to APIs, authentication and workflow automation.",
  location: "India",
  openToWork: true,

  email: "varun.madaka@gmail.com",
  phone: "+91 7330920535",
  // TODO: put your real profile URLs here (leave "" to hide a link)
  github: "",
  linkedin: "",

  resume: "/resume1.pdf",
  photo: "/testing.jpg",
  // true when "photo" is a transparent-background PNG (cut-out) → head pops out of the circle
  photoCutout: false,

  about: [
    "I'm a developer who enjoys turning real-world problems into simple, maintainable software. I work across the stack — React on the frontend, Node.js and REST APIs on the backend, and platforms like Form.io, Keycloak and Activepieces to ship faster. I've built complete business applications — e-commerce, LMS, CRM and HRMS — end to end.",
    "I started with a 3-month internship at Stride Future Technology that turned into a full-time role, giving me hands-on experience with production systems, code reviews and team delivery.",
  ],

  stats: [
    { value: "1+", label: "Year building production apps" },
    { value: "10+", label: "Projects built" },
    { value: "4", label: "Business apps — E-com, LMS, CRM, HRMS" },
  ],

  experience: [
    {
      role: "Associate Software Trainee",
      company: "Stride Future Technology",
      period: "Full-time · Present",
      points: [
        "Build frontend components with React, JavaScript, Form.io, HTML and CSS.",
        "Implemented Keycloak single sign-on across multiple micro-frontends.",
        "Automate business workflows (OTP, form submissions, data storage) with Activepieces.",
        "Built full-stack business apps: E-Commerce, LMS, CRM and HRMS portals.",
        "Improve AI chatbot responses and run feature testing before releases.",
      ],
    },
    {
      role: "Software Intern",
      company: "Stride Future Technology",
      period: "3 months",
      points: [
        "Developed custom Form.io components and maintained developer docs in Docusaurus.",
        "Learned production workflows: Git branching, code reviews and API integration.",
      ],
    },
  ],

  education: {
    degree: "B.Tech — Electronics & Communication Engineering",
    school: "Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology",
    period: "2020 – 2024",
    // TODO: confirm — the old About section said 9.0, the chatbot said 8.2
    cgpa: "8.2",
  },

  certifications: ["Atlassian Jira Fundamentals", "Python Programming"],

  skills: [
    { title: "Frontend", items: ["React", "JavaScript", "HTML", "CSS", "Mantine UI", "Bootstrap"] },
    { title: "Backend", items: ["Node.js", "REST APIs", "PostgREST", "RESTHeart", "MongoDB", "SQL", "Python"] },
    { title: "Platforms", items: ["Form.io", "Keycloak", "Activepieces", "Azure", "Docusaurus"] },
    { title: "Tools", items: ["Git & GitHub", "VS Code", "Jira", "Postman"] },
  ],

  // featured: true → shown as a large card at the top of the Projects section
  // category: used by the filter tabs (Full Stack | Frontend | Automation | Other)
  projects: [
    {
      title: "E-Commerce Platform",
      description:
        "Full-stack store with product catalogue, search & filters, cart, checkout, order tracking and an admin panel for inventory and orders.",
      tech: ["React", "Node.js", "MongoDB", "REST APIs", "Keycloak"],
      highlights: ["Cart & checkout flow", "Admin inventory dashboard", "Role-based auth"],
      tag: "E-Commerce",
      category: "Full Stack",
      featured: true,
      link: "",
    },
    {
      title: "Learning Management System",
      description:
        "LMS for courses, lessons and quizzes with student progress tracking, instructor dashboards and certificate generation.",
      tech: ["React", "Node.js", "MongoDB", "Form.io"],
      highlights: ["Course & quiz builder", "Progress tracking", "Instructor dashboard"],
      tag: "LMS",
      category: "Full Stack",
      featured: true,
      link: "",
    },
    {
      title: "CRM System",
      description:
        "Lead and customer management with a sales pipeline, follow-up reminders and automated email/OTP workflows.",
      tech: ["React", "Node.js", "PostgREST", "Activepieces"],
      highlights: ["Kanban sales pipeline", "Automated follow-ups", "Activity timeline"],
      tag: "CRM",
      category: "Full Stack",
      featured: true,
      link: "",
    },
    {
      title: "HRMS Portal",
      description:
        "HR portal covering employee records, attendance, leave approvals and onboarding forms, secured with SSO.",
      tech: ["React", "Form.io", "Keycloak", "RESTHeart"],
      highlights: ["Leave approval workflow", "Employee self-service", "SSO login"],
      tag: "HRMS",
      category: "Full Stack",
      featured: true,
      link: "",
    },
    {
      title: "SSO with Keycloak",
      description:
        "Single sign-on and token validation shared across multiple micro-frontends, with role-based access.",
      tech: ["Keycloak", "React", "Node.js", "REST"],
      tag: "Auth",
      category: "Full Stack",
      link: "",
    },
    {
      title: "Workflow Automation",
      description:
        "Activepieces flows that automate form submissions, OTP verification and data storage end-to-end.",
      tech: ["Activepieces", "MongoDB", "APIs"],
      tag: "Automation",
      category: "Automation",
      link: "",
    },
    {
      title: "Form.io Custom Components",
      description:
        "Reusable Form.io components: data-source tables, logo uploader and a progress-bar wizard.",
      tech: ["React", "Form.io", "Mantine", "Axios"],
      tag: "Frontend",
      category: "Frontend",
      link: "",
    },
    {
      title: "Developer Docs Portal",
      description:
        "A searchable developer documentation site for the product, built and maintained with Docusaurus.",
      tech: ["Docusaurus", "React", "Markdown"],
      tag: "Docs",
      category: "Frontend",
      link: "",
    },
    {
      title: "Clinic Dashboard",
      description:
        "Multi-tab dashboard with a calendar, doctor management and support modules. Work in progress.",
      tech: ["React", "Bootstrap", "React Calendar"],
      tag: "In progress",
      category: "Frontend",
      link: "",
    },
    {
      title: "River Cleaning Boat",
      description:
        "Bluetooth-controlled, conveyor-based boat prototype that collects plastic waste from lakes and rivers.",
      tech: ["IoT", "Bluetooth", "Embedded"],
      tag: "Hardware",
      category: "Other",
      link: "",
    },
  ],
};
