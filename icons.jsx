/* Gigly — line icon set. Stroke-based, inherit color via `currentColor`. */
(function () {
  const S = ({ children, size = 24, sw = 2, style, ...rest }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
      style={style} {...rest}>{children}</svg>
  );

  const Icon = {
    home: (p) => <S {...p}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" /></S>,
    community: (p) => <S {...p}><circle cx="9" cy="8" r="3" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0" /><path d="M16 5.5a3 3 0 0 1 0 5.6" /><path d="M17.5 14.5a5.5 5.5 0 0 1 3 5.5" /></S>,
    user: (p) => <S {...p}><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></S>,
    bell: (p) => <S {...p}><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" /><path d="M10 20a2 2 0 0 0 4 0" /></S>,
    globe: (p) => <S {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c2.5 2.7 2.5 15.3 0 18" /><path d="M12 3c-2.5 2.7-2.5 15.3 0 18" /></S>,
    back: (p) => <S {...p}><path d="M15 5l-7 7 7 7" /></S>,
    chevR: (p) => <S {...p}><path d="M9 5l7 7-7 7" /></S>,
    check: (p) => <S {...p}><path d="M5 12.5l4.5 4.5L19 7" /></S>,
    checkCircle: (p) => <S {...p}><circle cx="12" cy="12" r="9" /><path d="M8 12.2l2.6 2.6L16 9" /></S>,
    shield: (p) => <S {...p}><path d="M12 3 5 6v5.5c0 4.3 3 7.5 7 9.5 4-2 7-5.2 7-9.5V6l-7-3Z" /></S>,
    shieldCheck: (p) => <S {...p}><path d="M12 3 5 6v5.5c0 4.3 3 7.5 7 9.5 4-2 7-5.2 7-9.5V6l-7-3Z" /><path d="M9 11.5l2.2 2.2L15.5 9.5" /></S>,
    heart: (p) => <S {...p}><path d="M12 20s-7-4.4-7-9.3A4 4 0 0 1 12 7.5 4 4 0 0 1 19 10.7C19 15.6 12 20 12 20Z" /></S>,
    pension: (p) => <S {...p}><path d="M3 13a4 4 0 0 1 4-4h7a5 5 0 0 1 5 5v3h-3" /><path d="M3 13v4h4" /><circle cx="8.5" cy="14.5" r="2.5" /><path d="M14 9V7a2 2 0 0 1 2-2" /><path d="M18.5 12.5h.01" /></S>,
    idcard: (p) => <S {...p}><rect x="3" y="5" width="18" height="14" rx="3" /><circle cx="8.5" cy="11" r="2" /><path d="M5.5 16a3 3 0 0 1 6 0" /><path d="M14 10h4M14 13.5h3" /></S>,
    sparkle: (p) => <S {...p}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" /></S>,
    search: (p) => <S {...p}><circle cx="11" cy="11" r="7" /><path d="M16.5 16.5 21 21" /></S>,
    plus: (p) => <S {...p}><path d="M12 5v14M5 12h14" /></S>,
    close: (p) => <S {...p}><path d="M6 6l12 12M18 6 6 18" /></S>,
    upvote: (p) => <S {...p}><path d="M12 4l7 8h-4v8H9v-8H5l7-8Z" /></S>,
    comment: (p) => <S {...p}><path d="M4 5h16v11H9l-4 3v-3H4V5Z" /></S>,
    external: (p) => <S {...p}><path d="M14 4h6v6" /><path d="M20 4 11 13" /><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></S>,
    pin: (p) => <S {...p}><path d="M12 21s7-5.5 7-11a7 7 0 0 0-14 0c0 5.5 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></S>,
    doc: (p) => <S {...p}><path d="M7 3h7l5 5v13a0 0 0 0 1 0 0H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" /><path d="M14 3v5h5" /></S>,
    rupee: (p) => <S {...p}><path d="M7 5h10M7 9h10M16 5c0 4-3.5 5-6.5 5L16 19" /><path d="M7 9c5 0 5 0 5 0" /></S>,
    clock: (p) => <S {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></S>,
    bike: (p) => <S {...p}><circle cx="5.5" cy="17" r="3" /><circle cx="18.5" cy="17" r="3" /><path d="M5.5 17 9 8h4l2.5 6h3" /><path d="M9 8h5l1.5 4" /><path d="M13 8l-1-3h-2" /></S>,
    auto: (p) => <S {...p}><path d="M3 16V12a6 6 0 0 1 6-6h2l4 4h3a2 2 0 0 1 2 2v4" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /><path d="M9 17h6M3 16h2M19 16h2" /></S>,
    cab: (p) => <S {...p}><path d="M4 15l1.5-5A2 2 0 0 1 7.4 8.6h9.2a2 2 0 0 1 1.9 1.4L20 15" /><path d="M3 15h18v3h-2v-1H5v1H3v-3Z" /><circle cx="7" cy="16.5" r="1" /><circle cx="17" cy="16.5" r="1" /></S>,
    box: (p) => <S {...p}><path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z" /><path d="M4 7l8 4 8-4M12 11v10" /></S>,
    flame: (p) => <S {...p}><path d="M12 3c1 3 4 4 4 8a4 4 0 0 1-8 0c0-1.5.5-2.5 1.2-3.2C9 9 9.5 11 11 11c.5-2-1-4 1-8Z" /></S>,
    arrow: (p) => <S {...p}><path d="M5 12h14M13 6l6 6-6 6" /></S>,
  };

  window.Icon = Icon;
})();
