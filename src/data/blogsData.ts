import blog1 from '@/assets/image/blog1.webp';
import blog2 from '@/assets/image/blog2.webp';
import blog3 from '@/assets/image/blog3.webp';
import blog4 from '@/assets/image/blog4.webp';
import blog5 from '@/assets/image/blog5.webp';
import blog6 from '@/assets/image/blog6.webp';

const blogsData = [
  {
    id: 1,
    slug: "homeopathy-modern-medicine",
    category: "Research",
    tag: "Homeopathy",
    title: "Homeopathy in Modern Medicine: Bridging Ancient Wisdom with Science",
    excerpt:
      "Exploring how classical homeopathic principles are being validated through contemporary clinical research and integrated into evidence-based healthcare frameworks.",
    content: `
      <p>Homeopathy has long been regarded as one of the oldest systems of integrative medicine, dating back over two centuries to the pioneering work of Samuel Hahnemann. Yet, its relevance in the modern healthcare landscape remains a topic of intense academic discussion and clinical exploration.</p>
      <p>Recent studies published in peer-reviewed journals have begun to shed light on the mechanisms by which highly diluted remedies may exert biological effects at the cellular level. The principle of "like cures like" is now being examined through the lens of immunological research, revealing fascinating parallels with vaccine science.</p>
      <h3>Clinical Evidence</h3>
      <p>A meta-analysis of over 150 randomized controlled trials found that homeopathic treatments for chronic conditions—including allergies, irritable bowel syndrome, and rheumatoid arthritis—showed statistically significant benefits compared to placebo. While the scientific community continues to debate the precise mechanisms, the clinical outcomes speak volumes.</p>
      <p>At Arogya Sangoshthi 2025, leading researchers and practitioners will present their findings on integrating homeopathy with conventional medicine, creating a holistic, patient-centered approach to healing.</p>
    `,
    author: "Dr. Rajesh Kotecha",
    authorRole: "Secretary, Ministry of AYUSH",
    date: "March 10, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
  },
  {
    id: 2,
    slug: "ayush-integrative-healthcare",
    category: "AYUSH",
    tag: "Policy",
    title: "AYUSH Systems: Shaping the Future of Integrative Healthcare in India",
    excerpt:
      "A deep dive into government-backed AYUSH initiatives transforming primary healthcare delivery across rural and urban India with traditional medicine approaches.",
    content: `
      <p>The Indian government's AYUSH initiative—encompassing Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Homeopathy—represents one of the world's most ambitious programs to integrate traditional medicine into the national healthcare system.</p>
      <p>With over 800,000 registered AYUSH practitioners and 3,500 hospitals across the country, the program has demonstrated remarkable reach. The COVID-19 pandemic further accelerated its adoption, with Ayurvedic immunity boosters and yoga protocols being recommended by leading medical bodies.</p>
      <h3>Policy Landscape</h3>
      <p>Recent policy changes have created dedicated AYUSH wards in government hospitals, mandatory AYUSH curriculum in medical education, and a national research council dedicated to evidence generation. These structural changes signal a paradigm shift in how India approaches public health.</p>
      <p>Conference speakers from the Ministry of AYUSH will share insights on the five-year roadmap and how practitioners can align their work with national health priorities.</p>
    `,
    author: "Dr. Ananya Sharma",
    authorRole: "Director General, CCRH",
    date: "March 5, 2025",
    readTime: "8 min read",
    image: blog1,
  },
  {
    id: 3,
    slug: "preventive-holistic-health",
    category: "Wellness",
    tag: "Prevention",
    title: "Preventive Healthcare: The Holistic Approach to Lifelong Wellness",
    excerpt:
      "How ancient Indian wellness traditions—from Dinacharya to Rasayana therapy—are proving essential tools in modern preventive medicine and chronic disease management.",
    content: `
      <p>In an era where lifestyle diseases account for over 60% of global mortality, the ancient Indian concept of preventive healthcare is experiencing a remarkable renaissance. Practices once considered archaic are now being validated by cutting-edge nutritional science and behavioral psychology.</p>
      <p>The Dinacharya—a daily regimen outlined in Ayurvedic texts—prescribes specific morning practices including oil pulling, tongue scraping, and pranayama that modern research has linked to improved oral microbiome health, reduced inflammation, and enhanced respiratory function.</p>
      <h3>The Science of Prevention</h3>
      <p>Rasayana therapy, the Ayurvedic approach to rejuvenation, is being studied at Harvard Medical School for its potential role in cellular regeneration and longevity. Herbs like Ashwagandha and Brahmi have been subject to double-blind clinical trials showing significant benefits for stress, cognitive function, and immune modulation.</p>
      <p>This conference session will provide practitioners with practical protocols for incorporating preventive AYUSH principles into their clinical practice, supported by the latest evidence base.</p>
    `,
    author: "Dr. Vikram Patel",
    authorRole: "Professor, Harvard Medical School",
    date: "Feb 28, 2025",
    readTime: "5 min read",
    image: blog2,
  },
  {
    id: 4,
    slug: "conference-highlights-2024",
    category: "Conference",
    tag: "Recap",
    title: "Arogya Sangoshthi 2024: Moments That Defined the Year in Integrative Medicine",
    excerpt:
      "A retrospective on the landmark discussions, research breakthroughs, and collaborative commitments from our most successful conference edition.",
    content: `
      <p>The 2024 edition of Arogya Sangoshthi set new benchmarks for excellence in medical conferencing, drawing over 2,000 delegates from 18 countries and featuring 65 distinguished speakers across three days of intensive programming.</p>
      <p>Key highlights included the release of the first comprehensive Indian Homeopathy Practice Guidelines, a landmark collaborative agreement between CCRH and three international research institutions, and the launch of a national telemedicine platform dedicated to AYUSH practitioners.</p>
    `,
    author: "Conference Secretariat",
    authorRole: "Arogya Sangoshthi",
    date: "Feb 20, 2025",
    readTime: "4 min read",
    image: blog3,
  },
  {
    id: 5,
    slug: "clinical-research-homeopathy",
    category: "Research",
    tag: "Clinical",
    title: "Advancing Clinical Research in Homeopathy: Methodologies & Best Practices",
    excerpt:
      "A comprehensive guide to designing rigorous clinical trials for homeopathic interventions that meet international scientific standards and regulatory requirements.",
    content: `
      <p>One of the most critical challenges facing homeopathic medicine today is the development of research methodologies that respect the individualized nature of homeopathic prescribing while meeting the gold standard of randomized controlled trial design.</p>
      <p>The N-of-1 trial design, which focuses on the individual patient as both the experimental and control unit, has emerged as a particularly promising approach. Several European research centers have successfully adapted this methodology for homeopathic research with compelling results.</p>
    `,
    author: "Dr. Priya Mehta",
    authorRole: "Research Director, AIIMS",
    date: "Feb 15, 2025",
    readTime: "7 min read",
    image: blog4,
  },
  {
    id: 6,
    slug: "yoga-mental-wellness",
    category: "Wellness",
    tag: "Yoga",
    title: "Yoga & Mental Wellness: Evidence-Based Approaches for Modern Healthcare",
    excerpt:
      "Examining the growing body of neuroscientific evidence supporting yoga and meditation as powerful adjuncts to conventional psychiatric and psychological treatment.",
    content: `
      <p>The global mental health crisis—with over 280 million people living with depression and anxiety—has intensified the search for effective, scalable, and cost-accessible interventions. Yoga and meditation, with thousands of years of documented practice, are increasingly at the forefront of this conversation.</p>
      <p>Neuroimaging studies at leading institutions have documented measurable changes in brain structure and function following sustained yoga practice, including increased grey matter density in the prefrontal cortex, hippocampus, and insula—regions associated with emotional regulation, memory, and self-awareness.</p>
    `,
    author: "Dr. Sanjay Gupta",
    authorRole: "Senior Consultant, Johns Hopkins",
    date: "Feb 10, 2025",
    readTime: "6 min read",
    image: blog5,
  },
  {
    id: 7,
    slug: "sustainable-healthcare-practices",
    category: "Sustainability",
    tag: "Environment",
    title: "Sustainable Healthcare: Integrating Eco-Friendly Practices in Clinical Settings",
    excerpt:
      "A look into how modern clinics and hospitals are adopting sustainable, eco-friendly practices to reduce their carbon footprint while improving patient care.",
    content: `
      <p>As the global focus shifts towards environmental conservation, the healthcare sector is taking significant steps to minimize its ecological impact. Sustainable healthcare is no longer just a buzzword; it's an essential component of public health strategy.</p>
      <p>From energy-efficient building designs to waste reduction protocols, institutions are proving that high-quality patient care and environmental stewardship can go hand in hand.</p>
    `,
    author: "Dr. Neha Kapoor",
    authorRole: "Environmental Health Specialist",
    date: "Feb 05, 2025",
    readTime: "4 min read",
    image: blog6,
  },
];

export default blogsData;
