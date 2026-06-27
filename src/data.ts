import { Service, CrystalProduct, Testimonial, BlogPost } from './types';
import amethystImage from './assets/images/regenerated_image_1782553786818.png';
import roseQuartzImage from './assets/images/regenerated_image_1782554156796.png';
import blackTourmalineImage from './assets/images/regenerated_image_1782554159966.png';
import amethystBraceletImage from './assets/images/regenerated_image_1782554163779.png';
import moonlightCleansingImage from './assets/images/regenerated_image_1782554167821.png';
import tarotBeginnersImage from './assets/images/regenerated_image_1782554171460.png';

export const SERVICES: Service[] = [
  {
    id: "one-card-pull",
    slug: "one-card-pull",
    name: "One Card Pull",
    tagline: "Quick daily guidance for your most pressing question.",
    deliveryType: "async",
    delivery: "Within 24 hours",
    price: 299,
    duration: null,
    icon: "Moon",
    benefits: [
      "1 tarot card reading",
      "Voice note interpretation (2–3 min)",
      "Guidance for 1 specific question",
      "WhatsApp delivery"
    ],
    idealFor: ["Daily guidance", "Quick clarity", "Yes/No questions"],
    badge: null,
  },
  {
    id: "current-energy-reading",
    slug: "current-energy-reading",
    name: "Current Energy Reading",
    tagline: "Know the current energy, thoughts and feelings around your situation.",
    deliveryType: "async",
    delivery: "Within 24–48 hours",
    price: 499,
    duration: null,
    icon: "Sparkles",
    benefits: [
      "3-card energy spread",
      "Current thoughts & feelings reading",
      "Voice note delivery (5–7 min)",
      "WhatsApp audio message",
      "Quick clarity + guidance"
    ],
    idealFor: ["Relationship clarity", "Know someone's feelings", "Situation check"],
    badge: null,
  },
  {
    id: "in-depth-tarot",
    slug: "in-depth-tarot-reading",
    name: "In-Depth Tarot Reading",
    tagline: "Detailed guidance on love, career, or life — up to 4 questions.",
    deliveryType: "async",
    delivery: "Within 3 days",
    price: 999,
    duration: null,
    icon: "Layers",
    benefits: [
      "Up to 4 questions",
      "Love, career & life guidance",
      "Situation analysis",
      "Detailed voice note reading (15–20 min)",
      "WhatsApp delivery",
      "Personalized guidance"
    ],
    idealFor: ["Multiple life areas", "Deep clarity", "Career + relationship both"],
    badge: "Most Popular",
  },
  {
    id: "live-tarot-session",
    slug: "live-tarot-session",
    name: "Live Tarot Session",
    tagline: "One-on-one live reading for real-time guidance and deeper answers.",
    deliveryType: "live",
    delivery: "As per availability",
    price: 1499,
    duration: 30,
    icon: "Video",
    benefits: [
      "30-minute live video session",
      "Google Meet / WhatsApp Video",
      "Relationship, career & life questions",
      "Real-time discussion",
      "Personalized remedies (if applicable)",
      "Recording shared after session"
    ],
    idealFor: ["Deep personal questions", "Interactive guidance", "Full conversation"],
    badge: "Best Value",
  },
  {
    id: "crystal-healing-session",
    slug: "crystal-healing-session",
    name: "Crystal Healing Session",
    tagline: "Identify your energy blocks and receive crystal prescriptions for healing.",
    deliveryType: "live",
    delivery: "As per availability",
    price: 1999,
    duration: 45,
    icon: "Gem",
    benefits: [
      "45-minute live session",
      "Chakra energy assessment",
      "Personalized crystal prescription",
      "Healing guidance + daily rituals",
      "Crystal pairing with your birth chart",
      "WhatsApp follow-up support (7 days)"
    ],
    idealFor: ["Energy healing", "Chakra balancing", "Crystal beginners"],
    badge: null,
  },
  {
    id: "combo-tarot-crystal",
    slug: "tarot-crystal-combo",
    name: "Tarot + Crystal Combo",
    tagline: "Complete guidance — tarot reading PLUS crystal healing in one session.",
    deliveryType: "live",
    delivery: "As per availability",
    price: 2999,
    duration: 60,
    icon: "Crown",
    benefits: [
      "60-minute live session",
      "Full tarot reading (up to 5 questions)",
      "Complete chakra + crystal assessment",
      "Crystal prescription delivered",
      "Personalized healing plan",
      "WhatsApp support for 14 days",
      "Session recording included"
    ],
    idealFor: ["Complete life guidance", "Major life decisions", "Full transformation"],
    badge: "Premium",
  },
];

export const CRYSTAL_PRODUCTS: CrystalProduct[] = [
  { id: "p1", name: "Amethyst Cluster", price: 799, originalPrice: 1099,
    category: "crystals", chakra: "Crown", zodiac: ["Pisces","Aquarius","Capricorn"],
    benefits: "Calms anxiety, enhances intuition, promotes restful sleep",
    description: "Natural raw amethyst cluster. Powerful for meditation, spiritual alignment, and peaceful dreams. Sourced with care and cleansed under the moonlight.",
    stock: 10, image: amethystImage },
  { id: "p2", name: "Rose Quartz Tower", price: 649, originalPrice: 899,
    category: "crystals", chakra: "Heart", zodiac: ["Taurus","Libra"],
    benefits: "Attracts love, heals emotional wounds, promotes self-compassion",
    description: "Polished Rose Quartz obelisk tower. The absolute stone of unconditional love and gentle healing. Exudes soft pink rays to attract harmony in relationships.",
    stock: 8, image: roseQuartzImage },
  { id: "p3", name: "Black Tourmaline Raw", price: 499, originalPrice: 699,
    category: "crystals", chakra: "Root", zodiac: ["Capricorn","Scorpio"],
    benefits: "Protects from negative energy, grounding, EMF protection",
    description: "Raw chunky black tourmaline. Excellent for shielding from psychic drain, ground stress, and clearing electronic smog from your work desks.",
    stock: 15, image: blackTourmalineImage },
  { id: "p4", name: "Crystal Bracelet — Amethyst", price: 599, originalPrice: 799,
    category: "jewelry", chakra: "Crown", zodiac: ["Pisces","Virgo"],
    benefits: "Daily spiritual protection and intuition enhancement",
    description: "8mm bead bracelet featuring premium natural amethyst, elastic band. Fully energized and spiritually aligned before packaging.",
    stock: 12, image: amethystBraceletImage },
  { id: "p5", name: "7 Chakra Bracelet", price: 899, originalPrice: 1199,
    category: "jewelry", chakra: "All", zodiac: ["All"],
    benefits: "Balances all 7 chakras, promotes overall energetic harmony",
    description: "Natural semi-precious gemstone beads corresponding to all seven key chakra energetic centers. Perfect companion for meditation and yogic practices.",
    stock: 6, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80" },
  { id: "p6", name: "Selenite Wand", price: 449, originalPrice: 599,
    category: "crystals", chakra: "Crown", zodiac: ["Taurus","Cancer"],
    benefits: "Cleanses other crystals, clears energy, promotes mental clarity",
    description: "High purity selenite crystal wand. Use to actively wipe negative vibes, sweep the aura, or rest other gemstones on it for effortless automatic recharging.",
    stock: 20, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80" },
  { id: "p7", name: "Healing Crystal Kit — Anxiety Relief", price: 1499, originalPrice: 1999,
    category: "kits", chakra: "Multiple", zodiac: ["All"],
    benefits: "Calms anxiety, promotes peace, restores emotional balance",
    description: "Hand-picked assortment of five soothing raw and tumbled crystals: Amethyst, Blue Lace Agate, Lepidolite, Black Tourmaline, and Clear Quartz. Arrives with linen storage bag and usage guidelines.",
    stock: 5, image: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=600&q=80" },
  { id: "p8", name: "Love & Relationship Kit", price: 1699, originalPrice: 2199,
    category: "kits", chakra: "Heart", zodiac: ["All"],
    benefits: "Attracts love, heals heartbreak, deepens existing relationships",
    description: "Beautifully configured 5-crystal set: Rose Quartz, Rhodonite, Malachite, Moonstone, and Garnet. Formulated to dissolve old relationship grief and open your heart to pure connections.",
    stock: 5, image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80" },
  { id: "p9", name: "White Sage Smudge Stick", price: 299, originalPrice: 399,
    category: "tools", chakra: "All", zodiac: ["All"],
    benefits: "Clears negative energy, purifies space, prepares for rituals",
    description: "Aromatic white sage bundle ethically sourced. Approx 4 inches long. Perfect for purifying home corners, reading spaces, and welcoming pristine energies.",
    stock: 25, image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80" },
  { id: "p10", name: "Tarot Journal (Spiritual)", price: 399, originalPrice: 499,
    category: "tools", chakra: "All", zodiac: ["All"],
    benefits: "Track readings, intentions, moon cycles, and spiritual growth",
    description: "Elegant gold-embossed hardcover notebook featuring tarot card template spreads, moon phase calendars, and lined pages for emotional insights.",
    stock: 15, image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=600&q=80" },
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    clientName: "Priya Sharma",
    clientCity: "Sarabha Nagar, Ludhiana",
    serviceType: "In-Depth Tarot Reading",
    rating: 5,
    quote: "I was extremely anxious about my career path and my family business transition. Her tarot voice notes on WhatsApp were so detailed and accurate! Her guidance felt like warm counsel from a sister who truly cares.",
    isApproved: true,
    isFeatured: true,
    createdAt: "2026-03-10T11:00:00Z"
  },
  {
    id: "t2",
    clientName: "Amanpreet Kaur",
    clientCity: "BRS Nagar, Ludhiana",
    serviceType: "Tarot + Crystal Combo",
    rating: 5,
    quote: "The live video combo session changed my perspective on crystal energy. The Amethyst cluster and Rose Quartz tower I bought from her store were energized, and carrying them has brought a noticeable sense of calm into my day.",
    isApproved: true,
    isFeatured: true,
    createdAt: "2026-04-15T15:30:00Z"
  },
  {
    id: "t3",
    clientName: "Rajeev Verma",
    clientCity: "Model Town, Ludhiana",
    serviceType: "Current Energy Reading",
    rating: 5,
    quote: "Incredible accuracy. She perfectly identified the emotional roadblock I was facing with my partner without me sharing any details beforehand. The remedies she gave were easy and very effective.",
    isApproved: true,
    isFeatured: true,
    createdAt: "2026-05-20T10:15:00Z"
  },
  {
    id: "t4",
    clientName: "Simran Grewal",
    clientCity: "Civil Lines, Ludhiana",
    serviceType: "Live Tarot Session",
    rating: 5,
    quote: "Booking was extremely seamless. Having an interactive live session over Google Meet allowed me to clarify my follow-up doubts instantly. She has a wonderful healing aura!",
    isApproved: true,
    isFeatured: false,
    createdAt: "2026-06-02T16:00:00Z"
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: "b1",
    slug: "moonlight-crystal-cleansing",
    title: "How to Cleanse & Charge Your Crystals Under Moonlight",
    excerpt: "Crystals absorb static vibrations from their environment. Learn the ancient ritual of cleansing under a Full Moon to restore their pristine healing energy.",
    content: `<p>Crystals are powerful energetic conduits that accumulate memories, vibes, and static charge from people and environments around them. To keep your crystals functioning at their highest frequencies, regular energetic clearing and cleansing is absolutely essential.</p>
    
    <h3>Why Cleanse Crystals?</h3>
    <p>Think of crystals as tiny recording tapes. They store the emotional frequencies they encounter. If you use an Amethyst for calming anxiety, it acts as a sponge, pulling that heavy energy away from your auric field. Over time, that sponge becomes saturated. Cleansing is the act of wringing the sponge out.</p>

    <h3>The Magic of the Full Moon</h3>
    <p>Moonlight is one of the safest and most potent methods to clear and recharge any gemstone. Unlike sun cleansing, which can bleach delicate minerals like Amethyst, Rose Quartz, or Fluorite, moonlight is cool, feminine, and profoundly restorative.</p>
    
    <h3>A Step-by-Step Full Moon Ritual:</h3>
    <ol>
      <li><strong>Gentle Water Bath:</strong> Before putting them under the moon, wash your hard crystals (like Quartz or Amethyst) in cool tap water or stream water. <em>(Warning: Selenite, Malachite, and Halite should NEVER touch water as they are water-soluble!)</em></li>
      <li><strong>Arrange Outdoors:</strong> Place your stones directly on the earth, grass, or a natural wooden tray. If outdoors isn't possible, a window sill receiving direct moonlight is perfect.</li>
      <li><strong>Set Your Intentions:</strong> As you lay each crystal down, state your intention aloud. E.g., <em>"I release all old static ties from this Rose Quartz and welcome back pure unconditional love."</em></li>
      <li><strong>The Overnight Soak:</strong> Leave them bathed under the starlight and moonlight from dusk till dawn.</li>
      <li><strong>Greeting the Dawn:</strong> Retrieve your crystals in the morning. Touch each one, thank them for their continuous protective companionship, and feel their cool, sparkling restored vitality.</li>
    </ol>`,
    category: "crystals",
    coverImage: moonlightCleansingImage,
    isPublished: true,
    publishedAt: "2026-05-12T12:00:00Z",
    createdAt: "2026-05-12T12:00:00Z",
    metaTitle: "Moonlight Crystal Cleansing Ritual | Ludhiana Tarot Oracle",
    metaDescription: "Learn how to easily cleanse and charge your raw and jewelry crystals under the Full Moon to protect and amplify their mystical healing properties."
  },
  {
    id: "b2",
    slug: "tarot-for-beginners-interpretation",
    title: "Understanding Tarot: Demystifying the Major & Minor Arcana",
    excerpt: "New to Tarot? Explore how the 78 cards form a psychological mirror reflecting your life's journey, making future guidance approachable and inspiring.",
    content: `<p>To the uninitiated, a deck of tarot cards can look intimidating, shrouded in esoteric symbols, cloaked figures, and medieval scenery. However, when understood, the tarot is not a tool for predictive fortune-telling, but rather a profound psychological mirror reflecting your inner thoughts, fears, and options.</p>

    <h3>The Structure of a Tarot Deck</h3>
    <p>A standard tarot deck consists of exactly 78 cards, divided into two primary sub-categories: the 22 Major Arcana cards and the 56 Minor Arcana cards.</p>

    <h4>1. The Major Arcana: Life's Soul Path</h4>
    <p>The 22 cards of the Major Arcana represent macro-level life phases, spiritual milestones, and unavoidable karmic transitions. When a Major Arcana card appears in your reading (like The Fool, The Empress, or The Wheel of Fortune), it signals a major shift. These are life-altering currents that demand your deep attention and conscious choice.</p>

    <h4>2. The Minor Arcana: Daily Dynamics</h4>
    <p>The remaining 56 cards represent the micro-dynamics of daily life — our passing emotions, daily thoughts, work dynamics, and physical conditions. They are divided into four suits, each corresponding to an element:</p>
    <ul>
      <li><strong>Wands (Fire):</strong> Passion, ambition, action, creativity, and spiritual flame.</li>
      <li><strong>Cups (Water):</strong> Emotions, relationships, feelings, love, and intuitive flow.</li>
      <li><strong>Swords (Air):</strong> Intellect, communication, logic, stress, and structural boundaries.</li>
      <li><strong>Pentacles (Earth):</strong> Finances, physical body, home, career, stability, and abundance.</li>
    </ul>

    <h3>How to Approach Your First Tarot Reading</h3>
    <p>Approach the cards not with fear, but with open curiosity. Formulate your question with a focus on personal empowerment. Instead of asking <em>"Will I get back with my ex?"</em>, try asking, <em>"What energy do I need to embody to heal my relationship blocks, and what is surrounding my current situation?"</em>. The mirror of the tarot will immediately reveal the underlying truths.</p>`,
    category: "tarot",
    coverImage: tarotBeginnersImage,
    isPublished: true,
    publishedAt: "2026-06-01T14:30:00Z",
    createdAt: "2026-06-01T14:30:00Z",
    metaTitle: "Beginners Guide to Tarot Meanings | Ludhiana Tarot Oracle",
    metaDescription: "An approachable guide to interpreting Major and Minor Arcana cards for personal healing, self-discovery, and intuitive decision-making."
  },
  {
    id: "b3",
    slug: "chakras-and-crystals-correlation",
    title: "Chakra Healing: Pairing Crystals with Your Body's Energy Centers",
    excerpt: "Identify blockages in your seven chakras and learn which corresponding crystal bracelets or clusters can help restore physical and emotional balance.",
    content: `<p>In yogic philosophy, our bodies hold seven main energetic wheels known as Chakras. When these chakras are open and spinning freely, vitality, emotional balance, and mental clarity flow effortlessly. When blocked by stress or past trauma, we feel sluggish, anxious, or emotionally out of sync.</p>

    <h3>The Seven Chakras and Their Perfect Crystal Allies:</h3>
    
    <h4>1. Root Chakra (Muladhara) - Base of Spine</h4>
    <p><strong>Deals with:</strong> Survival, physical safety, ground, belonging.<br/>
    <strong>Blocked by:</strong> Fear and constant anxiety.<br/>
    <strong>Crystal Allies:</strong> Raw Black Tourmaline, Red Jasper, Smoky Quartz. These dense stones absorb heavy, groundless panic and tie you securely back to Mother Earth.</p>

    <h4>2. Sacral Chakra (Svadhisthana) - Below Navel</h4>
    <p><strong>Deals with:</strong> Creativity, sensuality, passion, joy.<br/>
    <strong>Blocked by:</strong> Guilt and creative dry spells.<br/>
    <strong>Crystal Allies:</strong> Carnelian, Orange Calcite. Perfect for reigniting your inner creative spark and emotional expression.</p>

    <h4>3. Solar Plexus Chakra (Manipura) - Upper Abdomen</h4>
    <p><strong>Deals with:</strong> Personal power, confidence, boundaries, self-esteem.<br/>
    <strong>Blocked by:</strong> Shame and low self-confidence.<br/>
    <strong>Crystal Allies:</strong> Citrine, Pyrite, Tiger's Eye. Radiates warm solar rays to help you step boldly into your personal power.</p>

    <h4>4. Heart Chakra (Anahata) - Center of Chest</h4>
    <p><strong>Deals with:</strong> Unconditional love, forgiveness, grief processing, empathy.<br/>
    <strong>Blocked by:</strong> Heartbreak, resentment, and emotional isolation.<br/>
    <strong>Crystal Allies:</strong> Rose Quartz, Green Aventurine, Malachite. Dissolves hard emotional armor and allows gentle, compassionate healing to thrive.</p>

    <h4>5. Throat Chakra (Vishuddha) - Base of Throat</h4>
    <p><strong>Deals with:</strong> Authentic expression, speaking your personal truth, active listening.<br/>
    <strong>Blocked by:</strong> Secrets and fear of speaking up.<br/>
    <strong>Crystal Allies:</strong> Lapis Lazuli, Blue Lace Agate, Sodalite. Calms the vocal chords and gives you the courage to express your authentic truth clearly.</p>

    <h4>6. Third Eye Chakra (Ajna) - Between Eyebrows</h4>
    <p><strong>Deals with:</strong> Intuition, visual memory, psychic insights, imagination.<br/>
    <strong>Blocked by:</strong> Over-analysis and illusion.<br/>
    <strong>Crystal Allies:</strong> Amethyst, Labradorite. Restores connection to inner wisdom and quiet, knowing intelligence.</p>

    <h4>7. Crown Chakra (Sahasrara) - Top of Head</h4>
    <p><strong>Deals with:</strong> Spiritual connection, cosmic guidance, universal peace.<br/>
    <strong>Blocked by:</strong> Attachment to worldly ego.<br/>
    <strong>Crystal Allies:</strong> Clear Quartz, Selenite. Provides direct light channels, clearing confusion and bringing deep cosmic alignment.</p>`,
    category: "healing",
    coverImage: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80",
    isPublished: true,
    publishedAt: "2026-06-18T09:00:00Z",
    createdAt: "2026-06-18T09:00:00Z",
    metaTitle: "Chakra Crystal Healing Alignments | Ludhiana Tarot Oracle",
    metaDescription: "Master the art of balancing your physical and emotional energetic systems by pairing certified high-vibration crystals with your body's 7 chakras."
  }
];
