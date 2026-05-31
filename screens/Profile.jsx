/* Profile — user summary, protection progress, settings. */
(function () {
  const I = window.Icon;
  const TOP = 54;

  function Row({ icon, label, value, onClick, last }) {
    const Ic = I[icon];
    return (
      <button onClick={onClick} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '15px 4px', borderBottom: last ? 'none' : '1px solid var(--line)', textAlign: 'left' }}>
        <span style={{ width: 38, height: 38, borderRadius: 12, background: 'var(--primary-50)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ic size={20} /></span>
        <span style={{ flex: 1, fontFamily: 'var(--font-h)', fontWeight: 600, fontSize: 16 }}>{label}</span>
        {value && <span style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 500 }}>{value}</span>}
        <span style={{ color: 'var(--muted-light)' }}><I.chevR size={18} /></span>
      </button>
    );
  }

  function Profile({ profile, lang, onOpenLang, onRestart }) {
    const D = window.APP_DATA;
    const total = D.rights.filter(r => !r.isPension && (!r.platforms || r.platforms.includes(profile.company) || profile.company === 'Other')).reduce((s, r) => s + r.valueNum, 0);
    const claimed = 2, totalRights = 6;

    const LANG_LABEL = { en: 'English', hi: 'हिंदी', mr: 'मराठी', ta: 'தமிழ்', bn: 'বাংলা', te: 'తెలుగు' };

    return (
      <div className="screen">
        <div className="scroll" style={{ paddingBottom: 110 }}>
          {/* Header */}
          <div style={{ background: 'linear-gradient(160deg, #0F766E 0%, #115E59 100%)', padding: `${TOP}px 22px 30px`, color: '#fff', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -40, right: -30, width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, position: 'relative' }}>
              <div style={{ width: 64, height: 64, borderRadius: 100, background: 'rgba(255,255,255,0.18)', border: '2px solid rgba(255,255,255,0.3)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-h)', fontWeight: 700, fontSize: 24, flexShrink: 0 }}>{profile.initials}</div>
              <div>
                <h1 style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>{profile.name === 'You' ? 'Your profile' : profile.name}</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4, fontSize: 13.5, color: 'rgba(255,255,255,0.82)', fontWeight: 500 }}>
                  <span>{profile.company} partner</span>
                  <span style={{ width: 3, height: 3, borderRadius: 4, background: 'rgba(255,255,255,0.6)' }} />
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}><I.pin size={13} />{profile.location}</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ padding: '0 20px', marginTop: -18, position: 'relative', zIndex: 2 }}>
            {/* Protection card */}
            <div style={{ background: 'var(--surface)', borderRadius: 'var(--r-card)', boxShadow: 'var(--shadow-soft)', border: '1px solid var(--line)', padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div>
                  <div className="label" style={{ fontSize: 11 }}>Your total protection</div>
                  <div style={{ fontFamily: 'var(--font-h)', fontWeight: 800, fontSize: 28, color: 'var(--primary)' }}>₹{window.formatINR(total)}</div>
                </div>
                <span style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--primary-50)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I.shieldCheck size={26} /></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 13.5, color: 'var(--muted)', fontWeight: 600 }}>{claimed} of {totalRights} rights claimed</span>
                <span style={{ fontSize: 13.5, color: 'var(--accent)', fontWeight: 700, fontFamily: 'var(--font-h)' }}>{Math.round(claimed / totalRights * 100)}%</span>
              </div>
              <div style={{ height: 10, background: 'var(--bg)', borderRadius: 100, overflow: 'hidden', border: '1px solid var(--line)' }}>
                <div style={{ height: '100%', width: `${claimed / totalRights * 100}%`, background: 'linear-gradient(90deg, var(--primary), #14857B)', borderRadius: 100 }} />
              </div>
              <p style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 500, marginTop: 12, marginBottom: 0, lineHeight: 1.4 }}>Keep going — claim your e-Shram card to unlock 4 more schemes automatically.</p>
            </div>

            {/* Settings */}
            <div style={{ background: 'var(--surface)', borderRadius: 'var(--r-card)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-card)', padding: '4px 16px', marginTop: 16 }}>
              <Row icon="globe" label="Language" value={LANG_LABEL[lang] || 'English'} onClick={onOpenLang} />
              <Row icon="bell" label="Notifications" value="On" />
              <Row icon="idcard" label="Edit profile details" onClick={onRestart} />
              <Row icon="community" label="Help & support" last />
            </div>

            <button onClick={onRestart} style={{ width: '100%', marginTop: 16, height: 52, borderRadius: 'var(--r-pill)', border: '1.5px solid var(--line)', background: 'var(--surface)', color: 'var(--muted)', fontFamily: 'var(--font-h)', fontWeight: 600, fontSize: 16 }}>
              Restart onboarding
            </button>
            <p style={{ textAlign: 'center', fontSize: 12.5, color: 'var(--muted-light)', fontWeight: 500, marginTop: 16 }}>Gigly · A pro-bono rights resource · v1.0</p>
          </div>
        </div>
      </div>
    );
  }

  window.Profile = Profile;
})();
