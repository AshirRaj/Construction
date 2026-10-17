// src/data/mockData.js

export const initialProjects = [
  {
    id: "proj-1",
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
    id: "proj-2",
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
    id: "proj-3",
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
    id: "proj-4",
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
    id: "proj-5",
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
    id: "proj-6",
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

export const initialServices = [
  {
    id: "serv-1",
    title: "Residential Construction",
    subtitle: "Homes, Villas & Luxury Apartments",
    iconName: "Home",
    description: "From custom luxury villas to high-rise residential towers, we deliver architectural excellence, structural safety, and fine interior craftsmanship tailored to modern living.",
    features: ["Custom Villa Construction", "High-Rise Apartments", "Sustainable Green Homes", "Interior Architecture Finishing"],
    status: "Active"
  },
  {
    id: "serv-2",
    title: "Commercial Construction",
    subtitle: "Offices, Retail & Towers",
    iconName: "Building2",
    description: "We build modern, energy-efficient corporate headquarters, shopping malls, IT parks, and multi-tenant commercial spaces engineered for longevity and high foot traffic.",
    features: ["Corporate Office Towers", "Retail Centers & Malls", "Glass Curtain Wall Facades", "Smart HVAC & Building Automation"],
    status: "Active"
  },
  {
    id: "serv-3",
    title: "Industrial Construction",
    subtitle: "Factories & Warehouses",
    iconName: "Factory",
    description: "Robust industrial facility construction featuring pre-engineered metal buildings, heavy load-bearing concrete flooring, high-bay storage structural frameworks, and safety infrastructure.",
    features: ["Manufacturing Plants", "Logistics Warehouses", "Pre-Engineered Metal Steel", "Heavy Load Slabs & Foundations"],
    status: "Active"
  },
  {
    id: "serv-4",
    title: "Renovation & Remodeling",
    subtitle: "Structural Upgrades & Restorations",
    iconName: "Hammer",
    description: "Transform existing buildings with structural retrofitting, seismic strengthening, layout redesigns, energy efficiency retrofits, and modern architectural updates.",
    features: ["Structural Retrofitting", "Seismic Strengthening", "Facade Modernization", "Space Layout Expansion"],
    status: "Active"
  },
  {
    id: "serv-5",
    title: "Civil Engineering & Infra",
    subtitle: "Bridges, Roads & Heavy Foundations",
    iconName: "HardHat",
    description: "Specialized civil engineering for municipal infrastructure, highway overpasses, heavy pile foundations, drainage works, and land development.",
    features: ["Post-Tensioned Bridges", "Deep Foundation Piling", "Drainage & Sewerage Systems", "Site Excavation & Grading"],
    status: "Active"
  },
  {
    id: "serv-6",
    title: "Project Management",
    subtitle: "Turnkey Planning & Execution",
    iconName: "ClipboardCheck",
    description: "End-to-end EPC (Engineering, Procurement, Construction) management ensuring project delivery strictly on schedule, within budget, and compliant with international safety codes.",
    features: ["Cost Estimation & Budgeting", "Quality Assurance & QC", "Site Safety Management", "BIM 3D Modeling & Scheduling"],
    status: "Active"
  }
];

export const initialTestimonials = [
  {
    id: "test-1",
    name: "Rajesh Sharma",
    position: "Managing Director",
    company: "Horizon Apex Realty",
    rating: 5,
    quote: "BUILDCORE delivered our 32-story Skyline Business Tower 2 months ahead of schedule with zero safety incidents. Their engineering team demonstrated unmatched precision in steel structure fabrication.",
    avatar: "RS",
    status: "Published"
  },
  {
    id: "test-2",
    name: "Priya Nair",
    position: "Chief Operations Officer",
    company: "EcoLiving Group Bangalore",
    rating: 5,
    quote: "The structural quality and finishing of Green Valley Residence exceeded all client expectations. BUILDCORE's transparent cost tracking and weekly BIM updates made management seamless.",
    avatar: "PN",
    status: "Published"
  },
  {
    id: "test-3",
    name: "Vikramaditya Rao",
    position: "VP Infrastructure",
    company: "Global Logistics Corp",
    rating: 5,
    quote: "Constructing a 50,000 sq ft industrial park required heavy foundation engineering. BUILDCORE's civil team handled complex site soil conditions masterfully.",
    avatar: "VR",
    status: "Published"
  },
  {
    id: "test-4",
    name: "Ananya Patnaik",
    position: "Lead Architect",
    company: "Studio Kalinga Design",
    rating: 5,
    quote: "As an architect, working with a contractor who respects exact blueprint tolerances is rare. BUILDCORE brings engineering integrity to every concrete pour.",
    avatar: "AP",
    status: "Published"
  }
];

export const initialQuoteRequests = [
  {
    id: "quote-101",
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
    id: "quote-102",
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
    id: "quote-103",
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
    id: "quote-104",
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

export const initialMessages = [
  {
    id: "msg-201",
    name: "Amitabh Sen",
    email: "amitabh.sen@infraken.com",
    phone: "+91 98300 45678",
    subject: "Subcontractor Vendor Registration Inquiry",
    date: "2026-08-26",
    status: "Unread",
    message: "Greetings BuildCore Team. We specialize in heavy structural steel fabrication and post-tensioning. We would like to enroll in your approved vendor list for upcoming bridge projects."
  },
  {
    id: "msg-202",
    name: "Dr. Sunita Tripathy",
    email: "sunita.tripathy@kiit.ac.in",
    phone: "+91 94371 67890",
    subject: "Campus Auditorium Renovation Proposal",
    date: "2026-08-24",
    status: "Read",
    message: "We are inviting tenders for acoustic restoration and structural reinforcement of our main university convention hall (capacity 2,500 seats)."
  },
  {
    id: "msg-203",
    name: "Manoj Das",
    email: "manoj.das@buildersunion.org",
    phone: "+91 99370 12345",
    subject: "Safety Compliance Certification Request",
    date: "2026-08-18",
    status: "Replied",
    message: "Congratulations on achieving 1 million safe man-hours on the Skyline Business Tower project. Please send your documentation for the upcoming State Safety Excellence Award."
  }
];

export const companySettings = {
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

export const companyStats = [
  { value: "15+", label: "Years Experience", numericValue: 15 },
  { value: "250+", label: "Projects Completed", numericValue: 250 },
  { value: "50+", label: "Awards & Certifications", numericValue: 50 },
  { value: "98%", label: "Client Satisfaction", numericValue: 98 },
  { value: "40+", label: "Professional Team", numericValue: 40 },
  { value: "100%", label: "Safety Compliance Rate", numericValue: 100 }
];

export const workProcessSteps = [
  {
    step: "01",
    title: "CONSULTATION",
    description: "Initial discovery, site feasibility analysis, structural goals alignment, and preliminary budget framework establishment."
  },
  {
    step: "02",
    title: "PLANNING",
    description: "Geotechnical survey, architectural blueprints, BIM 3D modeling, material sourcing strategy, and timeline roadmapping."
  },
  {
    step: "03",
    title: "DESIGN & ENGINEERING",
    description: "Detailed structural calculations, MEP engineering drawings, municipal permit approvals, and safety protocol design."
  },
  {
    step: "04",
    title: "CONSTRUCTION",
    description: "Heavy site excavation, concrete foundation placement, steel frame erection, high-grade masonry, and facade installation under strict site supervision."
  },
  {
    step: "05",
    title: "QUALITY INSPECTION",
    description: "Non-destructive testing (NDT), stress load testing, MEP pressure testing, fire safety validation, and pre-handover audit."
  },
  {
    step: "06",
    title: "HANDOVER",
    description: "Final client walkthrough, structural certification delivery, operations manual orientation, and post-occupancy warranty support."
  }
];

export const whyChooseUsFeatures = [
  {
    title: "Experienced Professionals",
    description: "Our core engineering team brings over 15 years of complex commercial and civil infrastructure expertise.",
    iconName: "Award"
  },
  {
    title: "Premium Quality Materials",
    description: "We source certified FE-550 TMT steel, ultra-high performance concrete, and ISO-tested waterproofing materials.",
    iconName: "ShieldCheck"
  },
  {
    title: "Strict Safety Standards",
    description: "Zero compromise OSHA safety compliance with over 1 million safe man-hours logged across all active sites.",
    iconName: "HardHat"
  },
  {
    title: "Transparent Pricing",
    description: "Clear itemized BOQ (Bill of Quantities) with zero hidden charges and real-time milestone cost tracking.",
    iconName: "Banknote"
  },
  {
    title: "On-Time Delivery",
    description: "Rigorous Critical Path Method (CPM) scheduling ensures project completion on or before the committed date.",
    iconName: "Clock"
  },
  {
    title: "Advanced Construction Tech",
    description: "Utilizing 3D BIM modeling, drone site survey surveillance, and IoT concrete curing sensors.",
    iconName: "Cpu"
  }
];
