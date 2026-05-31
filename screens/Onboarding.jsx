/* Onboarding — Language & Profile Builder. Multi-step, feeds the rights engine. */
(function () {
  const { useState } = React;
  const I = window.Icon;
  const TOP = 56;

  const LANGS = [
    { id: 'en', label: 'English', sub: 'English' },
    { id: 'hi', label: 'हिंदी', sub: 'Hindi' },
    { id: 'mr', label: 'मराठी', sub: 'Marathi' },
    { id: 'ta', label: 'தமிழ்', sub: 'Tamil' },
    { id: 'bn', label: 'বাংলা', sub: 'Bengali' },
    { id: 'te', label: 'తెలుగు', sub: 'Telugu' },
  ];
  const WORK = [
    { id: 'bike', label: 'Delivery Rider', icon: 'bike' },
    { id: 'box', label: 'Courier / Parcel', icon: 'box' },
    { id: 'cab', label: 'Cab Driver', icon: 'cab' },
    { id: 'auto', label: 'Auto Driver', icon: 'auto' },
    { id: 'home', label: 'Home Services', icon: 'user' },
  ];
  const PLATFORMS = ['Swiggy', 'Zomato', 'Blinkit', 'Uber', 'Ola', 'Urban Company', 'Other'];
  const STATES = ['Delhi NCR', 'Maharashtra', 'Karnataka', 'Telangana', 'Tamil Nadu', 'Rajasthan'];

  function Onboarding({ onComplete }) {
    const [step, setStep] = useState(0); // 0 welcome, 1 lang, 2 work, 3 platform, 4 state
    const [lang, setLang] = useState('en');
    const [work, setWork] = useState(null);
    const [platform, setPlatform] = useState(null);
    const [state, setState] = useState(null);

    const totalSteps = 4;
    const canNext = step === 1 ? !!lang : step === 2 ? !!work : step === 3 ? !!platform : step === 4 ? !!state : true;

    const finish = () => onComplete({
      lang, work, company: platform, location: state,
      initials: 'YO', name: 'You',
    });

    const next = () => {
      if (step === 4) return finish();
      setStep(step + 1);
    };
    const back = () => setStep(Math.max(0, step - 1));

    // ── Welcome ──
    if (step === 0) {
      return (
        <div className="screen" style={{ background: 'var(--primary)' }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(120% 70% at 80% 0%, #14857B 0%, var(--primary) 45%, var(--primary-700) 100%)',
          }} />
          <div className="scroll" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', padding: `${TOP + 24}px 28px 28px` }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{
                width: 68, height: 68, borderRadius: 22, background: 'rgba(255,255,255,0.14)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28,
                border: '1px solid rgba(255,255,255,0.18)',
              }}>
                <div style={{ color: '#fff' }}><I.shieldCheck size={36} sw={2} /></div>
              </div>
              <div className="tag" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', alignSelf: 'flex-start', marginBottom: 18 }}>
                <span style={{ width: 6, height: 6, borderRadius: 9, background: 'var(--accent)' }}></span>
                For India's gig workers
              </div>
              <h1 style={{ color: '#fff', fontSize: 40, fontWeight: 800, lineHeight: 1.04 }}>
                You have rights.<br />Let's claim them.
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: 17, lineHeight: 1.5, marginTop: 18, fontWeight: 500, maxWidth: 320 }}>
                Insurance, pensions and health cover worth lakhs — already yours by law. Gigly finds the ones meant for you and shows you exactly how to claim them.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', margin: '26px 0 22px' }}>
              {[['₹21L+', 'in cover'], ['14', 'schemes'], ['100%', 'free'] ].map(([a, b]) => (
                <div key={a} style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-h)', fontWeight: 700, fontSize: 22, color: '#fff' }}>{a}</div>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 500 }}>{b}</div>
                </div>
              ))}
            </div>
            <button className="btn btn-block" style={{ background: '#fff', color: 'var(--primary)' }} onClick={() => setStep(1)}>
              Get started <I.arrow size={20} />
            </button>
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 14, fontWeight: 500 }}>
              Takes 60 seconds · No documents needed yet
            </p>
          </div>
        </div>
      );
    }

    // ── Steps 1-4 ──
    const titles = {
      1: ['Choose your language', 'You can change this anytime from the top of every screen.'],
      2: ['What work do you do?', 'We use this to match you with the right schemes and covers.'],
      3: ['Which app do you work on?', 'Some platforms add their own free insurance on top.'],
      4: ['Where are you based?', 'States like Karnataka & Rajasthan have extra worker laws.'],
    };

    return (
      <div className="screen">
        {/* progress + back */}
        <div style={{ paddingTop: TOP + 8, paddingBottom: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 20px 14px' }}>
            <button onClick={back} style={{ color: 'var(--text)', display: 'flex', padding: 4, marginLeft: -4 }}>
              <I.back size={24} />
            </button>
            <div style={{ flex: 1, height: 8, background: '#EFE9E2', borderRadius: 100, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(step / totalSteps) * 100}%`, background: 'var(--primary)', borderRadius: 100, transition: 'width .35s cubic-bezier(.4,0,.2,1)' }} />
            </div>
            <span className="ui" style={{ fontWeight: 600, fontSize: 14, color: 'var(--muted)' }}>{step}/{totalSteps}</span>
          </div>
        </div>

        <div className="scroll" style={{ padding: '8px 24px 20px' }}>
          <div key={step} className="fade-in">
            <h1 style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.12 }}>{titles[step][0]}</h1>
            <p style={{ color: 'var(--muted)', fontSize: 16, marginTop: 8, marginBottom: 24, fontWeight: 500, lineHeight: 1.45 }}>{titles[step][1]}</p>

            {step === 1 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {LANGS.map(l => {
                  const on = lang === l.id;
                  return (
                    <button key={l.id} onClick={() => setLang(l.id)}
                      style={selStyle(on, { height: 76, flexDirection: 'column', gap: 2 })}>
                      <span style={{ fontSize: 21, fontWeight: 700, fontFamily: 'var(--font-h)', color: on ? 'var(--primary)' : 'var(--text)' }}>{l.label}</span>
                      <span style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>{l.sub}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {step === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {WORK.map(w => {
                  const on = work === w.id;
                  const Ic = I[w.icon];
                  return (
                    <button key={w.id} onClick={() => setWork(w.id)}
                      style={selStyle(on, { height: 74, justifyContent: 'flex-start', gap: 16, padding: '0 18px' })}>
                      <span style={{
                        width: 48, height: 48, borderRadius: 16, flexShrink: 0,
                        background: on ? 'var(--primary)' : '#F4F1EC', color: on ? '#fff' : 'var(--muted)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s',
                      }}><Ic size={26} /></span>
                      <span style={{ fontSize: 18, fontWeight: 600, fontFamily: 'var(--font-h)', whiteSpace: 'nowrap', color: on ? 'var(--primary)' : 'var(--text)' }}>{w.label}</span>
                      {on && <span style={{ marginLeft: 'auto', color: 'var(--primary)' }}><I.checkCircle size={24} /></span>}
                    </button>
                  );
                })}
              </div>
            )}

            {step === 3 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {PLATFORMS.map(p => {
                  const on = platform === p;
                  return (
                    <button key={p} onClick={() => setPlatform(p)}
                      style={selStyle(on, { height: 54, padding: '0 20px', width: 'auto', fontSize: 16 })}>
                      <span style={{ fontSize: 16, fontWeight: 600, fontFamily: 'var(--font-h)', color: on ? 'var(--primary)' : 'var(--text)' }}>{p}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {step === 4 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {STATES.map(s => {
                  const on = state === s;
                  return (
                    <button key={s} onClick={() => setState(s)}
                      style={selStyle(on, { height: 60, justifyContent: 'flex-start', gap: 14, padding: '0 18px' })}>
                      <span style={{ color: on ? 'var(--primary)' : 'var(--muted-light)' }}><I.pin size={22} /></span>
                      <span style={{ fontSize: 17, fontWeight: 600, fontFamily: 'var(--font-h)', color: on ? 'var(--primary)' : 'var(--text)' }}>{s}</span>
                      {on && <span style={{ marginLeft: 'auto', color: 'var(--primary)' }}><I.checkCircle size={24} /></span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* bottom action */}
        <div style={{ padding: '14px 24px calc(20px + env(safe-area-inset-bottom))', borderTop: '1px solid var(--line)', background: 'var(--surface)' }}>
          <button className="btn btn-primary btn-block" disabled={!canNext}
            style={{ opacity: canNext ? 1 : 0.45, pointerEvents: canNext ? 'auto' : 'none' }}
            onClick={next}>
            {step === 4 ? 'Find my rights' : 'Continue'} <I.arrow size={20} />
          </button>
        </div>
      </div>
    );
  }

  function selStyle(on, extra = {}) {
    return {
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      width: '100%', borderRadius: 20,
      background: on ? 'var(--primary-50)' : 'var(--surface)',
      border: on ? '2px solid var(--primary)' : '2px solid var(--line)',
      boxShadow: on ? 'none' : 'var(--shadow-card)',
      transition: 'transform .2s ease, background .2s ease, border-color .2s ease',
      transform: on ? 'scale(1)' : 'scale(1)',
      ...extra,
    };
  }

  window.Onboarding = Onboarding;
})();
