import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Smartphone, RefreshCw, Star, Package, Zap, Users, Mail, Laptop, Monitor } from 'lucide-react';
import { mockProducts, formatPrice, translationStrings } from '../../data/mockData';
import { useAppContext } from '../../context/AppContext';

/* â”€â”€ scroll-reveal hook â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const useReveal = (threshold = 0.12) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
};

/* â”€â”€ 3-D tilt handlers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const onTilt = (e) => {
  const el = e.currentTarget;
  const r  = el.getBoundingClientRect();
  const x  = (e.clientX - r.left) / r.width  - 0.5;
  const y  = (e.clientY - r.top)  / r.height - 0.5;
  el.style.transform  = `perspective(1200px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale(1.01)`;
  el.style.transition = 'none';
};
const offTilt = (e) => {
  e.currentTarget.style.transform  = 'perspective(1200px) rotateY(0) rotateX(0) scale(1)';
  e.currentTarget.style.transition = 'transform 0.55s cubic-bezier(.22,1,.36,1)';
};

const Home = () => {
  const { currency, language, theme } = useAppContext();
  const t = translationStrings[language] || translationStrings.EN;

  /* â”€â”€ real-time countdown â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const [timeLeft, setTimeLeft] = useState({ h: 7, m: 59, s: 59 });
  useEffect(() => {
    const tick = setInterval(() => {
      setTimeLeft(prev => {
        let { h, m, s } = prev;
        if (s > 0)  return { h, m, s: s - 1 };
        if (m > 0)  return { h, m: m - 1, s: 59 };
        if (h > 0)  return { h: h - 1, m: 59, s: 59 };
        clearInterval(tick);
        return { h: 0, m: 0, s: 0 };
      });
    }, 1000);
    return () => clearInterval(tick);
  }, []);
  const pad = n => String(n).padStart(2, '0');

  /* â”€â”€ animated stats â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const STATS = [
    { target: 15000, suffix: '+', label: t.happyCustomers  || 'Happy Customers' },
    { target: 98,    suffix: '%', label: t.authenticityRate || 'Authenticity Rate' },
    { target: 500,   suffix: '+', label: t.productsListed  || 'Products Listed' },
    { target: 12,    suffix: 'm', label: t.warrantyMonths  || 'Month Warranty' },
  ];
  const [statsRef, statsVisible] = useReveal();
  const [counts, setCounts] = useState(STATS.map(() => 0));
  useEffect(() => {
    if (!statsVisible) return;
    const dur   = 2200;
    const steps = 70;
    let step    = 0;
    const timer = setInterval(() => {
      step++;
      const ease = 1 - Math.pow(1 - step / steps, 3);
      setCounts(STATS.map(s => Math.floor(s.target * Math.min(ease, 1))));
      if (step >= steps) clearInterval(timer);
    }, dur / steps);
    return () => clearInterval(timer);
  }, [statsVisible]); // eslint-disable-line

  /* â”€â”€ section refs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const [trustRef,   trustVis]   = useReveal();
  const [featRef,    featVis]    = useReveal();
  const [tradeRef,   tradeVis]   = useReveal();
  const [saleRef,    saleVis]    = useReveal();
  const [latestRef,  latestVis]  = useReveal();
  const [newsRef,    newsVis]    = useReveal();

  /* â”€â”€ newsletter submit â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const [email, setEmail]       = useState('');
  const [subOk, setSubOk]       = useState(false);
  const handleSub = (e) => {
    e.preventDefault();
    if (email) { setSubOk(true); setEmail(''); }
  };

  const featuredProducts = mockProducts.slice(0, 3);
  const latestProducts   = mockProducts.slice(3, 9);

  return (
    <div style={{ backgroundColor: 'var(--bg-main)' }}>




      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      <section style={{
        position:'relative',
        background:'var(--hero-gradient)',
        color:'#fff',
        overflow:'hidden',
        minHeight:'100vh',
        display:'flex',
        alignItems:'center',
      }}>
        <style dangerouslySetInnerHTML={{__html:`
          @keyframes hFloat{
            0%,100%{transform:translateY(0)}
            50%{transform:translateY(-12px)}
          }
          @keyframes hFadeUp{
            from{opacity:0;transform:translateY(32px)}
            to{opacity:1;transform:translateY(0)}
          }
          @keyframes hScan{
            0%{top:-20%}100%{top:120%}
          }
          @keyframes hShimmer{
            0%{background-position:-200% center}
            100%{background-position:200% center}
          }
          @keyframes hGlow{
            0%,100%{opacity:.5}50%{opacity:1}
          }
          .hf1{animation:hFadeUp .8s .1s cubic-bezier(.16,1,.3,1) both}
          .hf2{animation:hFadeUp .8s .22s cubic-bezier(.16,1,.3,1) both}
          .hf3{animation:hFadeUp .8s .36s cubic-bezier(.16,1,.3,1) both}
          .hf4{animation:hFadeUp .9s .45s cubic-bezier(.16,1,.3,1) both}
          .h-layout{
            display:grid;
            grid-template-columns:1fr 1.1fr;
            gap:clamp(2rem,5vw,4.5rem);
            align-items:center;
            max-width:1280px;
            margin:0 auto;
            padding:clamp(8rem,15vh,11rem) clamp(1.5rem,4vw,3rem) clamp(5rem,10vh,8rem);
            position:relative;z-index:2;
          }
          .h-dev-area{
            position:relative;display:flex;justify-content:center;
            align-items:flex-end;min-height:500px;
          }
          .h-device{
            border-radius:18px;overflow:hidden;
            background:linear-gradient(145deg,#001f4d,#002b6b);
            border:1px solid rgba(0,74,198,.12);
            transition:border-color .5s,box-shadow .5s;
          }
          .h-device:hover{
            border-color:rgba(0,74,198,.25);
            box-shadow:0 0 40px rgba(0,100,255,.08);
          }
          .h-scr{
            background:linear-gradient(175deg,#001433 0%,#001f4d 100%);
            position:relative;overflow:hidden;
          }
          .h-cta{
            display:inline-flex;align-items:center;gap:10px;
            font-weight:600;font-size:.95rem;
            padding:15px 34px;border-radius:980px;
            transition:all .25s cubic-bezier(.16,1,.3,1);
            text-decoration:none;cursor:pointer;
          }
          @media(max-width:960px){
            .h-layout{grid-template-columns:1fr;text-align:center}
            .h-dev-area{min-height:380px;transform:scale(.8)}
            .h-cta-row{justify-content:center!important}
            .h-tag-row{justify-content:center!important}
            .h-h1{font-size:clamp(2.2rem,8vw,3.4rem)!important}
            .h-trust{justify-content:center!important}
          }
          @media(max-width:600px){
            .h-dev-area{min-height:300px;transform:scale(.62)}
          }
        `}} />

        {/* Background atmosphere */}
        <div style={{position:'absolute',top:'-20%',right:'-15%',width:700,height:700,borderRadius:'50%',
          background:'radial-gradient(circle,rgba(0,74,198,.15) 0%,transparent 65%)',pointerEvents:'none',zIndex:1}}/>
        <div style={{position:'absolute',bottom:'-25%',left:'-10%',width:600,height:600,borderRadius:'50%',
          background:'radial-gradient(circle,rgba(0,60,157,.1) 0%,transparent 60%)',pointerEvents:'none',zIndex:1}}/>
        <div style={{position:'absolute',top:'40%',left:'48%',width:500,height:300,borderRadius:'50%',
          background:'radial-gradient(ellipse,rgba(0,74,198,.05) 0%,transparent 70%)',pointerEvents:'none',zIndex:1}}/>

        {/* Subtle grid pattern */}
        <div style={{
          position:'absolute',inset:0,zIndex:1,opacity:.03,pointerEvents:'none',
          backgroundImage:'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
          backgroundSize:'60px 60px',
        }}/>

        <div className="h-layout">
          {/* ── LEFT: Text ── */}
          <div>
            <div className="hf1 h-tag-row" style={{
              display:'inline-flex',alignItems:'center',gap:8,
              background:'rgba(0,74,198,.1)',
              border:'1px solid rgba(0,74,198,.2)',borderRadius:999,
              padding:'8px 18px',marginBottom:'2rem',
              fontSize:'.78rem',color:'#80b3ff',fontWeight:600,
              letterSpacing:'.3px',
            }}>
              <span style={{width:7,height:7,borderRadius:'50%',background:'#34D399',
                display:'inline-block',boxShadow:'0 0 8px rgba(52,211,153,.5)'}}/>
              15,000+ Verified Customers
            </div>

            <h1 className="hf1 h-h1" style={{
              fontSize:'clamp(3rem,5.6vw,4.8rem)',
              fontWeight:750,lineHeight:1.04,
              letterSpacing:'-.04em',marginBottom:'1.6rem',
            }}>
              The Future of<br/>
              <span style={{
                background:'linear-gradient(90deg,#4d94ff 0%,#80b3ff 30%,#fff 50%,#80b3ff 70%,#4d94ff 100%)',
                backgroundSize:'200% auto',
                WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',
                animation:'hShimmer 5s ease-in-out infinite',
              }}>Premium Tech.</span>
            </h1>

            <p className="hf2" style={{
              fontSize:'1.1rem',color:'#94A3B8',
              marginBottom:'2.5rem',maxWidth:460,lineHeight:1.8,fontWeight:400,
            }}>
              Shop verified smartphones, laptops &amp; accessories with
              authenticity guaranteed. Instant trade-in credit &amp; free shipping
              on every order over Rs. 100,000.
            </p>

            <div className="hf3 h-cta-row" style={{display:'flex',gap:14,flexWrap:'wrap',marginBottom:'2.8rem'}}>
              <Link to="/browse" className="h-cta" style={{
                background:'#fff',color:'#001433',
                fontWeight:700,
                boxShadow:'0 4px 24px rgba(255,255,255,.15)',
              }}
                onMouseOver={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 12px 40px rgba(255,255,255,.2)';}}
                onMouseOut={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow='0 4px 24px rgba(255,255,255,.15)';}}
              >
                {t.shopNow} <ArrowRight size={16} strokeWidth={2.5}/>
              </Link>
              <Link to="/trade-in" className="h-cta" style={{
                background:'rgba(255,255,255,.06)',color:'#E2E8F0',
                border:'1px solid rgba(255,255,255,.15)',
                backdropFilter:'blur(8px)',
              }}
                onMouseOver={e=>{e.currentTarget.style.background='rgba(255,255,255,.12)';e.currentTarget.style.borderColor='rgba(255,255,255,.3)';}}
                onMouseOut={e=>{e.currentTarget.style.background='rgba(255,255,255,.06)';e.currentTarget.style.borderColor='rgba(255,255,255,.15)';}}
              >
                Trade-In Deals
              </Link>
            </div>

            {/* Trust micro-strip */}
            <div className="hf3 h-trust" style={{display:'flex',gap:20,flexWrap:'wrap',alignItems:'center'}}>
              {[
                {icon:<ShieldCheck size={15}/>,text:'Authenticity Verified'},
                {icon:<RefreshCw size={15}/>,text:'Instant Trade-In'},
                {icon:<Package size={15}/>,text:'Free Shipping'},
              ].map((item,i)=>(
                <div key={i} style={{
                  display:'flex',alignItems:'center',gap:7,
                  fontSize:'.76rem',color:'#64748B',fontWeight:500,
                }}>
                  <span style={{color:'#475569'}}>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: 3D Device Showcase ── */}
          <div className="hf4 h-dev-area">

            {/* ─── LAPTOP (back-left) ─── */}
            <div style={{
              position:'absolute',left:'-3%',bottom:'12%',zIndex:1,
              width:230,perspective:1200,
              animation:'hFloat 8s ease-in-out infinite',animationDelay:'.4s',
            }}>
              <div className="h-device" style={{
                transform:'rotateY(14deg) rotateX(-4deg)',borderRadius:16,
                boxShadow:'0 25px 70px rgba(0,0,0,.5), 0 0 30px rgba(0,74,198,.06)',
                padding:'10px 10px 3px',
              }}>
                <div className="h-scr" style={{
                  borderRadius:10,height:138,padding:10,
                  display:'flex',flexDirection:'column',gap:4,
                }}>
                  <div style={{position:'absolute',left:0,right:0,height:'30%',
                    background:'linear-gradient(180deg,transparent,rgba(0,74,198,.03),transparent)',
                    animation:'hScan 5s linear infinite',pointerEvents:'none'}}/>
                  {/* Browser dots */}
                  <div style={{display:'flex',gap:3,marginBottom:5}}>
                    <div style={{width:5,height:5,borderRadius:'50%',background:'#EF4444',opacity:.7}}/>
                    <div style={{width:5,height:5,borderRadius:'50%',background:'#F59E0B',opacity:.7}}/>
                    <div style={{width:5,height:5,borderRadius:'50%',background:'#22C55E',opacity:.7}}/>
                  </div>
                  {/* Search bar */}
                  <div style={{width:'90%',height:7,borderRadius:4,background:'rgba(255,255,255,.06)',
                    border:'1px solid rgba(255,255,255,.05)',marginBottom:6}}/>
                  {/* Product grid mockup */}
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:4,flex:1}}>
                    {[1,2,3,4].map(n=>(
                      <div key={n} style={{borderRadius:4,background:'rgba(0,74,198,.04)',
                        border:'1px solid rgba(0,74,198,.06)',
                        display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:2,padding:3}}>
                        <div style={{width:'60%',height:3,borderRadius:1,background:'rgba(255,255,255,.08)'}}/>
                        <div style={{width:'40%',height:2,borderRadius:1,background:'rgba(0,74,198,.15)'}}/>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{height:6,marginTop:3,borderRadius:'0 0 8px 8px',
                  background:'linear-gradient(90deg,rgba(255,255,255,.03),rgba(255,255,255,.06),rgba(255,255,255,.03))'}}/>
              </div>
              <div style={{textAlign:'center',marginTop:12,fontSize:'.62rem',
                color:'rgba(148,163,184,.5)',letterSpacing:'3px',textTransform:'uppercase',
                display:'flex',alignItems:'center',justifyContent:'center',gap:6,fontWeight:500}}>
                <Laptop size={11} strokeWidth={1.5}/> Laptops
              </div>
            </div>

            {/* ─── PHONE (center-front, hero device) ─── */}
            <div style={{
              position:'relative',zIndex:3,width:175,flexShrink:0,
              animation:'hFloat 6s ease-in-out infinite',
            }}>
              {/* Glow behind phone */}
              <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',
                width:250,height:350,borderRadius:'40%',
                background:'radial-gradient(ellipse,rgba(0,74,198,.08) 0%,transparent 65%)',
                pointerEvents:'none',animation:'hGlow 4s ease-in-out infinite'}}/>
              <div className="h-device" style={{
                borderRadius:32,
                border:'1.5px solid rgba(0,74,198,.18)',
                boxShadow:'0 40px 100px rgba(0,0,0,.5), 0 0 50px rgba(0,74,198,.08), inset 0 1px 0 rgba(255,255,255,.06)',
                padding:'14px 10px',position:'relative',
              }}>
                {/* Dynamic Island */}
                <div style={{width:56,height:6,borderRadius:3,
                  background:'#000e24',border:'1px solid rgba(255,255,255,.08)',
                  margin:'0 auto 12px'}}/>
                {/* Screen */}
                <div className="h-scr" style={{
                  borderRadius:20,height:230,padding:16,
                  display:'flex',flexDirection:'column',alignItems:'center',
                  justifyContent:'center',gap:10,
                }}>
                  <div style={{position:'absolute',left:0,right:0,height:'25%',
                    background:'linear-gradient(180deg,transparent,rgba(0,74,198,.03),transparent)',
                    animation:'hScan 3.5s linear infinite',pointerEvents:'none'}}/>
                  {/* Product card mockup inside phone */}
                  <div style={{
                    width:'85%',borderRadius:12,overflow:'hidden',
                    background:'rgba(255,255,255,.03)',
                    border:'1px solid rgba(255,255,255,.06)',
                  }}>
                    {/* Product image area */}
                    <div style={{height:65,background:'rgba(0,74,198,.04)',
                      display:'flex',alignItems:'center',justifyContent:'center'}}>
                      <Smartphone size={22} strokeWidth={1.2} style={{color:'rgba(0,74,198,.35)'}}/>
                    </div>
                    {/* Product info */}
                    <div style={{padding:'8px 10px'}}>
                      <div style={{width:'70%',height:4,borderRadius:2,background:'rgba(255,255,255,.12)',marginBottom:5}}/>
                      <div style={{width:'45%',height:3,borderRadius:2,background:'rgba(255,255,255,.06)',marginBottom:8}}/>
                      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <div style={{fontSize:'.55rem',color:'#4d94ff',fontWeight:700}}>Rs. 120,000</div>
                        <div style={{display:'flex',gap:1}}>
                          {[1,2,3,4,5].map(s=>(
                            <Star key={s} size={6} fill="#FACC15" stroke="none" style={{opacity:s<=4?.8:.3}}/>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Verified badge */}
                  <div style={{
                    display:'flex',alignItems:'center',gap:5,
                    background:'rgba(34,197,94,.08)',border:'1px solid rgba(34,197,94,.15)',
                    borderRadius:8,padding:'5px 12px',
                  }}>
                    <ShieldCheck size={12} strokeWidth={2} style={{color:'#4ADE80'}}/>
                    <span style={{fontSize:'.6rem',color:'#4ADE80',fontWeight:600,letterSpacing:'1px'}}>VERIFIED AUTHENTIC</span>
                  </div>
                  {/* Buy button mockup */}
                  <div style={{
                    width:'75%',height:22,borderRadius:6,
                    background:'linear-gradient(135deg,#004AC6,#003a9d)',
                    display:'flex',alignItems:'center',justifyContent:'center',
                    boxShadow:'0 4px 12px rgba(0,74,198,.3)',
                  }}>
                    <span style={{fontSize:'.55rem',color:'#fff',fontWeight:700,letterSpacing:'.5px'}}>ADD TO CART</span>
                  </div>
                </div>
                {/* Home bar */}
                <div style={{width:48,height:4,borderRadius:2,
                  background:'rgba(255,255,255,.12)',margin:'12px auto 0'}}/>
              </div>
              <div style={{textAlign:'center',marginTop:14,fontSize:'.62rem',
                color:'rgba(148,163,184,.5)',letterSpacing:'3px',textTransform:'uppercase',
                display:'flex',alignItems:'center',justifyContent:'center',gap:6,fontWeight:500}}>
                <Smartphone size={11} strokeWidth={1.5}/> Phones
              </div>
            </div>

            {/* ─── MONITOR (back-right) ─── */}
            <div style={{
              position:'absolute',right:'-3%',bottom:'12%',zIndex:1,
              width:245,perspective:1200,
              animation:'hFloat 9s ease-in-out infinite',animationDelay:'1s',
            }}>
              <div className="h-device" style={{
                transform:'rotateY(-14deg) rotateX(-4deg)',borderRadius:16,
                boxShadow:'0 25px 70px rgba(0,0,0,.5), 0 0 30px rgba(0,74,198,.06)',
                padding:'10px 10px 4px',
              }}>
                <div className="h-scr" style={{
                  borderRadius:10,height:148,padding:10,
                  display:'flex',flexDirection:'column',gap:4,
                }}>
                  <div style={{position:'absolute',left:0,right:0,height:'28%',
                    background:'linear-gradient(180deg,transparent,rgba(0,74,198,.03),transparent)',
                    animation:'hScan 5.5s linear infinite',pointerEvents:'none'}}/>
                  {/* Dashboard header */}
                  <div style={{display:'flex',alignItems:'center',gap:5,marginBottom:4}}>
                    <div style={{width:'25%',height:7,borderRadius:4,background:'rgba(0,74,198,.12)'}}/>
                    <div style={{flex:1}}/>
                    <div style={{width:7,height:7,borderRadius:'50%',background:'rgba(0,74,198,.1)'}}/>
                    <div style={{width:7,height:7,borderRadius:'50%',background:'rgba(0,74,198,.07)'}}/>
                  </div>
                  {/* Analytics-style content */}
                  <div style={{display:'flex',gap:4,marginBottom:4}}>
                    {[{w:'30%',c:'rgba(34,197,94,.12)'},{w:'25%',c:'rgba(0,74,198,.1)'},{w:'20%',c:'rgba(250,204,21,.08)'}].map((b,i)=>(
                      <div key={i} style={{width:b.w,height:16,borderRadius:4,background:b.c,
                        border:'1px solid rgba(255,255,255,.03)'}}/>
                    ))}
                  </div>
                  {/* Product list rows */}
                  {[1,2,3].map(r=>(
                    <div key={r} style={{display:'flex',alignItems:'center',gap:5,
                      padding:'3px 4px',borderRadius:4,background:'rgba(255,255,255,.015)'}}>
                      <div style={{width:10,height:10,borderRadius:3,background:'rgba(0,74,198,.08)'}}/>
                      <div style={{flex:1,height:3,borderRadius:2,background:'rgba(255,255,255,.06)'}}/>
                      <div style={{width:'20%',height:3,borderRadius:2,background:'rgba(0,74,198,.12)'}}/>
                    </div>
                  ))}
                </div>
                {/* Stand */}
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginTop:4,gap:1}}>
                  <div style={{width:2,height:12,background:'rgba(255,255,255,.05)'}}/>
                  <div style={{width:40,height:3,borderRadius:2,background:'rgba(255,255,255,.05)'}}/>
                </div>
              </div>
              <div style={{textAlign:'center',marginTop:12,fontSize:'.62rem',
                color:'rgba(148,163,184,.5)',letterSpacing:'3px',textTransform:'uppercase',
                display:'flex',alignItems:'center',justifyContent:'center',gap:6,fontWeight:500}}>
                <Monitor size={11} strokeWidth={1.5}/> Desktops
              </div>
            </div>

            {/* Connector lines */}
            <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:0}}>
              <line x1="22%" y1="55%" x2="45%" y2="58%" stroke="rgba(0,74,198,.07)" strokeWidth=".75" strokeDasharray="5 7"/>
              <line x1="78%" y1="55%" x2="55%" y2="58%" stroke="rgba(0,74,198,.07)" strokeWidth=".75" strokeDasharray="5 7"/>
            </svg>
          </div>
        </div>

        {/* Bottom fade into next section */}
        <div style={{position:'absolute',bottom:0,left:0,right:0,height:100,
          background:'linear-gradient(to top,var(--bg-surface),transparent)',
          pointerEvents:'none',zIndex:3}}/>

        {/* Scroll indicator */}
        <div style={{position:'absolute',bottom:'2.5rem',left:'50%',transform:'translateX(-50%)',
          display:'flex',flexDirection:'column',alignItems:'center',gap:8,opacity:.3,zIndex:4}}>
          <div style={{width:1,height:28,background:'linear-gradient(to bottom,transparent,rgba(148,163,184,.5))'}}/>
          <span style={{fontSize:'.6rem',letterSpacing:'3px',textTransform:'uppercase',fontWeight:500,color:'#64748B'}}>Scroll</span>
        </div>
      </section>


      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          TRUST BADGES
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section ref={trustRef} style={{
        backgroundColor:'var(--bg-surface)',
        padding:'2.25rem 0',
        borderTop:'1px solid var(--border-color)',
        borderBottom:'1px solid var(--border-color)',
      }}>
        <div className="container" style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',
          gap:'1rem',
        }}>
          {[
            { icon:<ShieldCheck size={22}/>, title: t.authenticityGuarantee || 'Authenticity Guarantee', sub:'100% verified products' },
            { icon:<RefreshCw   size={22}/>, title: t.highestTradeIn        || 'Highest Trade-In Values', sub:'Instant credit applied' },
            { icon:<Smartphone  size={22}/>, title: t.premiumWarranty       || '12-Month Warranty',        sub:'Premium coverage' },
            { icon:<Package     size={22}/>, title: t.freeShipping          || 'Free Shipping',            sub:'On orders over Rs. 100,000' },
          ].map((b, i) => (
            <div key={i}
              className={trustVis ? 'anim-fade-up' : ''}
              style={{
                display:'flex', alignItems:'center', gap:12,
                padding:'1rem', borderRadius:'var(--radius-md)',
                opacity: trustVis ? undefined : 0,
                animationDelay:`${i * .1}s`,
                transition:'background .2s',
              }}
              onMouseOver={e=>e.currentTarget.style.background='var(--bg-main)'}
              onMouseOut={e=>e.currentTarget.style.background=''}
            >
              <div style={{ color:'var(--primary-blue)', flexShrink:0 }}>{b.icon}</div>
              <div>
                <div style={{ fontWeight:600, fontSize:'.88rem' }}>{b.title}</div>
                <div style={{ color:'var(--text-muted)', fontSize:'.78rem' }}>{b.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          STATS STRIP
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section ref={statsRef} style={{
        padding:'5rem 1rem',
        background:'linear-gradient(135deg,var(--primary-blue) 0%,#003a9d 100%)',
        color:'#fff', overflow:'hidden', position:'relative',
      }}>
        <div style={{
          position:'absolute', inset:0, pointerEvents:'none',
          backgroundImage:`radial-gradient(circle at 20% 50%,rgba(255,255,255,.05) 0%,transparent 50%),
                          radial-gradient(circle at 80% 50%,rgba(255,255,255,.05) 0%,transparent 50%)`,
        }}/>
        <div className="container" style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',
          gap:'2rem', textAlign:'center', position:'relative',
        }}>
          {STATS.map((s, i) => (
            <div key={i}
              className={statsVisible ? 'anim-fade-up' : ''}
              style={{ opacity: statsVisible ? undefined : 0, animationDelay:`${i*.15}s` }}
            >
              <div style={{ fontSize:'clamp(2.2rem,4vw,3.2rem)', fontWeight:800, lineHeight:1, marginBottom:8, fontVariantNumeric:'tabular-nums' }}>
                {counts[i].toLocaleString()}{s.suffix}
              </div>
              <div style={{ color:'rgba(255,255,255,.72)', fontSize:'.92rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          FEATURED PRODUCTS
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section ref={featRef} className="container" style={{ padding:'6rem 1rem' }}>
        {/* header */}
        <div className={`flex justify-between items-center ${featVis ? 'anim-fade-up' : ''}`}
          style={{ marginBottom:'3rem', opacity: featVis ? undefined : 0 }}>
          <div>
            <span className="section-eyebrow">{t.curated || 'Curated for you'}</span>
            <h2 style={{ fontSize:'clamp(1.8rem,3.5vw,2.4rem)', fontWeight:800 }}>
              {t.featuredProducts || 'Featured Products'}
            </h2>
          </div>
          <Link to="/browse"
            style={{
              display:'inline-flex', alignItems:'center', gap:6,
              color:'var(--primary-blue)', fontWeight:600,
              border:'1px solid var(--primary-blue)', padding:'.5rem 1.25rem',
              borderRadius:999, fontSize:'.88rem', transition:'all .2s',
            }}
            onMouseOver={e=>{ e.currentTarget.style.background='var(--primary-blue)'; e.currentTarget.style.color='#fff'; }}
            onMouseOut={e=>{ e.currentTarget.style.background=''; e.currentTarget.style.color='var(--primary-blue)'; }}
          >
            {t.viewAll || 'View All'} <ArrowRight size={15}/>
          </Link>
        </div>

        {/* 3-D tilt cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(290px,1fr))', gap:'2rem' }}>
          {featuredProducts.map((p, i) => (
            <div key={p.id}
              className={featVis ? 'anim-fade-up' : ''}
              onMouseMove={onTilt} onMouseLeave={offTilt}
              style={{
                opacity: featVis ? undefined : 0,
                animationDelay:`${i * .15}s`,
                borderRadius:22, overflow:'hidden',
                background:'var(--bg-surface)',
                boxShadow:'var(--shadow-card)',
                display:'flex', flexDirection:'column',
                transformStyle:'preserve-3d',
                transition:'transform .55s cubic-bezier(.22,1,.36,1)',
              }}
            >
              {/* image area */}
              <div style={{
                position:'relative', padding:'2rem',
                background:'var(--bg-soft)', textAlign:'center',
                height:290, display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                {p.badges[0] && (
                  <span style={{
                    position:'absolute', top:14, left:14,
                    background:'var(--primary-blue)', color:'#fff',
                    padding:'.32rem .72rem', borderRadius:6,
                    fontSize:'.68rem', fontWeight:700, letterSpacing:'.8px', textTransform:'uppercase',
                  }}>{p.badges[0]}</span>
                )}
                {p.isAuthentic && (
                  <span style={{
                    position:'absolute', top:14, right:14,
                    background:'#10B981', color:'#fff',
                    padding:'.25rem .55rem', borderRadius:6,
                    fontSize:'.62rem', fontWeight:700,
                    display:'flex', alignItems:'center', gap:3,
                  }}>
                    <ShieldCheck size={11}/> Verified
                  </span>
                )}
                <img src={p.image} alt={p.name}
                  style={{ maxWidth:'88%', maxHeight:'88%', objectFit:'contain', mixBlendMode:'multiply', transition:'transform .4s ease' }}
                  onMouseOver={e=>e.currentTarget.style.transform='scale(1.1)'}
                  onMouseOut={e=>e.currentTarget.style.transform=''}
                />
              </div>

              {/* info */}
              <div style={{ flex:1, padding:'1.5rem' }}>
                <div style={{ color:'var(--text-muted)', fontSize:'.75rem', textTransform:'uppercase', letterSpacing:'1px', marginBottom:4 }}>{p.brand}</div>
                <h3 style={{ fontSize:'1.18rem', fontWeight:700, marginBottom:8 }}>{p.name}</h3>
                <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:12 }}>
                  <div style={{ display:'flex', color:'#F59E0B' }}>
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={12} fill={j < Math.floor(p.rating) ? 'currentColor' : 'none'} stroke="currentColor"/>
                    ))}
                  </div>
                  <span style={{ fontSize:'.78rem', color:'var(--text-muted)' }}>({p.reviews})</span>
                </div>
                <div style={{ fontSize:'1.25rem', fontWeight:700 }}>
                  {formatPrice(p.price, currency)}
                  {p.originalPrice && (
                    <span style={{ textDecoration:'line-through', color:'var(--text-muted)', fontSize:'.88rem', marginLeft:8, fontWeight:400 }}>
                      {formatPrice(p.originalPrice, currency)}
                    </span>
                  )}
                </div>
              </div>

              <Link to={`/product/${p.id}`} className="btn-primary"
                style={{ textAlign:'center', borderRadius:'0 0 22px 22px', padding:'1rem', fontSize:'.94rem' }}>
                {t.viewDetails || 'View Details'}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          TRADE-IN
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section ref={tradeRef} style={{
        background:'var(--bg-surface)',
        borderTop:'1px solid var(--border-color)',
        borderBottom:'1px solid var(--border-color)',
        padding:'6rem 1rem',
      }}>
        <div className="container" style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',
          gap:'4rem', alignItems:'center',
        }}>
          {/* text */}
          <div className={tradeVis ? 'anim-fade-left' : ''} style={{ opacity: tradeVis ? undefined : 0 }}>
            <div style={{
              display:'inline-flex', alignItems:'center', gap:7,
              background:'rgba(0,74,198,.1)', border:'1px solid rgba(0,74,198,.22)',
              borderRadius:999, padding:'.38rem .9rem',
              marginBottom:'1.5rem', fontSize:'.78rem',
              color:'var(--primary-blue)', fontWeight:700,
            }}>
              <RefreshCw size={13}/> {t.tradeIn || 'Trade-In Programme'}
            </div>
            <h2 style={{ fontSize:'clamp(2rem,5vw,2.9rem)', fontWeight:800, marginBottom:'1rem', lineHeight:1.2 }}>
              {t.tradeInSubtitle || 'Trade in. Upgrade.'}
            </h2>
            <p style={{ fontSize:'1.1rem', color:'var(--text-secondary)', marginBottom:'2rem', lineHeight:1.75, maxWidth:460 }}>
              {t.tradeInDesc || 'Get credit towards your next device when you trade in your eligible smartphone or tablet. Quick, easy, and secure.'}
            </p>
            <Link to="/trade-in" className="btn-primary"
              style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'1rem 2rem', borderRadius:13 }}>
              {t.getValuation || 'Get Your Valuation'} <ArrowRight size={18}/>
            </Link>
          </div>

          {/* steps */}
          <div className={tradeVis ? 'anim-fade-right' : ''} style={{ opacity: tradeVis ? undefined : 0 }}>
            {[
              { icon:<Smartphone size={24}/>, title:'1. Select Device',    desc:'Choose your current model from our database.', c:'#004AC6', bg:'#e6f0ff', off:0   },
              { icon:<ShieldCheck size={24}/>, title:'2. Instant Valuation', desc:'Get a guaranteed price quote in seconds.',      c:'#22C55E', bg:'#F0FDF4', off:24  },
              { icon:<RefreshCw  size={24}/>, title:'3. Upgrade & Get Paid',desc:'Ship it free, get your credit applied fast.',   c:'#F59E0B', bg:'#FFFBEB', off:0   },
            ].map((step, i) => (
              <div key={i} style={{
                display:'flex', alignItems:'center', gap:'1.25rem',
                marginBottom: i < 2 ? '1.5rem' : 0,
                transform:`translateX(${step.off}px)`,
              }}>
                <div style={{
                  width:56, height:56, borderRadius:'50%',
                  background:step.bg, color:step.c,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  flexShrink:0, boxShadow:`0 8px 20px ${step.c}30`,
                }}>
                  {step.icon}
                </div>
                <div style={{
                  background:'var(--bg-surface)', border:'1px solid var(--border-color)',
                  borderRadius:16, padding:'1.2rem 1.4rem', flex:1,
                  boxShadow:'var(--shadow-card)',
                  transition:'transform .3s,box-shadow .3s',
                }}
                  onMouseOver={e=>{ e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 16px 30px rgba(0,0,0,.1)'; }}
                  onMouseOut={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='var(--shadow-card)'; }}
                >
                  <div style={{ fontWeight:700, marginBottom:4 }}>{step.title}</div>
                  <div style={{ fontSize:'.85rem', color:'var(--text-muted)' }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          FLASH SALE (LIVE COUNTDOWN)
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section ref={saleRef} className="container" style={{ padding:'6rem 1rem' }}>
        <div className={saleVis ? 'anim-scale-in' : ''} style={{
          opacity: saleVis ? undefined : 0,
          display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',
          background:'#001433', borderRadius:28, overflow:'hidden', color:'#fff',
        }}>
          {/* info */}
          <div style={{ padding:'clamp(2rem,5vw,4rem)', display:'flex', flexDirection:'column', justifyContent:'center' }}>
            <div style={{ display:'flex', alignItems:'center', gap:7, color:'#4d94ff', fontWeight:700,
              letterSpacing:'2px', textTransform:'uppercase', fontSize:'.72rem', marginBottom:'1rem' }}>
              <Zap size={13}/> {t.flashSale || 'Flash Sale'} - Ending Soon
            </div>
            <h2 style={{ fontSize:'clamp(1.9rem,4vw,3rem)', lineHeight:1.1, marginBottom:'2rem', fontWeight:800 }}>
              OriginBook Pro<br/>16&quot;
            </h2>

            {/* live countdown */}
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:'2.5rem', flexWrap:'wrap' }}>
              {[
                { v: pad(timeLeft.h), l:'HRS' },
                { v: pad(timeLeft.m), l:'MINS' },
                { v: pad(timeLeft.s), l:'SECS' },
              ].map((tile, i) => (
                <React.Fragment key={i}>
                  <div className="countdown-tile">
                    <div style={{ fontSize:'1.85rem', fontWeight:800, lineHeight:1 }}>{tile.v}</div>
                    <div style={{ fontSize:'.58rem', color:'#94A3B8', marginTop:4 }}>{tile.l}</div>
                  </div>
                  {i < 2 && <span style={{ fontSize:'1.4rem', color:'#475569' }}>:</span>}
                </React.Fragment>
              ))}
            </div>

            <div style={{ display:'flex', alignItems:'center', gap:24, flexWrap:'wrap' }}>
              <div>
                <div style={{ textDecoration:'line-through', color:'#64748B', fontSize:'.9rem' }}>
                  {formatPrice(249900, currency)}
                </div>
                <div style={{ fontSize:'2.1rem', fontWeight:800 }}>{formatPrice(189900, currency)}</div>
              </div>
              <Link to="/product/p4" className="btn-primary"
                style={{ padding:'1rem 2rem', borderRadius:13, whiteSpace:'nowrap' }}>
                {t.claimOffer || 'Claim This Offer'}
              </Link>
            </div>
          </div>

          {/* product image */}
          <div style={{
            background:'linear-gradient(135deg,#E2E8F0 0%,#F1F5F9 100%)',
            position:'relative', display:'flex', alignItems:'center', justifyContent:'center',
            minHeight:300, overflow:'hidden',
          }}>
            <div style={{
              position:'absolute', top:16, right:16,
              background:'#004AC6', color:'#fff',
              padding:'.85rem', borderRadius:'50%',
              fontWeight:800, fontSize:'1.1rem', transform:'rotate(15deg)', zIndex:1,
            }}>-24%</div>
            <img src="/images/macbook_real.png" alt="OriginBook Pro"
              style={{ width:'88%', objectFit:'contain', mixBlendMode:'multiply',
                filter:'drop-shadow(0 20px 24px rgba(0,0,0,.14))',
                animation:'floatGlow 6.5s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          LATEST ARRIVALS
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section ref={latestRef} style={{ background:'var(--bg-surface)', padding:'6rem 1rem' }}>
        <div className="container">
          <div className={`flex justify-between items-center ${latestVis ? 'anim-fade-up' : ''}`}
            style={{ marginBottom:'3rem', opacity: latestVis ? undefined : 0 }}>
            <div>
              <span className="section-eyebrow">{t.justDropped || 'Just dropped'}</span>
              <h2 style={{ fontSize:'clamp(1.8rem,3.5vw,2.4rem)', fontWeight:800 }}>
                {t.latestArrivals || 'Latest Arrivals'}
              </h2>
            </div>
            <Link to="/browse" style={{ color:'var(--primary-blue)', fontWeight:600, display:'flex', alignItems:'center', gap:5 }}>
              {t.viewAll || 'See all'} <ArrowRight size={15}/>
            </Link>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:'1.5rem' }}>
            {latestProducts.map((p, i) => (
              <div key={p.id}
                className={`card ${latestVis ? 'anim-fade-up' : ''}`}
                style={{
                  padding:'1.4rem', display:'flex', flexDirection:'column',
                  opacity: latestVis ? undefined : 0,
                  animationDelay:`${i * .08}s`,
                  borderRadius:18, transition:'transform .3s ease,box-shadow .3s ease',
                }}
                onMouseOver={e=>{ e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.boxShadow='0 16px 32px rgba(0,0,0,.1)'; }}
                onMouseOut={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; }}
              >
                <div style={{
                  height:175, background:'var(--bg-main)', borderRadius:'var(--radius-md)',
                  padding:'1.4rem', marginBottom:'1.25rem',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  position:'relative',
                }}>
                  {p.badges[0] && (
                    <span style={{
                      position:'absolute', top:8, left:8,
                      background:'var(--primary-blue)', color:'#fff',
                      padding:'.2rem .55rem', borderRadius:5,
                      fontSize:'.6rem', fontWeight:700, letterSpacing:'.5px', textTransform:'uppercase',
                    }}>{p.badges[0]}</span>
                  )}
                  {!p.inStock && (
                    <span style={{
                      position:'absolute', inset:0, borderRadius:'var(--radius-md)',
                      background:'rgba(0,0,0,.35)', display:'flex', alignItems:'center', justifyContent:'center',
                      color:'#fff', fontWeight:700, fontSize:'.8rem',
                    }}>{t.outOfStock || 'Out of Stock'}</span>
                  )}
                  <img src={p.image} alt={p.name}
                    style={{ maxWidth:'88%', maxHeight:'88%', objectFit:'contain',
                      opacity: p.inStock ? 1 : .55 }}
                  />
                </div>
                <div style={{ fontSize:'.72rem', color:'var(--primary-blue)', fontWeight:700, marginBottom:4, textTransform:'uppercase', letterSpacing:'1px' }}>{p.brand}</div>
                <h3 style={{ fontSize:'1rem', marginBottom:'0.75rem', flex:1, fontWeight:600 }}>{p.name}</h3>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <div style={{ fontWeight:700, fontSize:'1.08rem' }}>{formatPrice(p.price, currency)}</div>
                  <Link to={`/product/${p.id}`}
                    style={{ color:'var(--primary-blue)', fontSize:'.84rem', fontWeight:600, display:'flex', alignItems:'center', gap:3 }}>
                    View <ArrowRight size={13}/>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          NEWSLETTER
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section ref={newsRef} className="container" style={{ padding:'6rem 1rem' }}>
        <div className={newsVis ? 'anim-scale-in' : ''} style={{
          opacity: newsVis ? undefined : 0,
          background: theme==='dark' ? 'linear-gradient(135deg,#001028 0%,#001f4d 100%)' : 'linear-gradient(135deg,#e6f0ff 0%,#e6f0ff 100%)',
          borderRadius:32, padding:'clamp(3rem,6vw,5.5rem) 2rem',
          textAlign:'center', position:'relative', overflow:'hidden',
        }}>
          <div style={{
            position:'absolute', top:'-25%', right:'-5%', width:400, height:400,
            borderRadius:'50%', pointerEvents:'none',
            background: theme==='dark' ? 'radial-gradient(circle,rgba(0,74,198,.06) 0%,transparent 70%)' : 'radial-gradient(circle,rgba(0,74,198,.08) 0%,transparent 70%)',
          }}/>
          <div style={{ position:'relative', zIndex:1, maxWidth:600, margin:'0 auto' }}>
            <Mail size={40} style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}/>
            <h2 style={{ fontSize:'clamp(1.7rem,4vw,2.5rem)', fontWeight:800, marginBottom:'1rem', color: theme==='dark' ? '#F1F5F9' : '#001f4d' }}>
              {t.newsletter || 'Stay ahead of the curve.'}
            </h2>
            <p style={{ color: theme==='dark' ? '#94A3B8' : '#475569', fontSize:'1.05rem', marginBottom:'2.5rem', lineHeight:1.7 }}>
              {t.subscribeDesc || 'Join our inner circle to receive exclusive early access to product launches and curated tech deals.'}
            </p>

            {subOk ? (
              <div style={{
                background:'#10B981', color:'#fff',
                padding:'1rem 2rem', borderRadius:14,
                display:'inline-flex', alignItems:'center', gap:8, fontWeight:700,
              }}>
                <ShieldCheck size={20}/> You&apos;re subscribed. Welcome!
              </div>
            ) : (
              <form onSubmit={handleSub} style={{
                display:'flex', gap:12, maxWidth:450,
                margin:'0 auto 1rem', flexWrap:'wrap',
              }}>
                <input
                  type="email" required
                  placeholder={t.emailPlaceholder || 'Enter your email'}
                  value={email}
                  onChange={e=>setEmail(e.target.value)}
                  style={{
                    flex:'1 1 200px', padding:'1rem 1.4rem',
                    borderRadius:13, border:'1px solid #CBD5E1',
                    outline:'none', fontSize:'1rem', color:'#001f4d',
                    transition:'border-color .2s',
                  }}
                  onFocus={e=>e.target.style.borderColor='var(--primary-blue)'}
                  onBlur={e=>e.target.style.borderColor='#CBD5E1'}
                />
                <button type="submit" className="btn-primary"
                  style={{ flex:'0 0 auto', padding:'1rem 1.75rem', borderRadius:13, fontSize:'1rem', whiteSpace:'nowrap' }}>
                  {t.subscribe || 'Subscribe'}
                </button>
              </form>
            )}
            <p style={{ fontSize:'.78rem', color:'#94A3B8', marginTop:'0.75rem' }}>
              By subscribing you agree to our{' '}
              <Link to="/privacy" style={{ color:'var(--primary-blue)' }}>Privacy Policy</Link>
              {' '}and{' '}
              <Link to="/terms" style={{ color:'var(--primary-blue)' }}>Terms of Service</Link>.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
