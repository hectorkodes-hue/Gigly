/* Worker Forum — localized peer-to-peer community + New Post modal. */
(function () {
  const { useState } = React;
  const I = window.Icon;
  const TOP = 54;

  function PostCard({ p, onVote, voted }) {
    return (
      <div className="fade-in" style={{ background: 'var(--surface)', borderRadius: 'var(--r-card)', border: '1px solid var(--line)', padding: 18, boxShadow: 'var(--shadow-card)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: 100, background: p.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-h)', fontWeight: 700, fontSize: 15, flexShrink: 0 }}>{p.initials}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--font-h)', fontWeight: 700, fontSize: 15.5 }}>{p.author}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: 'var(--muted)', fontWeight: 500 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}><I.pin size={12} />{p.location}</span>
              <span style={{ width: 3, height: 3, borderRadius: 4, background: 'var(--muted-light)' }} />
              <span>{p.company}</span>
            </div>
          </div>
          <span style={{ fontSize: 12.5, color: 'var(--muted-light)', fontWeight: 500, flexShrink: 0 }}>{p.time}</span>
        </div>

        <p style={{ fontSize: 15.5, color: 'var(--text)', fontWeight: 500, lineHeight: 1.5, margin: '0 0 14px' }}>{p.text}</p>

        {p.solved && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--primary-50)', color: 'var(--primary)', borderRadius: 100, padding: '5px 12px', fontFamily: 'var(--font-h)', fontWeight: 600, fontSize: 12.5, marginBottom: 12 }}>
            <I.checkCircle size={15} /> Solved · helpful answer inside
          </div>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 14 }}>
          {p.tags.map(t => <span key={t} className="tag tag-teal">{t}</span>)}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 12, borderTop: '1px solid var(--line)' }}>
          <button onClick={() => onVote(p.id)} style={{
            display: 'flex', alignItems: 'center', gap: 6, height: 36, padding: '0 14px', borderRadius: 100,
            background: voted ? 'var(--primary)' : 'var(--bg)', color: voted ? '#fff' : 'var(--muted)',
            border: voted ? '1px solid var(--primary)' : '1px solid var(--line)', transition: 'all .15s',
            fontFamily: 'var(--font-h)', fontWeight: 700, fontSize: 14,
          }}>
            <I.upvote size={17} />{p.upvotes + (voted ? 1 : 0)}
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, height: 36, padding: '0 14px', borderRadius: 100, background: 'var(--bg)', border: '1px solid var(--line)', color: 'var(--muted)', fontFamily: 'var(--font-h)', fontWeight: 700, fontSize: 14 }}>
            <I.comment size={17} />{p.comments}
          </div>
          <button style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5, color: 'var(--primary)', fontFamily: 'var(--font-h)', fontWeight: 600, fontSize: 14 }}>
            Reply <I.chevR size={15} />
          </button>
        </div>
      </div>
    );
  }

  function NewPostModal({ onClose, onPost, profile }) {
    const [text, setText] = useState('');
    const [tags, setTags] = useState(['Document Help']);
    const D = window.APP_DATA;
    const toggle = (t) => setTags(tags.includes(t) ? tags.filter(x => x !== t) : [...tags, t]);
    const valid = text.trim().length > 5;

    return (
      <>
        <div className="dim" onClick={onClose} />
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 70, zIndex: 45, background: 'var(--surface)', borderRadius: '28px 28px 0 0', boxShadow: '0 -12px 40px rgba(28,25,23,0.18)', display: 'flex', flexDirection: 'column', animation: 'popUp .32s cubic-bezier(.22,1,.36,1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px 14px', borderBottom: '1px solid var(--line)' }}>
            <button onClick={onClose} style={{ width: 38, height: 38, borderRadius: 100, background: 'var(--bg)', color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I.close size={20} /></button>
            <span style={{ fontFamily: 'var(--font-h)', fontWeight: 700, fontSize: 17 }}>Ask the community</span>
            <button onClick={() => valid && onPost(text, tags)} className="btn" style={{ height: 38, padding: '0 18px', fontSize: 15, background: valid ? 'var(--primary)' : 'var(--line)', color: valid ? '#fff' : 'var(--muted-light)', pointerEvents: valid ? 'auto' : 'none' }}>Post</button>
          </div>

          <div className="scroll" style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 100, background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-h)', fontWeight: 700, fontSize: 14 }}>{profile.initials}</div>
              <div>
                <div style={{ fontFamily: 'var(--font-h)', fontWeight: 700, fontSize: 15 }}>Posting publicly</div>
                <div style={{ fontSize: 12.5, color: 'var(--muted)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4 }}><I.pin size={12} />{profile.location} · {profile.company}</div>
              </div>
            </div>

            <textarea autoFocus value={text} onChange={e => setText(e.target.value)}
              placeholder="Ask a question or share what helped you… e.g. How do I fix an Aadhaar mismatch on e-Shram?"
              style={{ width: '100%', minHeight: 130, border: 'none', outline: 'none', resize: 'none', fontFamily: 'var(--font-b)', fontSize: 16.5, fontWeight: 500, lineHeight: 1.5, color: 'var(--text)', background: 'transparent' }} />

            <div style={{ marginTop: 8 }}>
              <div className="label" style={{ marginBottom: 12 }}>Add tags so the right people see it</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
                {D.forumTags.map(t => {
                  const on = tags.includes(t);
                  return (
                    <button key={t} onClick={() => toggle(t)} style={{
                      height: 40, padding: '0 16px', borderRadius: 100, whiteSpace: 'nowrap',
                      fontFamily: 'var(--font-h)', fontWeight: 600, fontSize: 14,
                      background: on ? 'var(--primary)' : 'var(--bg)', color: on ? '#fff' : 'var(--muted)',
                      border: on ? '1px solid var(--primary)' : '1px solid var(--line)', transition: 'all .15s',
                      display: 'flex', alignItems: 'center', gap: 5,
                    }}>{on && <I.check size={15} sw={2.6} />}{t}</button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  function Forum({ profile }) {
    const D = window.APP_DATA;
    const [tab, setTab] = useState('Trending');
    const [posts, setPosts] = useState(D.posts);
    const [votes, setVotes] = useState({});
    const [modal, setModal] = useState(false);

    const vote = (id) => setVotes(v => ({ ...v, [id]: !v[id] }));

    let list = [...posts];
    if (tab === 'Trending') list.sort((a, b) => (b.upvotes + (votes[b.id] ? 1 : 0)) - (a.upvotes + (votes[a.id] ? 1 : 0)));
    else if (tab === 'Near Me') list = list.filter(p => p.location === profile.location);
    else if (tab === 'My Company') list = list.filter(p => p.company === profile.company);

    const addPost = (text, tags) => {
      const np = {
        id: 'new' + Date.now(), author: 'You', handle: '@you', initials: profile.initials, color: 'var(--primary-700)',
        location: profile.location, company: profile.company, text, tags: tags.length ? tags : ['General'],
        upvotes: 0, comments: 0, time: 'now', solved: false,
      };
      setPosts([np, ...posts]);
      setModal(false);
      setTab('Trending');
    };

    return (
      <div className="screen">
        {/* Header + tabs */}
        <div style={{ paddingTop: TOP, background: 'var(--bg)', borderBottom: '1px solid var(--line)', position: 'relative', zIndex: 5 }}>
          <div style={{ padding: '6px 20px 4px' }}>
            <h1 style={{ fontSize: 27, fontWeight: 800 }}>Community</h1>
            <p style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 500, marginTop: 2 }}>Real answers from workers like you</p>
          </div>
          <div style={{ display: 'flex', gap: 4, padding: '10px 20px 0' }}>
            {D.forumTabs.map(t => {
              const on = tab === t;
              return (
                <button key={t} onClick={() => setTab(t)} style={{ position: 'relative', padding: '8px 4px 12px', marginRight: 18, whiteSpace: 'nowrap', fontFamily: 'var(--font-h)', fontWeight: 600, fontSize: 16, color: on ? 'var(--primary)' : 'var(--muted)', transition: 'color .2s' }}>
                  {t}
                  {on && <span style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 4, borderRadius: 100, background: 'var(--primary)' }} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Feed */}
        <div className="scroll" style={{ padding: '16px 20px 110px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {list.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 20px', color: 'var(--muted)' }}>
              <div style={{ width: 64, height: 64, borderRadius: 100, background: 'var(--primary-50)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}><I.community size={32} /></div>
              <p style={{ fontWeight: 600, fontFamily: 'var(--font-h)', fontSize: 16, color: 'var(--text)' }}>Be the first to ask</p>
              <p style={{ fontWeight: 500, marginTop: 4 }}>No posts in {tab.toLowerCase()} yet. Start the conversation in your area.</p>
            </div>
          ) : list.map(p => <PostCard key={p.id} p={p} onVote={vote} voted={!!votes[p.id]} />)}
        </div>

        {/* FAB */}
        <button onClick={() => setModal(true)} style={{
          position: 'absolute', right: 20, bottom: 100, zIndex: 35,
          width: 60, height: 60, borderRadius: 100, background: 'var(--accent)', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 10px 24px rgba(249,115,22,0.42)', transition: 'transform .15s',
        }} onMouseDown={e => e.currentTarget.style.transform = 'scale(0.9)'} onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
          <I.plus size={28} sw={2.6} />
        </button>

        {modal && <NewPostModal onClose={() => setModal(false)} onPost={addPost} profile={profile} />}
      </div>
    );
  }

  window.Forum = Forum;
})();
