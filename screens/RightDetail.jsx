/* Right Detail & Information Guide — plain-language breakdown + official portal link. */
(function () {
  const { useState, useRef } = React;
  const I = window.Icon;
  const TOP = 54;

  const CAT_COLOR = { Identity: '#0F766E', Insurance: '#0F766E', Health: '#0F766E', Pension: '#0F766E', Platform: '#0F766E' };

  function CheckItem({ children, accent = 'var(--primary)' }) {
    return (
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <span style={{ width: 24, height: 24, borderRadius: 100, background: 'var(--primary-50)', color: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
          <I.check size={15} sw={2.6} />
        </span>
        <span style={{ fontSize: 15.5, color: 'var(--text)', fontWeight: 500, lineHeight: 1.45 }}>{children}</span>
      </div>
    );
  }

  function Section({ icon, title, children, sub }) {
    const Ic = I[icon];
    return (
      <div style={{ background: 'var(--surface)', borderRadius: 'var(--r-card)', border: '1px solid var(--line)', padding: 20, boxShadow: 'var(--shadow-card)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <span style={{ color: 'var(--primary)', flexShrink: 0, display: 'flex' }}><Ic size={21} /></span>
          <h3 style={{ fontSize: 17.5, fontWeight: 700, lineHeight: 1.2 }}>{title}</h3>
        </div>
        {sub && <p style={{ fontSize: 13.5, color: 'var(--muted)', fontWeight: 500, margin: '-6px 0 16px 0' }}>{sub}</p>}
        {children}
      </div>
    );
  }

  function RightDetail({ right: r, onBack }) {
    const [scrolled, setScrolled] = useState(false);
    const [toast, setToast] = useState(false);
    const onScroll = (e) => setScrolled(e.target.scrollTop > 120);

    const openPortal = () => {
      try { window.open(r.portalUrl, '_blank', 'noopener'); } catch (e) {}
      setToast(true);
      setTimeout(() => setToast(false), 3200);
    };

    return (
      <div className="screen">
        {/* Shrunk sticky title bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, zIndex: 30,
          paddingTop: TOP - 8, paddingBottom: 10, background: 'var(--primary)',
          display: 'flex', alignItems: 'center', gap: 10, padding: `${TOP - 6}px 16px 12px`,
          opacity: scrolled ? 1 : 0, transform: scrolled ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'opacity .25s, transform .25s', pointerEvents: scrolled ? 'auto' : 'none',
          boxShadow: '0 4px 14px rgba(15,118,110,0.25)',
        }}>
          <button onClick={onBack} style={{ color: '#fff', display: 'flex', padding: 4 }}><I.back size={24} /></button>
          <span style={{ fontFamily: 'var(--font-h)', fontWeight: 700, fontSize: 17, color: '#fff', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.title}</span>
        </div>

        <div className="scroll" onScroll={onScroll}>
          {/* Hero header block */}
          <div style={{ background: 'linear-gradient(160deg, #0F766E 0%, #115E59 100%)', color: '#fff', padding: `${TOP}px 22px 26px`, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -40, right: -30, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22, position: 'relative' }}>
              <button onClick={onBack} style={{ width: 40, height: 40, borderRadius: 100, background: 'rgba(255,255,255,0.16)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I.back size={22} /></button>
              <span className="tag" style={{ background: 'rgba(255,255,255,0.16)', color: '#fff' }}>{r.category}</span>
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.72)', fontWeight: 600, marginBottom: 6, position: 'relative' }}>{r.issuer}</div>
            <h1 style={{ fontSize: 29, fontWeight: 800, lineHeight: 1.08, position: 'relative' }}>{r.title}</h1>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, marginTop: 18, position: 'relative' }}>
              <div style={{ fontFamily: 'var(--font-h)', fontWeight: 800, fontSize: 38, lineHeight: 1, color: '#fff' }}>{r.headline}{r.isPension ? '/mo' : ''}</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', fontWeight: 500, paddingBottom: 4 }}>{r.headlineNote}</div>
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: '20px 20px 130px', display: 'flex', flexDirection: 'column', gap: 16, background: 'var(--bg)' }}>
            {/* Cost pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--accent-50)', border: '1px solid var(--accent-100)', borderRadius: 18, padding: '14px 16px' }}>
              <span style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><I.rupee size={22} /></span>
              <div>
                <div className="label" style={{ color: 'var(--accent)', fontSize: 11 }}>What it costs you</div>
                <div style={{ fontFamily: 'var(--font-h)', fontWeight: 700, fontSize: 16, color: 'var(--text)' }}>{r.premium}</div>
              </div>
            </div>

            {/* Summary */}
            <div style={{ padding: '0 4px' }}>
              <p style={{ fontSize: 16, color: 'var(--text)', fontWeight: 500, lineHeight: 1.55 }}>{r.summary}</p>
            </div>

            <Section icon="checkCircle" title="Are you eligible?" sub="You qualify if all of these are true:">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                {r.eligibility.map((e, i) => <CheckItem key={i}>{e}</CheckItem>)}
              </div>
            </Section>

            <Section icon="doc" title="Documents to keep ready">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                {r.documents.map((d, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', background: 'var(--bg)', borderRadius: 14, border: '1px solid var(--line)' }}>
                    <span style={{ color: 'var(--muted)' }}><I.doc size={18} /></span>
                    <span style={{ fontSize: 15, fontWeight: 600, fontFamily: 'var(--font-h)' }}>{d}</span>
                  </div>
                ))}
              </div>
            </Section>

            <Section icon="arrow" title="How to claim it" sub="Follow these steps in order:">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {r.steps.map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, paddingBottom: i === r.steps.length - 1 ? 0 : 18, position: 'relative' }}>
                    {i !== r.steps.length - 1 && <div style={{ position: 'absolute', left: 14, top: 30, bottom: 4, width: 2, background: 'var(--primary-50)' }} />}
                    <span style={{ width: 28, height: 28, borderRadius: 100, background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-h)', fontWeight: 700, fontSize: 14, flexShrink: 0, zIndex: 1 }}>{i + 1}</span>
                    <span style={{ fontSize: 15.5, color: 'var(--text)', fontWeight: 500, lineHeight: 1.45, paddingTop: 3 }}>{s}</span>
                  </div>
                ))}
              </div>
            </Section>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', color: 'var(--muted)', fontSize: 13, fontWeight: 500, padding: '4px 0' }}>
              <I.shieldCheck size={16} /> Verified against official scheme guidelines
            </div>
          </div>
        </div>

        {/* Toast */}
        {toast && (
          <div style={{ position: 'absolute', left: 16, right: 16, bottom: 100, zIndex: 50, background: 'var(--accent)', color: '#fff', borderRadius: 18, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: 'var(--shadow-pop)', animation: 'fadeIn .25s ease' }}>
            <I.external size={20} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-h)', fontWeight: 700, fontSize: 14.5 }}>Opening {r.portal}</div>
              <div style={{ fontSize: 12.5, opacity: 0.85, fontWeight: 500 }}>Redirecting to the official portal…</div>
            </div>
          </div>
        )}

        {/* Sticky action bar */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 40, background: 'var(--surface)', borderTop: '1px solid var(--line)', padding: '14px 20px calc(18px + env(safe-area-inset-bottom))', boxShadow: '0 -8px 24px rgba(28,25,23,0.06)' }}>
          <button className="btn btn-primary btn-block" onClick={openPortal}>
            Visit official portal <I.external size={19} />
          </button>
        </div>
      </div>
    );
  }

  window.RightDetail = RightDetail;
})();
