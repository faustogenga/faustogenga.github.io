export const portfolioSkills = [
  'React',
  'Next.js',
  'JavaScript',
  'TypeScript',
  'Node.js',
  'MongoDB',
  'Supabase',
  'Vercel',
  'Python',
  'SQL',
  'FastAPI',
  'PyTorch',
  'Firebase',
  'ASP.NET',
  'Power BI',
  'Git',
]

export const portfolioProjects = [
  {
    num: '01',
    title: 'Docto',
    meta: 'Current role',
    iconKey: 'stethoscope',
    cover: '/project-covers/docto.png',
    summary:
      'Contributed to the development of a specialist telehealth platform used by patients, workplaces, and healthcare providers for consultations, specialist bookings, and care journeys.',
    note:
      'Currently working here on React flows and backend API features built on Node.js boilerplate with MongoDB. The platform covers 32 specialties and supports experiences like doctor consults and work injury certificates.',
    tags: ['React', 'Node.js', 'MongoDB', 'API'],
    live: 'https://www.docto.com.au/',
  },
  {
    num: '02',
    title: 'The Net',
    meta: 'Client work',
    iconKey: 'tennis',
    cover: '/project-covers/the-net.png',
    summary:
      'Contributed to the development of a global padel marketplace that connects coaches with clubs, making it easier to discover international opportunities and hire top-tier talent.',
    note:
      'Built with React, Next.js, Vercel, and Supabase. The product stands out because it serves both sides of the marketplace clearly: coaches can find roles and grow internationally, while clubs can post jobs and reach a focused network.',
    tags: ['React', 'Next.js', 'Vercel', 'Supabase'],
    live: 'https://thenet-padel.com/',
  },
  {
    num: '03',
    title: 'LilosRentals',
    meta: 'Friend project',
    iconKey: 'motorcycle',
    cover: '/project-covers/lilos-rentals.png',
    summary:
      'Built a polished rental booking experience for a friend, helping travelers in Tamarindo browse scooters, understand the offer quickly, and reserve with a strong tourism-first UI.',
    note:
      'Built with React, Vercel, and Supabase, including the booking service and supporting reservation flows. The product feels strong because the visual design, location context, and booking journey all work together cleanly.',
    tags: ['React', 'Vercel', 'Supabase', 'Booking'],
    live: 'https://www.lilosrentals.com/',
  },
  {
    num: '04',
    title: 'Animal Image Classification',
    meta: '2024',
    iconKey: 'brain',
    cover: '/animal-classification.png',
    summary:
      'Image classification pipeline for 12 animal classes using deep learning with PyTorch and traditional ML approaches with feature extraction and classical classifiers.',
    note:
      'Complete ML workflow with data analysis, preprocessing, Log Loss evaluation, error analysis, and hyperparameter tuning.',
    tags: ['Python', 'PyTorch', 'ML'],
    github: 'https://github.com/faustogenga/VUB-Machine-Learning-project-Animal-Classification',
  },
  {
    num: '05',
    title: 'AI PDF Inquire',
    meta: '2024',
    iconKey: 'comments',
    cover: '/ai-pdf-inquire.jpg',
    summary:
      'Full-stack PDF assistant that lets users chat with documents, using a React frontend and FastAPI backend to keep answers grounded in uploaded files.',
    note:
      'Built as an AI Planet assignment with retrieval-augmented generation and a deployment split between Netlify and Koyeb.',
    tags: ['React', 'FastAPI', 'RAG'],
    github: 'https://github.com/faustogenga/AI-PDFInquire',
  },
  {
    num: '06',
    title: 'FutStore CR',
    meta: '2023',
    iconKey: 'futbol',
    cover: '/futstore-cr.jpg',
    summary:
      'E-commerce prototype for a soccer store built with React and Firebase, focused on clean product browsing, cart interactions, and reliable data sync.',
    note:
      'College web design project exploring modern store UX and end-to-end shopping flows.',
    tags: ['React', 'Firebase', 'E-commerce'],
    live: 'https://crfutstore.web.app/',
    github: 'https://github.com/faustogenga/Fut-Store-CR',
  },
  {
    num: '07',
    title: 'ULACIT Parking Service',
    meta: '2023',
    iconKey: 'external',
    cover: '/ulacit-parking.jpg',
    summary:
      'Reservation prototype where students book parking spots, combining front-end interactions with PHP and SQL-backed booking and validation flows.',
    note:
      'Front-end demo hosted on Netlify, with the full stack running locally through the provided PHP and SQL files.',
    tags: ['JavaScript', 'PHP', 'SQL'],
    live: 'https://ulacitparking.netlify.app/',
    github: 'https://github.com/faustogenga/ULACIT-Parking-Service',
  },
  {
    num: '08',
    title: 'College Registration API',
    meta: '2022',
    iconKey: 'server',
    cover: '/college-registration-api.jpg',
    summary:
      'ASP.NET Core API with layered architecture, authentication, and Swagger that manages students, courses, and supporting academic entities.',
    note:
      'Collaborative build paired with a JavaScript UI and Xamarin mobile app that consume the same API.',
    tags: ['ASP.NET', 'C#', 'SQL'],
    github: 'https://github.com/faustogenga/WebAPIMatricula_1C2023',
  },
]
