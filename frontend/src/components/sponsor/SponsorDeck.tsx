import {
  FormEvent,
  PointerEvent as ReactPointerEvent,
  useEffect,
  useState,
} from "react"
import { sponsors, sponsorStoryPlaceholders } from "@/data/sponsors"
import "@/styles/sponsor-deck.css"

type IconName = "arrow" | "check"

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
  }

  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      width={size}
    >
      {paths[name]}
    </svg>
  )
}

function BrandMark() {
  return (
    <span className="brand-mark">
      <img alt="" src="/gdg-mark.png" />
    </span>
  )
}

const colorClass = {
  blue: "story-blue",
  green: "story-green",
  red: "story-red",
  yellow: "story-yellow",
}

function KolkataHero() {
  return (
    <section className="hero" data-compact-hero>
      <style>{`
        [data-compact-hero] {
          min-height: 32rem;
        }

        [data-compact-hero] .hero-content {
          padding-bottom: 3rem;
        }

        @media (max-width: 767px) {
          [data-compact-hero] {
            min-height: 25rem;
          }

          [data-compact-hero] .hero-content {
            padding-bottom: 2.5rem;
          }
        }
      `}</style>
      <div className="hero-grid" />
      <div className="hero-content">
        <p className="eyebrow">
          <span /> GDG on Campus · FIEM · Kolkata
        </p>
        <h1
          dangerouslySetInnerHTML={{
            __html:
              '<span class="hero-heading-primary">Back the people building</span><br><em style="background:none;color:#4285f4;-webkit-text-fill-color:#4285f4">what’s next.</em>',
          }}
          key="hero-headline-v2"
        />
      </div>
    </section>
  )
}

function KolkataSkyline() {
  return (
    <div className="footer-city-drawing" data-colorized-skyline>
      <style>{`
        [data-colorized-skyline] {
          background: #151719;
        }

        [data-colorized-skyline] .footer-city-art::after {
          background: #151719;
          box-shadow: 0 0 1.5rem 1rem #151719;
        }
      `}</style>
      <div className="footer-city-art">
        <img
          alt="Kolkata landmarks illustrated across the city skyline"
          src="/kolkata-footer-art-rygb.png"
        />
      </div>
    </div>
  )
}

function KolkataFooter() {
  return (
    <footer className="site-footer" data-theme-footer>
      <style>{`
        [data-theme-footer] {
          background: #151719;
        }

        .theme-light [data-theme-footer] {
          background: #151719;
          color: #f7f8f8;
        }

        .theme-light [data-theme-footer] .footer-meta {
          border-top-color: rgb(255 255 255 / 12%);
        }

        .theme-light [data-theme-footer] .footer-brand {
          color: #ffffff;
        }

        .theme-light [data-theme-footer] .footer-brand small,
        .theme-light [data-theme-footer] .footer-meta > p {
          color: rgb(255 255 255 / 42%);
        }
      `}</style>
      <KolkataSkyline />

      <div className="footer-meta">
        <a className="footer-brand" href="#top" aria-label="Back to top">
          <BrandMark />
          <span>
            <strong>GDG on Campus</strong>
            <small>Future Institute of Engineering and Management</small>
          </span>
        </a>
        <p>Developer community · Kolkata, India</p>
      </div>
    </footer>
  )
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="contact-success" aria-live="polite">
        <span>
          <Icon name="check" size={26} />
        </span>
        <p className="contact-success-title">Message received.</p>
        <p>
          Thank you for reaching out. The GDG OC FIEM team will get back to you
          shortly.
        </p>
        <button onClick={() => setSubmitted(false)} type="button">
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label className="field">
          <span>Organization name</span>
          <input name="organization" placeholder="Acme Technologies" required />
        </label>
        <label className="field">
          <span>Work email</span>
          <input
            name="email"
            placeholder="you@organization.com"
            required
            type="email"
          />
        </label>
        <label className="field">
          <span>Phone number</span>
          <input
            name="phone"
            placeholder="+91 00000 00000"
            required
            type="tel"
          />
        </label>
        <label className="field">
          <span>Organization website</span>
          <input
            name="website"
            placeholder="https://organization.com"
            required
            type="url"
          />
        </label>
      </div>
      <button
        className="submit-button"
        onMouseEnter={(event) => {
          event.currentTarget.style.backgroundColor = "#fbbc04"
          event.currentTarget.style.color = "#171717"
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.backgroundColor = "#171717"
          event.currentTarget.style.color = "#ffffff"
        }}
        style={{
          backgroundColor: "#171717",
          color: "#ffffff",
          transition:
            "background-color 180ms ease, color 180ms ease, transform 180ms ease",
        }}
        type="submit"
      >
        Contact us <Icon name="arrow" size={18} />
      </button>
    </form>
  )
}

export default function App() {
  const [storyIndex, setStoryIndex] = useState(0)
  const [dragStart, setDragStart] = useState<number | null>(null)
  const [dragOffset, setDragOffset] = useState(0)
  const [storyExitDirection, setStoryExitDirection] = useState<-1 | 0 | 1>(0)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }

    const revealTargets = document.querySelectorAll<HTMLElement>(
      "#partners, #stories, #contact, .site-footer",
    )

    revealTargets.forEach((target) => {
      target.classList.add("scroll-reveal")
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          entry.target.classList.add("is-scroll-visible")
          observer.unobserve(entry.target)
        })
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.08,
      },
    )

    revealTargets.forEach((target) => observer.observe(target))

    return () => observer.disconnect()
  }, [])

  function previousStory() {
    setStoryIndex((current) =>
      current === 0 ? sponsorStoryPlaceholders.length - 1 : current - 1,
    )
  }

  function nextStory() {
    setStoryIndex((current) =>
      current === sponsorStoryPlaceholders.length - 1 ? 0 : current + 1,
    )
  }

  function startStoryDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (storyExitDirection !== 0) return
    if (event.pointerType === "mouse" && event.button !== 0) return
    setDragStart(event.clientX)
    setDragOffset(0)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function moveStoryDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (dragStart === null) return
    setDragOffset(event.clientX - dragStart)
  }

  function cancelStoryDrag(event: ReactPointerEvent<HTMLDivElement>) {
    setDragStart(null)
    setDragOffset(0)

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  function finishStoryDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (dragStart === null) return

    setDragStart(null)

    const finalDragOffset = event.clientX - dragStart
    const exitDirection: -1 | 0 | 1 =
      finalDragOffset < -60 ? -1 : finalDragOffset > 60 ? 1 : 0

    if (exitDirection !== 0) {
      setStoryExitDirection(exitDirection)
      setDragOffset(exitDirection * event.currentTarget.clientWidth * 1.08)

      window.setTimeout(() => {
        if (exitDirection < 0) nextStory()
        if (exitDirection > 0) previousStory()
        setStoryExitDirection(0)
        setDragOffset(0)
      }, 720)
    } else {
      setDragOffset(0)
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  return (
    <main className="app-shell theme-light" id="top">
      <header className="site-header">
        <nav className="nav-shell">
          <a className="brand-link" href="#top" aria-label="GDG OC FIEM home">
            <BrandMark />
            <span>
              <strong>Google Developer Group on Campus FIEM</strong>
              <small>Partner deck</small>
            </span>
          </a>

          <div className="nav-links">
            <a href="#partners">Partners</a>
            <a href="#stories">Stories</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>
      </header>

      <KolkataHero />

      <section className="marquee-section" id="partners">
        <div className="section-heading section-heading-on-dark">
          <div>
            <h2>Meet our sponsors.</h2>
          </div>
        </div>
        <div className="marquee">
          <div className="marquee-track">
            {[...sponsors, ...sponsors].map((sponsor, index) => (
              <div
                className="sponsor-logo"
                key={`${sponsor.id}-${
                  index < sponsors.length ? "primary" : "duplicate"
                }`}
              >
                <img
                  className={`sponsor-image${
                    sponsor.monochrome ? " sponsor-image-white" : ""
                  }`}
                  src={sponsor.logo}
                  alt={`${sponsor.name} logo`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stories-section" id="stories">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Sponsor stories</p>
            <h2 style={{ color: "#ea4335" }}>What contribution feels like.</h2>
          </div>
          <div className="story-swipe-hint" aria-hidden="true">
            <span />
            Swipe or drag to turn the page
          </div>
        </div>

        <div
          aria-label="Draggable sponsor story gallery"
          className={`story-window ${dragStart !== null ? "is-dragging" : ""}`}
          onPointerCancel={cancelStoryDrag}
          onPointerDown={startStoryDrag}
          onPointerMove={moveStoryDrag}
          onPointerUp={finishStoryDrag}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") previousStory()
            if (event.key === "ArrowRight") nextStory()
          }}
          role="region"
          tabIndex={0}
        >
          <div className="story-track">
            {sponsorStoryPlaceholders.map((story, index) => {
              const storyCount = sponsorStoryPlaceholders.length
              const previousIndex = (storyIndex - 1 + storyCount) % storyCount
              const forwardPosition =
                (index - storyIndex + storyCount) % storyCount
              const position =
                index === storyIndex
                  ? 0
                  : index === previousIndex
                    ? -1
                    : forwardPosition
              const depth = Math.min(Math.max(position, 0), 3)
              const isPreviousRevealed = position === -1 && dragOffset > 0

              let transform = `translate3d(${depth * 10}px, ${depth * 10}px, ${-depth * 18}px) scale(${1 - depth * 0.018})`
              let opacity = position > 3 ? 0 : 1
              let zIndex =
                position > 0 ? sponsorStoryPlaceholders.length - position : 0
              let transformOrigin = "left center"

              if (position < 0) {
                transform = "translate3d(-108%, 0, 0) rotateZ(-4deg)"
                opacity = 0
                zIndex = 1
              }

              if (isPreviousRevealed) {
                transform = "translate3d(0, 0, -1px)"
                opacity = 1
                zIndex = sponsorStoryPlaceholders.length
              }

              if (position === 0) {
                transform = `translate3d(${dragOffset}px, 0, 0) rotateZ(${dragOffset / 140}deg)`
                opacity = storyExitDirection === 0 ? 1 : 0
                zIndex = sponsorStoryPlaceholders.length + 2
                transformOrigin =
                  dragOffset > 0 ? "right center" : "left center"
              }

              return (
                <article
                  aria-hidden={position !== 0}
                  className={`story-slide ${
                    position === 0
                      ? `is-active-story ${
                          storyExitDirection !== 0 ? "is-exiting-story" : ""
                        }`
                      : position < 0
                        ? "is-past-story"
                        : "is-stacked-story"
                  }`}
                  key={story.id}
                  style={{
                    opacity,
                    pointerEvents:
                      position === 0 && storyExitDirection === 0
                        ? "auto"
                        : "none",
                    transform,
                    transformOrigin,
                    zIndex,
                  }}
                >
                  <div
                    className={`story-card ${
                      colorClass[(story.color as keyof typeof colorClass)]
                    }`}
                  >
                    <span className="quote-mark">“</span>
                    <blockquote>{story.quote}</blockquote>
                    <div className="story-person">
                      <span aria-hidden="true">ID</span>
                      <div>
                        <strong>{story.name}</strong>
                        <small>{story.role}</small>
                      </div>
                    </div>
                    <p className="story-company">{story.company}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
        <div
          aria-label="Sponsor story progress"
          aria-valuemax={sponsorStoryPlaceholders.length}
          aria-valuemin={1}
          aria-valuenow={storyIndex + 1}
          className="story-progress"
          role="progressbar"
        >
          <span
            style={{
              width: `${((storyIndex + 1) / sponsorStoryPlaceholders.length) * 100}%`,
            }}
          />
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-layout">
          <div>
            <p className="eyebrow">Contact us</p>
            <h2
              data-typing-heading
              style={{
                color: "#34a853",
                fontSize: "clamp(2.5rem, 4.2vw, 4.5rem)",
              }}
            >
              <span className="typing-intro">Let’s start with a</span>
              <br />
              <span className="typing-hello">hello.</span>
              <style>{`
                [data-typing-heading] .typing-intro {
                  white-space: nowrap;
                }

                [data-typing-heading] .typing-hello {
                  display: inline-block;
                  width: 0;
                  overflow: hidden;
                  border-right: 0.08em solid currentColor;
                  vertical-align: bottom;
                  white-space: nowrap;
                  animation:
                    type-hello 3.6s steps(6, end) infinite,
                    blink-hello 700ms step-end infinite;
                }

                @keyframes type-hello {
                  0%, 14% { width: 0; }
                  55%, 84% { width: 5.4ch; }
                  100% { width: 0; }
                }

                @keyframes blink-hello {
                  0%, 48% { border-color: currentColor; }
                  49%, 100% { border-color: transparent; }
                }

                @media (prefers-reduced-motion: reduce) {
                  [data-typing-heading] .typing-hello {
                    width: auto;
                    border-right: 0;
                    animation: none;
                  }
                }
              `}</style>
            </h2>
            <p className="contact-copy">
              Share your organization details and our community team will reach
              out to explore what we can build together.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      <KolkataFooter />
    </main>
  )
}
