import { FormEvent, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"

type IconName = "arrow"

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
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
          <Icon name="arrow" size={26} />
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
            placeholder="Organization"
            required
          />
        </label>
        <label className="field">
          <span>Work email</span>
          <input
            autoComplete="off"
            name="email"
            placeholder="name@example.com"
            required
            type="email"
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
      "#partnership, #opportunities, #contact, .site-footer",
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
      <header className="site-header">
        <nav className="nav-shell">
          <Link className="brand-link" href="/" aria-label="GDG OC FIEM home">
            <BrandMark />
            <span>
              <strong>Google Developer Group on Campus FIEM</strong>
              <small>Partner deck</small>
            </span>
          </Link>

          <div className="nav-links">
            <a href="#partnership">Partnership</a>
            <a href="#opportunities">Opportunities</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>
      </header>

      <KolkataHero />

      <section className="partnership-section" id="partnership">
        <div className="partnership-intro">
          <p className="eyebrow">Partnership, with purpose</p>
          <h2>Build the conditions for what comes next.</h2>
          <p>
            A partnership is a practical exchange: create useful experiences,
            share expertise, and make room for the next generation of builders.
          </p>
        </div>
        <ol className="partnership-values">
          <li>
            <span>01</span>
            <div>
              <h3>Reach</h3>
              <p>Meet student developers through community programming.</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>Experience</h3>
              <p>Bring practical ideas into workshops and hands-on events.</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>Talent</h3>
              <p>Support learning, mentorship, and meaningful technical work.</p>
            </div>
          </li>
          <li>
            <span>04</span>
            <div>
              <h3>Community</h3>
              <p>Help sustain an open space to learn, share, and build.</p>
            </div>
          </li>
        </ol>
      </section>

      <section className="opportunities-section" id="opportunities">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Ways to collaborate</p>
            <h2>Start with a shared idea.</h2>
          </div>
          <p>
            Each collaboration is shaped around the people, skills, and
            resources both sides can bring.
          </p>
        </div>
        <ol className="opportunity-list">
          <li>
            <span>01</span>
            <h3>Event partnerships</h3>
            <p>Contribute to community events and developer meetups.</p>
          </li>
          <li>
            <span>02</span>
            <h3>Workshops</h3>
            <p>Share tools and practical knowledge in hands-on sessions.</p>
          </li>
          <li>
            <span>03</span>
            <h3>Hackathons</h3>
            <p>Help participants explore problems and build solutions together.</p>
          </li>
          <li>
            <span>04</span>
            <h3>Technology support</h3>
            <p>Offer technical resources, including cloud support where available.</p>
          </li>
          <li>
            <span>05</span>
            <h3>Speakers and mentorship</h3>
            <p>Make time for useful conversations and guidance from practitioners.</p>
          </li>
          <li>
            <span>06</span>
            <h3>Community partnerships</h3>
            <p>Connect people and organizations around shared learning goals.</p>
          </li>
        </ol>
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
              The inquiry form is a non-connected preview. It does not transmit
              or store your information.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      <KolkataFooter />
    </main>
  )
}
