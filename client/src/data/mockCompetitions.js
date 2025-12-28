export const mockCompetitions = [
    {
        _id: '1',
        name: 'CodeQuest 2025',
        category: 'Coding',
        description: 'The ultimate coding challenge for young programmers. Solve complex algorithmic problems, debug legacy code, and build innovative solutions using modern frameworks. This year\'s challenge focuses on "Code for Climate", inviting participants to create software that addresses environmental issues.',
        eligibility: 'Grades 6-12',
        registrationFee: 200,
        startDate: '2025-06-15',
        endDate: '2025-06-17',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=100',
        bannerImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=100',
        registrationCount: 156,
        rules: [
            { title: "Team Composition", content: "Teams must consist of 2 to 4 members. All members must be from the same grade category (Junior: 6-8, Senior: 9-12)." },
            { title: "Languages", content: "Solutions can be submitted in Python, C++, Java, or JavaScript. Use of external libraries is restricted unless specified in the problem statement." },
            { title: "Judging Criteria", content: "Submissions will be judged based on correctness (60%), efficiency (20%), and code quality/documentation (20%)." },
            { title: "Fair Play", content: "Any form of plagiarism or use of AI-generated code without attribution will result in immediate disqualification." }
        ],
        prizes: [
            { position: "1st Place", amount: "₹50,000", reward: "Gold Trophy + Excellence Certificate" },
            { position: "2nd Place", amount: "₹30,000", reward: "Silver Trophy + Merit Certificate" },
            { position: "3rd Place", amount: "₹20,000", reward: "Bronze Trophy + Participation Certificate" }
        ],
        faqs: [
            { question: "Do I need previous experience?", answer: "While basic programming knowledge is helpful, we have resources to get you started!" },
            { question: "Can I participate individually?", answer: "No, this is a team-based competition to foster collaboration." },
            { question: "Is the registration fee refundable?", answer: "Registration fees are non-refundable but can be transferred to another team member if needed." }
        ]
    },
    {
        _id: '2',
        name: 'RoboWars India',
        category: 'Robotics',
        description: 'Experience the thrill of metal-on-metal combat! Build a robust, combat-ready robot and battle it out in our high-tech arena. Focus on engineering durability, weapon systems, and strategic driving to become the ultimate champion.',
        eligibility: 'Grades 8-12 & College',
        registrationFee: 500,
        startDate: '2025-07-20',
        endDate: '2025-07-22',
        image: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=100',
        bannerImage: 'https://images.unsplash.com/photo-1531746790731-6c087fecd05a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=100',
        registrationCount: 89,
        rules: [
            { title: "Weight Limits", content: "Robots must weigh between 10kg and 15kg for the lightweight category." },
            { title: "Weaponry", content: "Active weapons are mandatory. Pneumatic, electric, and mechanical weapons are allowed. Flame and liquid weapons are prohibited." },
            { title: "Safety", content: "All robots must have a remote kill-switch and pass a rigorous safety inspection before entering the arena." }
        ],
        prizes: [
            { position: "1st Place", amount: "₹50,000", reward: "RoboWars Champion Belt + Toolkit" },
            { position: "2nd Place", amount: "₹30,000", reward: "Runner-up Trophy + 3D Printer" },
            { position: "3rd Place", amount: "₹20,000", reward: "Persistence Award + Arduino Mega Kit" }
        ],
        faqs: [
            { question: "Are kits provided?", answer: "No, teams must build their own robots from scratch or using commercially available parts." },
            { question: "How large is the arena?", answer: "The combat arena is a 20x20 feet enclosed steel-floor space." }
        ]
    },
    {
        _id: '3',
        name: 'STEMpreneur Pitch',
        category: 'Innovation',
        description: 'Combine STEM innovation with entrepreneurial spirit. Develop a product or service that solves a real-world problem and pitch it to a panel of expert investors and industry leaders.',
        eligibility: 'Grades 9-12',
        registrationFee: 150,
        startDate: '2025-08-10',
        endDate: '2025-08-11',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=100',
        bannerImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=100',
        registrationCount: 42,
        rules: [
            { title: "Pitch Format", content: "Teams have 5 minutes to pitch followed by 3 minutes of Q&A with the judges." },
            { title: "The Prototype", content: "A functional prototype or a high-fidelity digital mockup is required for the final round." },
            { title: "Intellectual Property", content: "Participants retain full ownership of their ideas, but we encourage filing for protective patents beforehand." }
        ],
        prizes: [
            { position: "1st Place", amount: "₹50,000", reward: "Incubation Support + VC Introduction" },
            { position: "2nd Place", amount: "₹30,000", reward: "Marketing Credits + Mentorship" },
            { position: "3rd Place", amount: "₹20,000", reward: "Business Suite Subscription" }
        ],
        faqs: [
            { question: "Do I need a business plan?", answer: "Yes, a one-page executive summary is required for the initial screening." }
        ]
    },
    {
        _id: '4',
        name: 'SpaceX Quest',
        category: 'Space Tech',
        description: 'Explore the final frontier. Design a sustainable Mars colony, program a moon rover, or create a satellite communication system. Join us for a cosmic journey of discovery.',
        eligibility: 'Grades 7-12',
        registrationFee: 250,
        startDate: '2025-09-05',
        endDate: '2025-09-07',
        image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=100',
        bannerImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=100',
        registrationCount: 204,
        rules: [
            { title: "Scientific Accuracy", content: "All designs must adhere to known laws of physics and provide scientific justification for hypothetical tech." },
            { title: "Submission format", content: "CAD models and a 10-page technical report must be submitted." }
        ],
        prizes: [
            { position: "1st Place", amount: "₹50,000", reward: "Space Camp Invite + Telescope" },
            { position: "2nd Place", amount: "₹30,000", reward: "High-power Binoculars + VR Gear" },
            { position: "3rd Place", amount: "₹20,000", reward: "Astronomy Encyclopedia Set" }
        ],
        faqs: [
            { question: "Is this affiliated with SpaceX?", answer: "This is an independent educational competition inspired by SpaceX missions." }
        ]
    },
    {
        _id: '5',
        name: 'EcoDesign Challenge',
        category: 'Sustainability',
        description: 'Reimagine our future through sustainable design. Create products or systems that eliminate waste, utilize recycled materials, and promote a circular economy.',
        eligibility: 'Grades 6-12',
        registrationFee: 100,
        startDate: '2025-10-12',
        endDate: '2025-10-13',
        image: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=100',
        bannerImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=100',
        registrationCount: 112,
        rules: [
            { title: "Material Usage", content: "At least 70% of the materials used in the physical model must be recycled or biodegradable." },
            { title: "Lifecycle Analysis", content: "A brief report explaining the environmental impact of the product throughout its life is mandatory." }
        ],
        prizes: [
            { position: "1st Place", amount: "₹50,000", reward: "Sustainability Grant + Eco-Kit" },
            { position: "2nd Place", amount: "₹30,000", reward: "Solar Charger + Organic Hamper" },
            { position: "3rd Place", amount: "₹20,000", reward: "Upcycled Tech Accessories" }
        ],
        faqs: [
            { question: "Can we use plastic?", answer: "Only if it is recycled plastic. Virgin plastics are highly discouraged." }
        ]
    }
];
