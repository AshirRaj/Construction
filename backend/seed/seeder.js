// seed/seeder.js
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import { User } from '../models/User.js';
import { Project } from '../models/Project.js';
import { Service } from '../models/Service.js';
import { Testimonial } from '../models/Testimonial.js';
import { QuoteRequest } from '../models/QuoteRequest.js';
import { Message } from '../models/Message.js';
import { Setting } from '../models/Setting.js';

dotenv.config();

const seedProjects = [
  {
    customId: "proj-1",
    name: "Skyline Business Tower",
    location: "Mumbai, India",
    category: "Commercial",
    status: "Completed",
    year: "2025",
    startDate: "2023-03-15",
    completionDate: "2025-01-20",
    duration: "22 Months",
    client: "Horizon Apex Realty",
    budget: "₹45 Cr",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "State-of-the-art 32-story commercial tower engineered with reinforced concrete framing, double-glazed curtain wall facade, smart HVAC, and LEED Gold certification. Designed to withstand extreme wind shear and seismic forces while delivering top-tier operational energy efficiency.",
    scope: [
      "High-Strength Concrete Core (M60 Grade)",
      "Unitized Glass Curtain Wall Facade",
      "Centralized Smart HVAC & Building Management System",
      "3-Level Subterranean Parking Structure with Secant Piling",
      "Rooftop Helipad & Solar Photovoltaic Canopy"
    ],
    highlights: [
      "32 Floors of Grade-A Corporate Office Space",
      "LEED Gold Sustainable Green Building Rating",
      "Over 1.2 Million Safe Man-Hours without LTI",
      "Advanced 3D BIM Structural Clash Resolution"
    ],
    challenges: "Excavating 3 subterranean parking levels adjacent to a high-density transit artery with a high water table required interlocking secant pile shoring, real-time piezometer monitoring, and high-early-strength continuous pours.",
    stats: [
      { label: "Built-up Area", value: "480,000 sq ft" },
      { label: "Concrete Poured", value: "34,500 m³" },
      { label: "Structural Steel", value: "4,800 MT" },
      { label: "Safety Record", value: "Zero Incidents" }
    ]
  },
  {
    customId: "proj-2",
    name: "Green Valley Residence",
    location: "Bangalore, India",
    category: "Residential",
    status: "Completed",
    year: "2024",
    startDate: "2022-08-10",
    completionDate: "2024-11-05",
    duration: "27 Months",
    client: "EcoLiving Group",
    budget: "₹18 Cr",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Luxury gated eco-residential township with 120 contemporary villas featuring integrated solar thermal roof arrays, decentralized rainwater percolation infrastructure, and monolithic seismic-resistant shear foundations.",
    scope: [
      "Monolithic Reinforced Concrete Villa Structures",
      "100% On-Site Solar Rooftop Energy Generation",
      "Decentralized Bio-STP and Rainwater Recharging Wells",
      "Extensive Xeriscape Native Landscaping & Boulevard Roads"
    ],
    highlights: [
      "120 Independent Sustainable Luxury Villas",
      "IGBC Platinum Pre-Certified Community",
      "Zero Waste Discharge Site Management",
      "High-Density Permeable Pavement Network"
    ],
    challenges: "Balancing zero-waste environmental protocols on a sloping red laterite soil topography while coordinating 120 simultaneous villa construction phases within an aggressive handover timeline.",
    stats: [
      { label: "Site Footprint", value: "35 Acres" },
      { label: "Villas Built", value: "120 Units" },
      { label: "Solar Capacity", value: "450 kWp" },
      { label: "Water Harvested", value: "12M L/year" }
    ]
  },
  {
    customId: "proj-3",
    name: "Metro Industrial Logistics Park",
    location: "Hyderabad, India",
    category: "Industrial",
    status: "In Progress",
    year: "2026",
    startDate: "2024-02-01",
    completionDate: "2026-06-30",
    duration: "28 Months",
    client: "Global Logistics Corp",
    budget: "₹62 Cr",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Heavy-duty manufacturing and warehousing complex featuring 500,000 sq ft pre-engineered steel buildings, FM2 floor flatness tolerance for autonomous robotics, and 48 automated hydraulic loading docks.",
    scope: [
      "Clear-Span Pre-Engineered Steel Superstructure",
      "Laser-Guided FM2 Superflat Floor Slab Placement",
      "Heavy Rigid Concrete Aprons for Freight Trucks",
      "Automated High-Expansion Foam Fire Suppression"
    ],
    highlights: [
      "500,000 sq ft Clear-Span Warehouse Space",
      "12m Clear Ceiling Eaves Height",
      "48 Automated Hydraulic Cross-Docks",
      "Heavy Load Tolerance: 8 Tonnes/m²"
    ],
    challenges: "Achieving exacting laser-guided FM2 superflat floor tolerances across massive 50,000 sq ft continuous slab bays while managing rapid diurnal temperature variations.",
    stats: [
      { label: "Covered Area", value: "500,000 sq ft" },
      { label: "Floor Flatness", value: "FM2 High Spec" },
      { label: "Steel Erected", value: "3,200 MT" },
      { label: "Docking Bays", value: "48 Docks" }
    ]
  },
  {
    customId: "proj-4",
    name: "Urban Heights Luxury Apartments",
    location: "Bhubaneswar, India",
    category: "Residential",
    status: "In Progress",
    year: "2026",
    startDate: "2024-05-15",
    completionDate: "2026-12-10",
    duration: "31 Months",
    client: "Kalinga Developers",
    budget: "₹35 Cr",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "High-density 24-floor twin towers featuring architectural fair-faced concrete, cantilevered sky lounges, rooftop infinity pool engineering, and underground dual-deck parking.",
    scope: [
      "Aluminium Formwork High-Rise Construction",
      "Cantilevered Sky Bridge & Lounge Fabrication",
      "Rooftop Infinity Edge Pool Hydro-Insulation",
      "Smart Access Control & Home Automation Ready"
    ],
    highlights: [
      "Twin 24-Floor Luxury Towers (192 Units)",
      "Mivan Aluminium Shuttering Technology",
      "Acoustic Insulation Between Units",
      "Seismic Zone III Compliant Framing"
    ],
    challenges: "Engineering a cantilevered post-tensioned connecting skybridge at the 18th floor linking both residential towers while maintaining strict aerodynamic vibration damping.",
    stats: [
      { label: "Total Units", value: "192 Luxury Apts" },
      { label: "Tower Height", value: "84 Meters" },
      { label: "Formwork Cycle", value: "6 Days/Floor" },
      { label: "Parking Bays", value: "240 Vehicles" }
    ]
  },
  {
    customId: "proj-5",
    name: "Apex Tech Hub & Research Center",
    location: "Pune, India",
    category: "Commercial",
    status: "Planning",
    year: "2027",
    startDate: "2025-01-10",
    completionDate: "2027-04-15",
    duration: "27 Months",
    client: "Apex Global Tech",
    budget: "₹85 Cr",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Next-generation research facility designed with acoustic isolation chambers, fiber-reinforced vibration-damped core, and ISO Class 6 clean room laboratory infrastructure for nanotechnology development.",
    scope: [
      "Vibration-Isolated Foundation Piling",
      "ISO Class 6 & 7 Clean Room Enclosures",
      "Redundant N+1 Power & Liquid Cooling Plant",
      "High-Performance Kinetic Louver Sunshade Facade"
    ],
    highlights: [
      "State-of-the-Art Semiconductor & Nano Labs",
      "Micro-Vibration Limit: VC-D Criteria",
      "Ultra-Pure Water & Gas Distribution Mains",
      "Zero Electro-Magnetic Interference Shielding"
    ],
    challenges: "Achieving VC-D micro-vibration thresholds for sensitive electron microscopy while adjacent to an urban arterial roadway through spring-damper isolated inertia slabs.",
    stats: [
      { label: "Lab Space", value: "180,000 sq ft" },
      { label: "Clean Rooms", value: "12 Enclosures" },
      { label: "Power Redundancy", value: "Tier IV Spec" },
      { label: "Chilled Water", value: "2,400 TR" }
    ]
  },
  {
    customId: "proj-6",
    name: "Coastal Port Expansion Bridge",
    location: "Visakhapatnam, India",
    category: "Civil Engineering",
    status: "In Progress",
    year: "2026",
    startDate: "2023-11-20",
    completionDate: "2026-09-15",
    duration: "34 Months",
    client: "National Maritime Authority",
    budget: "₹110 Cr",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "4-lane post-tensioned segmental concrete flyover and marine access bridge connecting outer port freight terminals with national highway network, engineered for heavy container freight axle loads.",
    scope: [
      "Deep Marine Bored Pile Foundations (2.0m Diameter)",
      "Match-Cast Precast Segmental Box Girders",
      "High-Corrosion-Resistant Epoxy Coated Rebars",
      "Launching Gantry Erection over Tidal Channels"
    ],
    highlights: [
      "2.4 km Elevated Marine Corridor",
      "Class 70R Military & Freight Axle Loading",
      "100-Year Design Life Marine Grade Mix (M50)",
      "Real-Time Structural Health Monitoring Sensors"
    ],
    challenges: "Executing 45-meter-deep marine bored piling within strong tidal currents and high salinity splash zones requiring specialized anti-washout concrete polymer formulations.",
    stats: [
      { label: "Corridor Length", value: "2.4 Kilometers" },
      { label: "Marine Piles", value: "168 Piles" },
      { label: "Precast Segments", value: "720 Units" },
      { label: "Load Capacity", value: "Class 70R" }
    ]
  }
];

const seedServices = [
  {
    customId: "serv-1",
    title: "Residential Construction",
    subtitle: "Homes, Villas & Luxury Apartments",
    iconName: "Home",
    description: "From custom luxury villas to high-rise residential towers, we deliver architectural excellence, structural safety, and fine interior craftsmanship tailored to modern living.",
    features: ["Custom Villa Construction", "High-Rise Apartments", "Sustainable Green Homes", "Interior Architecture Finishing"],
    status: "Active"
  },
  {
    customId: "serv-2",
    title: "Commercial Construction",
    subtitle: "Offices, Retail & Towers",
    iconName: "Building2",
    description: "We build modern, energy-efficient corporate headquarters, shopping malls, IT parks, and multi-tenant commercial spaces engineered for longevity and high foot traffic.",
    features: ["Corporate Office Towers", "Retail Centers & Malls", "Glass Curtain Wall Facades", "Smart HVAC & Building Automation"],
    status: "Active"
  },
  {
    customId: "serv-3",
    title: "Industrial Construction",
    subtitle: "Factories & Warehouses",
    iconName: "Factory",
    description: "Robust industrial facility construction featuring pre-engineered metal buildings, heavy load-bearing concrete flooring, high-bay storage structural frameworks, and safety infrastructure.",
    features: ["Manufacturing Plants", "Logistics Warehouses", "Pre-Engineered Metal Steel", "Heavy Load Slabs & Foundations"],
    status: "Active"
  },
  {
    customId: "serv-4",
    title: "Renovation & Remodeling",
    subtitle: "Structural Upgrades & Restorations",
    iconName: "Hammer",
    description: "Transform existing buildings with structural retrofitting, seismic strengthening, layout redesigns, energy efficiency retrofits, and modern architectural updates.",
    features: ["Structural Retrofitting", "Seismic Strengthening", "Facade Modernization", "Space Layout Expansion"],
    status: "Active"
  },
  {
    customId: "serv-5",
    title: "Civil Engineering & Infra",
    subtitle: "Bridges, Roads & Heavy Foundations",
    iconName: "HardHat",
    description: "Specialized civil engineering for municipal infrastructure, highway overpasses, heavy pile foundations, drainage works, and land development.",
    features: ["Post-Tensioned Bridges", "Deep Foundation Piling", "Drainage & Sewerage Systems", "Site Excavation & Grading"],
    status: "Active"
  },
  {
    customId: "serv-6",
    title: "Project Management",
    subtitle: "Turnkey Planning & Execution",
    iconName: "ClipboardCheck",
    description: "End-to-end EPC (Engineering, Procurement, Construction) management ensuring project delivery strictly on schedule, within budget, and compliant with international safety codes.",
    features: ["Cost Estimation & Budgeting", "Quality Assurance & QC", "Site Safety Management", "BIM 3D Modeling & Scheduling"],
    status: "Active"
  }
];

const seedTestimonials = [
  {
    customId: "test-1",
    name: "Rajesh Sharma",
    position: "Managing Director",
    company: "Horizon Apex Realty",
    rating: 5,
    quote: "BUILDCORE delivered our 32-story Skyline Business Tower 2 months ahead of schedule with zero safety incidents. Their engineering team demonstrated unmatched precision in steel structure fabrication.",
    avatar: "RS",
    status: "Published"
  },
  {
    customId: "test-2",
    name: "Priya Nair",
    position: "Chief Operations Officer",
    company: "EcoLiving Group Bangalore",
    rating: 5,
    quote: "The structural quality and finishing of Green Valley Residence exceeded all client expectations. BUILDCORE's transparent cost tracking and weekly BIM updates made management seamless.",
    avatar: "PN",
    status: "Published"
  },
  {
    customId: "test-3",
    name: "Vikramaditya Rao",
    position: "VP Infrastructure",
    company: "Global Logistics Corp",
    rating: 5,
    quote: "Constructing a 50,000 sq ft industrial park required heavy foundation engineering. BUILDCORE's civil team handled complex site soil conditions masterfully.",
    avatar: "VR",
    status: "Published"
  },
  {
    customId: "test-4",
    name: "Ananya Patnaik",
    position: "Lead Architect",
    company: "Studio Kalinga Design",
    rating: 5,
    quote: "As an architect, working with a contractor who respects exact blueprint tolerances is rare. BUILDCORE brings engineering integrity to every concrete pour.",
    avatar: "AP",
    status: "Published"
  }
];

const seedQuotes = [
  {
    customId: "quote-101",
    name: "Suresh Mohanty",
    email: "suresh.m@odishadev.com",
    phone: "+91 98610 23456",
    projectType: "Commercial",
    budget: "₹25 Cr - ₹50 Cr",
    message: "We plan to construct a 10-floor IT commercial office block in Infocity Bhubaneswar. Need structural planning, BIM layout, and turnkey construction quote.",
    date: "2026-08-25",
    status: "New"
  },
  {
    customId: "quote-102",
    name: "Deepak Verma",
    email: "dverma@steelpack.in",
    phone: "+91 97780 11223",
    projectType: "Industrial",
    budget: "₹50 Cr - ₹100 Cr",
    message: "Looking for pre-engineered steel warehouse construction for automated packaging plant in Kalinganagar Industrial Zone.",
    date: "2026-08-22",
    status: "Contacted"
  },
  {
    customId: "quote-103",
    name: "Smita Kulkarni",
    email: "smita.k@horizonresidences.com",
    phone: "+91 94370 88990",
    projectType: "Residential",
    budget: "₹10 Cr - ₹25 Cr",
    message: "Gated community project of 20 luxury villas in Puri bypass road. Require foundation piling and civil structural execution.",
    date: "2026-08-20",
    status: "In Discussion"
  },
  {
    customId: "quote-104",
    name: "Rohan Kapoor",
    email: "rohan.k@metrohealth.org",
    phone: "+91 91234 56789",
    projectType: "Civil Engineering",
    budget: "₹100 Cr+",
    message: "Multi-specialty hospital wing expansion with seismic grade concrete core in Cuttack.",
    date: "2026-08-15",
    status: "Approved"
  }
];

const seedMessages = [
  {
    customId: "msg-201",
    name: "Amitabh Sen",
    email: "amitabh.sen@infraken.com",
    phone: "+91 98300 45678",
    subject: "Subcontractor Vendor Registration Inquiry",
    date: "2026-08-26",
    status: "Unread",
    message: "Greetings BuildCore Team. We specialize in heavy structural steel fabrication and post-tensioning. We would like to enroll in your approved vendor list for upcoming bridge projects."
  },
  {
    customId: "msg-202",
    name: "Dr. Sunita Tripathy",
    email: "sunita.tripathy@kiit.ac.in",
    phone: "+91 94371 67890",
    subject: "Campus Auditorium Renovation Proposal",
    date: "2026-08-24",
    status: "Read",
    message: "We are inviting tenders for acoustic restoration and structural reinforcement of our main university convention hall (capacity 2,500 seats)."
  },
  {
    customId: "msg-203",
    name: "Manoj Das",
    email: "manoj.das@buildersunion.org",
    phone: "+91 99370 12345",
    subject: "Safety Compliance Certification Request",
    date: "2026-08-18",
    status: "Replied",
    message: "Congratulations on achieving 1 million safe man-hours on the Skyline Business Tower project. Please send your documentation for the upcoming State Safety Excellence Award."
  }
];

const seedSetting = {
  companyName: "BuildCore Construction Pvt. Ltd.",
  tagline: "Building Better. Building Stronger.",
  phone: "+91 98765 43210",
  email: "info@buildcore.com",
  address: "Plot 405, Fortune Towers Zone, Jayadev Vihar, Bhubaneswar, Odisha 751013",
  website: "https://www.buildcore.com",
  establishedYear: 2011,
  socialLinks: {
    facebook: "https://facebook.com/buildcoreconstruction",
    instagram: "https://instagram.com/buildcore_official",
    linkedin: "https://linkedin.com/company/buildcore-construction",
    youtube: "https://youtube.com/@buildcoreconstruction"
  },
  adminProfile: {
    name: "Alex Mercer",
    email: "admin@buildcore.com",
    role: "Chief Construction Officer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
  }
};

const importData = async () => {
  try {
    await connectDB();

    console.log('[Seeder] Purging existing database collections...');
    await User.deleteMany();
    await Project.deleteMany();
    await Service.deleteMany();
    await Testimonial.deleteMany();
    await QuoteRequest.deleteMany();
    await Message.deleteMany();
    await Setting.deleteMany();

    console.log('[Seeder] Creating Super Admin user account...');
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@buildcore.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';
    const adminName = process.env.ADMIN_NAME || 'Alex Mercer';

    await User.create({
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      role: 'Super Administrator'
    });

    console.log('[Seeder] Populating construction projects...');
    await Project.insertMany(seedProjects);

    console.log('[Seeder] Populating engineering services...');
    await Service.insertMany(seedServices);

    console.log('[Seeder] Populating client testimonials...');
    await Testimonial.insertMany(seedTestimonials);

    console.log('[Seeder] Populating quote requests & tenders...');
    await QuoteRequest.insertMany(seedQuotes);

    console.log('[Seeder] Populating contact inquiries...');
    await Message.insertMany(seedMessages);

    console.log('[Seeder] Populating company settings metadata...');
    await Setting.create(seedSetting);

    console.log('----------------------------------------------------');
    console.log('✅ DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    console.log(`👤 Admin Account: ${adminEmail}`);
    console.log(`🔑 Admin Password: ${adminPassword}`);
    console.log('----------------------------------------------------');

    process.exit(0);
  } catch (error) {
    console.error(`[Seeder Error]: ${error.message}`);
    process.exit(1);
  }
};

importData();
