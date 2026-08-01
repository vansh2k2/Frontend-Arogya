"use client";
import { useState, useEffect } from 'react';
import { Handshake } from 'lucide-react';

import icon1 from '@/icons/icon1.png';
import icon2 from '@/icons/icon2.png';
import icon3 from '@/icons/icon3.jpg';
import icon4 from '@/icons/icon4.png';
import icon5 from '@/icons/icon5.jpg';
import icon6 from '@/icons/icon6.jpg';
import icon7 from '@/icons/icon7.png';
import icon8 from '@/icons/icon8.png';
import icon9 from '@/icons/icon9.jpg';
import icon10 from '@/icons/icon10.jpeg';
import icon11 from '@/icons/icon11.jpg';
import icon12 from '@/icons/icon12.jpg';
import icon13 from '@/icons/icon13.jpg';
import icon14 from '@/icons/icon14.jpg';
import icon15 from '@/icons/icon15.jpg';
import icon16 from '@/icons/icon16.jpg';
import icon17 from '@/icons/icon17.jpg';
import icon18 from '@/icons/icon18.jpg';
import icon19 from '@/icons/icon19.jpg';
import icon20 from '@/icons/icon20.jpg';
import icon21 from '@/icons/icon21.jpg';
import icon22 from '@/icons/icon22.jpg';
import icon23 from '@/icons/icon23.jpg';
import icon24 from '@/icons/icon24.jpg';
import icon25 from '@/icons/icon25.jpg';
import icon26 from '@/icons/icon26.jpg';
import icon27 from '@/icons/icon27.jpg';
import icon28 from '@/icons/icon28.jpg';

const sponsors = [
  icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8, icon9, icon10,
  icon11, icon12, icon13, icon14, icon15, icon16, icon17, icon18, icon19, icon20,
  icon21, icon22, icon23, icon24, icon25, icon26, icon27, icon28
];

const row1 = sponsors.slice(0, 10);
const row2 = sponsors.slice(10, 20);
const row3 = sponsors.slice(20, 28);

const SponsorCard = ({ icon, idx, borderColor }) => (
  <div className="sponsor-card" style={{ borderColor }}>
    <div className="card-top-bar" style={{ background: borderColor }} />
    <div className="card-inner">
      <img
        src={icon?.src || icon}
        alt={`Partner ${idx + 1}`}
        className="sponsor-img"
      />
    </div>
  </div>
);

const MarqueeRow = ({ icons, reverse = false, borderColor = '#5DCAA5' }) => {
  const combined = [...icons, ...icons];
  return (
    <div className="track-wrapper">
      <div className={`track ${reverse ? 'track-reverse' : 'track-forward'}`}>
        {combined.map((icon, idx) => (
          <SponsorCard key={idx} icon={icon} idx={idx % icons.length} borderColor={borderColor} />
        ))}
      </div>
    </div>
  );
};

const Counter = ({ target, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target]);

  return <span>{count}</span>;
};

const SponsorsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    const section = document.getElementById('sponsors-section');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="sponsors-section" className="sponsors-section">

      {/* Header */}
      <div
        className="sponsors-header"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(-24px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease'
        }}
      >
        <div className="partners-badge">
          <span className="badge-dot" />
          <Handshake size={13} />
          <span>Our Partners</span>
        </div>

        <h2 className="sponsors-title">
          Associates &amp; <span className="title-accent">Supporting Partners</span>
        </h2>

        <p className="sponsors-subtitle">
          Proud to be supported by leading organizations in healthcare and wellness
        </p>

        <div className="title-divider" />
      </div>

      {/* Marquee Rows */}
      <div className="tracks-container">
        <MarqueeRow icons={row1} reverse={false} borderColor="#1D9E75" />
        <MarqueeRow icons={row2} reverse={true}  borderColor="#5DCAA5" />
        <MarqueeRow icons={row3} reverse={false} borderColor="#1D9E75" />
      </div>

      {/* Stats Strip */}
      <div
        className="stats-strip"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s'
        }}
      >
        {[
          { target: 28, suffix: '+', label: 'Partner Organizations' },
          { target: 15, suffix: '+', label: 'Government Bodies' },
          { target: 10, suffix: '+', label: 'Years of Trust' },
          { target: 50, suffix: '+', label: 'Cities Reached' },
        ].map((s, i) => (
          <div key={i} className="stat-item">
            <div className="stat-num">
              <Counter target={s.target} isVisible={isVisible} />
              {s.suffix}
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <style>{`
        .sponsors-section {
          padding: 40px 0 48px;
          background: linear-gradient(to bottom, #f8fdfb, #ffffff);
          overflow: hidden;
          font-family: sans-serif;
          position: relative;
        }

        .sponsors-header {
          text-align: center;
          margin-bottom: 36px;
          padding: 0 24px;
        }

        .partners-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 16px;
          background: #E1F5EE;
          border: 1px solid #5DCAA5;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #0F6E56;
          margin-bottom: 18px;
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #1D9E75;
          display: inline-block;
        }

        .sponsors-title {
          font-size: 36px;
          font-weight: 700;
          color: #1a2e2a;
          line-height: 1.2;
          margin: 0 0 12px;
        }

        .title-accent {
          color: #0F6E56;
        }

        .sponsors-subtitle {
          font-size: 15px;
          color: #5a7a72;
          margin: 0;
          line-height: 1.6;
        }

        .title-divider {
          width: 48px;
          height: 3px;
          background: linear-gradient(90deg, #1D9E75, #5DCAA5);
          border-radius: 2px;
          margin: 18px auto 0;
        }

        /* Tracks */
        .tracks-container {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 40px;
        }

        .track-wrapper {
          position: relative;
          overflow: hidden;
          padding: 8px 0;
        }

        .track-wrapper::before,
        .track-wrapper::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 100px;
          z-index: 2;
          pointer-events: none;
        }

        .track-wrapper::before {
          left: 0;
          background: linear-gradient(to right, #f8fdfb, transparent);
        }

        .track-wrapper::after {
          right: 0;
          background: linear-gradient(to left, #f8fdfb, transparent);
        }

        .track {
          display: flex;
          gap: 14px;
          width: max-content;
        }

        .track-forward {
          animation: scrollLeft 40s linear infinite;
        }

        .track-reverse {
          animation: scrollRight 38s linear infinite;
        }

        .track:hover {
          animation-play-state: paused;
        }

        @keyframes scrollLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        @keyframes scrollRight {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }

        /* Card */
        .sponsor-card {
          flex-shrink: 0;
          width: 150px;
          height: 96px;
          background: #ffffff;
          border: 1px solid #d4ede6;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          cursor: default;
        }

        .sponsor-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(29, 158, 117, 0.12);
          border-color: #1D9E75;
        }

        .card-top-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          opacity: 0;
          transition: opacity 0.25s ease;
        }

        .sponsor-card:hover .card-top-bar {
          opacity: 1;
        }

        .card-inner {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px 16px;
        }

        .sponsor-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.3s ease;
        }

        .sponsor-card:hover .sponsor-img {
          transform: scale(1.06);
        }

        /* Stats */
        .stats-strip {
          display: flex;
          justify-content: center;
          gap: 48px;
          padding: 24px 0;
          border-top: 1px solid #d4ede6;
          border-bottom: 1px solid #d4ede6;
          margin: 0 48px;
          flex-wrap: wrap;
        }

        .stat-item {
          text-align: center;
        }

        .stat-num {
          font-size: 30px;
          font-weight: 700;
          color: #0F6E56;
          line-height: 1;
          margin-bottom: 5px;
        }

        .stat-label {
          font-size: 12px;
          color: #5a7a72;
          font-weight: 500;
        }

        @media (max-width: 640px) {
          .sponsors-title { font-size: 26px; }
          .stats-strip { gap: 24px; margin: 0 20px; }
          .stat-num { font-size: 24px; }
          .sponsor-card { width: 120px; height: 80px; }
        }
      `}</style>
    </section>
  );
};

export default SponsorsSection;
