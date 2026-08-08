import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import "@/App.css";

const PORTRAIT = "https://customer-assets-cm19k8pv.emergentagent.net/job_b077e156-7ea4-49db-be1f-8afbc6f11f31/artifacts/tbaeak7u_ChatGPT%20Image%20Aug%209%2C%202026%2C%2001_10_29%20AM.png";

const projects = [
  { number: "01", title: "Maison No. 04", type: "Brand direction / 2024", tone: "warm" },
  { number: "02", title: "Objects in quiet", type: "Editorial / 2023", tone: "cool" },
  { number: "03", title: "After the light", type: "Campaign / 2022", tone: "rose" },
];

function ParallaxHero() {
  const ref = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = ref.current;
    const layers = root?.querySelectorAll("[data-parallax-layer]");
    const lenis = new Lenis({ smoothWheel: true });
    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    if (layers?.length) {
      gsap.timeline({ scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true } })
        .to(layers[0], { yPercent: 18, ease: "none" }, 0)
        .to(layers[1], { yPercent: 11, ease: "none" }, 0)
        .to(layers[2], { yPercent: 5, ease: "none" }, 0);
    }
    return () => { ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); gsap.ticker.remove(raf); lenis.destroy(); };
  }, []);

  return (
    <section className="hero" ref={ref} data-testid="hero-section">
      <div className="hero-image hero-image-back" data-parallax-layer="1" style={{ backgroundImage: `url(${PORTRAIT})` }} />
      <div className="hero-image hero-image-mid" data-parallax-layer="2" style={{ backgroundImage: `url(${PORTRAIT})` }} />
      <div className="hero-image hero-image-front" data-parallax-layer="3" style={{ backgroundImage: `url(${PORTRAIT})` }} />
      <div className="hero-grain" />
      <div className="hero-copy" data-testid="hero-content">
        <p className="eyebrow">Independent creative studio <span>—</span> est. 2018</p>
        <h1>Ayla <em>Noor</em></h1>
        <p className="hero-role">Visual storyteller / creative director</p>
      </div>
      <div className="hero-bottom">
        <a href="#work" className="circle-link" data-testid="explore-work-button" aria-label="Explore selected work"><ArrowDownRight size={22} /></a>
        <p>Scroll to enter <span>↘</span></p>
        <p className="hero-index">01 <i /> 04</p>
      </div>
    </section>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <main>
      <nav className="site-nav" data-testid="site-navigation">
        <a className="brand" href="#top" data-testid="brand-link">AN<span>.</span></a>
        <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
          <a href="#work" data-testid="nav-work-link">Selected work</a>
          <a href="#about" data-testid="nav-about-link">About</a>
          <a href="#contact" data-testid="nav-contact-link">Contact <ArrowUpRight size={14} /></a>
        </div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} data-testid="mobile-menu-button" aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
      </nav>
      <div id="top"><ParallaxHero /></div>
      <section className="intro section-shell" id="about" data-testid="about-section">
        <p className="section-label">[ 00 — Manifesto ]</p>
        <div className="intro-text"><h2>Making room for<br /><i>the unexpected.</i></h2><p>I work across image, identity, and atmosphere to help thoughtful brands find their clearest point of view. The work is quiet when it needs to be, and never without feeling.</p></div>
      </section>
      <section className="work section-shell" id="work" data-testid="selected-work-section">
        <div className="work-heading"><p className="section-label">[ 01 — Selected work ]</p><p className="work-count">( 03 projects )</p></div>
        <div className="project-list">{projects.map((project) => <article className={`project ${project.tone}`} key={project.number} data-testid={`project-card-${project.number}`}><div className="project-art"><span>{project.number}</span><div className="art-shape" /></div><div className="project-meta"><div><h3>{project.title}</h3><p>{project.type}</p></div><a href="#contact" data-testid={`project-link-${project.number}`} aria-label={`View ${project.title}`}><ArrowUpRight size={20} /></a></div></article>)}</div>
      </section>
      <section className="contact section-shell" id="contact" data-testid="contact-section"><p className="section-label">[ 02 — Start a conversation ]</p><div className="contact-row"><h2>Have a good<br /><i>feeling?</i></h2><a href="mailto:hello@aylanoor.studio" className="contact-link" data-testid="contact-email-link">hello@aylanoor.studio <ArrowUpRight size={23} /></a></div><div className="footer-row"><span>© Ayla Noor — 2024</span><span>Available for select projects</span><span>Instagram / Are.na</span></div></section>
    </main>
  );
}

export default App;