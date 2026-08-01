"use client";
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Camera, Search, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import image1 from '@/assets/image/image1.webp';
import image2 from '@/assets/image/image2.webp';
import image3 from '@/assets/image/image3.webp';
import image4 from '@/assets/image/image4.webp';
import image5 from '@/assets/image/image5.webp';
import image6 from '@/assets/image/image6.webp';
import image7 from '@/assets/image/image7.webp';
import image8 from '@/assets/image/image8.webp';
import image9 from '@/assets/image/image9.webp';
import image10 from '@/assets/image/image10.webp';
import image11 from '@/assets/image/image11.webp';
import image12 from '@/assets/image/image12.webp';
import { SERVER_URL } from '@/lib/api';
import SectionContainer from '@/components/layout/SectionContainer';

gsap.registerPlugin(ScrollTrigger);

const ALL_IMAGES = [
  { id:1,  src:image1,  title:'Inauguration Ceremony', category:'Inauguration',        year:'2025', style:{ gridColumn:'span 5', gridRow:'span 12' }, hasLabel:true },
  { id:2,  src:image2,  title:'Stage',                 category:'Exhibition (Expo)',   year:'2025', style:{ gridColumn:'span 3', gridRow:'span 8'  } },
  { id:3,  src:image3,  title:'Speaker Sessions',      category:'Scientific Sessions', year:'2024', style:{ gridColumn:'span 2', gridRow:'span 8'  } },
  { id:4,  src:image4,  title:'Audience',              category:'Networking',          year:'2025', style:{ gridColumn:'span 2', gridRow:'span 8'  } },
  { id:5,  src:image5,  title:'Panel Discussions',     category:'Panel Discussions',   year:'2024', style:{ gridColumn:'span 4', gridRow:'span 8'  } },
  { id:6,  src:image6,  title:'Exhibition Area',       category:'Exhibition (Expo)',   year:'2023', style:{ gridColumn:'span 3', gridRow:'span 8'  } },
  { id:7,  src:image7,  title:'Awards',                category:'Awards',              year:'2025', style:{ gridColumn:'span 3', gridRow:'span 7'  } },
  { id:8,  src:image8,  title:'Cultural Programs',     category:'Cultural Programs',   year:'2024', style:{ gridColumn:'span 2', gridRow:'span 14' } },
  { id:9,  src:image9,  title:'Interaction',           category:'Networking',          year:'2023', style:{ gridColumn:'span 2', gridRow:'span 10' } },
  { id:10, src:image10, title:'Audience',              category:'Speakers',            year:'2025', style:{ gridColumn:'span 2', gridRow:'span 10' } },
  { id:11, src:image11, title:'Certificate',           category:'Awards',              year:'2024', style:{ gridColumn:'span 3', gridRow:'span 10' } },
  { id:12, src:image12, title:'Sessions',              category:'Workshops',           year:'2025', style:{ gridColumn:'span 3', gridRow:'span 7'  } },
  { id:13, src:image7,  title:'Awards Night',          category:'Awards',              year:'2024', style:{ gridColumn:'span 5', gridRow:'span 12' }, hasLabel:true },
  { id:14, src:image1,  title:'Opening Ceremony',      category:'Inauguration',        year:'2023', style:{ gridColumn:'span 3', gridRow:'span 8'  } },
  { id:15, src:image5,  title:'Keynote Address',       category:'Speakers',            year:'2025', style:{ gridColumn:'span 2', gridRow:'span 8'  } },
  { id:16, src:image4,  title:'Delegates',             category:'Networking',          year:'2024', style:{ gridColumn:'span 2', gridRow:'span 8'  } },
  { id:17, src:image11, title:'Certificates',          category:'Awards',              year:'2023', style:{ gridColumn:'span 4', gridRow:'span 8'  } },
  { id:18, src:image2,  title:'Main Stage',            category:'Inauguration',        year:'2025', style:{ gridColumn:'span 3', gridRow:'span 8'  } },
  { id:19, src:image10, title:'Crowd',                 category:'Networking',          year:'2024', style:{ gridColumn:'span 3', gridRow:'span 7'  } },
  { id:20, src:image6,  title:'Expo Stalls',           category:'Exhibition (Expo)',   year:'2025', style:{ gridColumn:'span 2', gridRow:'span 14' } },
  { id:21, src:image3,  title:'Workshop',              category:'Workshops',           year:'2023', style:{ gridColumn:'span 2', gridRow:'span 10' } },
  { id:22, src:image9,  title:'Networking',            category:'Networking',          year:'2025', style:{ gridColumn:'span 2', gridRow:'span 10' } },
  { id:23, src:image12, title:'Breakout Sessions',     category:'Panel Discussions',   year:'2024', style:{ gridColumn:'span 3', gridRow:'span 10' } },
  { id:24, src:image8,  title:'Cultural Dance',        category:'Cultural Programs',   year:'2025', style:{ gridColumn:'span 3', gridRow:'span 7'  } },
];

const PAGE_SIZE   = 12;

/* ─── Lightbox ─────────────────────────────────────────────────────────── */
const Lightbox = ({ images, activeIndex, onClose, onNav }) => {
  const backdropRef = useRef(null);
  const imgRef      = useRef(null);
  const infoRef     = useRef(null);

  useEffect(() => {
    gsap.fromTo(backdropRef.current, { opacity:0 }, { opacity:1, duration:0.32, ease:'power2.out' });
    gsap.fromTo(imgRef.current,  { scale:0.9, opacity:0, y:20 }, { scale:1, opacity:1, y:0, duration:0.4, ease:'expo.out' });
    gsap.fromTo(infoRef.current, { opacity:0, y:10 }, { opacity:1, y:0, duration:0.3, delay:0.15, ease:'power2.out' });
  }, []);

  const close = () => {
    gsap.to(imgRef.current,     { scale:0.95, opacity:0, y:10, duration:0.2, ease:'power2.in' });
    gsap.to(backdropRef.current,{ opacity:0, duration:0.25, delay:0.05, onComplete: onClose });
  };

  const navigate = (dir) => {
    gsap.to(imgRef.current, {
      x: dir === 'next' ? -30 : 30, opacity:0, duration:0.15, ease:'power2.in',
      onComplete: () => {
        onNav(dir);
        gsap.fromTo(imgRef.current,
          { x: dir === 'next' ? 30 : -30, opacity:0 },
          { x:0, opacity:1, duration:0.25, ease:'power2.out' }
        );
      },
    });
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape')     close();
      if (e.key === 'ArrowRight') navigate('next');
      if (e.key === 'ArrowLeft')  navigate('prev');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIndex]);

  const img = images[activeIndex];

  const navBtn = (pos, dir) => (
    <button
      onClick={(e) => { e.stopPropagation(); navigate(dir); }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.16)'}
      onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
      style={{
        position:'absolute', [pos]:20, top:'50%', transform:'translateY(-50%)',
        background:'rgba(255,255,255,0.07)',
        border:'1px solid rgba(255,255,255,0.16)',
        borderRadius:4, width:40, height:40,
        display:'flex', alignItems:'center', justifyContent:'center',
        cursor:'pointer', color:'#fff', zIndex:10,
        transition:'background 0.18s',
      }}
    >
      {dir === 'prev' ? <ChevronLeft size={20}/> : <ChevronRight size={20}/>}
    </button>
  );

  return (
    <div ref={backdropRef} onClick={close} style={{
      position:'fixed', inset:0, zIndex:9999,
      background:'rgba(0,0,0,0.9)',
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      backdropFilter:'blur(4px)', // Reduced blur for performance
    }}>
      {/* Close */}
      <button onClick={close}
        onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.16)'}
        onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.07)'}
        style={{
          position:'absolute', top:20, right:20,
          background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.16)',
          borderRadius:4, width:36, height:36,
          display:'flex', alignItems:'center', justifyContent:'center',
          cursor:'pointer', color:'#fff', zIndex:10, transition:'background 0.18s',
        }}
      ><X size={16}/></button>

      {navBtn('left', 'prev')}

      {/* Image */}
      <div ref={imgRef} onClick={e=>e.stopPropagation()} style={{
        maxWidth:'82vw', maxHeight:'78vh', borderRadius:10, overflow:'hidden',
      }}>
        <img src={img.src?.src || img.src} alt={img.title} style={{
          maxWidth:'82vw', maxHeight:'78vh', objectFit:'contain', display:'block',
        }}/>
      </div>

      {/* Info */}
      <div ref={infoRef} onClick={e=>e.stopPropagation()} style={{ marginTop:16, textAlign:'center' }}>
        <p style={{ color:'rgba(255,255,255,0.9)', fontSize:13, fontWeight:600, margin:'0 0 10px', letterSpacing:'0.02em' }}>
          {img.title}
        </p>
        <div style={{ display:'flex', gap:5, justifyContent:'center' }}>
          {images.map((_,i) => (
            <button key={i}
              onClick={(e) => { e.stopPropagation(); navigate(i > activeIndex ? 'next' : 'prev'); }}
              style={{
                width: i === activeIndex ? 20 : 6, height:4, borderRadius:2,
                background: i === activeIndex ? '#4caf50' : 'rgba(255,255,255,0.25)',
                border:'none', cursor:'pointer', padding:0,
                transition:'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>

      {navBtn('right', 'next')}
    </div>
  );
};

/* ─── Gallery Card ──────────────────────────────────────────────────────── */
const GalleryCard = ({ img, index, onOpen, animKey }) => {
  const cardRef    = useRef(null);
  const imgRef     = useRef(null);
  const overlayRef = useRef(null);
  const labelRef   = useRef(null);
  const zoomRef    = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    // HIGHLY PERFORMANT STATE: NO BLUR, NO COMPLEX ROTATIONS
    // Just a clean, professional slide-up fade. This will never lag.
    gsap.set(el, { 
      opacity: 0, 
      y: 50, 
      scale: 0.96 
    });

    const delay = (index % 4) * 0.1;

    const st = ScrollTrigger.create({
      trigger: el, 
      start: 'top 90%',
      onEnter: () => {
        gsap.to(el, { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          delay: delay, 
          ease: 'power3.out', // Smooth, standard decelerating ease
          clearProps: 'transform' // Very important to clear transforms after for performance
        });
      },
      once: true
    });

    return () => st.kill();
  }, [animKey, index]);

  const onEnter = () => {
    gsap.to(imgRef.current,     { scale:1.05, duration:0.4, ease:'power2.out' });
    gsap.to(overlayRef.current, { opacity:1, duration:0.25 });
    if (zoomRef.current)  gsap.fromTo(zoomRef.current,  { scale:0.7, opacity:0 }, { scale:1, opacity:1, duration:0.25, ease:'back.out(1.5)' });
    if (labelRef.current) gsap.to(labelRef.current, { y:0, opacity:1, duration:0.25, ease:'power2.out' });
  };

  const onLeave = () => {
    gsap.to(imgRef.current,     { scale:1, duration:0.4, ease:'power2.out' });
    gsap.to(overlayRef.current, { opacity:0, duration:0.25 });
    if (zoomRef.current)  gsap.to(zoomRef.current,  { scale:0.7, opacity:0, duration:0.2 });
    if (labelRef.current) gsap.to(labelRef.current, { y:10, opacity:0, duration:0.2 });
  };

  const handleClick = () => {
    gsap.to(cardRef.current, { scale:0.97, duration:0.1, yoyo:true, repeat:1 });
    onOpen(img.id);
  };

  return (
    <div ref={cardRef} onClick={handleClick} onMouseEnter={onEnter} onMouseLeave={onLeave}
      style={{ ...img.style, position:'relative', borderRadius:14, overflow:'hidden', cursor:'pointer' }}
    >
      <div ref={imgRef} style={{ width:'100%', height:'100%', overflow:'hidden' }}>
        <img src={img.src?.src || img.src} alt={img.title}
          style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
        />
      </div>

      <div ref={overlayRef} style={{
        position:'absolute', inset:0, opacity:0, pointerEvents:'none',
        background:'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
      }}/>

      {img.hasLabel && (
        <>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)', zIndex:1, pointerEvents:'none' }}/>
          <div style={{ position:'absolute', bottom:14, left:14, zIndex:2 }}>
            <span style={{
              background:'rgba(15,55,17,0.88)',
              color:'#c8e6c9', fontSize:11, fontWeight:700,
              padding:'5px 12px', borderRadius:20,
              display:'inline-flex', alignItems:'center', gap:6,
              border:'1px solid rgba(76,175,80,0.4)',
              letterSpacing:'0.05em', textTransform:'uppercase',
              boxShadow:'0 2px 10px rgba(0,0,0,0.3)',
            }}>
              <Camera size={11}/> {img.title}
            </span>
          </div>
        </>
      )}

      {!img.hasLabel && (
        <>
          <div ref={zoomRef} style={{
            position:'absolute', top:'50%', left:'50%',
            transform:'translate(-50%,-50%)',
            zIndex:3, opacity:0,
            background:'rgba(255,255,255,0.15)',
            borderRadius:'50%', width:40, height:40,
            display:'flex', alignItems:'center', justifyContent:'center',
            border:'1px solid rgba(255,255,255,0.3)', pointerEvents:'none',
          }}>
            <ZoomIn size={16} color="#fff"/>
          </div>
          <div ref={labelRef} style={{
            position:'absolute', bottom:0, left:0, right:0,
            zIndex:3, opacity:0, transform:'translateY(10px)',
            padding:'10px 12px 12px',
            background:'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
            pointerEvents:'none',
          }}>
            <span style={{
              display:'inline-block',
              background:'rgba(15,55,17,0.85)',
              color:'#a5d6a7', fontSize:9, fontWeight:800,
              padding:'2px 8px', borderRadius:10,
              border:'1px solid rgba(76,175,80,0.3)',
              letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:4,
            }}>
              {img.category}
            </span>
            <p style={{ color:'#fff', fontSize:12, fontWeight:600, margin:0, letterSpacing:'0.01em' }}>
              {img.title}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

/* ─── Pagination — bottom-right, sharp, minimal ─────────────────────────── */
const Pagination = ({ current, total, onChange }) => {
  const goTo = (p) => { if (p !== current && p >= 1 && p <= total) onChange(p); };

  const arrowBtn = (dir) => {
    const disabled = dir === 'prev' ? current === 1 : current === total;
    return (
      <button
        onClick={() => goTo(dir === 'prev' ? current - 1 : current + 1)}
        disabled={disabled}
        onMouseEnter={e => { if (!disabled) { e.currentTarget.style.background='#1b5e20'; e.currentTarget.style.color='#fff'; e.currentTarget.style.borderColor='#1b5e20'; }}}
        onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#444'; e.currentTarget.style.borderColor='rgba(0,0,0,0.18)'; }}
        style={{
          width:32, height:32, borderRadius:0,
          border:'1px solid rgba(0,0,0,0.18)',
          background:'transparent', color:'#444',
          display:'flex', alignItems:'center', justifyContent:'center',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.32 : 1,
          transition:'all 0.18s ease',
        }}
      >
        {dir === 'prev' ? <ChevronLeft size={14} strokeWidth={2}/> : <ChevronRight size={14} strokeWidth={2}/>}
      </button>
    );
  };

  // Smart page window: always show 1, last, current-1, current, current+1, with ellipsis
  const getPages = () => {
    const pages = [];
    const delta = 1; // pages shown around current
    const left = Math.max(2, current - delta);
    const right = Math.min(total - 1, current + delta);

    pages.push(1);
    if (left > 2) pages.push('...');
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < total - 1) pages.push('...');
    if (total > 1) pages.push(total);
    return pages;
  };

  return (
    <div style={{ display:'flex', justifyContent:'flex-end', alignItems:'center', marginTop:20, gap:0 }}>
      {/* page count label */}
      <span style={{ fontSize:12, color:'#888', marginRight:14, letterSpacing:'0.02em' }}>
        {current} / {total}
      </span>

      {/* prev arrow */}
      {arrowBtn('prev')}

      {/* smart page number pills */}
      {getPages().map((p, idx) =>
        p === '...' ? (
          <span
            key={`ellipsis-${idx}`}
            style={{
              width:32, height:32, borderRadius:0,
              border:'1px solid rgba(0,0,0,0.18)',
              borderLeft:'none',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:12, color:'#999', userSelect:'none',
            }}
          >…</span>
        ) : (
          <button
            key={p}
            onClick={() => goTo(p)}
            onMouseEnter={e => { if (p !== current) { e.currentTarget.style.background='rgba(27,94,32,0.08)'; e.currentTarget.style.color='#1b5e20'; }}}
            onMouseLeave={e => { if (p !== current) { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#666'; }}}
            style={{
              width:32, height:32, borderRadius:0,
              border:'1px solid rgba(0,0,0,0.18)',
              borderLeft: p === 1 ? '1px solid rgba(0,0,0,0.18)' : 'none',
              background: p === current ? '#1b5e20' : 'transparent',
              color: p === current ? '#fff' : '#666',
              fontSize:12, fontWeight: p === current ? 700 : 500,
              cursor:'pointer', transition:'all 0.18s ease',
            }}
          >
            {p}
          </button>
        )
      )}

      {/* next arrow */}
      {arrowBtn('next')}
    </div>
  );
};

const styleCycle = [
  { gridColumn:'span 5', gridRow:'span 12', hasLabel:true },
  { gridColumn:'span 3', gridRow:'span 8' },
  { gridColumn:'span 2', gridRow:'span 8' },
  { gridColumn:'span 2', gridRow:'span 8' },
  { gridColumn:'span 4', gridRow:'span 8' },
  { gridColumn:'span 3', gridRow:'span 8' },
  { gridColumn:'span 3', gridRow:'span 7' },
  { gridColumn:'span 2', gridRow:'span 14' },
  { gridColumn:'span 2', gridRow:'span 10' },
  { gridColumn:'span 2', gridRow:'span 10' },
  { gridColumn:'span 3', gridRow:'span 10' },
  { gridColumn:'span 3', gridRow:'span 7' },
];

/* ─── Main ──────────────────────────────────────────────────────────────── */
const GalleryGrid = ({ activeYear = 'All Years', activeCategory = 'All Activities', dbGallery = [] }) => {
  const [page, setPage]                   = useState(1);
  const [animKey, setAnimKey]             = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const gridRef    = useRef(null);
  const sectionRef = useRef(null);

  const dynamicImages = React.useMemo(() => {
    return dbGallery.length > 0 
      ? dbGallery.map((g, i) => {
          const s = styleCycle[i % styleCycle.length];
          return {
            id: g._id,
            src: g.image.startsWith('http') ? g.image : `${SERVER_URL}${g.image}`,
            title: g.title,
            category: g.category,
            year: g.year,
            style: { gridColumn: s.gridColumn, gridRow: s.gridRow },
            hasLabel: s.hasLabel || false
          };
      })
      : ALL_IMAGES;
  }, [dbGallery]);

  const filteredImages = React.useMemo(() => {
    return dynamicImages.filter(img => {
      const matchYear = activeYear === 'All Years' || img.year === activeYear;
      const matchCategory = activeCategory === 'All Activities' || img.category === activeCategory;
      return matchYear && matchCategory;
    });
  }, [activeYear, activeCategory, dynamicImages]);

  const TOTAL_PAGES = Math.ceil(filteredImages.length / PAGE_SIZE);

  useEffect(() => {
    setPage(1);
    setAnimKey(prev => prev + 1);
  }, [activeYear, activeCategory]);

  const pageImages = filteredImages.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

  const handlePageChange = useCallback((newPage) => {
    const cards = gridRef.current ? [...gridRef.current.children] : [];
    if (cards.length === 0) { setPage(newPage); return; }
    
    // Smooth and performant exit animation
    gsap.to(cards, {
      y: -15, 
      opacity: 0, 
      scale: 0.95,
      stagger: 0.02, 
      duration: 0.2, 
      ease: 'power2.in',
      onComplete: () => {
        setPage(newPage);
        setAnimKey(k => k+1);
        window.scrollTo({ top: sectionRef.current?.offsetTop - 80, behavior:'smooth' });
      },
    });
  }, []);

  const openLightbox = (id) => {
    const idx = filteredImages.findIndex(i => i.id === id);
    if (idx !== -1) setLightboxIndex(idx);
  };

  const navLightbox = (dir) => {
    setLightboxIndex(prev =>
      dir === 'next'
        ? (prev+1) % filteredImages.length
        : (prev-1+filteredImages.length) % filteredImages.length
    );
  };

  return (
    <section ref={sectionRef} className="w-full py-8 font-inter min-h-[400px]">
      <SectionContainer>
      {filteredImages.length === 0 ? (
        <div className="w-full py-20 text-center text-gray-500 font-medium text-lg">
          No photos found for the selected filters.
        </div>
      ) : (
        <div ref={gridRef} style={{
          display:'grid',
          gridTemplateColumns:'repeat(12, 1fr)',
          gridAutoRows:'14px',
          gap:'8px',
        }}>
          {pageImages.map((img, index) => (
            <GalleryCard key={`${img.id}-${animKey}`} img={img} index={index} onOpen={openLightbox} animKey={animKey}/>
          ))}
        </div>
      )}

      {TOTAL_PAGES > 1 && filteredImages.length > 0 && (
        <Pagination current={page} total={TOTAL_PAGES} onChange={handlePageChange}/>
      )}

      {lightboxIndex !== null && filteredImages.length > 0 && (
        <Lightbox
          images={filteredImages}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNav={navLightbox}
        />
      )}
      </SectionContainer>
    </section>
  );
};

export default GalleryGrid;
