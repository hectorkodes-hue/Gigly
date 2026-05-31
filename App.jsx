/* App shell — device frame, navigation, bottom nav, transitions, language sheet. */
(function () {
  const { useState } = React;
  const I = window.Icon;

  const LANGS = [
    { id: 'en', label: 'English', sub: 'English' },
    { id: 'hi', label: 'हिंदी', sub: 'Hindi' },
    { id: 'mr', label: 'मराठी', sub: 'Marathi' },
    { id: 'ta', label: 'தமிழ்', sub: 'Tamil' },
    { id: 'bn', label: 'বাংলা', sub: 'Bengali' },
    { id: 'te', label: 'తెలుగు', sub: 'Telugu' },
  ];

  function BottomNav({ tab, setTab }) {
    const items = [
      { id: 'home', label: 'My Rights', icon: 'home' },
      { id: 'forum', label: 'Community', icon: 'community' },
      { id: 'profile', label: 'Profile', icon: 'user' },
    ];
    return (
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 30,
        paddingBottom: 22, paddingTop: 8,
        background: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(18px) saturate(180%)',
        WebkitBackdropFilter: 'blur(18px) saturate(180%)', borderTop: '1px solid var(--line)',
        display: 'flex', justifyContent: 'space-around',
      }}>
        {items.map(it => {
          const on = tab === it.id;
          const Ic = I[it.icon];
          return (
            <button key={it.id} onClick={() => setTab(it.id)} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '4px 18px',
              color: on ? 'var(--primary)' : 'var(--muted-light)', transition: 'color .2s',
            }}>
              <span style={{ transform: on ? 'scale(1.05)' : 'scale(1)', transition: 'transform .2s' }}><Ic size={25} sw={on ? 2.4 : 2} /></span>
              <span style={{ fontFamily: 'var(--font-h)', fontWeight: on ? 700 : 600, fontSize: 11.5 }}>{it.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  function LangSheet({ lang, onPick, onClose }) {
    return (
      <>
        <div className="dim" onClick={onClose} />
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 55, background: 'var(--surface)', borderRadius: '28px 28px 0 0', padding: '8px 20px calc(28px + env(safe-area-inset-bottom))', boxShadow: '0 -12px 40px rgba(28,25,23,0.2)', animation: 'popUp .3s cubic-bezier(.22,1,.36,1)' }}>
          <div style={{ width: 40, height: 5, borderRadius: 100, background: 'var(--line)', margin: '8px auto 16px' }} />
          <h2 style={{ fontSize: 21, fontWeight: 700, marginBottom: 4 }}>Choose your language</h2>
          <p style={{ fontSize: 13.5, color: 'var(--muted)', fontWeight: 500, marginBottom: 16 }}>Full translations are rolling out across India.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {LANGS.map(l => {
              const on = lang === l.id;
              return (
                <button key={l.id} onClick={() => onPick(l.id)} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
                  height: 60, padding: '0 16px', borderRadius: 18,
                  background: on ? 'var(--primary-50)' : 'var(--bg)',
                  border: on ? '2px solid var(--primary)' : '2px solid var(--line)',
                }}>
                  <span style={{ textAlign: 'left' }}>
                    <span style={{ display: 'block', fontFamily: 'var(--font-h)', fontWeight: 700, fontSize: 16, color: on ? 'var(--primary)' : 'var(--text)' }}>{l.label}</span>
                    <span style={{ fontSize: 11.5, color: 'var(--muted)', fontWeight: 500 }}>{l.sub}</span>
                  </span>
                  {on && <span style={{ color: 'var(--primary)' }}><I.checkCircle size={20} /></span>}
                </button>
              );
            })}
          </div>
        </div>
      </>
    );
  }

  function App() {
    const [stage, setStage] = useState('onboarding'); // onboarding | main
    const [profile, setProfile] = useState(window.APP_DATA.user);
    const [tab, setTab] = useState('home');
    const [detail, setDetail] = useState(null);
    const [closing, setClosing] = useState(false);
    const [lang, setLang] = useState('en');
    const [langOpen, setLangOpen] = useState(false);

    const openDetail = (r) => { setDetail(r); setClosing(false); };
    const closeDetail = () => {
      setClosing(true);
      setTimeout(() => { setDetail(null); setClosing(false); }, 260);
    };

    const complete = (p) => {
      setProfile({ ...window.APP_DATA.user, ...p });
      setStage('main'); setTab('home');
    };

    return (
      <div className="stage">
        <IOSDevice width={402} height={860}>
          <div style={{ position: 'relative', height: '100%', overflow: 'hidden', background: 'var(--bg)' }}>
            {stage === 'onboarding' && (
              <window.Onboarding onComplete={complete} />
            )}

            {stage === 'main' && (
              <>
                <div style={{ position: 'absolute', inset: 0 }}>
                  {tab === 'home' && <window.Dashboard profile={profile} lang={lang} onOpen={openDetail} onOpenLang={() => setLangOpen(true)} />}
                  {tab === 'forum' && <window.Forum profile={profile} />}
                  {tab === 'profile' && <window.Profile profile={profile} lang={lang} onOpenLang={() => setLangOpen(true)} onRestart={() => { setStage('onboarding'); }} />}
                </div>

                <BottomNav tab={tab} setTab={setTab} />

                {/* Detail overlay slides over everything incl. nav */}
                {detail && (
                  <div style={{ position: 'absolute', inset: 0, zIndex: 38, animation: `${closing ? 'slideOutR' : 'slideInR'} .28s cubic-bezier(.4,0,.2,1) both` }}>
                    <window.RightDetail right={detail} onBack={closeDetail} />
                  </div>
                )}

                {langOpen && <LangSheet lang={lang} onPick={(l) => { setLang(l); setLangOpen(false); }} onClose={() => setLangOpen(false)} />}
              </>
            )}
          </div>
        </IOSDevice>
      </div>
    );
  }

  // slide keyframes
  const st = document.createElement('style');
  st.textContent = `
    @keyframes slideInR { from { transform: translateX(100%); } to { transform: translateX(0); } }
    @keyframes slideOutR { from { transform: translateX(0); } to { transform: translateX(100%); } }
  `;
  document.head.appendChild(st);

  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
})();
