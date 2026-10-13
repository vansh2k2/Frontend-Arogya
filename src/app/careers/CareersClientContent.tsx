"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BriefcaseBusiness,
  Globe2,
  Lightbulb,
  MapPin,
  Sprout,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { EligibilityModal } from "./submit-resume/SubmitResume";
import { ApplicationFormModal } from "./application-form/ApplicationForm";
import { ReviewSubmitModal } from "./review-submit/ReviewSubmit";
import ResumeUploadButton from "./ResumeUploadButton";
import JobCardButtons from "./JobCardButtons";
import { API_URL } from "@/lib/api";
import SectionContainer from "@/components/layout/SectionContainer";
import career11 from "@/assets/banner/career11.webp";

// Hero background: src/assets/banner/career11.webp
const heroImage = career11.src;

// Twinkling star around the hero button
const Sparkle = ({ style }: { style?: React.CSSProperties }) => (
  <span
    style={{
      position: "absolute",
      pointerEvents: "none",
      fontSize: "13px",
      color: "#4ade80",
      textShadow: "0 0 6px #1b5e20",
      animation: "careerSparkle 1.6s ease-in-out infinite",
      opacity: 0,
      zIndex: 20,
      ...style,
    }}
  >
    ✦
  </span>
);

type JobOpening = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  icon: LucideIcon;
  // Present on jobs loaded from the API; the static sample list below omits them
  // and the apply modal falls back to its own copy.
  company?: string;
  responsibilities?: string[];
  requirements?: string[];
  preferredQualifications?: string[];
  skills?: string[];
  education?: string;
  eligibilityThreshold?: number;
};

const HIGHLIGHT_ICONS: LucideIcon[] = [Sprout, Users, TrendingUp, Globe2];
const WORK_REASON_ICONS: LucideIcon[] = [Sprout, Users, Lightbulb, Globe2];

// Defaults for the admin-editable sections (Pages & CMS > Careers).
const DEFAULT_CAREERS = {
  hero: {
    enabled: true,
    eyebrow: "CAREER",
    title: "Be Part of Something Bigger",
    description:
      "Build your career with Arogya Sangoshthi and contribute to a sustainable, healthier and more conscious tomorrow.",
    badgeText: "Join the people who connect business, nature and a better tomorrow.",
    image: heroImage,
    imageAlt: "Arogya Sangoshthi team working together - good people, greener tomorrow",
    items: ["Meaningful Work", "Collaborative Team", "Growth Opportunities", "Real Impact"],
  },
  openings: {
    enabled: true,
    title: "Current Openings",
    description: "Explore exciting opportunities and find the right role for you.",
    emptyTitle: "No open positions at the moment",
    emptyDescription:
      "We are not hiring for any specific roles right now. But we are always on the lookout for passionate individuals who want to make a difference.",
    emptyNote: "We will keep your profile on file and reach out when a suitable opportunity arises.",
  },
  whyWork: {
    enabled: true,
    title: "Why Work With Us?",
    description:
      "At Arogya Sangoshthi, you’ll grow with a purpose-driven team and be part of a movement that creates lasting change.",
    items: ["Purpose-Driven Work", "Inclusive Environment", "Learn from Industry Experts", "Be Part of a Global Platform"],
  },
  bottomBanner: {
    enabled: true,
    image: "/assets/careers/aman6.png",
    imageAlt: "Don't see the right role? We are always looking for passionate individuals.",
  },
};

const pickText = (value: unknown, fallback: string) =>
  typeof value === "string" && value.trim() ? value.trim() : fallback;

const pickItems = (items: unknown, fallback: string[]) => {
  const titles = Array.isArray(items)
    ? items.map((it: any) => (typeof it?.title === "string" ? it.title.trim() : "")).filter(Boolean)
    : [];
  return titles.length ? titles : fallback;
};

/** Two-line icon labels: "Learn from Industry Experts" -> "Learn from\nIndustry Experts". */
const twoLineLabel = (label: string) => {
  const words = label.split(/\s+/);
  if (words.length < 2) return label;
  const half = Math.ceil(words.length / 2);
  return `${words.slice(0, half).join(" ")}\n${words.slice(half).join(" ")}`;
};

/** "Be Part of Something Bigger" -> ["Be Part of", "Something", "Bigger"] (last word is orange). */
const splitHeroTitle = (title: string): [string, string, string] => {
  const words = title.trim().split(/\s+/);
  if (words.length < 3) return ["", words.slice(0, -1).join(" "), words[words.length - 1] || ""];
  return [words.slice(0, -2).join(" "), words[words.length - 2], words[words.length - 1]];
};

function resolveCareersSections(sections: any[] = []) {
  const find = (key: string) => sections.find((sec) => sec?.key === key) || {};
  const hero = find("careers-hero");
  const openings = find("careers-openings");
  const whyWork = find("careers-why-work");
  const bottom = find("careers-bottom-banner");
  const d = DEFAULT_CAREERS;
  return {
    hero: {
      enabled: hero.enabled !== false,
      eyebrow: pickText(hero.eyebrow, d.hero.eyebrow),
      title: pickText(hero.title, d.hero.title),
      description: pickText(hero.description, d.hero.description),
      badgeText: pickText(hero.badgeText, d.hero.badgeText),
      image: pickText(hero.image, d.hero.image),
      imageAlt: pickText(hero.imageAlt, d.hero.imageAlt),
      items: pickItems(hero.items, d.hero.items),
    },
    openings: {
      enabled: openings.enabled !== false,
      title: pickText(openings.title, d.openings.title),
      description: pickText(openings.description, d.openings.description),
      emptyTitle: pickText(openings.emptyTitle, d.openings.emptyTitle),
      emptyDescription: pickText(openings.emptyDescription, d.openings.emptyDescription),
      emptyNote: pickText(openings.emptyNote, d.openings.emptyNote),
    },
    whyWork: {
      enabled: whyWork.enabled !== false,
      title: pickText(whyWork.title, d.whyWork.title),
      description: pickText(whyWork.description, d.whyWork.description),
      items: pickItems(whyWork.items, d.whyWork.items),
    },
    bottomBanner: {
      enabled: bottom.enabled !== false,
      image: pickText(bottom.image, d.bottomBanner.image),
      imageAlt: pickText(bottom.imageAlt, d.bottomBanner.imageAlt),
    },
  };
}

function JobCard({ job }: { job: JobOpening }) {
  const Icon = job.icon;

  return (
    <article
      className="group flex min-h-full flex-col bg-white px-4 py-3 font-inter transition-colors duration-300 hover:bg-[#f5fbf7]"
      style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px" }}
    >
      <div className="flex gap-3">
        <span className="grid h-[clamp(50px,5.1vh,62px)] w-[clamp(50px,5.1vh,62px)] shrink-0 place-items-center rounded-full bg-[#eff8ef] text-[#08753c]">
          <Icon
            className="h-[clamp(25px,2.75vh,34px)] w-[clamp(25px,2.75vh,34px)]"
            strokeWidth={2.1}
          />
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="font-inter text-[14px] font-medium capitalize leading-tight text-[#0a1831]">
            {job.title}
          </h3>
          <span className="mt-1.5 inline-flex max-w-full bg-[#eef2f3] px-2.5 py-0.5 text-[12px] capitalize leading-none text-[#34485b]">
            {job.department}
          </span>
        </div>
      </div>

      <div className="mt-[clamp(9px,0.85vh,12px)] flex flex-wrap items-center gap-x-4 gap-y-1 text-[clamp(11px,0.78vw,14px)] text-[#17283c]">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-[18px] w-[18px] fill-[#08723e] text-[#08723e]" />
          {job.location}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <BriefcaseBusiness className="h-[18px] w-[18px] text-[#08723e]" />
          {job.type}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <TrendingUp className="h-[18px] w-[18px] text-[#08723e]" />
          {job.experience}
        </span>
      </div>

      <p className="mt-[clamp(8px,0.8vh,12px)] text-[clamp(12px,0.9vw,15px)] leading-[1.42] text-[#1a2a3d]">
        {job.description}
      </p>

      <JobCardButtons job={{ ...job, icon: undefined }} />
    </article>
  );
}

function EmptyOpenings({ title, description, note }: { title: string; description: string; note: string }) {
  return (
    <div className="w-full grid w-[96%] grid-cols-[80px_minmax(0,1fr)_1px_300px] items-center gap-[clamp(18px,2vw,32px)] rounded-[24px] bg-[#eef8e9]/90 px-4 py-2">
      <span className="grid h-[clamp(62px,5.2vw,82px)] w-[clamp(62px,5.2vw,82px)] place-items-center rounded-full bg-[#e4f2e5] text-[#08713f]">
        <BriefcaseBusiness
          className="h-[40px] w-[40px]"
          strokeWidth={1.8}
        />
      </span>

      <div>
        <h3 className="text-lg lg:text-2xl font-semibold leading-tight text-[#0b5638]">
          {title}
        </h3>
        <p className="mt-2 max-w-[720px] text-sm lg:text-[15px] leading-relaxed text-[#33475b]">
          {description}
        </p>
      </div>

      <span className="h-[70%] w-px bg-[#d5e0d7]" />

      <div>
        {/* <ResumeUploadButton variant="outline" /> */}
        <p className="mt-2 text-[15px] leading-relaxed text-[#43556c]">
          {note}
        </p>
      </div>
    </div>
  );
}

export default function CareersClientContent({ sections }: { sections?: any[] }) {
  const content = resolveCareersSections(sections);
  const [heroLead, heroMid, heroAccent] = splitHeroTitle(content.hero.title);
  const [selectedScore, setSelectedScore] = useState<number | null>(null);
  const [isNoneModalOpen, setIsNoneModalOpen] = useState(false);
  const [isAmanModalOpen, setIsAmanModalOpen] = useState(false);
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [fetchedJobs, setFetchedJobs] = useState<JobOpening[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/careers/jobs`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
          const mappedJobs: JobOpening[] = data.data.map((j: any) => ({
            _id: j._id,
            id: j._id,
            slug: j.slug,
            title: j.title,
            department: j.department,
            location: j.location,
            type: j.employmentType || "Full Time",
            experience: `${j.experienceMin} - ${j.experienceMax} Years`,
            description: j.description || j.responsibilities?.[0] || j.requirements?.[0] || j.title,
            company: j.company,
            responsibilities: j.responsibilities,
            requirements: j.requirements,
            preferredQualifications: j.preferredQualifications,
            skills: j.skills,
            education: j.educationRequirements,
            eligibilityThreshold: j.eligibilityThreshold,
            icon: Users,
          }));
          setFetchedJobs(mappedJobs);
        }
      })
      .catch((err) => {
        console.error("Failed to load jobs dynamically:", err);
      });
  }, []);

  const activeJobOpenings = fetchedJobs;
  const openingCount = activeJobOpenings.length;

  const displayedJobs = showAllJobs ? activeJobOpenings : activeJobOpenings.slice(0, 8);

  return (
    <main className="bg-[#f8fbf6] text-[#0a1831]">
      <div className="flex min-h-screen w-full flex-col bg-white">
        {/* HERO — no colour overlay on the banner: the text sits on its light left side
            and is kept readable with text shadows */}
        {content.hero.enabled && (
        <section className="relative isolate min-h-[330px] h-[460px] overflow-hidden md:aspect-[2110/745] border-b-4 border-[#f5791b]">
          <style>{`
            @keyframes careerSparkle {
              0%   { opacity:0; transform:scale(0.5) translateY(0); }
              40%  { opacity:1; transform:scale(1.2) translateY(-4px); }
              80%  { opacity:0.5; transform:scale(0.9) translateY(-6px); }
              100% { opacity:0; transform:scale(0.5) translateY(-8px); }
            }
            @keyframes careerShimmer {
              0% { transform: translateX(0) skewX(-20deg); }
              100% { transform: translateX(450%) skewX(-20deg); }
            }
            @keyframes careerBgZoom {
              0%   { transform: scale(1.08); }
              100% { transform: scale(1.0); }
            }
            .career-hero-bg { animation: careerBgZoom 8s ease-out forwards; transform-origin: center center; }
            .career-hero-btn {
              background: linear-gradient(135deg, #1b5e20 0%, #2e7d32 30%, #0e3b1c 60%, #1b5e20 100%);
              background-size: 200% 200%;
              box-shadow: 0 0 16px 4px rgba(27,94,32,0.3), 0 4px 15px rgba(27,94,32,0.25);
              position: relative;
              overflow: hidden;
            }
            .career-hero-btn::before {
              content: '';
              position: absolute;
              top: -50%; left: -75%;
              width: 50%; height: 200%;
              background: linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent);
              transform: skewX(-20deg);
              animation: careerShimmer 2.5s infinite;
            }
          `}</style>

          <Image
            src={content.hero.image}
            alt={content.hero.imageAlt}
            fill
            priority
            sizes="100vw"
            className="career-hero-bg -z-20 object-cover object-center"
          />
          {/* Phones only: the banner's photo side sits behind the text there */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/95 via-white/85 to-white/30 md:hidden pointer-events-none" />

          {/* Same side padding as every other section of the site */}
          <SectionContainer className="flex h-full w-full items-center">
            <div className="w-full md:w-[52%] lg:w-[46%] font-inter">
              <div className="text-[13.5px] md:text-[17.5px] font-bold uppercase tracking-[0.28em] text-[#f5791b]" style={{ textShadow: "0 1px 1px rgba(255,255,255,0.8)" }}>
                <p>{content.hero.eyebrow}</p>
              </div>
              <div className="mb-4 mt-1 h-[2.5px] w-16 bg-[#f5791b]" />

              <h1
                className="text-[30px] sm:text-[38px] md:text-[48px] lg:text-[60px] font-semibold leading-[1.08] tracking-tight"
                style={{ textShadow: "1px 1px 1px rgba(0,0,0,0.18)" }}
              >
                {heroLead && <span className="block text-[#1b5e20] mb-1">{heroLead}</span>}
                <span className="block whitespace-nowrap text-[#0e3b1c]">
                  {heroMid} <span className="text-[#f5791b]">{heroAccent}</span>
                </span>
              </h1>

              <p className="mt-3 md:mt-4 max-w-xl text-[13.5px] sm:text-[14.5px] md:text-[16.5px] font-bold leading-relaxed text-slate-950" style={{ textShadow: "none" }}>
                {content.hero.description}
              </p>

              {/* Button with sparkles */}
              <div className="relative mt-5 md:mt-6 w-fit">
                <Sparkle style={{ top: "-12px", left: "10%", animationDelay: "0.2s" }} />
                <Sparkle style={{ top: "-15px", left: "50%", animationDelay: "0.6s" }} />
                <Sparkle style={{ top: "-10px", right: "10%", animationDelay: "1s" }} />
                <a
                  href="#current-openings"
                  className="career-hero-btn text-white px-5 py-2.5 rounded-lg font-semibold text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg relative z-10 w-fit"
                >
                  View Current Openings <ArrowRight size={14} />
                </a>
              </div>
            </div>

          </SectionContainer>
        </section>
        )}

        {/* CURRENT OPENINGS */}
        {content.openings.enabled && (
        <section
          id="current-openings"
          className={`relative isolate overflow-hidden bg-white font-inter ${openingCount === 0
            ? "aspect-[2172/405] px-2 lg:px-14 py-4 lg:py-4"
            : "px-2 lg:px-14 py-4 lg:py-4"
            }`}
        >
          {openingCount === 0 ? (
            <Image
              src="/assets/careers/a.png"
              alt=""
              fill
              sizes="100vw"
              className="-z-10 object-fill"
            />
          ) : null}

          <div className="relative z-10 flex flex-col">
            <div
              className={`${openingCount === 0
                ? "mb-[clamp(20px,2.5vw,38px)]"
                : "mb-[clamp(10px,1vh,14px)]"
                } flex shrink-0 items-end justify-between gap-6`}
            >
              <div className="flex items-start gap-4">
                <span className="relative mt-1 inline-block h-[clamp(34px,2.9vw,48px)] w-[clamp(42px,3.5vw,56px)] shrink-0">
                  <span className="absolute left-0 top-1 h-[72%] w-[48%] rotate-[-28deg] rounded-[100%_0_100%_0] bg-gradient-to-br from-[#88c018] to-[#0f6d2f]" />
                  <span className="absolute right-1 top-0 h-[84%] w-[52%] rotate-[28deg] rounded-[100%_0_100%_0] bg-gradient-to-br from-[#118a42] to-[#075b31]" />
                </span>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-inter text-sm lg:text-2xl font-semibold capitalize leading-[1.12] tracking-[-0.04em] text-[#0a1831]">
                      {content.openings.title}{" "}
                      {openingCount > 0 ? (
                        <span className="align-baseline text-[0.78em] text-[#f5791b]">
                          ({openingCount})
                        </span>
                      ) : null}
                    </h2>

                    {/* Temporary buttons */}
                    <div className="inline-flex items-center gap-2">
                      {/* 
                      <button
                        type="button"
                        onClick={() => setSelectedScore(58)}
                        className="rounded-full bg-[#075f38] px-3.5 py-1 text-xs font-bold text-white transition hover:bg-[#054c2d]"
                      >
                        58%
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedScore(72)}
                        className="rounded-full bg-[#075f38] px-3.5 py-1 text-xs font-bold text-white transition hover:bg-[#054c2d]"
                      >
                        72%
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedScore(38)}
                        className="rounded-full bg-[#075f38] px-3.5 py-1 text-xs font-bold text-white transition hover:bg-[#054c2d]"
                      >
                        38%
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsNoneModalOpen(true)}
                        className="rounded-full bg-[#075f38] px-3.5 py-1 text-xs font-bold text-white transition hover:bg-[#054c2d]"
                      >
                        None
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAmanModalOpen(true)}
                        className="rounded-full bg-[#075f38] px-3.5 py-1 text-xs font-bold text-white transition hover:bg-[#054c2d]"
                      >
                        Aman
                      </button>
                      */}
                     
                    </div>
                  </div>
                  <p className="mt-2 text-[clamp(13px,1vw,17px)] leading-snug text-[#314256]">
                    {content.openings.description}
                    {openingCount === 0 ? (
                      <span className="block">(Only active positions are listed here.)</span>
                    ) : null}
                  </p>
                </div>
              </div>

              {openingCount > 6 ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowAllJobs(!showAllJobs);
                  }}
                  className="mb-1 inline-flex items-center gap-2 border-b-2 border-[#0a7140] pb-1 text-[14px] font-semibold text-[#0a643b] hover:text-[#074f2e] transition-colors"
                >
                  {showAllJobs ? "View Less Positions" : "View All Positions"}
                  <ArrowRight className={`h-[20px] w-[20px] transition-transform duration-300 ${showAllJobs ? "-rotate-90" : ""}`} />
                </button>
              ) : null}
            </div>

            <div className="flex-1">
              {openingCount > 0 ? (
                <div className="grid grid-cols-1 gap-[clamp(10px,0.85vw,14px)] md:grid-cols-2 lg:grid-cols-4  ">
                  {displayedJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              ) : (
                <EmptyOpenings
                  title={content.openings.emptyTitle}
                  description={content.openings.emptyDescription}
                  note={content.openings.emptyNote}
                />
              )}
            </div>
          </div>
        </section>
        )}

        {/* WHY WORK WITH US */}
        {content.whyWork.enabled && (
        <section className="grid shrink-0 gap-5 border-y border-[#e4ebe3] bg-[linear-gradient(90deg,#f6fbf2_0%,#fbfdf8_100%)] px-4 lg:px-14 py-1 lg:py-2 lg:grid-cols-[1.15fr_2fr] lg:items-center">
          <div>
            <h2 className="text-lg lg:text-2xl font-semibold leading-none tracking-[-0.035em] text-[#07553a]">
              {content.whyWork.title}
            </h2>
            <p className="mt-2 max-w-[650px] text-sm lg:text-[15px] leading-[1.35] text-[#1f3145]">
              {content.whyWork.description}
            </p>
          </div>

          <div className="flex flex-wrap justify-end divide-x divide-[#d6e0d8] lg:ml-auto">
            {content.whyWork.items.map((label, idx) => {
              const Icon = WORK_REASON_ICONS[idx % WORK_REASON_ICONS.length];
              return (
              <div key={`${label}-${idx}`} className="px-4 sm:px-6 lg:px-10 text-center first:pl-0">

                <Icon
                  className="mx-auto h-8 w-8 text-[#08723e]"
                  strokeWidth={2.1}
                />
                <span className="mt-2 block whitespace-pre-line text-sm lg:text-[12px] font-semibold leading-tight text-[#0e2234]">
                  {twoLineLabel(label)}
                </span>
              </div>
              );
            })}
          </div>
        </section>
        )}

        {/* BOTTOM CTA */}
        {content.bottomBanner.enabled && (
        <section className="relative h-[160px] lg:h-[160px] mt-2 w-full shrink-0 overflow-hidden bg-white">
          <Image
            src={content.bottomBanner.image}
            alt={content.bottomBanner.imageAlt}
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </section>
        )}
      </div>

      <EligibilityModal
        isOpen={selectedScore !== null}
        score={selectedScore ?? 58}
        onClose={() => setSelectedScore(null)}
        onApply={() => {
          setSelectedScore(null);
          setIsNoneModalOpen(true);
        }}
      />

      <ApplicationFormModal
        isOpen={isNoneModalOpen}
        onClose={() => setIsNoneModalOpen(false)}
      />

      <ReviewSubmitModal
        isOpen={isAmanModalOpen}
        onClose={() => setIsAmanModalOpen(false)}
      />
    </main>
  );
}
