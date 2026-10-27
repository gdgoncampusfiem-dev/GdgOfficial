import { FormEvent, PointerEvent, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navigation/Navbar"

const SPONSOR_STORIES = [
  {
    quote:
      "[ Verified sponsor story will appear here after review and approval by the GDG OC FIEM team. ]",
    name: "[ Sponsor representative ]",
    role: "[ Role · Organization ]",
    company: "[ Partner name ]",
    color: "blue",
  },
  {
    quote:
      "[ Add an approved quote about supporting student developers, community learning or technical collaboration. ]",
    name: "[ Sponsor representative ]",
    role: "[ Role · Organization ]",
    company: "[ Partner name ]",
    color: "green",
  },
  {
    quote:
      "[ Add an approved reflection on the partnership experience and its verified community impact. ]",
    name: "[ Sponsor representative ]",
    role: "[ Role · Organization ]",
    company: "[ Partner name ]",
    color: "red",
  },
  {
    quote:
      "[ Add an approved sponsor story here. Keep the final quote concise, specific and attributable. ]",
    name: "[ Sponsor representative ]",
    role: "[ Role · Organization ]",
    company: "[ Partner name ]",
    color: "yellow",
  },
]

const SPONSORS = [
  { name: "Google for Developers", image: "/sponsors/gfdlogo.svg" },
  { name: "AMD",                   image: "/sponsors/amdlogo.svg",  monochrome: true },
  { name: "GitHub",                image: "/sponsors/githublogo.svg", monochrome: true },
  { name: "Neo4j",                 image: "/sponsors/neo4jlogo.svg" },
]

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
      <Image alt="" height={447} src="/gdg-mark.png" width={447} />
    </span>
  )
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
        <h1 className="sponsor-hero-title">
          <span className="hero-heading-primary">Back the people building</span>
          <br />
          <em>what’s next.</em>
        </h1>
      </div>
    </section>
  )
}

function PartnershipMarquee() {
  return (
    <section
      aria-labelledby="sponsor-marquee-heading"
      className="marquee-section"
      id="partners"
    >
      <div className="section-heading section-heading-on-dark">
        <div>
          <h2 id="sponsor-marquee-heading">
            <span className="subheading-words font-light">Meet our </span>
            <span className="subheading-last font-bold">sponsors.</span>
          </h2>
        </div>
      </div>
      <div className="marquee">
        <div className="marquee-track">
          {[...SPONSORS, ...SPONSORS].map(
            ({ name, image, monochrome }, index) => {
              const isDuplicate = index >= SPONSORS.length

              return (
                <div
                  aria-hidden={isDuplicate}
                  className="sponsor-logo"
                  key={`${name}-${index}`}
                >
                  <Image
                    alt={isDuplicate ? "" : `${name} logo`}
                    className={`sponsor-image${monochrome ? " sponsor-image-white" : ""}`}
                    height={140}
                    src={image}
                    width={500}
                  />
                </div>
              )
            },
          )}
        </div>
      </div>
    </section>
  )
}

function SponsorStories() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [exitDirection, setExitDirection] = useState<-1 | 0 | 1>(0)
  const [isDragging, setIsDragging] = useState(false)
  const pointerStart = useRef<number | null>(null)
  const advanceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (advanceTimeout.current !== null) {
        clearTimeout(advanceTimeout.current)
      }
    },
    [],
  )

  function showPrevious() {
    setActiveIndex((index) =>
      index === 0 ? SPONSOR_STORIES.length - 1 : index - 1,
    )
  }

  function showNext() {
    setActiveIndex((index) =>
      index === SPONSOR_STORIES.length - 1 ? 0 : index + 1,
    )
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (exitDirection !== 0) return
    if (event.pointerType === "mouse" && event.button !== 0) return

    pointerStart.current = event.clientX
    setIsDragging(true)
    setDragOffset(0)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (pointerStart.current !== null) {
      setDragOffset(event.clientX - pointerStart.current)
    }
  }

  function handlePointerCancel(event: PointerEvent<HTMLDivElement>) {
    pointerStart.current = null
    setIsDragging(false)
    setDragOffset(0)
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    const startX = pointerStart.current
    if (startX === null) return

    pointerStart.current = null
    setIsDragging(false)
    const distance = event.clientX - startX
    const direction: -1 | 0 | 1 = distance < -60 ? -1 : distance > 60 ? 1 : 0

    if (direction === 0) {
      setDragOffset(0)
    } else {
      setExitDirection(direction)
      setDragOffset(direction * event.currentTarget.clientWidth * 1.08)
      advanceTimeout.current = setTimeout(() => {
        setActiveIndex((index) =>
          direction < 0
            ? (index + 1) % SPONSOR_STORIES.length
            : index === 0
              ? SPONSOR_STORIES.length - 1
              : index - 1,
        )
        setExitDirection(0)
        setDragOffset(0)
      }, 720)
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  return (
    <section className="stories-section" id="stories">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Sponsor stories</p>
          <h2 className="stories-heading">
            <span className="subheading-words font-light">What contribution feels </span>
            <span className="subheading-last font-bold">like.</span>
          </h2>
        </div>
        <div aria-hidden="true" className="story-swipe-hint">
          <span />
          Swipe or drag to turn the page
        </div>
      </div>
      <div
        aria-label="Draggable sponsor story gallery"
        className={`story-window${isDragging ? " is-dragging" : ""}`}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault()
            showPrevious()
          }
          if (event.key === "ArrowRight") {
            event.preventDefault()
            showNext()
          }
        }}
        onPointerCancel={handlePointerCancel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        role="region"
        tabIndex={0}
      >
        <div className="story-track">
          {SPONSOR_STORIES.map((story, index) => {
            const relativeIndex =
              (index - activeIndex + SPONSOR_STORIES.length) %
              SPONSOR_STORIES.length
            const isActive = relativeIndex === 0
            const isPast = relativeIndex === SPONSOR_STORIES.length - 1
            const stackDepth = Math.min(Math.max(relativeIndex, 0), 3)
            const activeOffset =
              exitDirection === 0
                ? `${dragOffset}px`
                : `${exitDirection * 108}%`
            const transform = isActive
              ? `translate3d(${activeOffset}, 0, 0) rotateZ(${dragOffset / 140}deg)`
              : isPast
                ? "translate3d(-108%, 0, 0) rotateZ(-4deg)"
                : `translate3d(${stackDepth * 10}px, ${stackDepth * 10}px, ${-stackDepth * 18}px) scale(${1 - stackDepth * 0.018})`

            return (
              <article
                aria-hidden={!isActive}
                className={`story-slide${isActive ? ` is-active-story${exitDirection === 0 ? "" : " is-exiting-story"}` : isPast ? " is-past-story" : " is-stacked-story"}`}
                key={story.color}
                style={{
                  opacity: isPast ? 0 : 1,
                  pointerEvents: isActive ? "auto" : "none",
                  transform,
                  transformOrigin: isActive && dragOffset > 0 ? "right center" : "left center",
                  zIndex: isActive
                    ? SPONSOR_STORIES.length + 2
                    : SPONSOR_STORIES.length - relativeIndex,
                }}
              >
                <div className={`story-card story-${story.color}`}>
                  <span aria-hidden="true" className="quote-mark">
                    “
                  </span>
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
        aria-valuemax={SPONSOR_STORIES.length}
        aria-valuemin={1}
        aria-valuenow={activeIndex + 1}
        className="story-progress"
        role="progressbar"
      >
        <span
          style={{
            width: `${((activeIndex + 1) / SPONSOR_STORIES.length) * 100}%`,
          }}
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
        <Image
          alt="Kolkata landmarks illustrated across the city skyline"
          height={460}
          src="/kolkata-footer-art-rygb.png"
          width={1916}
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
        <Link className="footer-brand" href="/" aria-label="GDG OC FIEM home">
          <BrandMark />
          <span>
            <strong>GDG on Campus</strong>
            <small>Future Institute of Engineering and Management</small>
          </span>
        </Link>
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
        <p className="contact-success-title">No message sent.</p>
        <p>
          This preview is not connected to an inquiry service, so no message was
          sent or stored.
        </p>
        <button onClick={() => setSubmitted(false)} type="button">
          Return to form preview
        </button>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <p className="form-preview-note">
        Preview only — do not enter real contact details. This form does not
        send or store inquiries.
      </p>
      <div className="form-grid">
        <label className="field">
          <span>Organization name</span>
          <input
            autoComplete="off"
            name="organization"
            placeholder="Acme Technologies"
            required
          />
        </label>
        <label className="field">
          <span>Work email</span>
          <input
            autoComplete="off"
            name="email"
            placeholder="you@organization.com"
            required
            type="email"
          />
        </label>
        <label className="field">
          <span>Phone number</span>
          <input
            autoComplete="off"
            name="phone"
            placeholder="+91 00000 00000"
            required
            type="tel"
          />
        </label>
        <label className="field">
          <span>Organization website</span>
          <input
            autoComplete="off"
            name="website"
            placeholder="https://organization.com"
            required
            type="url"
          />
        </label>
      </div>
      <button
        className="submit-button"
        type="submit"
      >
        Contact us <Icon name="arrow" size={18} />
      </button>
    </form>
  )
}

export default function App() {
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

  return (
    <main className="app-shell theme-light" id="top">
      <Navbar theme="light" />

      <KolkataHero />
      <PartnershipMarquee />
      <SponsorStories />

      <section className="contact-section" id="contact">
        <div className="contact-layout">
          <div>
            <p className="eyebrow">Contact us</p>
            <h2 className="contact-heading" data-typing-heading>
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
