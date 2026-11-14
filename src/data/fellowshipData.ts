import {
  EventItem,
  MCSFDepartment,
  MCSFMinistryTeam,
  PublicationItem,
  GalleryPhoto,
  AcademicYear,
  LeaderContact,
  MinistrySpotlight,
  MezmurItem,
} from '../types/fellowship';

export const MEZMUR_SONGS: MezmurItem[] = [
  {
    id: 'mezmur-guzo',
    youtubeId: 'TK0ERlbF_jE',
    url: 'https://youtu.be/TK0ERlbF_jE?si=cRCmdiYJJkZz4JfL',
    title: 'Guzo (ጉዞ)',
    artist: 'Kingdom Sound Live Worship',
    tag: 'Choir & Corporate Praise',
    description:
      'Live Ethiopian Christian worship medley celebrating our journey of faith—featured during MCSF Wednesday gatherings and fellowship retreats.',
  },
  {
    id: 'mezmur-efeligihalehu',
    youtubeId: 'V6SluCpm1PM',
    url: 'https://youtu.be/V6SluCpm1PM?si=CvX5Cc6EdYhlKsqJ',
    title: 'Efeligihalehu (እፈልግሃለሁ)',
    artist: 'Dawit Getachew',
    tag: 'Heartfelt Worship & Devotion',
    description:
      'A deeply loved Ethiopian worship anthem ("I Seek You") sung by students during acoustic midweek prayer and quiet reflection.',
  },
];

export const TELEGRAM_CHANNEL = 'https://t.me/lursuesz';
export const TELEGRAM_CHANNEL_HANDLE = '@lursuesz';

export const FELLOWSHIP_VIDEO = {
  src: '/assets/aistudio/video_2026-11-12_22-10-56_6a8ed457.mp4',
  poster: '/assets/aistudio/photo_2026-11-12_22-11-52_872f12c6.jpg',
  title: 'MCSF Worship, Word & Fellowship Highlights',
  subtitle: 'Semen Muluwengel & Genet Church Weekly Gatherings · Piyassa Campus',
  description:
    'A glimpse inside our weekly praise, acoustic guitar worship, Bible study circles, teaching from scripture, and community fellowship at Dagmawi Menelik Health Science College.',
};

export const FELLOWSHIP_LEADERS: LeaderContact[] = [
  {
    name: 'Bemnet',
    telegramUsername: 'Bemnet1961',
    phone: '+251 93 232 2734',
    role: 'Fellowship Leader & Student Care',
    bio: 'Dedicated to student spiritual growth, campus fellowship, and community support at Dagmawi Menelik Health Science College.',
  },
  {
    name: 'Gedion',
    telegramUsername: 'Gedion98',
    phone: '+251 93 614 0719',
    role: 'Fellowship Coordinator & Registration Desk',
    bio: 'Overseeing new member onboarding, small-group family assignments, and official fellowship communications.',
  },
];

export const MCSF_DEPARTMENTS: MCSFDepartment[] = [
  'Medicine & Surgery',
  'Nursing & Adult ICU',
  'Pharmacy',
  'Medical Laboratory Science',
  'Anesthesia & Intensive Care',
  'Midwifery & Maternal Health',
  'Public Health & Epidemiology',
  'Postgraduate & Clinical Specialty',
  'Alumni & Healthcare Practicing',
];

export const MCSF_TEAMS: MCSFMinistryTeam[] = [
  'Hospital Ward & ICU Ministry',
  'Worship & Music Team',
  'Scripture & Medical Ethics',
  'Prayer & Intercession',
  'Charity & Patient Relief',
  'Media, Tech & Photography',
  'First-Year Student Care',
  'Exploring / Not Sure Yet',
];

export const ACADEMIC_YEARS: AcademicYear[] = [
  'Year 1 (Pre-Clinical)',
  'Year 2',
  'Year 3 (Clerkship)',
  'Year 4 (Internship / Senior)',
  'Postgraduate / Resident',
  'Alumni',
];

export const MINISTRY_SPOTLIGHTS: MinistrySpotlight[] = [
  {
    id: 'min-adult-icu',
    title: 'Adult ICU & Critical Ward Intercession',
    category: 'Hospital Ministry',
    subtitle: 'Menelik II Hospital Adult ICU & Inpatient Wards',
    image: '/assets/aistudio/photo_2026-11-12_18-05-48_2da4c305.jpg',
    badge: 'Adult ICU · Frontline Care',
    summary:
      'MCSF doctors, student nurses, and clinical interns standing together outside the Adult ICU—praying for critically ill patients, supporting exhausted staff, and bringing quiet peace to anxious families.',
    keyPoints: [
      'Confidential, respectful bedside prayer protocols',
      'Emotional and spiritual support for ICU families',
      'Clinical clerkship prayer partnerships across wards',
      'Care packages and practical relief for hospitalized patients',
    ],
    fullStory: [
      'Inside the Adult Intensive Care Unit at Menelik II Hospital, medical trainees encounter life at its most fragile moments. Monitors beep softly while families wait anxiously in corridors for news about their loved ones.',
      'Our Hospital Ward & ICU Ministry exists to bridge clinical excellence with Christian compassion. Wearing our fellowship tees after clinical rounds, MCSF physicians, nurses, and interns gather quietly to intercede for healing, wisdom for attending specialists, and supernatural peace for patients.',
      'Every visit respects hospital hygiene and patient privacy protocols while demonstrating that healthcare is ultimately a ministry of Christ\'s healing love.',
    ],
    scripture: '"He sent them out to proclaim the kingdom of God and to heal the sick." — Luke 9:2',
  },
  {
    id: 'min-patient-outreach',
    title: 'Hospital Flowers, Tracts & Patient Relief',
    category: 'Outreach & Relief',
    subtitle: 'Sharing Christ\'s Love Outside Menelik II Hospital',
    image: '/assets/aistudio/photo_2026-11-12_18-06-04_f0b9eae6.jpg',
    badge: 'Outreach & Relief',
    summary:
      'Distributing encouragement cards, fresh yellow and pink roses, and Scripture booklets to hospital patients, visitors, and clinic staff around Piyassa Campus.',
    keyPoints: [
      'Fresh roses and personal encouragement notes for patients',
      'Easter and holiday hospital visitation campaigns',
      'Practical support for patients from outside Addis Ababa',
      'One-on-one Gospel conversations with visitors and staff',
    ],
    fullStory: [
      'A simple fresh flower, a genuine smile, and a handwritten card carrying the hope of the Gospel can transform a difficult day at the hospital.',
      'During clinical holidays, Easter celebrations, and weekend outreaches, MCSF students step out together along the streets and hospital entrances near Menelik II Hospital to share flowers, booklets, and warm encouragement with everyone they meet.',
      'This ministry equips health science students to see every person beyond charts and symptoms—as someone deeply loved by Jesus Christ.',
    ],
    scripture: '"Truly I tell you, whatever you did for one of the least of these brothers and sisters of mine, you did for me." — Matthew 25:40',
  },
  {
    id: 'min-easter-blessing',
    title: 'Resurrection Hope & Holiday Visitations',
    category: 'Outreach & Seasonal Care',
    subtitle: 'Menelik College Christian Students Fellowship Easter Outreach',
    image: '/assets/aistudio/photo_2026-11-12_22-15-05_66dd196d.jpg',
    badge: 'Seasonal Ministry',
    summary:
      'Celebrating the resurrection of Christ on hospital wards and campus avenues—delivering roses and custom MCSF Resurrection greeting cards to remind patients they are never forgotten.',
    keyPoints: [
      'Hand-crafted MCSF Resurrection booklets and greeting cards',
      'Campus-wide student participation across all departments',
      'Prayer and song visits for long-term inpatient units',
      'Strengthening bonds between pre-clinical and clinical cohorts',
    ],
    fullStory: [
      'Holidays can feel especially lonely for patients unable to return home due to prolonged hospitalization. Every Easter and major season, our fellowship prepares custom greeting cards and fresh roses to deliver in person.',
      'Holding yellow roses alongside our printed "Happy Resurrection" cards from Menelik College Christian Students Fellowship, students walk door-to-door offering warm greetings, prayer, and joyful witness.',
    ],
    scripture: '"I am the resurrection and the life. The one who believes in me will live." — John 11:25',
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'hero-group',
    src: '/assets/aistudio/photo_2026-11-12_17-40-29_01ace01c.jpg',
    title: 'MCSF Campus Gathering',
    subtitle: 'Dagmawi Menelik Health Science College Fellowship',
    tag: 'Main Fellowship',
    date: 'Academic Fellowship Day',
    location: 'Dagmawi Menelik Campus Courtyard',
    description:
      'Students and healthcare trainees united in Christ wearing our signature "JESUS: The Way, The Truth, The Life" fellowship shirts.',
    story: [
      'Gathered outside our campus fellowship building, brothers and sisters from Medicine, Nursing, Pharmacy, Laboratory Science, and Public Health stand side by side.',
      'Holding printed encouragement cards and wearing "JESUS: The Way, The Truth, The Life," this portrait reflects the unity that defines MCSF across every academic year.',
    ],
  },
  {
    id: 'wednesday-prayer-flyer',
    src: '/assets/aistudio/photo_2026-11-12_22-11-52_872f12c6.jpg',
    title: 'Prayer, Worship & Reflection Gathering',
    subtitle: 'Wednesday 6:00 LT · Semen Muluwengel Church',
    tag: 'Worship & Events',
    date: 'April 8 · Wednesdays 6:00 LT',
    location: 'Semen Muluwengel Church',
    description:
      'Acoustic guitar praise, deep gratitude prayer, and heartfelt reflection thanking God for His faithfulness throughout our clinical journey.',
    story: [
      'Midweek pauses are vital for health science students carrying heavy lecture loads and hospital shift responsibilities.',
      'At Semen Muluwengel Church every Wednesday at 6:00 LT, students bring acoustic guitars, open Bibles, and thankful hearts to worship God and intercede for upcoming exams and patients.',
    ],
  },
  {
    id: 'one-week-piyassa',
    src: '/assets/aistudio/photo_2026-11-12_22-12-38_ba551819.jpg',
    title: 'Seek Me and Live — Amos 5:4',
    subtitle: 'Menelik Students Christian Fellowship (Piyassa Campus)',
    tag: 'Worship & Events',
    date: 'Wednesday 6:00 LT',
    location: 'Semen Muluwengel Church · Piyassa',
    description:
      'Rooted in Amos 5:4 ("Seek me and live"), our Piyassa campus family rallies together for worship, sound teaching, and vibrant student community.',
    story: [
      'Inspired by the call of Amos 5:4, our Piyassa campus fellowship invites every student—from first-year pre-clinical trainees to graduating interns—to seek God whole-heartedly.',
      'Whether celebrating special fellowship milestones or gathering for midweek prayer, Semen Muluwengel Church serves as a welcoming spiritual home right near campus.',
    ],
  },
  {
    id: 'first-year-anniversary',
    src: '/assets/aistudio/photo_2026-11-12_22-14-56_caf9d87a.jpg',
    title: 'MCSF First Year Anniversary Celebration',
    subtitle: 'Cutting the Cake in Gratitude to God',
    tag: 'Anniversary & Milestones',
    date: 'First Year Milestone',
    location: 'Fellowship Hall · Addis Ababa',
    description:
      'Marking our first year of answered prayers, campus unity, and ministry growth with joy, thanksgiving, and our fellowship anniversary cake.',
    story: [
      'Looking back at where God started our small student prayer circle and seeing how far He has brought us filled our First Year Anniversary room with pure gratitude.',
      'Student leaders and members gathered to cut the celebratory cake together, sharing testimonies of God\'s provision through challenging medical exams and clinical rotations.',
    ],
  },
  {
    id: 'crown-fellowship-joy',
    src: '/assets/aistudio/photo_2026-11-12_22-12-44_83739f69.jpg',
    title: 'Royal Identity & Fellowship Celebration',
    subtitle: 'Paper Crowns & Shared Fruit on Campus',
    tag: 'Family Day',
    date: 'Special Fellowship Celebration',
    location: 'Menelik Fellowship Courtyard',
    description:
      'Sharing strawberries, fruit, and handmade crowns—celebrating our identity as sons and daughters of the King with genuine laughter and hospitality.',
    story: [
      'Christian fellowship goes beyond serious study—it is marked by joy, hospitality, and affirming each student\'s worth in Christ.',
      'During our crown celebration day, members crafted paper crowns for one another and shared fresh fruit together between classes.',
    ],
  },
  {
    id: 'crown-ceremony-sisters',
    src: '/assets/aistudio/photo_2026-11-12_22-12-50_c019e243.jpg',
    title: 'Honoring One Another in Love',
    subtitle: 'Welcoming Sisters with handmade Crowns',
    tag: 'Family Day',
    date: 'Special Fellowship Celebration',
    location: 'Fellowship Entrance',
    description:
      'Students joyfully placing crowns on one another as a symbol of Christ\'s honor, sisterhood, and welcoming warmth.',
    story: [
      'At the entrance of our fellowship room, sisters welcomed arriving students by placing crowns on their heads with smiles and encouraging words.',
      'Moments like these turn classmates into lifelong brothers and sisters who carry one another through every season of medical training.',
    ],
  },
  {
    id: 'family-day-arts-room',
    src: '/assets/aistudio/photo_2026-11-12_22-14-33_8e6e5cfe.jpg',
    title: 'MCSF Family Day Outside the Arts Room',
    subtitle: 'Small-Group Community & Joyful Smiles',
    tag: 'Family Day',
    date: 'MCSF Family Day',
    location: 'Arts Room Courtyard',
    description:
      'Six smiling students gathered inside the signature hand-drawn MCSF Family Day frame outside the campus Arts Room.',
    story: [
      'Family Day is one of the brightest highlights of our semester. Outside the Arts Room, small groups took turns stepping into our custom paper frame to capture memories.',
      'These circles pair upper-year interns with newer students for spiritual accountability, exam guidance, and lasting friendship.',
    ],
  },
  {
    id: 'family-day-trio-glow',
    src: '/assets/aistudio/photo_2026-11-12_22-14-22_345571eb.jpg',
    title: 'Radiant Joy on MCSF Family Day',
    subtitle: 'United in Friendship & Faith',
    tag: 'Family Day',
    date: 'MCSF Family Day',
    location: 'Campus Fellowship Hall',
    description:
      'Three smiling MCSF friends framing their celebration—highlighting the closeness and spiritual encouragement shared across departments.',
    story: [
      'Even in the middle of demanding clinical blocks, taking an afternoon to laugh, pray, and share meals as a Family Circle restores strength.',
      'Through these intentional relationships, no student has to navigate the pressures of healthcare school alone.',
    ],
  },
  {
    id: 'menelik-wednesday-dialogue',
    src: '/assets/aistudio/photo_2026-11-12_22-14-50_a0eb5e8e.jpg',
    title: 'Wednesday Fellowship & Brotherhood Dialogue',
    subtitle: 'Genet Church & Semen Muluwengel Church · 6:00 LT',
    tag: 'Worship & Events',
    date: 'Every Wednesday 6:00 LT',
    location: 'Genet Church & Semen Muluwengel Church',
    description:
      'Heart-to-heart mentorship and discipleship conversations during our weekly Wednesday fellowship meetings.',
    story: [
      'True discipleship happens in personal conversation. Every Wednesday at 6:00 LT at Genet Church and Semen Muluwengel Church, brothers and sisters sit down to share scripture, life challenges, and mutual prayer.',
      'This candid snapshot captures two brothers deep in fellowship conversation while the wider congregation gathers behind them.',
    ],
  },
  {
    id: 'easter-roses-outreach',
    src: '/assets/aistudio/photo_2026-11-12_22-15-05_66dd196d.jpg',
    title: 'Resurrection Greetings & Roses Outreach',
    subtitle: 'Sharing the Hope of Christ Across Campus & Hospital',
    tag: 'Outreach & Relief',
    date: 'Resurrection Outreach',
    location: 'Menelik Hospital & Piyassa Streets',
    description:
      'Yellow and pink roses held alongside MCSF Resurrection cards—a tangible expression of hope for patients and neighbors.',
    story: [
      'Carrying fresh yellow and pink roses paired with printed Resurrection cards from Menelik College Christian Students Fellowship, students reached out to patients, passersby, and staff.',
      'It serves as a vivid reminder that our faith speaks through warmth, beauty, and practical kindness.',
    ],
  },
  {
    id: 'icu-ward',
    src: '/assets/aistudio/photo_2026-11-12_18-05-48_2da4c305.jpg',
    title: 'Adult ICU & Ward Healthcare Ministry',
    subtitle: 'Menelik II Hospital Patient Care',
    tag: 'Hospital Ministry',
    date: 'Clinical Ward Outreach',
    location: 'Menelik II Hospital · Adult ICU',
    description:
      'MCSF medical doctors, student nurses, and clinical interns standing together at the Adult ICU, praying for critically ill patients and their families.',
    story: [
      'Standing outside the Adult ICU doors, doctors in white coats and fellow students in matching "JESUS" t-shirts unite clinical service with intercessory prayer.',
      'Our hospital ministry teams encourage both patients and fellow healthcare workers navigating intense ICU shifts.',
    ],
  },
  {
    id: 'family-day-1',
    src: '/assets/aistudio/photo_2026-11-12_17-45-19_2ed7927b.jpg',
    title: 'MCSF Family Day Celebration',
    subtitle: 'Small Group Sisterhood & Friendship',
    tag: 'Family Day',
    date: 'MCSF Family Day',
    location: 'Campus Fellowship Courtyard',
    description:
      'Celebrating small-group life, peer accountability, and fellowship connections with our signature hand-crafted MCSF Family frame.',
    story: [
      'Laughter, encouragement, and unity fill our campus courtyard whenever MCSF Family circles come together to celebrate the semester.',
    ],
  },
  {
    id: 'family-day-2',
    src: '/assets/aistudio/photo_2026-11-12_17-45-11_660624f9.jpg',
    title: 'Brotherhood & Fellowship Unity',
    subtitle: 'Campus Grounds at Dagmawi Menelik',
    tag: 'Family Day',
    date: 'MCSF Family Day',
    location: 'Campus Fellowship Courtyard',
    description:
      'Brothers and sisters in medicine, nursing, and laboratory sciences building lifelong Christian bonds and supporting each other through clinical rotations.',
    story: [
      'A joyful Family Day snapshot bringing together students across different departments to pray, laugh, and strengthen our campus brotherhood.',
    ],
  },
  {
    id: 'scrapbook-collage',
    src: '/assets/aistudio/photo_2026-11-12_17-46-19_ee9f47e5.jpg',
    title: 'MCSF Family Time & Youth Impact',
    subtitle: 'Memories of Grace & Service',
    tag: 'Anniversary & Milestones',
    date: 'Fellowship Archive',
    location: 'Youth Impact & MCSF Campus',
    description:
      'A visual memory tapestry capturing our fellowship journey, Youth Impact association partnership, and family group circles.',
    story: [
      'This curated scrapbook collage weaves together cherished snapshots from Family Time and our partnership with Youth Impact Development Association.',
    ],
  },
  {
    id: 'outreach-evangelism',
    src: '/assets/aistudio/photo_2026-11-12_18-06-04_f0b9eae6.jpg',
    title: 'Hospital Ward & Patient Outreach',
    subtitle: 'Sharing the Love of Christ with Flowers & Scripture',
    tag: 'Outreach & Relief',
    date: 'Outreach Day',
    location: 'Near Menelik II Hospital',
    description:
      'Distributing encouragement cards, fresh flowers, and gospel tracts to hospital patients, visitors, and health center staff.',
    story: [
      'Stepping outside the classroom walls, our student outreach team greets hospital visitors and community members with fresh flowers and words of hope.',
    ],
  },
];

export const MCSF_EVENTS: EventItem[] = [
  {
    id: 'evt-wednesday-prayer',
    title: 'Wednesday Prayer, Worship & Reflection',
    category: 'Main Fellowship',
    schedule: 'Every Wednesday (Main Weekly Program)',
    ethiopianTime: '6:00 LT (Midday)',
    standardTime: '12:00 PM - 1:30 PM',
    location: 'Semen Muluwengel Church & Genet Church (Piyassa)',
    description:
      'Our primary weekly MCSF gathering—featuring acoustic guitar worship, mezmur praise, heartfelt prayer thanking God for His goodness, Scripture reflection, and campus fellowship near Piyassa.',
    highlights: [
      'Acoustic worship & Ethiopian mezmur praise led by student musicians',
      'Group intercession for clinical rotations & exams',
      'Rooted in Amos 5:4 — Seek Me and Live',
      'Open fellowship at Semen Muluwengel & Genet Church venues',
    ],
    image: '/assets/aistudio/photo_2026-11-12_22-11-52_872f12c6.jpg',
    status: 'Active Weekly',
  },
  {
    id: 'evt-icu-prayer',
    title: 'Adult ICU & Hospital Bedside Intercession',
    category: 'Hospital & Ward Prayer',
    schedule: 'Wednesdays After Service & Assigned Shifts',
    ethiopianTime: '11:00 LT (Evening)',
    standardTime: '5:00 PM - 6:30 PM',
    location: 'Menelik II Hospital Adult ICU & Clinical Wards',
    description:
      'Clinical students, nurses, and medical officers praying for patients in critical care, comforting anxious families, and ministering Christ\'s peace.',
    highlights: [
      'Ward-based intercession teams across medical & surgical units',
      'Respectful bedside prayer with patient consent',
      'Distribution of flowers and encouragement cards',
      'Fellowship care for night-shift nursing and medical interns',
    ],
    image: '/assets/aistudio/photo_2026-11-12_18-05-48_2da4c305.jpg',
    status: 'Active Weekly',
  },
  {
    id: 'evt-family-circles',
    title: 'MCSF Small-Group Family Circles',
    category: 'Family Circle',
    schedule: 'Weekly (Shift-Friendly)',
    ethiopianTime: 'Flexible Times',
    standardTime: 'Adapted to Clinical Rotations & Duty Shifts',
    location: 'Campus Study Rooms & Arts Room Courtyard',
    description:
      'Intimate circles of 5 to 8 health science students providing academic tutoring, exam encouragement, Family Day celebrations, and deep spiritual prayer.',
    highlights: [
      'Small groups matched by shift schedule and department',
      'Senior peer mentoring for Anatomy, Physiology & Pharmacology',
      'Semester Family Day frames, shared meals & crown celebrations',
      'Safe confidential space for prayer and life advice',
    ],
    image: '/assets/aistudio/photo_2026-11-12_22-14-33_8e6e5cfe.jpg',
    status: 'Active Weekly',
  },
  {
    id: 'evt-annual-camp',
    title: 'Annual Healthcare Spiritual Retreat & Anniversary',
    category: 'Annual Retreat',
    schedule: 'Semester Break (Annually)',
    ethiopianTime: 'Full Multi-Day Gathering',
    standardTime: '4 Days / 3 Nights',
    location: 'Debre Zeit / Bishoftu Lakeside Conference Center',
    description:
      'A transformative spiritual getaway away from hospital alarms and clinical exams, dedicated to prayer, renewal, anniversary thanksgiving, and Christian medical leadership.',
    highlights: [
      'Four days of unhurried worship, prayer, and Scripture study',
      'Workshops on ethical medical practice and servant leadership',
      'Annual thanksgiving and anniversary celebrations',
      'Deep cross-department bonding across all cohorts',
    ],
    image: '/assets/aistudio/photo_2026-11-12_22-14-56_caf9d87a.jpg',
    status: 'Upcoming',
  },
];

export const MCSF_PUBLICATIONS: PublicationItem[] = [
  {
    id: 'pub-med-1',
    slug: 'christ-in-the-icu',
    category: 'Medical Ethics',
    title: 'Christ in the Adult ICU: Healing Beyond the Monitor',
    excerpt:
      'As healthcare professionals, monitors tell us vitals, but Christ reveals the eternal soul. How medical trainees at Menelik Hospital minister in critical moments.',
    author: 'Dr. Yared K. & Sister Selamawit',
    authorRole: 'Clinical Medicine & ICU Care',
    date: 'November 2026',
    readTime: '4 min read',
    likes: 96,
    coverImage: '/assets/aistudio/photo_2026-11-12_18-05-48_2da4c305.jpg',
    content: [
      'Standing before the doors of the Adult ICU at Menelik II Hospital, the steady rhythmic hum of ventilators and vital signs monitors can easily reduce a human life to blood pressure numbers and arterial saturation.',
      'Yet scripture reminds us that every single patient laying in that bed is created in the image of God. In Matthew 25:40, Jesus proclaimed: "Truly I tell you, whatever you did for one of the least of these brothers and sisters of mine, you did for me."',
      'When our fellowship doctors and student nurses enter the ICU, we come not only with medical knowledge and sterile gloves, but with the quiet prayer that the Great Physician would touch both body and spirit.',
      'Healing is a divine gift. May every medicine we administer and every hand we hold be an extension of Christ\'s tender compassion.',
    ],
  },
  {
    id: 'pub-med-2',
    slug: 'the-stethoscopes-calling',
    category: 'Poem',
    title: 'The Stethoscope and the Cross',
    excerpt:
      'A poetic tribute to Christian health science students balancing sleepless night calls, clinical exams, and faithful discipleship.',
    author: 'Ruth B. (Pharmacy Batch)',
    authorRole: 'MCSF Literature & Arts',
    date: 'October 2026',
    readTime: '3 min read',
    likes: 82,
    coverImage: '/assets/aistudio/photo_2026-11-12_22-15-05_66dd196d.jpg',
    content: [
      'Through midnight corridors and tired ward rounds,',
      'Where sickness sighs and human frailty sounds,',
      'We bring our hands, our minds, our stethoscope,',
      'Yet whisper Christ, the anchor of our hope.',
      '',
      'Not by our wisdom do the heartbeats start,',
      'God is the Healer of the broken heart;',
      'In Menelik\'s halls, let Jesus Christ be praised,',
      'Through humble servants whom His grace has raised.',
    ],
  },
  {
    id: 'pub-med-3',
    slug: 'integrity-in-health-sciences',
    category: 'Devotional',
    title: 'Compassionate Excellence: The Oath We Keep to God',
    excerpt:
      'Examining academic integrity in anatomy, pharmacology, and patient charting as an act of worship before our Creator.',
    author: 'MCSF Teaching Desk',
    authorRole: 'Scripture Engagement Team',
    date: 'September 2026',
    readTime: '5 min read',
    likes: 114,
    coverImage: '/assets/aistudio/photo_2026-11-12_22-14-50_a0eb5e8e.jpg',
    content: [
      'When you study pathology or write patient charts late at night, remember that your integrity will one day decide a patient\'s life.',
      'In Colossians 3:23-24, we are instructed: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters."',
      'Being a Christian medical, nursing, or pharmacy student means studying with reverence. God has placed you at Dagmawi Menelik Health Science College to be a faithful steward of human health.',
    ],
  },
];

export const MCSF_FAQS = [
  {
    q: 'What is MCSF - Menelik Christian Students Fellowship?',
    a: 'MCSF is the student-led Christian fellowship at Dagmawi Menelik Health Science College in Addis Ababa, Ethiopia. We bring together students in medicine, nursing, pharmacy, laboratory science, anesthesia, midwifery, and public health.',
  },
  {
    q: 'When is the main weekly fellowship program held?',
    a: 'Our main weekly fellowship program meets only on Wednesdays at 6:00 LT (12:00 PM) at Semen Muluwengel Church & Genet Church (Piyassa). Small-group Family Circles also connect at flexible shift-friendly times during the week.',
  },
  {
    q: 'How do the small-group Family Circles work?',
    a: 'MCSF Family groups consist of 5–8 students matched by department, clinical shifts, or academic year. They provide mutual prayer, emotional support, Family Day celebrations, and senior academic coaching.',
  },
  {
    q: 'How do I submit my registration to Gedion on Telegram?',
    a: 'Once you fill out the Member Registration form on this site, a direct "Send to Gedion (@Gedion98)" button will appear. Clicking it automatically drafts your full registration details directly into Telegram to send to Gedion.',
  },
  {
    q: 'How does the Hospital & Adult ICU ministry operate?',
    a: 'In cooperation with hospital guidelines, our team visits inpatient wards and the Adult ICU to provide quiet bedside prayer, spiritual encouragement, fresh flowers, and practical patient care items.',
  },
];

/**
 * Builds a formatted message and Telegram share link for Gedion
 */
export function buildTelegramRegistrationLink(record: {
  fullName: string;
  department: string;
  academicYear: string;
  teams: string[];
  phone: string;
  email: string;
  notes?: string;
}): string {
  const text = `🏥 MCSF Membership Registration
👤 Name: ${record.fullName}
🩺 Department: ${record.department}
📚 Year: ${record.academicYear}
🤝 Teams: ${record.teams.join(', ')}
📞 Phone: ${record.phone}
✉️ Email: ${record.email}${record.notes ? `\n📝 Notes: ${record.notes}` : ''}
📍 College: Dagmawi Menelik Health Science College`;

  return buildTelegramLink('Gedion98', text);
}

/**
 * Generic Telegram deep link that opens a chat with a prefilled message.
 */
export function buildTelegramLink(username: string, text: string): string {
  return `https://t.me/${username.replace('@', '')}?text=${encodeURIComponent(text)}`;
}

export function buildFamilyRequestLink(record: {
  fullName: string;
  department: string;
  academicYear: string;
  phone: string;
  email: string;
  dutyShiftNotes?: string;
}): string {
  const text = `🤝 MCSF Family Circle Request
👤 Name: ${record.fullName}
🩺 Department: ${record.department}
📚 Year: ${record.academicYear}
📞 Phone: ${record.phone}
✉️ Email: ${record.email}${record.dutyShiftNotes ? `\n🕒 Availability: ${record.dutyShiftNotes}` : ''}`;
  return buildTelegramLink('Gedion98', text);
}

export function buildPrayerMessageLink(record: {
  type: string;
  message: string;
  name?: string;
  phone?: string;
}): string {
  const text = `🙏 MCSF ${record.type.replace('-', ' ')}
${record.message}${record.name ? `\n— ${record.name}` : ''}${record.phone ? `\nContact: ${record.phone}` : ''}`;
  return buildTelegramLink('Bemnet1961', text);
}
