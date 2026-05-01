/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import {
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Play,
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Check,
  ExternalLink,
  ArrowUpRight,
  User,
  Wind,
  Droplets,
  Utensils,
  Zap,
  Anchor,
  Facebook,
  Instagram,
  Twitter,
  CreditCard,
  Lock,
} from "lucide-react";

// --- Types ---
interface Experience {
  img: string;
  tag: string;
  title: string;
  desc: string;
  features: string[];
}

interface Room {
  img: string;
  sub: string;
  title: string;
  desc: string;
  amenities: string[];
}

// --- Constants ---
const EXPERIENCES: Experience[] = [
  {
    img: "assets/occasion1.png",
    tag: "Leisure",
    title: "Sunset Cruises & Day Excursions",
    desc: "Watch the Gulf Coast horizon blaze with color as Serendipity glides through calm waters. Our sunset cruises are timed perfectly to the golden hour, with craft cocktails, soft music, and panoramic views from the flybridge.",
    features: [
      "Professional crew & captain",
      "Craft cocktails included",
      "Up to 4 hours on water",
      "Available year-round",
    ],
  },
  {
    img: "assets/occasion2.png",
    tag: "Celebration",
    title: "Birthday & Anniversary Celebrations",
    desc: "Make your milestone unforgettable. We coordinate every detail—from floral décor and custom cakes to curated playlists and chef-prepared menus—so all you do is celebrate.",
    features: [
      "Custom décor packages",
      "Private chef available",
      "Champagne toast included",
      "Photography coordination",
    ],
  },
  {
    img: "assets/occasion3.png",
    tag: "Corporate",
    title: "Corporate & Executive Events",
    desc: "Impress clients and inspire your team in an extraordinary setting. Serendipity offers an exclusive boardroom on the water with full AV capabilities, catering, and absolute privacy.",
    features: [
      "Full AV & WiFi setup",
      "Catering packages",
      "Up to 12 executives",
      "NDAs & confidentiality honored",
    ],
  },
  {
    img: "assets/occasion4.png",
    tag: "Wellness",
    title: "Wellness Retreats on the Water",
    desc: "Disconnect from the noise and reconnect with yourself. Our wellness retreats feature guided meditation, yoga on the sundeck, spa treatments, and clean, nourishing cuisine tailored to your needs.",
    features: [
      "Certified yoga instructor",
      "Spa & massage options",
      "Organic catering menu",
      "Mindfulness packages",
    ],
  },
  {
    img: "assets/occasion5.png",
    tag: "VIP Room",
    title: "First Class Relaxation",
    desc: "Experience unparalleled privacy and comfort on this expertly remodeled hardtop motor yacht. Our VIP staterooms offer a sanctuary of luxury with plush bedding, ensuite bathrooms, and personalized service to ensure your stay is nothing short of extraordinary.",
    features: [
      "Queen bed with premium bedding",
      "Private ensuite bathroom",
      "Climate-controlled environment",
    ],
  },
  {
    img: "assets/occasion6.png",
    tag: "Kitchen",
    title: "Chef's Cooking Class",
    desc: "Learn to cook delicious meals with our expert chefs in the comfort of our onboard kitchen.",
    features: [
      "Hands-on cooking experience",
      "Personalized recipes",
      "Includes meal preparation",
    ],
  },
];

const ROOMS: Room[] = [
  {
    img: "assets/gallerymain.png",
    sub: "Master Suite",
    title: "Master Stateroom",
    desc: "The crown jewel of Serendipity — a sprawling master stateroom with a king-size bed, premium linens, and a full ensuite bathroom featuring a walk-in rain shower and imported stone fixtures.",
    amenities: [
      "King bed with luxury linens",
      "Full ensuite rain shower",
      "Individual climate control",
      "Private lounge area",
    ],
  },
  {
    img: "assets/occasion5.png",
    sub: "VIP Staterooms",
    title: "Port & Starboard VIPs",
    desc: "Two symmetrical VIP staterooms — one port, one starboard — each featuring queen-size beds, ensuite bathrooms, and elegant décor.",
    amenities: [
      "Queen bed with premium bedding",
      "Private ensuite bathroom",
      "Climate-controlled environment",
    ],
  },
];

const FLEET = [
  {
    img: "assets/occasion1.png",
    name: "Serenity Wave",
    desc: "A sleek 94' masterpiece designed for those who appreciate the finer details of maritime luxury.",
  },
  {
    img: "assets/occasion2.png",
    name: "Ocean's Embrace",
    desc: "Experience unparalleled privacy and comfort on this expertly remodeled hardtop motor yacht.",
  },
  {
    img: "assets/occasion3.png",
    name: "Gulf Star",
    desc: "The perfect vessel for exploring the stunning beaches and hidden sandbars of the Gulf Coast.",
  },
  {
    img: "assets/occasion4.png",
    name: "Azure Dream",
    desc: "A floating resort offering a full suite of water sports gear for the ultimate aquatic adventure.",
  },
];

// --- Components ---

function CalendarComponent({ onSelect }: { onSelect: (date: string) => void }) {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 1)); // May 2025 as requested
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const bookedDays = [3, 7, 8, 14, 21, 22, 27];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const daysHeader = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const changeMonth = (dir: number) => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + dir, 1),
    );
  };

  const toggleDay = (d: number, isBooked: boolean) => {
    if (isBooked) return;
    const dateStr = `${d} ${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    setSelectedDays((prev) => {
      const idx = prev.indexOf(d);
      if (idx === -1) {
        onSelect(dateStr);
        return [...prev, d];
      }
      return prev.filter((day) => day !== d);
    });
  };

  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  ).getDay();
  const totalDays = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).getDate();
  const today = new Date();

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => changeMonth(-1)}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors border border-white/10 text-white/50 hover:text-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="font-serif text-lg">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </span>
        <button
          onClick={() => changeMonth(1)}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors border border-white/10 text-white/50 hover:text-white"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="cal-grid">
        {daysHeader.map((h) => (
          <div key={h} className="cal-head">
            {h}
          </div>
        ))}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="cal-day empty" />
        ))}
        {Array.from({ length: totalDays }).map((_, i) => {
          const d = i + 1;
          const isToday =
            d === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear();
          const isBooked = bookedDays.includes(d);
          const isSelected = selectedDays.includes(d);

          return (
            <div
              key={d}
              onClick={() => toggleDay(d, isBooked)}
              className={`
                cal-day 
                ${isBooked ? "booked" : isSelected ? "selected" : "available"}
                ${isToday && !isBooked ? "today" : ""}
              `}
            >
              {d}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroIdx, setHeroIdx] = useState(0);
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isAvailOpen, setIsAvailOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isRouteOpen, setIsRouteOpen] = useState(false);
  const [showFab, setShowFab] = useState(false);
  const [isStickyRoute, setIsStickyRoute] = useState(false);
  const [toasts, setToasts] = useState<
    { id: number; msg: string; title: string; type: string }[]
  >([]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowFab(window.scrollY > 600);

      // Sticky Route logic: Show between Vessel and Experiences
      const vesselSection = document.getElementById("vessel");
      const experiencesSection = document.getElementById("experiences");
      if (vesselSection && experiencesSection) {
        const vesselTop = vesselSection.offsetTop;
        const experiencesBottom =
          experiencesSection.offsetTop + experiencesSection.offsetHeight;
        setIsStickyRoute(
          window.scrollY > vesselTop && window.scrollY < experiencesBottom,
        );
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const addToast = (msg: string, title: string, type: string = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg, title, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const nextHero = () => setHeroIdx((prev) => (prev + 1) % 3);

  useEffect(() => {
    const interval = setInterval(nextHero, 6500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen selection:bg-gold selection:text-white">
      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold to-blue-400 z-[10001] origin-left shadow-[0_0_10px_rgba(201,162,39,0.5)]"
        style={{ scaleX }}
      />

      <Navbar
        isScrolled={isScrolled}
        setMobileMenuOpen={setMobileMenuOpen}
        openAvail={() => setIsAvailOpen(true)}
      />

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            setMobileMenuOpen={setMobileMenuOpen}
            openAvail={() => setIsAvailOpen(true)}
          />
        )}
      </AnimatePresence>

      <Hero
        heroIdx={heroIdx}
        setHeroIdx={setHeroIdx}
        openAvail={() => setIsAvailOpen(true)}
        openVideo={() => setIsVideoOpen(true)}
        openRoute={() => setIsRouteOpen(true)}
      />

      {/* Sticky Route Sidebar Indicator - Minimized */}
      <AnimatePresence>
        {isStickyRoute && !isRouteOpen && (
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            onClick={() => setIsRouteOpen(true)}
            className="fixed right-0 top-1/2 -translate-y-1/2 z-[999] flex items-center gap-3 bg-navy-light/60 backdrop-blur-md border-l border-y border-gold/10 pl-2 pr-1.5 py-5 rounded-l-xl cursor-pointer hover:bg-gold/10 hover:border-gold/30 transition-all group shadow-xl"
          >
            <div className="flex flex-col items-center gap-4">
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <MapPin className="w-3.5 h-3.5 text-gold group-hover:text-gold transition-colors" />
              </motion.div>
              <div className="rotate-180 [writing-mode:vertical-lr] flex items-center gap-2 whitespace-nowrap">
                <span className="text-[8px] font-bold tracking-[3px] uppercase text-white/40 group-hover:text-gold transition-colors">
                  Route
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <VesselSection
          addToast={addToast}
          openGallery={() => setIsGalleryOpen(true)}
          openAvail={() => setIsAvailOpen(true)}
        />
        <ExperiencesSection openExp={setSelectedExp} />
        <AccommodationsSection openRoom={setSelectedRoom} />
        <FleetSection />
        <CulinarySection />
        <ReviewsSection />
        <BookingSection addToast={addToast} />
      </main>

      <Footer isScrolled={isScrolled} />

      {/* --- Modals --- */}
      <AnimatePresence>
        {selectedExp && (
          <Modal onClose={() => setSelectedExp(null)}>
            <div className="max-w-3xl w-full bg-navy-light rounded-3xl overflow-hidden border border-white/10 shadow-2xl overflow-y-auto max-h-[90vh] scrollbar-hide">
              <img
                src={selectedExp.img}
                alt={selectedExp.title}
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="p-6 md:p-12">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-[1.5px] bg-gold" />
                  <span className="text-[10px] md:text-[11px] font-bold tracking-[2.5px] uppercase text-gold">
                    {selectedExp.tag} Event
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif mb-4 leading-tight">
                  {selectedExp.title}
                </h2>
                <p className="text-sm md:text-base text-white/60 mb-6 leading-relaxed">
                  {selectedExp.desc}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {selectedExp.features.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl"
                    >
                      <Check className="w-4 h-4 text-gold" />
                      <span className="text-xs md:text-sm text-white/70">
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setSelectedExp(null);
                    window.location.hash = "booking";
                  }}
                  className="w-full py-4 bg-gold text-navy font-bold rounded-xl hover:bg-gold-hover transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  Book This Experience <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Modal>
        )}

        {selectedRoom && (
          <Modal onClose={() => setSelectedRoom(null)}>
            <div className="max-w-2xl w-full bg-navy-light rounded-3xl overflow-hidden border border-white/10 shadow-2xl overflow-y-auto max-h-[90vh] scrollbar-hide">
              <img
                src={selectedRoom.img}
                alt={selectedRoom.title}
                className="w-full h-60 md:h-72 object-cover"
              />
              <div className="p-6 md:p-10">
                <span className="text-[10px] md:text-[11px] font-bold tracking-[1.5px] uppercase text-gold mb-2 block">
                  {selectedRoom.sub}
                </span>
                <h2 className="text-2xl md:text-3xl font-serif mb-4 leading-tight">
                  {selectedRoom.title}
                </h2>
                <p className="text-sm md:text-base text-white/60 mb-6 leading-relaxed">
                  {selectedRoom.desc}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {selectedRoom.amenities.map((a, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs md:text-sm text-white/60"
                    >
                      <span className="text-gold">✦</span> {a}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setSelectedRoom(null);
                    window.location.hash = "booking";
                  }}
                  className="w-full sm:w-auto px-8 py-4 bg-gold text-navy font-bold rounded-xl hover:bg-gold-hover transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  Inquire Now <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Modal>
        )}

        {isGalleryOpen && (
          <Modal onClose={() => setIsGalleryOpen(false)}>
            <div className="max-w-5xl w-full bg-navy-light rounded-3xl border border-white/10 shadow-2xl p-6 md:p-12 overflow-y-auto max-h-[90vh] scrollbar-hide">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                  <h2 className="text-2xl md:text-4xl font-serif mb-2">
                    The Collection
                  </h2>
                  <p className="text-white/40 text-sm md:text-base">
                    Serendipity — 94' Lazzara Hardtop Motor Yacht
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] font-bold uppercase tracking-widest">
                    Exterior
                  </div>
                  <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/40 text-[10px] font-bold uppercase tracking-widest">
                    Interior
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {[
                  "assets/occasion1.png",
                  "assets/occasion2.png",
                  "assets/occasion3.png",
                  "assets/occasion4.png",
                  "assets/occasion5.png",
                  "assets/occasion6.png",
                  "assets/cheryl_foods.jpeg",
                  "assets/hero1.png",
                  "assets/hero2.png",
                ].map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/5 group relative"
                  >
                    <img
                      src={img}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt={`Gallery ${i}`}
                    />
                    <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors duration-500" />
                  </motion.div>
                ))}
              </div>
            </div>
          </Modal>
        )}

        {isAvailOpen && (
          <Modal onClose={() => setIsAvailOpen(false)}>
            <div className="max-w-lg w-full bg-navy-light rounded-3xl overflow-y-auto max-h-[90vh] scrollbar-hide border border-white/10 shadow-2xl relative">
              <div className="p-6 md:p-12">
                <h2 className="text-2xl md:text-3xl font-serif mb-2 mr-5">
                  Check Availability
                </h2>
                <p className="text-white/40 mb-8 text-xs md:text-sm">
                  Select your desired dates to check current availability.
                </p>

                <CalendarComponent
                  onSelect={(date) =>
                    addToast(`Selected ${date}`, "Date Added", "gold")
                  }
                />

                <div className="mt-8 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-gold" />
                    <span className="text-[10px] uppercase tracking-wider text-white/50">
                      Selected
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded border border-gold" />
                    <span className="text-[10px] uppercase tracking-wider text-white/50">
                      Today
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-red-500/10 text-red-500/50" />
                    <span className="text-[10px] uppercase tracking-wider text-white/50">
                      Booked
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-white/10" />
                    <span className="text-[10px] uppercase tracking-wider text-white/50">
                      Available
                    </span>
                  </div>
                </div>

                <a
                  href="#booking"
                  onClick={() => setIsAvailOpen(false)}
                  className="mt-10 w-full py-4 bg-gold text-navy font-bold rounded-xl hover:bg-gold-hover transition-colors flex items-center justify-center gap-2 ripple-btn text-sm md:text-base"
                >
                  Request Selected Dates <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </Modal>
        )}

        {isVideoOpen && (
          <Modal onClose={() => setIsVideoOpen(false)}>
            <div className="w-[95vw] md:w-[80vw] lg:w-[70vw] aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl relative border border-white/10">
              <iframe
                src="https://player.vimeo.com/video/778990092?autoplay=1&color=c9a227&title=0&byline=0&portrait=0"
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </Modal>
        )}

        {isRouteOpen && (
          <Modal onClose={() => setIsRouteOpen(false)}>
            <div className="max-w-2xl w-full bg-navy-light rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl flex flex-col scrollbar-hide overflow-y-auto max-h-[95vh] md:max-h-[90vh]">
              <div className="relative h-48 md:h-64 shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000"
                  className="w-full h-full object-cover"
                  alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-light via-transparent to-transparent" />
                <div className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-2 bg-gold/90 px-3 py-1.5 rounded-full text-navy font-bold text-[10px] uppercase tracking-widest shadow-lg">
                  <Star className="w-3 h-3 fill-current" /> High Demand
                </div>
              </div>

              <div className="p-6 md:p-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-[1.5px] bg-gold" />
                  <span className="text-[10px] md:text-[11px] font-bold tracking-[2px] uppercase text-gold">
                    Exclusive Itinerary
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif mb-4">
                  The Island Hopper
                </h2>
                <p className="text-xs md:text-sm text-white/60 mb-8 leading-relaxed">
                  Navigate the crown jewels of Florida's coast. From the
                  pristine sandbars of Egmont Key to the bohemian charm of
                  Pass-A-Grille, this route is curated for those who seek the
                  perfect balance of seclusion and style.
                </p>

                <div className="space-y-4 md:space-y-6">
                  {[
                    {
                      t: "Egmont Key State Park",
                      d: "Visit the historic lighthouse and explore ruins hidden within lush foliage.",
                    },
                    {
                      t: "Shell Key Preserve",
                      d: "Anchor in crystal turquoise waters for world-class shelling and paddleboarding.",
                    },
                    {
                      t: "Pass-A-Grille Historic District",
                      d: "Enjoy a legendary sunset with a curated beach picnic delivered to your yacht.",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 md:gap-6 group">
                      <div className="flex flex-col items-center">
                        <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-gold/30 flex items-center justify-center text-[9px] md:text-[10px] text-gold font-bold transition-all group-hover:bg-gold group-hover:text-navy shrink-0">
                          {idx + 1}
                        </div>
                        {idx < 2 && (
                          <div className="w-px h-full bg-white/10 my-1 md:my-2" />
                        )}
                      </div>
                      <div className="pb-2 md:pb-4">
                        <h4 className="font-bold text-xs md:text-sm mb-1 group-hover:text-gold transition-colors">
                          {item.t}
                        </h4>
                        <p className="text-[10px] md:text-xs text-white/40 leading-relaxed">
                          {item.d}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="text-center sm:text-left">
                    <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">
                      Duration
                    </p>
                    <p className="font-serif text-gold text-lg">4 - 8 Hours</p>
                  </div>
                  <button
                    onClick={() => {
                      setIsRouteOpen(false);
                      window.location.hash = "booking";
                    }}
                    className="w-full sm:w-auto px-8 py-4 bg-gold text-navy font-bold rounded-xl text-sm transition-all hover:scale-105 active:scale-95 shadow-xl shadow-gold/20"
                  >
                    Reserve This Route
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* FAB */}

      <AnimatePresence>
        {showFab && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-gold to-gold/80 rounded-full flex items-center justify-center shadow-xl z-50 group"
          >
            <ChevronLeft className="w-6 h-6 text-navy rotate-90 group-hover:translate-y-[-2px] transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Toasts */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-[10001]">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              className={`p-4 min-w-64 bg-navy-light/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex items-center gap-4`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${t.type === "gold" ? "bg-gold/15" : "bg-green-500/15"}`}
              >
                {t.type === "gold" ? (
                  <Zap className="w-4 h-4 text-gold" />
                ) : (
                  <Check className="w-4 h-4 text-green-500" />
                )}
              </div>
              <div>
                <p className="text-sm font-bold">{t.title}</p>
                <span className="text-xs text-white/40 block mt-1">
                  {t.msg}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Navbar({
  isScrolled,
  setMobileMenuOpen,
  openAvail,
}: {
  isScrolled: boolean;
  setMobileMenuOpen: (o: boolean) => void;
  openAvail: () => void;
}) {
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${isScrolled ? "bg-navy/95 backdrop-blur-md py-3 shadow-xl" : "py-8 bg-transparent"}`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="/">
          <img src="assets/logo.png" alt="Logo" width="120" />
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {[
            "Vessel",
            "Experiences",
            "Accommodations",
            "Fleet",
            "Culinary",
            "Reviews",
          ].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="px-4 py-2 text-[10px] font-bold tracking-[2.5px] uppercase text-white/50 hover:text-gold transition-all relative group/link"
            >
              {l}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-gold transition-all duration-500 group-hover/link:w-6" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={openAvail}
            className="hidden md:flex items-center gap-3 px-6 py-2.5 rounded-full bg-gold text-navy text-[9px] font-bold uppercase tracking-[2px] transition-all hover:bg-white hover:scale-105 active:scale-95 shadow-lg shadow-gold/20"
          >
            Inquire Now
          </button>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white lg:hidden hover:bg-gold hover:text-navy transition-all"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}

function MobileMenu({
  setMobileMenuOpen,
  openAvail,
}: {
  setMobileMenuOpen: (o: boolean) => void;
  openAvail: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-navy/98 backdrop-blur-2xl z-[2000] flex flex-col items-center justify-center p-8"
    >
      <button
        onClick={() => setMobileMenuOpen(false)}
        className="absolute top-8 right-8 p-3 text-white/50 hover:text-white transition-colors"
      >
        <X className="w-8 h-8" />
      </button>

      <div className="flex flex-col gap-8 text-center mb-16">
        {[
          "Home",
          "Vessel",
          "Experiences",
          "Accommodations",
          "Fleet",
          "Culinary",
          "Reviews",
          "Contact",
        ].map((l, i) => (
          <motion.a
            key={l}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 + 0.2 }}
            href={`#${l === "Home" ? "home" : l === "Contact" ? "booking" : l.toLowerCase()}`}
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl md:text-3xl font-serif text-white hover:text-gold transition-colors tracking-wide"
          >
            {l}
          </motion.a>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        onClick={() => {
          setMobileMenuOpen(false);
          openAvail();
        }}
        className="flex items-center gap-4 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-gold text-xs font-bold uppercase tracking-[3px] backdrop-blur-xl hover:bg-gold/10 hover:border-gold/30 transition-all"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-green-500 relative">
          <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse blur-[2px]" />
        </div>
        Availability
      </motion.button>
    </motion.div>
  );
}

function Hero({
  heroIdx,
  setHeroIdx,
  openAvail,
  openVideo,
  openRoute,
}: {
  heroIdx: number;
  setHeroIdx: React.Dispatch<React.SetStateAction<number>>;
  openAvail: () => void;
  openVideo: () => void;
  openRoute: () => void;
}) {
  const slides = [
    {
      line1: "The Pinnacle of",
      line2: "Gulf Coast Luxury",
      desc: "Immerse yourself in a refined maritime escape aboard our meticulously curated 94' Lazzara hardtop motor yacht.",
      img: "assets/hero1.png",
      tag: "Saint Petersburg • Florida",
    },
    {
      line1: "Curated Moments",
      line2: "Tailored for You",
      desc: "From sunset cocktails to multi-day escapes, every detail is engineered for unforgettable luxury.",
      img: "assets/hero2.png",
      tag: "Tampa Bay • Florida",
    },
    {
      line1: "A Floating Oasis of",
      line2: "Serene Sophistication",
      desc: "Discover the perfect harmony of high-performance engineering and residential-level comfort at sea.",
      img: "assets/hero3.png",
      tag: "The Gulf Coast • Florida",
    },
  ];

  return (
    <section
      id="home"
      className="relative h-screen flex items-center overflow-hidden bg-navy"
    >
      {/* Background Visuals */}
      <AnimatePresence mode="wait">
        <motion.div
          key={heroIdx}
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 2, ease: [0.19, 1, 0.22, 1] }}
          className="absolute inset-0"
        >
          <img
            src={slides[heroIdx].img}
            className="w-full h-full object-cover"
            alt=""
          />
          {/* Depth Gradient for better readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-transparent to-navy/70" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <motion.div
              key={heroIdx + "content"}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5,
                duration: 1.2,
                ease: [0.19, 1, 0.22, 1],
              }}
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-10 h-[1px] bg-gold" />
                <span className="text-[9px] font-bold tracking-[5px] uppercase text-gold">
                  {slides[heroIdx].tag}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif leading-[1.1] mb-5 tracking-[-0.02em]">
                {slides[heroIdx].line1}
                <br />
                <span className="italic text-white">
                  {slides[heroIdx].line2}
                </span>
              </h1>
              <p className="text-xs md:text-base text-white/60 mb-8 md:mb-10 leading-relaxed max-w-md font-light tracking-wide">
                {slides[heroIdx].desc}
              </p>

              <div className="flex flex-wrap gap-5 items-center">
                <button
                  onClick={openAvail}
                  className="group relative px-8 py-4 overflow-hidden rounded-full"
                >
                  <div className="absolute inset-0 bg-gold transition-transform duration-500 group-hover:scale-105" />
                  <span className="relative z-10 text-navy font-bold text-[10px] uppercase tracking-[3px]">
                    Inquire Availability
                  </span>
                </button>

                <button
                  onClick={openVideo}
                  className="group flex items-center gap-4 text-white"
                >
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-gold transition-all duration-500 group-hover:bg-gold/5">
                    <Play className="w-3 h-3 text-gold fill-gold" />
                  </div>
                  <div className="flex flex-col items-start translate-x-[-10px] group-hover:translate-x-0 transition-transform duration-500">
                    <span className="text-[8px] font-bold uppercase tracking-[2px] text-white/50">
                      Preview
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-[2px]">
                      Experience
                    </span>
                  </div>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Floating Route Card */}
          <div className="hidden lg:block lg:col-span-3 lg:col-start-10 relative">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{
                opacity: 1,
                x: 0,
                y: [0, -10, 0],
              }}
              transition={{
                opacity: { delay: 1, duration: 1 },
                x: { delay: 1, duration: 1 },
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              onClick={openRoute}
              className="bg-navy-light/40 backdrop-blur-2xl border border-white/10 p-4 rounded-[1.5rem] shadow-2xl cursor-pointer hover:border-gold/50 transition-all group lg:scale-75 origin-right"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-gold" />
                  <span className="text-[8px] font-bold uppercase tracking-[3px] text-gold">
                    Popular Route
                  </span>
                </div>
                <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>

              <div className="aspect-video rounded-lg overflow-hidden mb-4 border border-white/5">
                <img
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600"
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                  alt=""
                />
              </div>

              <h4 className="text-base font-serif mb-2">The Island Hopper</h4>
              <p className="text-white/40 text-[10px] leading-relaxed line-clamp-2">
                Discover the Gulf's most pristine sandbars and historic
                lighthouse islands.
              </p>

              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-2 h-2 fill-gold text-gold" />
                  ))}
                </div>
                <span className="text-[8px] font-bold uppercase tracking-[2px] text-white/30">
                  Select Route
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Hero Navigation */}
      <div className="absolute bottom-8 left-0 w-full px-5 md:px-16 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIdx(i)}
              className={`w-2.5 h-2.5 rounded-full border border-white/30 transition-all duration-500 ${heroIdx === i ? "bg-gold border-gold scale-110" : "hover:border-white"}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() =>
              setHeroIdx((curr) => (curr === 0 ? slides.length - 1 : curr - 1))
            }
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-navy transition-all group scale-90 md:scale-100"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={() =>
              setHeroIdx((curr) => (curr === slides.length - 1 ? 0 : curr + 1))
            }
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-navy transition-all group scale-90 md:scale-100"
          >
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Decorative Side Element */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-6">
        <div className="w-[1px] h-24 bg-gradient-to-t from-gold to-transparent" />
        <span className="[writing-mode:vertical-lr] text-[10px] font-bold uppercase tracking-[5px] text-gold/40">
          Luxury Charter St. Pete
        </span>
        <div className="w-[1px] h-24 bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
}

function VesselSection({
  addToast,
  openGallery,
  openAvail,
}: {
  addToast: (m: string, t: string, tp: string) => void;
  openGallery: () => void;
  openAvail: () => void;
}) {
  return (
    <section
      id="vessel"
      className="py-12 md:py-16 bg-stone relative overflow-hidden group/vessel"
    >
      <div className="absolute top-0 right-0 p-8 opacity-[0.02] select-none pointer-events-none">
        <h2 className="text-[120px] font-serif leading-none rotate-90 origin-right">
          YACHT
        </h2>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="relative lg:max-w-sm mx-auto"
        >
          <div
            className="aspect-[5/6] rounded-[1.5rem] overflow-hidden shadow-2xl relative group cursor-pointer"
            onClick={openGallery}
          >
            <img
              src="assets/hero1.png"
              className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              alt="Serendipity Vessel"
            />
            <div className="absolute inset-0 bg-navy/5 group-hover:bg-transparent transition-all duration-700" />
            <div className="absolute inset-0 border-[8px] border-white/5 m-3 rounded-[1.2rem] pointer-events-none group-hover:border-gold/10 transition-colors duration-500" />
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute -left-2 md:-left-6 bottom-8 bg-white p-5 rounded-xl shadow-xl border border-navy/5 hidden sm:block"
          >
            <p className="text-2xl font-serif text-navy tracking-tighter">
              94 FT
            </p>
            <p className="text-[7px] font-bold text-gold uppercase tracking-[3px] opacity-80 leading-none">
              Lazzara Hardtop
            </p>
          </motion.div>
        </motion.div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-[1px] bg-gold" />
              <span className="text-[9px] font-bold tracking-[5px] uppercase text-gold">
                Technical Profile
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-navy mb-5 leading-[1.1] tracking-tight">
              A Masterclass in <br />
              <span className="italic text-gold">Nautical Refinement</span>
            </h2>

            <p className="text-navy/60 text-xs md:text-sm leading-relaxed mb-8 font-light max-w-lg">
              Refined by design, Serendipity offers a contemporary coastal
              aesthetic that transforms every charter into a residence-level
              experience.
            </p>

            <div className="grid grid-cols-2 gap-x-12 gap-y-8 mb-12 border-t border-navy/5 pt-8">
              {[
                { label: "Crew", val: "Professional" },
                { label: "Year", val: "2025 Refit" },
                { label: "Capacity", val: "12 Guests" },
                { label: "Suites", val: "4 Staterooms" },
              ].map((s, i) => (
                <div key={i} className="group/item">
                  <p className="text-[8px] font-bold text-gold uppercase tracking-[3px] mb-1 opacity-70">
                    {s.label}
                  </p>
                  <p className="text-xl font-serif text-navy leading-none">
                    {s.val}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={openAvail}
              className="group flex items-center gap-4 text-navy font-bold text-[10px] uppercase tracking-[4px]"
            >
              <div className="w-12 h-12 rounded-full border border-navy/10 flex items-center justify-center transition-all duration-500 group-hover:bg-gold group-hover:border-gold shadow-md">
                <ArrowUpRight className="w-5 h-5 group-hover:text-white transition-transform group-hover:rotate-45" />
              </div>
              Booking Request
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ExperiencesSection({ openExp }: { openExp: (e: Experience) => void }) {
  const [idx, setIdx] = useState(EXPERIENCES.length);
  const [isAnimating, setIsAnimating] = useState(false);
  const [transitionStatus, setTransitionStatus] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const extendedItems = useMemo(
    () => [...EXPERIENCES, ...EXPERIENCES, ...EXPERIENCES],
    [],
  );

  const slide = (d: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTransitionStatus(true);
    setIdx((prev) => prev + d);
    setTimeout(() => setIsAnimating(false), 450);
  };

  useEffect(() => {
    if (isAnimating) return;
    if (idx >= EXPERIENCES.length * 2) {
      setTransitionStatus(false);
      setIdx(idx - EXPERIENCES.length);
    } else if (idx < EXPERIENCES.length) {
      setTransitionStatus(false);
      setIdx(idx + EXPERIENCES.length);
    }
  }, [idx, isAnimating]);

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1400,
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const itemWidth = isMobile ? windowWidth - 64 : 380;
  const gap = isMobile ? 12 : 32;
  const offset = (windowWidth - itemWidth) / 2;

  return (
    <section
      id="experiences"
      className="py-24 md:py-32 bg-navy overflow-hidden relative"
    >
      <div className="hidden md:block absolute inset-0 bg-gradient-to-b from-navy via-navy/50 to-navy-light opacity-30" />
      <div className="hidden md:block absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,159,101,0.05)_0%,transparent_70%)]" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 px-5 md:px-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-gold" />
              <span className="text-[10px] font-bold tracking-[4px] uppercase text-gold">
                The Experience
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white tracking-tight leading-[1] mb-6">
              Refined <br />
              <span className="italic text-gold">Moments</span>
            </h2>
            <p className="max-w-md text-white/40 text-sm font-light leading-relaxed">
              Every charter is a bespoke creation tailored to the unique desires
              of our guests.
            </p>
          </div>

          <div className="hidden md:flex gap-4">
            <button
              onClick={() => slide(-1)}
              className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-navy transition-all duration-500 group"
            >
              <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-1" />
            </button>
            <button
              onClick={() => slide(1)}
              className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-navy transition-all duration-500 group"
            >
              <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        <div className="relative overflow-visible" ref={containerRef}>
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            dragMomentum={false}
            animate={{ x: -idx * (itemWidth + gap) + offset }}
            transition={
              transitionStatus
                ? {
                    type: "spring",
                    stiffness: 150,
                    damping: 25,
                    mass: 0.8,
                  }
                : { duration: 0 }
            }
            onDragEnd={(_, info) => {
              const swipeThreshold = 50;
              if (info.offset.x < -swipeThreshold) slide(1);
              else if (info.offset.x > swipeThreshold) slide(-1);
            }}
            className="flex"
            style={{
              gap: `${gap}px`,
              willChange: "transform",
              touchAction: "pan-y",
            }}
          >
            {extendedItems.map((e, i) => (
              <div
                key={i}
                onClick={() => openExp(e)}
                style={{ width: `${itemWidth}px` }}
                className="aspect-[10/13] relative group rounded-[2rem] md:rounded-[2.5rem] overflow-hidden cursor-pointer shrink-0 shadow-2xl border border-white/5"
              >
                <img
                  src={e.img}
                  className="absolute inset-0 w-full h-full object-cover"
                  alt=""
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-4 h-[1px] bg-gold" />
                    <span className="text-[8px] font-bold text-gold uppercase tracking-[2px]">
                      {e.tag}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif text-white group-hover:text-gold transition-colors duration-500 mb-2">
                    {e.title}
                  </h3>
                  <div className="hidden md:flex items-center gap-2 text-white/30 group-hover:text-gold transition-all duration-700 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0">
                    <span className="text-[10px] font-bold uppercase tracking-[4px]">
                      Explore Experience
                    </span>
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex justify-center gap-3 mt-16 pb-4">
          {EXPERIENCES.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const currentRelIdx = idx % EXPERIENCES.length;
                slide(i - currentRelIdx);
              }}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx % EXPERIENCES.length === i
                  ? "w-12 bg-gold"
                  : "w-4 bg-white/10 hover:bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AccommodationsSection({ openRoom }: { openRoom: (r: Room) => void }) {
  const features = [
    "Hot/Cold Jacuzzi",
    "Oversized sun lounges",
    "Al fresco dining area",
    "Professional wet bar",
    "Surround sound system",
    "LED ambient lighting",
  ];

  return (
    <section
      id="accommodations"
      className="py-20 md:py-28 px-5 md:px-16 bg-white relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-gold" />
              <span className="text-[10px] font-bold tracking-[4px] uppercase text-gold">
                Luxury Living
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[70px] font-serif text-navy leading-[1.1] tracking-tight">
              Elegant Accommodations <br />
              <span className="italic text-gold block mt-2">
                for Up to 12 Guests
              </span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pb-4">
            <p className="text-navy/50 text-xs md:text-sm font-light leading-relaxed max-w-sm ml-auto">
              Rest and unwind in four refined guest suites, each designed for
              absolute comfort and offering total privacy.
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Visual - Large Card */}
          <div className="lg:col-span-7 relative group">
            <div className="overflow-hidden rounded-[2.5rem] shadow-2xl relative aspect-[4/3] lg:aspect-auto lg:h-[550px]">
              <img
                src="assets/gallerymain.png"
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                alt="Main Saloon"
              />
              <div className="absolute inset-0 bg-navy/5 group-hover:bg-transparent transition-all duration-700" />

              {/* Floating Label */}
              <div className="absolute bottom-10 left-10">
                <div className="bg-white/95 backdrop-blur-xl border border-navy/5 p-6 rounded-2xl shadow-2xl">
                  <p className="text-2xl md:text-3xl font-serif text-gold leading-none mb-1">
                    4
                  </p>
                  <p className="text-[8px] font-bold text-navy/40 uppercase tracking-[2px]">
                    Private Suites
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Room Cards & Features */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {ROOMS.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => openRoom(r)}
                className="group cursor-pointer bg-stone border border-navy/5 rounded-3xl p-5 flex items-center gap-6 hover:bg-stone-light hover:border-gold/30 transition-all shadow-lg"
              >
                <div className="w-20 h-20 md:w-28 md:h-24 rounded-2xl overflow-hidden shrink-0 shadow-lg border border-navy/5">
                  <img
                    src={r.img}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt=""
                  />
                </div>
                <div className="flex-grow">
                  <h4 className="text-lg font-serif text-navy mb-1 group-hover:text-gold transition-colors">
                    {r.title}
                  </h4>
                  <p className="text-[10px] text-navy/40 uppercase tracking-[1px]">
                    {r.sub}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-navy/20 group-hover:text-gold group-hover:translate-x-1 transition-all mr-2" />
              </motion.div>
            ))}

            {/* Premium Features Box */}
            <div className="bg-stone border border-navy/5 rounded-[2.5rem] p-8 md:p-10 mt-2 shadow-lg">
              <h5 className="text-xl font-serif text-navy mb-8">
                Premium Flybridge Features
              </h5>
              <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                {features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20">
                      <Check className="w-3 h-3 text-gold" />
                    </div>
                    <span className="text-[10px] text-navy/60 font-light tracking-wide">
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FleetSection() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section
      id="fleet"
      className="py-12 md:py-16 bg-navy relative border-t border-white/5"
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-[1px] bg-gold" />
              <span className="text-[9px] font-bold tracking-[5px] uppercase text-gold">
                The Collection
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.1] tracking-tight">
              Adventure <br />
              <span className="italic text-gold">Arsenal</span>
            </h2>
          </div>
          <p className="max-w-sm text-white/30 text-[10px] md:text-xs font-light tracking-wide leading-relaxed">
            Beyond the vessel itself, we maintain a fleet of world-class water
            sports equipment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {FLEET.map((f, i) => (
            <div
              key={i}
              className="relative aspect-[10/14] rounded-[1.5rem] overflow-hidden group cursor-pointer border border-white/5 shadow-xl bg-navy-light"
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setActiveCard(activeCard === i ? null : i);
                }
              }}
            >
              <img
                src={f.img}
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ${activeCard === i ? "scale-110" : "group-hover:scale-110"}`}
                alt=""
              />
              {/* Desktop: Hover logic. Mobile: state logic */}
              <div
                className={`absolute inset-0 transition-all duration-700 
                  ${activeCard === i ? "bg-navy/95" : "bg-navy/40 active:bg-navy/95 group-hover:bg-navy/95"}`}
              />

              <div className="absolute inset-0 p-8 flex flex-col justify-center text-center">
                <div className="transition-all duration-700">
                  <p
                    className={`font-serif text-2xl md:text-3xl mb-4 transition-colors ${activeCard === i ? "text-gold" : "text-white group-hover:text-gold"}`}
                  >
                    {f.name}
                  </p>
                  <p
                    className={`text-[11px] md:text-xs leading-relaxed transition-all duration-700 mx-auto max-w-[240px] text-white/70 
                        ${activeCard === i ? "opacity-100 mb-8" : "opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 group-hover:mb-8"}`}
                  >
                    {f.desc}
                  </p>
                </div>
                <div
                  className={`flex items-center justify-center gap-3 transition-all duration-700 
                      ${activeCard === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"}`}
                >
                  <span className="text-[9px] font-bold uppercase tracking-[3px] text-gold">
                    Technical Profile
                  </span>
                  <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-navy transition-all">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CulinarySection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slides = [
    {
      id: "chef",
      tag: "Cuisine Mastery",
      name: "Chef Cheryl",
      role: "Premier Culinary Artist",
      profileImg:
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=200",
      titleLine1: "Elevated ",
      titleItalic: "Epicurean",
      titleLine2: " Excellence",
      description:
        "Chef Cheryl transforms the yacht's galley into a world-class kitchen, delivering bespoke menus.",
      items: [
        "assets/cheryl_foods.jpeg",
        "assets/cheryl_foods1.jpeg",
        "assets/cheryl_foods2.jpeg",
      ],
      mainImgs: [
        "assets/cheryl_foods.jpeg",
        "assets/cheryl_foods1.jpeg",
        "assets/cheryl_foods2.jpeg",
      ],
      icon: <Utensils className="w-4 h-4 text-gold" />,
    },
    {
      id: "mixology",
      tag: "Liquid Artistry",
      name: "Nelly the Mixologist",
      role: "Cocktail Architect",
      profileImg:
        "https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&q=80&w=200",
      titleLine1: "Crafting spirits that ",
      titleItalic: "Inspire",
      titleLine2: " dialogue",
      description:
        "Nelly's mixology is an exploration of flavor and form using house-made infusions.",
      items: [
        "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=400",
      ],
      mainImgs: [
        "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=400",
      ],
      icon: (
        <svg
          className="w-4 h-4 text-gold"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M7.5,7L5.5,5H18.5L16.5,7M11,13V19H6V21H18V19H13V13L21,5V3H3V5L11,13Z" />
        </svg>
      ),
    },
  ];

  const nextSlide = () => {
    setDirection(1);
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section
      id="culinary"
      className="py-8 md:py-10 bg-navy relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-stone/5 opacity-5" />

      <div className="max-w-[1400px] mx-auto px-5 md:px-16 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between px-5 md:px-0 gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-[1px] bg-gold" />
              <span className="text-[9px] font-bold tracking-[5px] uppercase text-gold">
                Epicurean Theatre
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1]">
              Gastronomic <br />
              <span className="italic text-gold">Theatre</span>
            </h2>
          </div>

          <div className="hidden lg:flex gap-3">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-navy transition-all duration-500 group"
            >
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-navy transition-all duration-500 group"
            >
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Slide Indicators for Mobile/Tablet */}
          <div className="flex lg:hidden gap-2 mt-4 relative z-10">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 transition-all duration-500 rounded-full ${
                  activeSlide === i ? "w-8 bg-gold" : "w-2 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="relative min-h-[600px] lg:h-[650px] overflow-hidden lg:overflow-visible">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -100) nextSlide();
                else if (info.offset.x > 100) prevSlide();
              }}
              transition={{
                x: { type: "spring", stiffness: 100, damping: 20 },
                opacity: { duration: 0.4 },
                scale: { duration: 0.6 },
              }}
              className="lg:absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full">
                <div className="order-2 lg:order-1">
                  <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-6 md:p-10 shadow-2xl relative overflow-hidden group/card hover:border-gold/20 transition-all duration-700">
                    <div className="absolute -top-32 -left-32 w-64 h-64 bg-gold/5 rounded-full blur-[100px]" />

                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-8 h-[1px] bg-gold/30" />
                        <span className="text-[8px] font-bold tracking-[4px] uppercase text-gold/60">
                          {slides[activeSlide].tag}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-gold/20 p-1 shrink-0 shadow-2xl relative transition-colors duration-700">
                          <img
                            src={slides[activeSlide].profileImg}
                            className="w-full h-full object-cover rounded-full"
                            alt={slides[activeSlide].name}
                          />
                          <div className="absolute -bottom-1 -right-1 bg-navy border border-white/10 rounded-full p-1 scale-75">
                            {slides[activeSlide].icon}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg md:text-xl font-serif text-white mb-0.5">
                            {slides[activeSlide].name}
                          </h3>
                          <p className="text-gold text-[8px] uppercase tracking-[3px] font-bold opacity-70">
                            {slides[activeSlide].role}
                          </p>
                        </div>
                      </div>

                      <h2 className="text-xl md:text-2xl font-serif text-white mb-4 leading-[1.2] tracking-tight">
                        {slides[activeSlide].titleLine1}
                        <span className="italic text-gold">
                          {slides[activeSlide].titleItalic}
                        </span>
                      </h2>

                      <p className="text-white/30 text-xs md:text-sm leading-relaxed font-light mb-8">
                        {slides[activeSlide].description}
                      </p>

                      <div className="flex items-center gap-4">
                        <div className="flex -space-x-2">
                          {slides[activeSlide].items.map((img, i) => (
                            <div
                              key={i}
                              className="w-10 h-10 rounded-full border-2 border-navy overflow-hidden shadow-lg transition-transform duration-500"
                            >
                              <img
                                src={img}
                                className="w-full h-full object-cover"
                                alt=""
                              />
                            </div>
                          ))}
                        </div>
                        <span className="text-[8px] font-bold uppercase tracking-[2px] text-white/20">
                          Signature Selection
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="order-1 lg:order-2 grid grid-cols-2 gap-4 md:gap-5 relative">
                  <div className="mt-8">
                    <motion.img
                      whileHover={{ y: -5, scale: 1.02 }}
                      src={slides[activeSlide].mainImgs[0]}
                      className="w-full aspect-[4/5] object-cover rounded-[1.5rem] shadow-2xl border border-white/5"
                      alt=""
                    />
                  </div>
                  <div>
                    <motion.img
                      whileHover={{ y: -5, scale: 1.02 }}
                      src={slides[activeSlide].mainImgs[1]}
                      className="w-full aspect-[4/5] object-cover rounded-[1.5rem] shadow-2xl border border-white/5"
                      alt=""
                    />
                  </div>
                  <div className="col-span-2 px-6 md:px-12 -mt-8 relative z-10">
                    <motion.img
                      whileHover={{ scale: 1.02 }}
                      src={slides[activeSlide].mainImgs[2]}
                      className="w-full aspect-video md:aspect-[3/1] object-cover rounded-[1.5rem] shadow-2xl border border-white/5"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  const reviewsList = [
    {
      name: "Carolina Reyes",
      role: "5-Day Charter Guest",
      text: "We just had a 5 day charter and we could not be any happier. Captain John, Jake and Hailey were amazing. 5 stars no doubt!!!",
      initial: "CR",
    },
    {
      name: "Shannon Cook",
      role: "Day Cruise Guest",
      text: "I had the opportunity to be a guest for a day cruise and it was lovely. Highly recommend!",
      initial: "S",
    },
    {
      name: "Byron Wilson",
      role: "Weekend Charter Guest",
      text: "We had an amazing time aboard the Serendipity! Unforgettable from start to finish.",
      initial: "B",
    },
    {
      name: "Michael Chen",
      role: "Corporate Event",
      text: "Stunning yacht and professional crew. The perfect venue for networking.",
      initial: "M",
    },
    {
      name: "Sarah Jenkins",
      role: "Sunset Cruise",
      text: "The attention to detail on Serendipity is unmatched. Truly first-class.",
      initial: "S",
    },
    {
      name: "David Miller",
      role: "Anniversary Guest",
      text: "An absolute dream. The crew went above and beyond to make our anniversary special.",
      initial: "D",
    },
  ];

  const infiniteReviews = [...reviewsList, ...reviewsList];

  return (
    <section
      id="reviews"
      className="py-12 md:py-16 bg-stone relative overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-16 mb-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-[1px] bg-gold" />
          <span className="text-[9px] font-bold tracking-[5px] uppercase text-gold">
            Voices of Distinction
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-navy leading-[1.1] tracking-tight">
            Testimonials <br />
            <span className="italic text-gold">Refinement</span>
          </h2>
          <div className="flex flex-col items-start md:items-end font-sans">
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-gold text-gold" />
              ))}
            </div>
            <p className="text-[9px] font-bold text-navy uppercase tracking-widest">
              5.0 Star Composite
            </p>
          </div>
        </div>
      </div>

      <div className="flex overflow-hidden relative py-6">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-6 whitespace-nowrap"
        >
          {infiniteReviews.map((r, i) => (
            <div
              key={i}
              className="w-[300px] md:w-[420px] shrink-0 p-10 md:p-12 bg-white rounded-[2.5rem] whitespace-normal group border border-navy/5 shadow-xl"
            >
              <p className="text-lg font-serif text-navy leading-relaxed mb-8 italic">
                "{r.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-navy text-gold rounded-full flex items-center justify-center font-bold text-[10px] tracking-widest">
                  {r.initial}
                </div>
                <div>
                  <h5 className="font-bold text-navy text-xs mb-0.5">
                    {r.name}
                  </h5>
                  <p className="text-[8px] text-gold uppercase tracking-[3px] font-bold opacity-70">
                    {r.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function BookingSection({
  addToast,
}: {
  addToast: (m: string, t: string, tp: string) => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      addToast("Your inquiry has been processed.", "Success", "success");
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <section
      id="booking"
      className="py-24 md:py-32 bg-navy relative overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="assets/hero1.png"
          className="w-full h-full object-cover opacity-100"
          alt="Yacht Background"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/80" />
      </div>

      <div className="max-w-[1400px] mx-auto px-5 md:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Left Column: Content */}
          <div className="lg:col-span-6 pt-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-gold" />
              <span className="text-[10px] font-bold tracking-[4px] uppercase text-gold">
                Start Planning
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.1] tracking-tight mb-8">
              Ready for Your <br />
              <span className="italic text-gold block mt-2">
                Next Adventure?
              </span>
            </h2>

            <p className="text-white/40 text-sm md:text-base font-light leading-relaxed mb-12 max-w-md">
              Whether celebrating a milestone or seeking peace on the water,
              Serendipity brings refined luxury and adventure together.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-gold/50 transition-all">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <span className="text-white/70 text-sm md:text-base font-medium">
                  Call Jake: 412-418-2968
                </span>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-gold/50 transition-all">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <span className="text-white/70 text-sm md:text-base font-medium">
                  Call Bryon: 727-644-9653
                </span>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-gold/50 transition-all">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <span className="text-white/70 text-sm md:text-base font-medium">
                  Saint Petersburg, FL
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Form Container */}
          <div className="lg:col-span-6">
            <div className="bg-navy-light/95 backdrop-blur-2xl border border-white/10 p-8 md:p-14 rounded-[3rem] shadow-2xl">
              <h3 className="text-3xl font-serif text-white mb-3">
                Inquire Now
              </h3>
              <p className="text-white/40 text-xs mb-10 leading-relaxed">
                Tell us about your dream charter and we'll craft the perfect
                itinerary.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-[2px] text-white/30 ml-1">
                      First Name
                    </label>
                    <input
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-gold/50 transition-all placeholder:text-white/10 text-sm"
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-[2px] text-white/30 ml-1">
                      Last Name
                    </label>
                    <input
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-gold/50 transition-all placeholder:text-white/10 text-sm"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase tracking-[2px] text-white/30 ml-1">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-gold/50 transition-all placeholder:text-white/10 text-sm"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase tracking-[2px] text-white/30 ml-1">
                    Event Type
                  </label>
                  <select className="w-full bg-navy/50 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-gold/50 transition-all text-sm appearance-none cursor-pointer">
                    <option value="day">Day Charter</option>
                    <option value="sunset">Sunset Cruise</option>
                    <option value="overnight">Overnight Experience</option>
                    <option value="corporate">Corporate Event</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase tracking-[2px] text-white/30 ml-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-gold/50 transition-all placeholder:text-white/10 text-sm resize-none"
                    placeholder="Tell us about your event..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-gold text-navy font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-gold-hover transition-all shadow-xl shadow-gold/20 mt-4 active:scale-[0.98]"
                >
                  <CreditCard className="w-4 h-4" />
                  {loading ? "Processing..." : "Proceed to Payment"}
                </button>

                <div className="flex items-center justify-center gap-2 mt-6">
                  <Lock className="w-3 h-3 text-white/20" />
                  <span className="text-[9px] text-white/20 uppercase tracking-[1px]">
                    Secured with 256-bit SSL encryption
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ isScrolled }: { isScrolled: boolean }) {
  return (
    <footer className="bg-navy py-16 md:py-24 relative overflow-hidden border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-5 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 mb-16 border-b border-white/5 pb-16">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <a href="/">
                <img src="assets/logo.png" alt="Logo" width="150" />
              </a>
            </div>
            <p className="text-white/40 text-xs leading-loose font-light mb-8 max-w-xs">
              The Gulf Coast's premier yachting experience. Refined by design,
              engineered for unforgettable moments.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Facebook, label: "Facebook" },
                { icon: Twitter, label: "Twitter" },
              ].map((social, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gold hover:bg-gold hover:text-navy transition-all duration-500"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xl font-serif text-white mb-8">Contact</h4>
            <ul className="space-y-4">
              <li className="text-white/40 text-xs font-light tracking-wide">
                Call Jake: 412-418-2968
              </li>
              <li className="text-white/40 text-xs font-light tracking-wide">
                Manager Bryon: 727-644-9653
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-serif text-white mb-8">Location</h4>
            <ul className="space-y-1">
              <li className="text-white/40 text-xs font-light tracking-wide">
                Maximo Marina
              </li>
              <li className="text-white/40 text-xs font-light tracking-wide">
                3701 50 Ave S.
              </li>
              <li className="text-white/40 text-xs font-light tracking-wide">
                Saint Petersburg, FL 33371
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[9px] font-bold uppercase tracking-[3px] text-white/40 mb-8 font-sans">
              Stay Informed
            </h4>
            <div className="relative">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-5 pr-12 text-sm focus:outline-none focus:border-gold/50 transition-all text-white placeholder:text-white/10"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gold hover:text-white transition-colors">
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 opacity-20">
          <p className="text-[9px] font-bold text-white uppercase tracking-[2px]">
            © 2026 Serendipity Private Charters
          </p>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-2.5 h-2.5 fill-gold text-gold" />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-navy/90 backdrop-blur-xl z-[10002] flex items-center justify-center p-4 md:p-10"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-full"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors z-[10003] bg-navy/20 backdrop-blur-md rounded-full hover:bg-navy/40"
        >
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
}
