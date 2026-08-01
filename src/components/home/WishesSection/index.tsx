"use client";
import { useState } from 'react';

const videos = [
  { url: "https://www.youtube.com/embed/StV_lChzEQw", title: "Dr. Rajesh Kumar", designation: "Chief Guest", category: "National" },
  { url: "https://www.youtube.com/embed/0b8kcCLTbNI", title: "Prof. Sarah Williams", designation: "Keynote Speaker", category: "International" },
  { url: "https://www.youtube.com/embed/4NxqqF2cmaY", title: "Dr. Amit Sharma", designation: "Guest of Honor", category: "National" },
  { url: "https://www.youtube.com/embed/cRsj2xdo13A", title: "Dr. Emily Chen", designation: "Special Guest", category: "International" },
  { url: "https://www.youtube.com/embed/cJXbvaLeaOA", title: "Dr. Priya Patel", designation: "Chief Guest", category: "National" },
  { url: "https://www.youtube.com/embed/7On089qRGdI", title: "Prof. Michael Brown", designation: "Keynote Speaker", category: "International" },
  { url: "https://www.youtube.com/embed/zWZlo09Hpx4", title: "Dr. Neha Gupta", designation: "Guest of Honor", category: "National" },
  { url: "https://www.youtube.com/embed/qPhjHk1CVwU", title: "Dr. David Lee", designation: "Special Guest", category: "International" },
];

const WishesSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activeFilter === 'all'
    ? videos
    : videos.filter(v => v.category.toLowerCase() === activeFilter);

  return (
    <section style={{
      padding: '56px 0 60px',
      background: 'linear-gradient(160deg, #f0faf6 0%, #f8fcfa 50%, #eaf6f2 100%)',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'sans-serif'
    }}>

      {/* Dot grid bg */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(29,158,117,0.05) 1px, transparent 1px)',
        backgroundSize: '32px 32px', pointerEvents: 'none'
      }} />

      {/* Top accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
        background: 'linear-gradient(90deg, transparent, #1D9E75 30%, #5DCAA5 70%, transparent)'
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 18px', background: '#E1F5EE',
            border: '1px solid #5DCAA5', borderRadius: 100,
            fontSize: 11, fontWeight: 700, letterSpacing: '.09em',
            textTransform: 'uppercase', color: '#0F6E56', marginBottom: 16
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1D9E75', display: 'inline-block' }} />
            Guest Messages
          </div>

          <h2 style={{ fontSize: 34, fontWeight: 700, color: '#1a2e2a', lineHeight: 1.2, marginBottom: 10 }}>
            Words of <span style={{ color: '#0F6E56' }}>Wisdom &amp; Wellness</span>
          </h2>

          <p style={{ fontSize: 14, color: '#000', margin: '0 auto 20px', lineHeight: 1.6, whiteSpace: 'nowrap' }}>
            Inspiring messages from distinguished guests sharing their healthcare insights
          </p>

          <div style={{ width: 48, height: 3, background: 'linear-gradient(90deg, #1D9E75, #5DCAA5)', borderRadius: 2, margin: '0 auto 24px' }} />
        </div>

        {/* Video Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 18 }}>
          {videos.map((video, i) => (
            <div key={i} className="ws-card" style={{
              background: '#fff', borderRadius: 14, overflow: 'hidden',
              border: '1px solid #e2f0eb', transition: 'transform .25s, box-shadow .25s'
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(29,158,117,0.13)'; e.currentTarget.style.borderColor = '#5DCAA5'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = '#e2f0eb'; }}
            >
              {/* Top accent */}
              <div style={{ height: 4, background: 'linear-gradient(90deg, #1D9E75, #5DCAA5)' }} />

              {/* Video */}
              <div style={{ position: 'relative', background: '#0a1a14' }}>
                <span style={{
                  position: 'absolute', top: 10, left: 10, zIndex: 5,
                  padding: '4px 11px', borderRadius: 100, fontSize: 11, fontWeight: 700,
                  background: video.category === 'International' ? '#085041' : '#0F6E56',
                  color: video.category === 'International' ? '#9FE1CB' : '#E1F5EE'
                }}>
                  {video.category}
                </span>
                <iframe
                  src={video.url}
                  title={video.title}
                  style={{ display: 'block', width: '100%', height: 175, border: 0 }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Info */}
              <div style={{ padding: '14px 16px 16px' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0F6E56', marginBottom: 3 }}>{video.title}</div>
                <div style={{ fontSize: 12, color: '#5a7a72', fontWeight: 500 }}>{video.designation}</div>
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
};

export default WishesSection;
