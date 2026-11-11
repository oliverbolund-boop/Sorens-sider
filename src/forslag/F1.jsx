// Genereret fra designforslaget på Claude-lærredet. Ret gerne direkte i filen.
import React from 'react';
import { DCLogic, css } from '../dc.js';

const FONTS = 'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap';
const PAGE_CSS = `body{margin:0;background:#F2F4F1}
html{scroll-behavior:smooth}
a{color:#0D1B2A}a:hover{color:#3F6E1C}
input,textarea,button{font-family:inherit}
input:focus-visible,textarea:focus-visible,button:focus-visible,a:focus-visible{outline:3px solid #E9A23B;outline-offset:2px}
.m-btn{transition:transform .18s ease,background-color .18s ease,box-shadow .18s ease}
.m-btn:hover{transform:translateY(-2px)}
.m-card{transition:transform .25s ease,box-shadow .25s ease}
.m-card:hover{transform:translateY(-4px);box-shadow:0 22px 44px rgba(13,27,42,0.10)}
.m-link{transition:background-color .15s ease,color .15s ease}
.m-link:hover{background:#EEF1EC !important;color:#0D1B2A !important}
.m-arrow{transition:transform .2s ease}
.m-btn:hover .m-arrow{transform:translateX(3px)}
@keyframes m-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.m-track{animation:m-marquee 38s linear infinite}
@media (prefers-reduced-motion: reduce){html{scroll-behavior:auto}.m-track{animation:none}.m-btn,.m-card,.m-link,.m-arrow{transition:none}.m-btn:hover,.m-card:hover{transform:none}}`;

class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { w: typeof window !== 'undefined' ? window.innerWidth : 1280, menu: false, openFaq: 0, picked: {}, sent: false, view: 'home', tab: 'it' };
    this.onResize = () => this.setState({ w: window.innerWidth });
  }
  componentDidMount() { window.addEventListener('resize', this.onResize); }
  componentWillUnmount() { window.removeEventListener('resize', this.onResize); }
  goTo(id, e) {
    if (this.state.view !== 'home') {
      if (e && e.preventDefault) e.preventDefault();
      this.setState({ view: 'home', menu: false });
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView(); else window.scrollTo(0, 0);
      }, 30);
    } else {
      this.setState({ menu: false });
    }
  }
  openPage(view, e) {
    if (e && e.preventDefault) e.preventDefault();
    this.setState({ view, menu: false });
    window.scrollTo(0, 0);
  }
  renderVals() {
    const s = this.state;
    const isDesktop = s.w >= 1000;
    const isPhone = s.w < 640;
    const sp = isDesktop
      ? { head: 'span 7', photo: 'span 5', small: 'span 3', panel: 'span 4', items: 'span 8', faqHead: 'span 4', faqList: 'span 8', contactText: 'span 6', contactForm: 'span 6' }
      : { head: 'span 12', photo: 'span 12', small: 'span 6', panel: 'span 12', items: 'span 12', faqHead: 'span 12', faqList: 'span 12', contactText: 'span 12', contactForm: 'span 12' };
    const groups = {
      it: {
        label: 'IT-hjælp', title: 'Computer, wifi og telefon', price: '350 kr.', note: '', hasNote: false,
        bg: '#0D1B2A', ink: '#ffffff', accent: '#C6E97A', wave: '#152A45', line: '#3F6E1C',
        tint: '#EAF0F7', tintInk: '#1E3A64',
        items: [
          { isWifi: true, title: 'PC & wifi', text: 'Når computeren er langsom, printeren ikke vil, eller wifi’en falder ud i stuen.', examples: ['Ny computer', 'Wifi og router', 'Printer og mail'] },
          { isPhone: true, title: 'iPhone & iPad', text: 'Jeg hjælper dig godt i gang med telefonen eller tabletten og får styr på det, der driller.', examples: ['Billeder', 'MitID og apps', 'Videoopkald'] }
        ]
      },
      home: {
        label: 'Hjemmeservice', title: 'Praktisk hjælp i hjemmet', price: '500 kr.', note: 'Kørsel uden for området efter aftale', hasNote: true,
        bg: '#3F6E1C', ink: '#ffffff', accent: '#DDEBC9', wave: '#2F5715', line: '#1E3A64',
        tint: '#EEF4E7', tintInk: '#3F6E1C',
        items: [
          { isFurniture: true, title: 'Samling af møbler', text: 'Reolen, sengen eller kommoden fra papkassen, samlet og stillet på plads.', examples: ['Flatpack', 'Havemøbler', 'Emballage væk'] },
          { isShopping: true, title: 'Indkøb af dagligvarer', text: 'Har du svært ved at komme ud, handler jeg ind for dig og bærer varerne ind.', examples: ['Fast ugentlig tur', 'Enkelte indkøb', 'Pakker'] },
          { isLamp: true, title: 'Ophæng af hylder og lamper', text: 'Det, der skal op at hænge, hænger jeg lige og solidt op.', examples: ['Hylder', 'Lamper', 'Tv på væggen'] }
        ]
      }
    };
    const tabBase = 'border: 0; border-radius: 999px; font-size: 15px; font-weight: 600; padding: 12px 20px; min-height: 46px; cursor: pointer; ';
    const tabOn = 'background: #0D1B2A; color: #ffffff;';
    const tabOff = 'background: transparent; color: #3C4654;';
    const isIt = s.tab === 'it';
    const ticker = [];
    const words = ['PC & wifi', 'iPhone & iPad', 'Printer & mail', 'Møbelsamling', 'Ophæng', 'Indkøb', 'MitID & apps', 'Tv på væggen'];
    for (let r = 0; r < 2; r++) words.forEach((x) => ticker.push(x));
    const faqRaw = [
      { q: 'Hvor kommer du ud?', a: 'Jeg hjælper i Kerteminde og omegn og kører også gerne længere væk efter aftale.' },
      { q: 'Hvad koster det?', a: 'IT-hjælp koster 350 kr. pr. time, og hjemmeservice koster 500 kr. pr. time. Privatpriser er inkl. moms, og for erhverv lægges moms oveni. Større opgaver får en samlet pris på forhånd.' },
      { q: 'Hjælper du også virksomheder?', a: 'Ja. Jeg hjælper også små virksomheder med computere, wifi og telefoner.' },
      { q: 'Jeg er ikke god til teknik. Er det et problem?', a: 'Slet ikke. Det er netop derfor, jeg er her. Jeg forklarer i et roligt tempo og uden fagord.' },
      { q: 'Hvordan betaler jeg?', a: 'Du kan betale med MobilePay, kontant eller på faktura.' }
    ];
    const iconBase = 'flex: 0 0 auto; width: 36px; height: 36px; border-radius: 999px; display: flex; align-items: center; justify-content: center; transition: transform .2s ease, background-color .2s ease; ';
    const faqs = faqRaw.map((f, i) => {
      const open = s.openFaq === i;
      return Object.assign({}, f, {
        open, expanded: open ? 'true' : 'false',
        iconStyle: iconBase + (open ? 'background: #0D1B2A; color: #C6E97A; transform: rotate(45deg);' : 'background: #F2F4F1; color: #0D1B2A;'),
        toggle: () => this.setState({ openFaq: open ? -1 : i })
      });
    });
    const chipLabels = ['PC & wifi', 'iPhone & iPad', 'Møbler', 'Indkøb', 'Ophæng', 'Andet'];
    const chipBase = 'font-size: 15px; font-weight: 500; padding: 10px 16px; border-radius: 999px; min-height: 44px; cursor: pointer; ';
    const chips = chipLabels.map((label) => {
      const on = !!s.picked[label];
      return {
        label,
        pressed: on ? 'true' : 'false',
        style: chipBase + (on ? 'background: #0D1B2A; color: #ffffff; border: 1px solid #0D1B2A;' : 'background: #F2F4F1; color: #0D1B2A; border: 1px solid #F2F4F1;'),
        pick: () => this.setState({ picked: Object.assign({}, s.picked, { [label]: !on }) })
      };
    });
    const nav = {};
    ['top', 'ydelser', 'om', 'spoergsmaal', 'kontakt'].forEach((id) => { nav[id] = (e) => this.goTo(id, e); });
    return {
      isDesktop,
      isCompact: !isDesktop,
      isHome: s.view === 'home',
      isPrivacy: s.view === 'privatliv',
      isCookies: s.view === 'cookies',
      sp,
      heroPad: isPhone ? '28px 24px' : '48px',
      heroMin: isDesktop ? '580px' : '0px',
      photoMin: isDesktop ? '580px' : (isPhone ? '440px' : '520px'),
      aboutPad: isPhone ? '32px 24px' : '64px',
      contactPad: isPhone ? '32px 24px 40px' : '64px',
      contactGap: isDesktop ? '32px' : '0px',
      nav,
      group: isIt ? groups.it : groups.home,
      tabIt: { pressed: isIt ? 'true' : 'false', style: tabBase + (isIt ? tabOn : tabOff) },
      tabHome: { pressed: isIt ? 'false' : 'true', style: tabBase + (isIt ? tabOff : tabOn) },
      showIt: () => this.setState({ tab: 'it', menu: false }),
      showHome: () => this.setState({ tab: 'home', menu: false }),
      ticker,
      showPrivacy: (e) => this.openPage('privatliv', e),
      showCookies: (e) => this.openPage('cookies', e),
      showMobileMenu: !isDesktop && s.menu,
      menuExpanded: s.menu ? 'true' : 'false',
      toggleMenu: () => this.setState({ menu: !s.menu }),
      faqs, chips,
      sent: s.sent,
      notSent: !s.sent,
      submit: (e) => { if (e && e.preventDefault) e.preventDefault(); this.setState({ sent: true }); },
      reset: () => this.setState({ sent: false, picked: {} })
    };
  }
}

Component.prototype.render = function () {
  const v = this.renderVals();
  return (
<>
<link rel="stylesheet" href={FONTS} />
<style>{PAGE_CSS}</style>
<div style={css("font-family: 'Geist', system-ui, sans-serif; color: #0D1B2A; background: #F2F4F1; font-size: 17px; line-height: 1.6")}>

{/* SVÆVENDE MENU */}
<header style={css("position: sticky; top: 0; z-index: 30; padding: 14px 16px 0")}>
<div style={css("max-width: 1240px; margin: 0 auto; background: rgba(255,255,255,0.88); backdrop-filter: blur(14px); border: 1px solid #E2E6E0; border-radius: 999px; padding: 8px 8px 8px 14px; display: flex; align-items: center; justify-content: space-between; gap: 12px; box-shadow: 0 8px 30px rgba(13,27,42,0.06)")}>
<a href="#top" onClick={v.nav.top} style={css("display: flex; align-items: center; gap: 10px; text-decoration: none; min-height: 44px; color: #0D1B2A")}>
<img src="/img/mark.png" alt="" style={css("height: 34px; width: auto; display: block")} />
<span style={css("font-weight: 700; font-size: 16px; letter-spacing: -0.02em")}>Sørens hverdagshjælp</span>
</a>

{v.isDesktop && (<>
<nav aria-label="Hovedmenu" style={css("display: flex; align-items: center; gap: 2px")}>
<a href="#kontakt" onClick={v.nav.kontakt} className="m-link" style={css("padding: 10px 16px; border-radius: 999px; text-decoration: none; font-weight: 500; font-size: 15px; color: #3C4654")}>Kontakt</a>
<a href="tel:+4522216814" className="m-btn" style={css("margin-left: 8px; display: inline-flex; align-items: center; gap: 8px; background: #0D1B2A; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 15px; padding: 12px 20px; border-radius: 999px; min-height: 44px; box-sizing: border-box")}>
<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>
22 21 68 14
</a>
</nav>
</>)}

{v.isCompact && (<>
<a href="#kontakt" onClick={v.nav.kontakt} className="m-btn" style={css("display: inline-flex; align-items: center; height: 46px; padding: 0 18px; border-radius: 999px; background: #0D1B2A; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 15px; box-sizing: border-box")}>Kontakt</a>
</>)}
</div>


</header>

{v.isHome && (<>

{/* HERO: BENTO */}
<section id="top" style={css("padding: 24px 16px 16px")}>
<div style={css("max-width: 1240px; margin: 0 auto; display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 14px")}>

<div style={css(`grid-column: ${v.sp.head}; background: #ffffff; border-radius: 32px; padding: ${v.heroPad}; display: flex; flex-direction: column; justify-content: space-between; gap: 40px; min-height: ${v.heroMin}; box-sizing: border-box`)}>
<div>
<h1 style={css("margin: 0; font-size: clamp(42px, 6.2vw, 86px); line-height: 0.98; font-weight: 700; letter-spacing: -0.05em; color: #0D1B2A")}>Hjælp til det digitale <span style={css("color: #3F6E1C")}>og det praktiske.</span></h1>
</div>
<div style={css("display: flex; flex-wrap: wrap; gap: 24px 40px; align-items: flex-end; justify-content: space-between")}>
<p style={css("margin: 0; font-size: 18px; line-height: 1.55; color: #4A5462; max-width: 26em")}>Jeg kommer hjem til dig og hjælper med computer, wifi og telefon, og med de praktiske opgaver i hjemmet. I et roligt tempo.</p>
<div style={css("display: flex; flex-wrap: wrap; gap: 10px")}>
<a href="tel:+4522216814" className="m-btn" style={css("display: inline-flex; align-items: center; gap: 10px; background: #0D1B2A; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 17px; padding: 16px 24px; border-radius: 999px; min-height: 54px; box-sizing: border-box")}>Ring til mig
<svg className="m-arrow" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
</a>
<a href="#kontakt" onClick={v.nav.kontakt} className="m-btn" style={css("display: inline-flex; align-items: center; background: #F2F4F1; color: #0D1B2A; text-decoration: none; font-weight: 600; font-size: 17px; padding: 16px 24px; border-radius: 999px; min-height: 54px; box-sizing: border-box")}>Bliv ringet op</a>
</div>
</div>
</div>

<div style={css(`grid-column: ${v.sp.photo}; position: relative; background: #3F6E1C; border-radius: 32px; overflow: hidden; min-height: ${v.photoMin}`)}>
<svg aria-hidden="true" viewBox="0 0 500 600" preserveAspectRatio="none" style={css("position: absolute; inset: 0; width: 100%; height: 100%")}>
<circle cx="430" cy="90" r="190" fill="none" stroke="#ffffff" strokeOpacity="0.10" strokeWidth="2"/>
<circle cx="430" cy="90" r="120" fill="none" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="2"/>
<path d="M0 440 C 150 380, 330 420, 500 330 L500 600 L0 600 Z" fill="#1E3A64"/>
<path d="M0 466 C 160 410, 340 448, 500 362" stroke="#ffffff" strokeWidth="10" fill="none" strokeLinecap="round"/>
<path d="M0 600 L0 560 C 170 520, 340 548, 500 486 L500 600 Z" fill="#2F5715"/>
</svg>
<img src="/img/soren.png" alt="Søren smiler med armene over kors" style={css("position: absolute; bottom: 0; left: 50%; transform: translateX(-46%); height: 94%; width: auto; display: block")} />
<div style={css("position: absolute; left: 16px; top: 16px; background: rgba(255,255,255,0.92); backdrop-filter: blur(8px); border-radius: 999px; padding: 8px 16px 8px 8px; display: flex; align-items: center; gap: 10px")}>
<span style={css("width: 32px; height: 32px; border-radius: 999px; background: #0D1B2A; color: #C6E97A; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px")}>S</span>
<span style={css("font-size: 14px; font-weight: 600; color: #0D1B2A; line-height: 1.2")}>Søren<span style={css("display: block; font-weight: 500; color: #4A5462; font-size: 12px")}>Din lokale hjælper</span></span>
</div>
</div>

</div>
</section>

{/* LØBEBÅND */}
<div aria-hidden="true" style={css("overflow: hidden; padding: 22px 0; margin: 8px 0 16px; background: #0D1B2A")}>
<div className="m-track" style={css("display: flex; width: max-content; gap: 0")}>
{v.ticker.map((t, i_) => (<React.Fragment key={i_}>
<span style={css("display: inline-flex; align-items: center; gap: 28px; padding-right: 28px; font-size: clamp(22px, 2.6vw, 32px); font-weight: 600; letter-spacing: -0.03em; color: #ffffff; white-space: nowrap")}>{t}<span style={css("width: 10px; height: 10px; border-radius: 999px; background: #C6E97A; display: inline-block")}></span></span>
</React.Fragment>))}
</div>
</div>

{/* KONTAKT */}
<section id="kontakt" style={css("padding: 0 16px 24px")}>
<div style={css(`max-width: 1240px; margin: 0 auto; background: #0D1B2A; color: #ffffff; border-radius: 32px; padding: ${v.contactPad}; box-sizing: border-box; position: relative; overflow: hidden`)}>
<svg aria-hidden="true" viewBox="0 0 1240 260" preserveAspectRatio="none" style={css("position: absolute; left: 0; right: 0; bottom: 0; width: 100%; height: 200px")}>
<path d="M0 170 C 380 90, 820 220, 1240 110 L1240 260 L0 260 Z" fill="#152A45"/>
<path d="M0 196 C 380 116, 820 246, 1240 136" stroke="#3F6E1C" strokeWidth="6" fill="none"/>
</svg>
<div style={css(`position: relative; display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 40px ${v.contactGap}; align-items: start`)}>
<div style={css(`grid-column: ${v.sp.contactText}`)}>
<p style={css("margin: 0 0 18px; font-size: 14px; font-weight: 600; color: #C6E97A")}>Kontakt</p>
<h2 style={css("margin: 0 0 20px; font-size: clamp(34px, 4.2vw, 54px); line-height: 1.02; font-weight: 700; letter-spacing: -0.045em; color: #ffffff")}>Står du med noget, der driller?</h2>
<p style={css("margin: 0 0 36px; font-size: 17px; color: #B8C3D3; max-width: 28em")}>Ring eller send en sms, så finder vi en tid, der passer. Tager jeg ikke telefonen, ringer jeg tilbage.</p>
<a href="tel:+4522216814" className="m-btn" style={css("display: inline-block; color: #ffffff; text-decoration: none; font-size: clamp(44px, 6.4vw, 88px); font-weight: 700; letter-spacing: -0.05em; line-height: 1")}>22 21 68 14</a>
<div style={css("margin-top: 28px; display: flex; flex-wrap: wrap; gap: 10px")}>
<a href="sms:+4522216814" className="m-btn" style={css("display: inline-flex; align-items: center; gap: 8px; background: #C6E97A; color: #0D1B2A; text-decoration: none; font-weight: 600; font-size: 16px; padding: 13px 22px; border-radius: 999px; min-height: 48px; box-sizing: border-box")}>Send en sms</a>
<a href="mailto:kontakt@hverdagshjaelpogit.dk" className="m-btn" style={css("display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.10); color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; padding: 13px 22px; border-radius: 999px; min-height: 48px; box-sizing: border-box; overflow-wrap: anywhere")}>kontakt@hverdagshjaelpogit.dk</a>
</div>
</div>

<div style={css(`grid-column: ${v.sp.contactForm}; background: #ffffff; color: #0D1B2A; border-radius: 28px; padding: 28px; box-sizing: border-box`)}>
{v.notSent && (<>
<form onSubmit={v.submit} style={css("display: flex; flex-direction: column; gap: 16px")}>
<div>
<h3 style={css("margin: 0 0 4px; font-size: 22px; font-weight: 700; letter-spacing: -0.03em")}>Bliv ringet op</h3>
<p style={css("margin: 0; font-size: 15px; color: #4A5462")}>Udfyld formularen, så ringer jeg dig op.</p>
</div>
<fieldset style={css("border: 0; margin: 0; padding: 0")}>
<legend style={css("font-size: 15px; font-weight: 600; margin-bottom: 10px; padding: 0")}>Hvad skal du have hjælp til?</legend>
<div style={css("display: flex; flex-wrap: wrap; gap: 8px")}>
{v.chips.map((c, i_) => (<React.Fragment key={i_}>
<button type="button" onClick={c.pick} aria-pressed={c.pressed} className="m-btn" style={css(c.style)}>{c.label}</button>
</React.Fragment>))}
</div>
</fieldset>
<div style={css("display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 12px")}>
<div style={css("display: flex; flex-direction: column; gap: 6px")}>
<label htmlFor="m-navn" style={css("font-size: 15px; font-weight: 600")}>Navn</label>
<input id="m-navn" name="navn" type="text" autoComplete="name" style={css("font-size: 17px; padding: 12px 16px; border-radius: 14px; border: 1px solid #D5DAD2; background: #F7F8F6; min-height: 50px; box-sizing: border-box")} />
</div>
<div style={css("display: flex; flex-direction: column; gap: 6px")}>
<label htmlFor="m-tlf" style={css("font-size: 15px; font-weight: 600")}>Telefon</label>
<input id="m-tlf" name="tlf" type="tel" autoComplete="tel" style={css("font-size: 17px; padding: 12px 16px; border-radius: 14px; border: 1px solid #D5DAD2; background: #F7F8F6; min-height: 50px; box-sizing: border-box")} />
</div>
</div>
<div style={css("display: flex; flex-direction: column; gap: 6px")}>
<label htmlFor="m-besked" style={css("font-size: 15px; font-weight: 600")}>Besked <span style={css("font-weight: 400; color: #4A5462")}>(valgfrit)</span></label>
<textarea id="m-besked" name="besked" rows="3" style={css("font-size: 17px; padding: 12px 16px; border-radius: 14px; border: 1px solid #D5DAD2; background: #F7F8F6; resize: vertical; box-sizing: border-box")}></textarea>
</div>
<button type="submit" className="m-btn" style={css("background: #0D1B2A; color: #ffffff; border: 0; border-radius: 999px; font-size: 17px; font-weight: 600; padding: 16px 28px; min-height: 54px; cursor: pointer")}>Send besked</button>
<p style={css("margin: 0; font-size: 13px; color: #4A5462")}>Jeg bruger kun dine oplysninger til at kontakte dig om din henvendelse. Læs mere i <a href="#top" onClick={v.showPrivacy} style={css("font-weight: 600")}>privatlivspolitikken</a>.</p>
</form>
</>)}
{v.sent && (<>
<div role="status" style={css("display: flex; flex-direction: column; gap: 14px; align-items: flex-start; padding: 32px 0")}>
<span style={css("width: 56px; height: 56px; border-radius: 999px; background: #C6E97A; color: #0D1B2A; display: flex; align-items: center; justify-content: center")}><svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>
<h3 style={css("margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.03em")}>Tak for din besked</h3>
<p style={css("margin: 0; font-size: 17px; color: #4A5462")}>Jeg ringer dig op hurtigst muligt. Haster det, så ring direkte på 22 21 68 14.</p>
<button type="button" onClick={v.reset} className="m-btn" style={css("background: #F2F4F1; border: 0; color: #0D1B2A; border-radius: 999px; font-size: 16px; font-weight: 600; padding: 12px 20px; min-height: 46px; cursor: pointer")}>Send en ny besked</button>
</div>
</>)}
</div>
</div>
</div>
</section>

</>)}

{/* PRIVATLIVSPOLITIK */}
{v.isPrivacy && (<>
<main style={css("padding: 32px 16px 24px")}>
<article style={css(`max-width: 1240px; margin: 0 auto; background: #ffffff; border-radius: 32px; padding: ${v.aboutPad}; box-sizing: border-box; font-size: 17px; color: #2C3640`)}>
<div style={css("max-width: 760px")}>
<a href="#top" onClick={v.nav.top} className="m-btn" style={css("display: inline-flex; align-items: center; gap: 8px; font-weight: 600; font-size: 15px; color: #0D1B2A; text-decoration: none; background: #F2F4F1; border-radius: 999px; padding: 10px 18px 10px 14px; min-height: 44px; box-sizing: border-box; margin-bottom: 32px")}><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>Tilbage til forsiden</a>
<h1 style={css("margin: 0 0 10px; font-size: clamp(36px, 5vw, 64px); line-height: 1; font-weight: 700; letter-spacing: -0.05em; color: #0D1B2A")}>Privatlivspolitik</h1>
<p style={css("margin: 0 0 44px; font-size: 15px; color: #4A5462")}>Senest opdateret: oktober 2026</p>
<h2 style={css("margin: 0 0 10px; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; color: #0D1B2A")}>Hvem er dataansvarlig?</h2>
<p style={css("margin: 0 0 32px")}>Sørens hverdagshjælp, CVR 46656814, er ansvarlig for behandlingen af de personoplysninger, du giver mig. Du kan altid kontakte mig på tlf. 22 21 68 14 eller kontakt@hverdagshjaelpogit.dk.</p>
<h2 style={css("margin: 0 0 10px; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; color: #0D1B2A")}>Hvilke oplysninger indsamler jeg?</h2>
<p style={css("margin: 0 0 12px")}>Jeg indsamler kun de oplysninger, du selv giver mig, når du kontakter mig eller får hjælp:</p>
<ul style={css("margin: 0 0 32px; padding-left: 22px; line-height: 1.8")}>
<li>Navn og telefonnummer, og hvad du skriver i kontaktformularen</li>
<li>Oplysninger fra sms, mail og opkald</li>
<li>Adresse og betalingsoplysninger, når jeg skal udføre en opgave og sende en faktura</li>
</ul>
<h2 style={css("margin: 0 0 10px; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; color: #0D1B2A")}>Hvad bruger jeg oplysningerne til?</h2>
<p style={css("margin: 0 0 32px")}>Jeg bruger oplysningerne til at svare på din henvendelse, aftale og udføre opgaven, sende faktura og overholde bogføringsloven. Behandlingen sker på grundlag af databeskyttelsesforordningens artikel 6, stk. 1, litra b (aftale), litra c (retlig forpligtelse, fx bogføring) og litra f (min legitime interesse i at kunne svare dig). Jeg sælger aldrig dine oplysninger og bruger dem ikke til markedsføring.</p>
<h2 style={css("margin: 0 0 10px; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; color: #0D1B2A")}>Hvor længe gemmer jeg dem?</h2>
<p style={css("margin: 0 0 32px")}>Henvendelser, der ikke fører til en opgave, sletter jeg senest 6 måneder efter vores sidste kontakt. Fakturaer og regnskabsbilag gemmer jeg i 5 år fra udgangen af regnskabsåret, som bogføringsloven kræver.</p>
<h2 style={css("margin: 0 0 10px; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; color: #0D1B2A")}>Hvem deler jeg oplysningerne med?</h2>
<p style={css("margin: 0 0 32px")}>Oplysningerne kan blive behandlet af de leverandører, jeg bruger til at drive virksomheden, fx udbyderen af hjemmesiden, mail, regnskabsprogram, bank og MobilePay. De må kun bruge oplysningerne på mine vegne. Jeg videregiver ellers kun oplysninger, hvis loven kræver det.</p>
<h2 style={css("margin: 0 0 10px; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; color: #0D1B2A")}>Dine rettigheder</h2>
<p style={css("margin: 0 0 12px")}>Du har ret til at:</p>
<ul style={css("margin: 0 0 16px; padding-left: 22px; line-height: 1.8")}>
<li>få indsigt i de oplysninger, jeg har om dig</li>
<li>få rettet forkerte oplysninger</li>
<li>få slettet dine oplysninger, når jeg ikke længere skal bruge dem</li>
<li>få begrænset behandlingen eller gøre indsigelse mod den</li>
<li>få udleveret dine oplysninger (dataportabilitet)</li>
</ul>
<p style={css("margin: 0 0 32px")}>Kontakt mig, hvis du vil bruge dine rettigheder. Er du utilfreds med, hvordan jeg behandler dine oplysninger, kan du klage til Datatilsynet på datatilsynet.dk.</p>
<h2 style={css("margin: 0 0 10px; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; color: #0D1B2A")}>Cookies</h2>
<p style={css("margin: 0")}>Læs om cookies i <a href="#top" onClick={v.showCookies} style={css("font-weight: 600")}>cookiepolitikken</a>.</p>
</div>
</article>
</main>
</>)}

{/* COOKIEPOLITIK */}
{v.isCookies && (<>
<main style={css("padding: 32px 16px 24px")}>
<article style={css(`max-width: 1240px; margin: 0 auto; background: #ffffff; border-radius: 32px; padding: ${v.aboutPad}; box-sizing: border-box; font-size: 17px; color: #2C3640`)}>
<div style={css("max-width: 760px")}>
<a href="#top" onClick={v.nav.top} className="m-btn" style={css("display: inline-flex; align-items: center; gap: 8px; font-weight: 600; font-size: 15px; color: #0D1B2A; text-decoration: none; background: #F2F4F1; border-radius: 999px; padding: 10px 18px 10px 14px; min-height: 44px; box-sizing: border-box; margin-bottom: 32px")}><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>Tilbage til forsiden</a>
<h1 style={css("margin: 0 0 10px; font-size: clamp(36px, 5vw, 64px); line-height: 1; font-weight: 700; letter-spacing: -0.05em; color: #0D1B2A")}>Cookiepolitik</h1>
<p style={css("margin: 0 0 44px; font-size: 15px; color: #4A5462")}>Senest opdateret: oktober 2026</p>
<div style={css("background: #EEF4E7; border-radius: 24px; padding: 24px 26px; margin-bottom: 36px; display: flex; gap: 16px; align-items: flex-start")}>
<span style={css("width: 40px; height: 40px; border-radius: 999px; background: #3F6E1C; color: #ffffff; display: flex; align-items: center; justify-content: center; flex: 0 0 auto")}><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>
<p style={css("margin: 0; color: #0D1B2A")}><strong>Kort fortalt:</strong> Denne hjemmeside bruger ikke cookies til statistik, analyse eller markedsføring. Derfor beder jeg dig heller ikke om at acceptere cookies.</p>
</div>
<h2 style={css("margin: 0 0 10px; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; color: #0D1B2A")}>Hvad er cookies?</h2>
<p style={css("margin: 0 0 32px")}>En cookie er en lille tekstfil, som en hjemmeside gemmer i din browser. Cookies bruges ofte til at huske indstillinger eller måle, hvordan en side bliver brugt.</p>
<h2 style={css("margin: 0 0 10px; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; color: #0D1B2A")}>Hvilke cookies bruger siden?</h2>
<p style={css("margin: 0 0 32px")}>Siden sætter ingen cookies. Skrifttyper og billeder bliver hentet fra siden selv, så dine oplysninger ikke sendes videre til fx Google eller Facebook. Udbyderen af hjemmesiden kan registrere tekniske oplysninger som din IP-adresse i en kort periode for at holde siden sikker og stabil.</p>
<h2 style={css("margin: 0 0 10px; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; color: #0D1B2A")}>Hvis det ændrer sig</h2>
<p style={css("margin: 0 0 32px")}>Begynder jeg at bruge cookies til fx statistik, opdaterer jeg denne side og beder om dit samtykke, før de bliver sat.</p>
<h2 style={css("margin: 0 0 10px; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; color: #0D1B2A")}>Spørgsmål</h2>
<p style={css("margin: 0")}>Har du spørgsmål, er du velkommen til at kontakte mig på tlf. 22 21 68 14 eller kontakt@hverdagshjaelpogit.dk. Læs også <a href="#top" onClick={v.showPrivacy} style={css("font-weight: 600")}>privatlivspolitikken</a>.</p>
</div>
</article>
</main>
</>)}

{/* FOOTER */}
<footer style={css("padding: 40px 16px 32px")}>
<div style={css("max-width: 1240px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 24px 40px; justify-content: space-between; align-items: flex-end")}>
<div style={css("display: flex; align-items: center; gap: 12px")}>
<img src="/img/mark.png" alt="" style={css("height: 40px; width: auto; display: block")} />
<span style={css("line-height: 1.35")}><span style={css("display: block; font-weight: 700; font-size: 16px; letter-spacing: -0.02em")}>Sørens hverdagshjælp</span><span style={css("font-size: 14px; color: #4A5462")}>IT &amp; hjemmeservice · Kerteminde og omegn · CVR 46656814</span></span>
</div>
<div style={css("display: flex; flex-wrap: wrap; gap: 4px 8px; font-size: 14px")}>
<a href="tel:+4522216814" className="m-link" style={css("color: #3C4654; text-decoration: none; padding: 8px 12px; border-radius: 999px")}>22 21 68 14</a>
<a href="mailto:kontakt@hverdagshjaelpogit.dk" className="m-link" style={css("color: #3C4654; text-decoration: none; padding: 8px 12px; border-radius: 999px")}>kontakt@hverdagshjaelpogit.dk</a>
<a href="#top" onClick={v.showPrivacy} className="m-link" style={css("color: #3C4654; text-decoration: none; padding: 8px 12px; border-radius: 999px")}>Privatlivspolitik</a>
<a href="#top" onClick={v.showCookies} className="m-link" style={css("color: #3C4654; text-decoration: none; padding: 8px 12px; border-radius: 999px")}>Cookiepolitik</a>
</div>
</div>
</footer>

{v.isCompact && (<>
<div style={css("height: 84px")}></div>
<div style={css("position: fixed; left: 12px; right: 12px; bottom: 12px; z-index: 30; background: rgba(13,27,42,0.94); backdrop-filter: blur(12px); border-radius: 999px; padding: 6px; display: flex; gap: 6px; box-shadow: 0 12px 30px rgba(13,27,42,0.25)")}>
<a href="tel:+4522216814" style={css("flex: 1 1 0; display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: #C6E97A; color: #0D1B2A; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 999px; min-height: 52px")}>
<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>
Ring
</a>
<a href="sms:+4522216814" style={css("flex: 1 1 0; display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: transparent; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 999px; min-height: 52px")}>
<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
Send sms
</a>
</div>
</>)}

</div>
</>
  );
};

Component.title = 'Forslag 1 – Bento';
export default Component;
