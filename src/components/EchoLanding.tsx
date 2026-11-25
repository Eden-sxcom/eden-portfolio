import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './EchoLanding.css';

const GREETINGS = ['Ciao', 'Hallo', 'Hello', 'Hola', 'Namaste'];

const MARQUEE_WORDS = ['I TURN VISION INTO', 'DIGITAL REALITY.'];

interface EchoLandingProps {
  isAppLoaded?: boolean;
}

export const EchoLanding: React.FC<EchoLandingProps> = ({ isAppLoaded = true }) => {
  const root = useRef<HTMLElement>(null);
  const [greeting, setGreeting] = useState(0);

  // Echo's rotating greeting line
  useEffect(() => {
    const id = window.setInterval(() => {
      setGreeting((index) => (index + 1) % GREETINGS.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, []);

  // Entrance choreography, played once the archival preloader lifts
  useEffect(() => {
    if (!isAppLoaded) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.echo-media img',
        { opacity: 0, scale: 1.14 },
        { opacity: 0.92, scale: 1, duration: 1.9, ease: 'power2.out' },
        0
      )
        .from('.echo-bar', { y: -16, opacity: 0, duration: 0.7 }, 0.05)
        .from('.echo-greeting', { y: 14, opacity: 0, duration: 0.6 }, 0.2)
        .from('.echo-title-mask > span', { yPercent: 118, duration: 1.05, stagger: 0.06 }, 0.26)
        .from('.echo-title__word--serif', { yPercent: 40, opacity: 0, duration: 1.15 }, 0.16)
        .from('.echo-sub, .echo-actions', { y: 22, opacity: 0, duration: 0.8, stagger: 0.08 }, 0.5)
        .from('.echo-scroll', { opacity: 0, duration: 0.6 }, 0.7)
        .from('.echo-marquee', { opacity: 0, duration: 0.8 }, 0.75);
    }, root);

    return () => ctx.revert();
  }, [isAppLoaded]);

  // Anchor jumps inside the scroll stage are progress based, not element based
  const scrollToStage = (ratio: number) => {
    const stage = document.getElementById('hero-stage-wrapper');
    if (!stage) return;
    const maxScroll = stage.offsetHeight - window.innerHeight;
    window.scrollTo({ top: stage.offsetTop + maxScroll * ratio, behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="echo-landing"
      ref={root}
      aria-label="Intro — Echo landing"
    >
      <div className="echo-media" aria-hidden="true">
        <img src="/img/hands.jpg" alt="" />
        <span className="echo-media__fade" />
      </div>

      <header className="echo-bar">
        <a href="#hero" className="echo-brand" aria-label="Back to intro">
          TAKI<span>.</span>
        </a>

        <div className="echo-bar__meta">
          <span>Portfolio / 2026</span>
          <span className="echo-bar__avail">
            <i aria-hidden="true" />
            Open to work
          </span>
        </div>

        <a
          href="#about"
          className="echo-bar__menu"
          onClick={(e) => {
            e.preventDefault();
            scrollToStage(0.22);
          }}
        >
          Menu <span aria-hidden="true">=</span>
        </a>
      </header>

      <div className="echo-copy">
        <div className="echo-greeting">
          <span key={greeting} className="echo-greeting__word">
            {GREETINGS[greeting]}
          </span>
          <span className="echo-greeting__line" aria-hidden="true" />
          <span className="echo-greeting__meta">I'm Taki</span>
        </div>

        <h1 className="echo-title">
          <span className="echo-title__word--serif">Crafting</span>
          <span className="echo-title__stack">
            <span className="echo-title-mask">
              <span>Seamless digital</span>
            </span>
            <span className="echo-title-mask">
              <span>experiences.</span>
            </span>
          </span>
        </h1>

        <p className="echo-sub">
          Fullstack developer and builder turning ideas into fast, tactile products: web systems,
          applied AI, and developer tools.
        </p>

        <div className="echo-actions">
          <a
            href="#expeditions"
            className="echo-cta"
            data-cursor="VIEW"
            onClick={(e) => {
              e.preventDefault();
              scrollToStage(0.44);
            }}
          >
            Explore projects <span aria-hidden="true">↗</span>
          </a>
          <a
            href="#about"
            className="echo-cta echo-cta--ghost"
            onClick={(e) => {
              e.preventDefault();
              scrollToStage(0.22);
            }}
          >
            Field log
          </a>
        </div>
      </div>

      <div className="echo-scroll" aria-hidden="true">
        <span>Scroll to descend</span>
        <i />
      </div>

      <div className="echo-marquee" aria-hidden="true">
        <div className="echo-marquee__track">
          {[0, 1].map((copy) => (
            <div className="echo-marquee__group" key={copy}>
              {MARQUEE_WORDS.map((word) => (
                <span key={`${copy}-${word}`}>
                  {word}
                  <i>✦</i>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
