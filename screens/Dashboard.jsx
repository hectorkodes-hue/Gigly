/* My Rights Dashboard — personalised feed, value banner, language switcher. */
(function () {
  const { useState, useEffect } = React;
  const I = window.Icon;
  const TOP = 54;

  function formatINR(n) {
    const s = String(n);
    if (s.length <= 3) return s;
    let last3 = s.slice(-3);
    let rest = s.slice(0, -3);
    rest = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    return rest + ',' + last3;
  }

  const CAT_ICON = {
    Identity: 'idcard', Insurance: 'shield', Health: 'heart',
    Pension: 'pension', Platform: 'box',
  };
  const CAT_COLOR = {
    Identity: '#0F766E', Insurance: '#0F766E', Health: '#E11D48',
    Pension: '#7C3AED', Platform: '#F97316',
  };

  function RightCard({ r, onOpen, idx }) {
    const accent = CAT_COLOR[r.category] || 'var(--primary)';
    const Ic = I[CAT_ICON[r.category] || 'shield'];

    if (r.featured && r.kind === 'foundation') {
      // Hero foundation card (e-Shram)
      return (
        <button onClick={() => onOpen(r)} className="fade-in" style={{
          textAlign: 'left', width: '100%', borderRadius: 'var(--r-card)',
          background: 'linear-gradient(135deg, #0F766E 0%, #115E59 100%)',
          padding: 22, color: '#fff', boxShadow: 'var(--shadow-pop)', position: 'relative', overflow: 'hidden',
          animationDelay: `${idx * 0.04}s`,
        }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <span className="tag" style={{ background: 'var(--accent)', color: '#fff' }}>★ Start here</span>
            <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>{r.issuer}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: 'rgba(255,255,255,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <I.idcard size={28} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>{r.title}</h3>
              <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.82)', fontWeight: 500, marginTop: 4, lineHeight: 1.4 }}>{r.tagline}</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 18, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.16)' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-h)', fontWeight: 700, fontSize: 24, color: '#fff' }}>{r.headline}</div>
              <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>{r.headlineNote}</div>
            </div>
            <span className="btn" style={{ background: '#fff', color: 'var(--primary)', height: 44, padding: '0 18px', fontSize: 16 }}>
              View details <I.chevR size={18} />
            </span>
          </div>
        </button>
      );
    }

    return (
      <button onClick={() => onOpen(r)} className="fade-in" style={{
        textAlign: 'left', width: '100%', borderRadius: 'var(--r-card)',
        background: 'var(--surface)', padding: 18, boxShadow: 'var(--shadow-card)',
        border: '1px solid var(--line)', animationDelay: `${idx * 0.04}s`,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <div style={{
            width: 46, height: 46, borderRadius: 14, flexShrink: 0,
            background: hexA(accent, 0.1), color: accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><Ic size={24} /></div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
              <span className="label" style={{ fontSize: 11, letterSpacing: '0.06em' }}>{r.issuer}</span>
            </div>
            <h3 style={{ fontSize: 18.5, fontWeight: 700, lineHeight: 1.15 }}>{r.title}</h3>
          </div>
          {r.category === 'Platform' && (
            <span className="tag tag-orange" style={{ flexShrink: 0 }}>Your app</span>
          )}
        </div>
        <p style={{ fontSize: 14.5, color: 'var(--muted)', fontWeight: 500, lineHeight: 1.45, margin: '12px 0 16px' }}>{r.tagline}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span className="tag tag-orange" style={{ fontSize: 16, fontWeight: 700, padding: '5px 13px' }}>{r.headline}{r.isPension ? '/mo' : ''}</span>
            <span style={{ fontSize: 12.5, color: 'var(--muted-light)', fontWeight: 500, maxWidth: 120, lineHeight: 1.2 }}>{r.headlineNote}</span>
          </div>
          <span style={{ width: 40, height: 40, borderRadius: 100, background: 'var(--primary-50)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <I.chevR size={20} />
          </span>
        </div>
      </button>
    );
  }

  function Shimmer() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '4px 0' }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ borderRadius: 'var(--r-card)', background: 'var(--surface)', border: '1px solid var(--line)', padding: 18 }}>
            <div style={{ display: 'flex', gap: 14 }}>
              <div className="shimmer" style={{ width: 46, height: 46, borderRadius: 14 }} />
              <div style={{ flex: 1 }}>
                <div className="shimmer" style={{ width: '40%', height: 11, borderRadius: 6, marginBottom: 9 }} />
                <div className="shimmer" style={{ width: '70%', height: 16, borderRadius: 6 }} />
              </div>
            </div>
            <div className="shimmer" style={{ width: '90%', height: 12, borderRadius: 6, margin: '16px 0 8px' }} />
            <div className="shimmer" style={{ width: '50%', height: 12, borderRadius: 6 }} />
          </div>
        ))}
      </div>
    );
  }

  function Dashboard({ profile, onOpen, onOpenLang, lang }) {
    const [cat, setCat] = useState('All');
    const [loading, setLoading] = useState(true);
    const D = window.APP_DATA;

    useEffect(() => {
      const t = setTimeout(() => setLoading(false), 900);
      return () => clearTimeout(t);
    }, []);

    // filter rights — platform cards only matching their app
    let rights = D.rights.filter(r => {
      if (r.platforms) return r.platforms.includes(profile.company) || profile.company === 'Other';
      return true;
    });
    const visible = cat === 'All' ? rights
      : cat === 'For You' ? rights.filter(r => r.featured || r.category === 'Platform')
      : rights.filter(r => r.category === cat);

    const total = rights.filter(r => !r.isPension).reduce((s, r) => s + r.valueNum, 0);

    return (
      <div className="screen">
        {/* Header */}
        <div style={{ paddingTop: TOP, background: 'var(--bg)', position: 'relative', zIndex: 5 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 20px 12px' }}>
            <div style={{ width: 44, height: 44, borderRadius: 100, background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-h)', fontWeight: 700, fontSize: 16, flexShrink: 0 }}>
              {profile.initials}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>Namaste 👋</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontFamily: 'var(--font-h)', fontWeight: 700, fontSize: 17 }}>{profile.company} partner</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, fontSize: 12.5, color: 'var(--muted)', fontWeight: 500 }}>
                  <I.pin size={13} />{profile.location}
                </span>
              </div>
            </div>
            <button onClick={onOpenLang} style={{ display: 'flex', alignItems: 'center', gap: 5, height: 38, padding: '0 12px', borderRadius: 100, background: 'var(--surface)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-card)', color: 'var(--primary)' }}>
              <I.globe size={18} /><span style={{ fontFamily: 'var(--font-h)', fontWeight: 700, fontSize: 13, textTransform: 'uppercase' }}>{lang}</span>
            </button>
            <button style={{ width: 38, height: 38, borderRadius: 100, background: 'var(--surface)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-card)', color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <I.bell size={19} />
              <span style={{ position: 'absolute', top: 7, right: 8, width: 8, height: 8, borderRadius: 100, background: 'var(--accent)', border: '1.5px solid var(--surface)' }} />
            </button>
          </div>

          {/* Value banner */}
          <div style={{ padding: '0 20px 14px' }}>
            <div style={{ borderRadius: 'var(--r-card)', background: 'linear-gradient(120deg, #FFF7EF 0%, #FFFFFF 100%)', border: '1px solid var(--accent-100)', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 46, height: 46, borderRadius: 14, background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <I.sparkle size={26} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 600 }}>You're eligible for</div>
                <div style={{ fontFamily: 'var(--font-h)', fontWeight: 800, fontSize: 25, color: 'var(--accent)', lineHeight: 1.05 }}>₹{formatINR(total)}</div>
                <div style={{ fontSize: 12.5, color: 'var(--muted)', fontWeight: 500 }}>in cover + a ₹3,000/mo pension</div>
              </div>
            </div>
          </div>

          {/* Category chips */}
          <div style={{ display: 'flex', gap: 9, overflowX: 'auto', padding: '0 20px 14px', scrollbarWidth: 'none' }} className="scroll">
            {D.categories.map(c => {
              const on = cat === c;
              return (
                <button key={c} onClick={() => setCat(c)} style={{
                  flexShrink: 0, height: 38, padding: '0 16px', borderRadius: 100, whiteSpace: 'nowrap',
                  fontFamily: 'var(--font-h)', fontWeight: 600, fontSize: 14,
                  background: on ? 'var(--primary)' : 'var(--surface)',
                  color: on ? '#fff' : 'var(--muted)',
                  border: on ? '1px solid var(--primary)' : '1px solid var(--line)',
                  transition: 'all .2s',
                }}>{c}</button>
              );
            })}
          </div>
        </div>

        {/* Feed */}
        <div className="scroll" style={{ padding: '4px 20px 110px' }}>
          {loading ? <Shimmer /> : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 2px 0' }}>
                <span className="label">{visible.length} rights for you</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12.5, color: 'var(--primary)', fontWeight: 600, fontFamily: 'var(--font-h)' }}>
                  <I.search size={14} /> Updated today
                </span>
              </div>
              {visible.map((r, idx) => <RightCard key={r.id} r={r} onOpen={onOpen} idx={idx} />)}
              {visible.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--muted)' }}>
                  <div style={{ width: 64, height: 64, borderRadius: 100, background: 'var(--primary-50)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}><I.search size={30} /></div>
                  <p style={{ fontWeight: 500 }}>Nothing in this category yet.<br />Update your profile to find more.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  function hexA(hex, a) {
    if (hex.startsWith('var')) return hex;
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
  }

  window.Dashboard = Dashboard;
  window.formatINR = formatINR;
})();
