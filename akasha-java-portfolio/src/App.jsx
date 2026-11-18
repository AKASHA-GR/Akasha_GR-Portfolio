import { useState, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowDown, ArrowUpRight, Github, Linkedin, Mail, Menu, X,
  Code2, Server, PanelsTopLeft, Database, Wrench, ExternalLink,
  Sun, Moon, Download, Send, CheckCircle2, Circle, GraduationCap,
  Terminal, Sparkles, Copy, Check, Phone, Loader2, RotateCcw
} from 'lucide-react'
import SectionHeading from './components/SectionHeading'
import { profile, skillGroups, projects, journey } from './data'

const Scene = lazy(() => import('./components/Scene'))

const icons = { Code2, Server, PanelsTopLeft, Database, Wrench }
const fadeUp = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: .55 } } }

function Header({ theme, setTheme }) {
  const [open, setOpen] = useState(false)
  const links = [['About', '#about'], ['Skills', '#skills'], ['Projects', '#projects'], ['Journey', '#journey'], ['Contact', '#contact']]
  return <header className="topbar">
    <a className="brand" href="#home" aria-label="Akasha home"><span className="brand-mark">A<span>.</span></span><span>AKASHA G R</span></a>
    <nav className={open ? 'nav-links open' : 'nav-links'}>{links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}</nav>
    <div className="nav-actions">
      <button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle color theme">{theme === 'dark' ? <Sun size={17}/> : <Moon size={17}/>}</button>
      <a className="nav-cta" href="#contact">Let's talk <ArrowUpRight size={15}/></a>
      <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X/> : <Menu/>}</button>
    </div>
  </header>
}

function SceneFallback() {
  return (
    <div className="scene-wrap scene-fallback" aria-label="Interactive 3D preview loading">
      <div className="fallback-orb-glow" />
      <div className="fallback-sphere">
        <div className="fallback-inner-ring" />
      </div>
      <div className="scene-label"><span className="pulse-dot" /> JAVA • BUILD • DEPLOY</div>
    </div>
  )
}

function ProjectVisual({ project }) {
  const { visual, image, name } = project
  return (
    <div className={`project-visual ${visual}`}>
      {image ? (
        <div className="mock-window screenshot-window">
          <div className="mock-top"><i/><i/><i/><span>app / {name.toLowerCase().replace(/\s+/g, '-')}</span></div>
          <div className="mock-image-container">
            <img src={image} alt={`${name} preview`} className="mock-real-img" loading="lazy" />
          </div>
        </div>
      ) : (
        <div className="mock-window">
          <div className="mock-top"><i/><i/><i/><span>workspace / overview</span></div>
          {visual === 'placepro' ? (
            <div className="mock-content">
              <div className="mock-sidebar"><b>PP</b><span/><span/><span/><span/></div>
              <div className="mock-main">
                <small>PLACEMENT OVERVIEW</small>
                <div className="mock-stats"><b/><b/><b/></div>
                <div className="mock-lines"><i/><i/><i/><i/></div>
              </div>
            </div>
          ) : (
            <div className="mock-content">
              <div className="mock-sidebar"><b>IM</b><span/><span/><span/></div>
              <div className="mock-main">
                <small>INVENTORY SNAPSHOT</small>
                <div className="mock-chart"><i/><i/><i/><i/><i/><i/><i/></div>
                <div className="mock-lines"><i/><i/><i/></div>
              </div>
            </div>
          )}
        </div>
      )}
      <span className="visual-caption">{image ? 'APPLICATION SCREENSHOT' : 'PROJECT PREVIEW · CONCEPTUAL UI'}</span>
    </div>
  )
}

function App() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved) return saved
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
    } catch {
      return 'dark'
    }
  })

  function handleSetTheme(newTheme) {
    setTheme(newTheme)
    try {
      localStorage.setItem('theme', newTheme)
    } catch {}
  }

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const [copiedKey, setCopiedKey] = useState(null)

  const formspreeId = import.meta.env.VITE_FORMSPREE_ID
  const customEndpoint = import.meta.env.VITE_CONTACT_ENDPOINT
  const endpoint = customEndpoint || (formspreeId ? `https://formspree.io/f/${formspreeId}` : null)

  function handleCopy(text, key) {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedKey(key)
        setTimeout(() => setCopiedKey(null), 2000)
      })
    }
  }

  async function submitContact(e) {
    e.preventDefault()
    setErrorMsg(null)

    if (!endpoint) {
      const subject = encodeURIComponent(form.subject || 'Portfolio enquiry')
      const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })
      if (!response.ok) {
        throw new Error('Server returned an error')
      }
      setSent(true)
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setErrorMsg('Could not deliver directly right now. You can email directly using the button below or contact link above.')
    } finally {
      setSubmitting(false)
    }
  }

  return <div className={`app ${theme}`}>
    <Header theme={theme} setTheme={handleSetTheme}/>
    <main>
      <section id="home" className="hero section-shell">
        <div className="hero-copy">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="hero-status-row">
            {profile.avatar && (
              <img src={profile.avatar} alt={profile.name} className="hero-avatar-thumb" />
            )}
            <div className="availability"><span className="pulse-dot"/> OPEN TO ENTRY-LEVEL OPPORTUNITIES</div>
          </motion.div>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} className="hero-kicker">JAVA FULL STACK DEVELOPER <span> / </span> 2026 GRADUATE</motion.p>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp}>Building scalable applications with <em>Java</em> & modern web technologies<span className="blue-period">.</span></motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} className="hero-subtitle">Java Full Stack Developer <b>·</b> Backend Development <b>·</b> Problem Solver</motion.p>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} className="hero-description">Computer Science graduate passionate about building reliable backend systems and responsive web applications. Skilled in Java, OOP, Collections, JDBC, Servlets, Hibernate, SQL, Spring Core, and Spring MVC. Currently expanding my expertise in Spring Boot and React.</motion.p>
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="hero-buttons">
            <a className="button-primary" href="#projects">View my projects <ArrowUpRight size={17}/></a>
            <a className="button-secondary" href="/Akasha_GR_Resume.pdf" download><Download size={16}/> Download resume</a>
            <a className="text-link" href="#contact">Contact me <ArrowDown size={15}/></a>
          </motion.div>
          <div className="social-row">
            <a href={profile.github} target="_blank" rel="noreferrer"><Github size={17}/> GitHub <ArrowUpRight size={12}/></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn <ArrowUpRight size={12}/></a>
          </div>
        </div>
        <div className="hero-art">
          <div className="art-glow"/>
          <Suspense fallback={<SceneFallback />}>
            <Scene/>
          </Suspense>
          <div className="code-float code-one"><span>01</span> class Developer {'{'}<br/>&nbsp;&nbsp;String stack = <b>"Java"</b>;<br/>&nbsp;&nbsp;build();<br/>{'}'}</div>
          <div className="code-float code-two"><span>STATUS</span><b>Learning. Building. Improving.</b><i/></div>
        </div>
        <a href="#about" className="scroll-cue"><span/> SCROLL TO EXPLORE</a>
      </section>

      <section id="about" className="section-shell section-block">
        <SectionHeading eyebrow="01 / ABOUT" title="A developer in progress. A builder by mindset." text="I enjoy understanding how applications work behind the scenes and turning ideas into practical software."/>
        <div className="about-grid">
          <div className="about-main glass-card">
            <div className="about-header">
              {profile.avatar && (
                <div className="about-avatar-wrap">
                  <img src={profile.avatar} alt={profile.name} className="about-avatar-img" />
                  <span className="avatar-status-badge"><span className="pulse-dot"/> Open to Work</span>
                </div>
              )}
              <div className="about-icon"><Terminal/></div>
            </div>
            <h3>From computer science fundamentals to full-stack applications.</h3>
            <p>I’m a 2026 Computer Science Engineering graduate focused on Java backend and full-stack development. My learning journey has been centred on writing structured Java code, connecting applications to databases, and understanding how web applications are built end to end.</p>
            <p>I value strong fundamentals, clear problem-solving and continuous improvement. I’m actively strengthening my Spring Boot and React skills while building practical projects that help me apply what I learn.</p>
          </div>
          <div className="about-facts">
            <div className="fact-card"><GraduationCap/><span>EDUCATION</span><b>B.E. Computer Science Engineering</b><small>2026 Graduate</small></div>
            <div className="fact-card"><Code2/><span>CORE FOCUS</span><b>Java Backend Development</b><small>OOP · JDBC · Spring MVC</small></div>
            <div className="fact-card"><Sparkles/><span>MINDSET</span><b>Learn by building</b><small>Practical projects & problem-solving</small></div>
          </div>
        </div>
      </section>

      <section id="skills" className="section-shell section-block">
        <SectionHeading eyebrow="02 / TOOLKIT" title="Technologies I work with." text="A practical toolkit built through focused learning and hands-on development. Learning areas are labelled clearly."/>
        <div className="skills-grid">{skillGroups.map((group, i) => { const Icon = icons[group.icon] || Code2; return <motion.article key={group.title} className="skill-card glass-card" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={fadeUp} transition={{ delay: i * .06 }}><div className="skill-card-head"><span className="skill-icon"><Icon size={19}/></span><h3>{group.title}</h3></div><div className="skill-tags">{group.items.map(item => { const obj = typeof item === 'string' ? { name: item } : item; return <span className="skill-tag" key={obj.name}>{obj.name}{obj.note && <small>{obj.note}</small>}</span> })}</div></motion.article> })}</div>
        <p className="skills-note"><span className="learning-dot"/> “Learning” and “Basic” labels indicate areas currently being developed, not expert-level proficiency.</p>
      </section>

      <section id="projects" className="section-shell section-block">
        <SectionHeading eyebrow="03 / SELECTED WORK" title="Projects built to solve practical problems." text="Featured projects demonstrating full-stack architecture, database design, and end-to-end development. Source code available on GitHub."/>
        <div className="projects-list">
          {projects.map((project) => (
            <motion.article className="project-card glass-card" key={project.number} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }} variants={fadeUp}>
              <div className="project-info">
                <div className="project-number">PROJECT {project.number}</div>
                <h3>{project.name}</h3>
                <p className="project-subtitle">{project.subtitle}</p>
                <p className="project-description">{project.description}</p>
                <div className="scope-title">KEY MODULES & CAPABILITIES</div>
                <ul className="scope-list">{project.scope.map(s => <li key={s}><CheckCircle2 size={14}/>{s}</li>)}</ul>
                <div className="project-status">{project.status}</div>
                <div className="tech-list">{project.stack.map(t => <span key={t}>{t}</span>)}</div>
                <div className="project-actions">
                  <a className="button-glass" href={project.github} target="_blank" rel="noreferrer">
                    <Github size={15}/> View Repository <ArrowUpRight size={13}/>
                  </a>
                  {project.live ? (
                    <a className="button-glass live-btn" href={project.live} target="_blank" rel="noreferrer">
                      <ExternalLink size={15}/> Live Demo <ArrowUpRight size={13}/>
                    </a>
                  ) : (
                    <span className="project-badge-deploy">
                      <span className="deploy-dot" /> Ready to Deploy
                    </span>
                  )}
                </div>
              </div>
              <ProjectVisual project={project}/>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="journey" className="section-shell section-block">
        <SectionHeading eyebrow="04 / LEARNING PATH" title="Building depth, one layer at a time." text="A progression from Java fundamentals into backend frameworks and full-stack development."/>
        <div className="journey-wrap"><div className="journey-line"/>{journey.map((item, i) => <motion.div key={item.title} className={`journey-item ${item.state}`} initial={{ opacity: 0, x: i % 2 ? 18 : -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .4 }}><div className="journey-marker">{item.state === 'completed' ? <CheckCircle2 size={16}/> : <Circle size={15}/>}</div><div className="journey-card glass-card"><div className="journey-meta"><span>STEP {String(i + 1).padStart(2, '0')}</span><b>{item.state === 'completed' ? 'FOUNDATION' : 'CURRENT FOCUS'}</b></div><h3>{item.title}</h3><p>{item.detail}</p></div></motion.div>)}</div>
      </section>

      <section className="education-band"><div className="section-shell education-inner"><div><p className="eyebrow">EDUCATION</p><h2>Computer Science Engineering</h2><p>Bachelor of Engineering <span>·</span> 2026</p></div><div className="education-symbol"><GraduationCap size={38}/><span>B.E.</span></div></div></section>

      <section id="contact" className="section-shell section-block contact-section">
        <SectionHeading eyebrow="05 / CONTACT" title="Let's build something great together." text="Interested in entry-level Java development opportunities, internships or collaborating on practical software projects? Feel free to reach out."/>
        <div className="contact-grid">
          <div className="contact-aside">
            <div className="contact-item-box">
              <a className="contact-method" href={`mailto:${profile.email}`}>
                <span><Mail/></span>
                <div><small>EMAIL</small><b>{profile.email}</b></div>
                <ArrowUpRight/>
              </a>
              <button
                type="button"
                className={`copy-pill ${copiedKey === 'email' ? 'copied' : ''}`}
                onClick={() => handleCopy(profile.email, 'email')}
                aria-label="Copy email address"
                title="Copy email"
              >
                {copiedKey === 'email' ? <Check size={14} className="copied-icon"/> : <Copy size={14}/>}
                <span>{copiedKey === 'email' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {profile.phone && (
              <div className="contact-item-box">
                <a className="contact-method" href={`tel:${profile.phone.replace(/\s+/g, '')}`}>
                  <span><Phone size={18}/></span>
                  <div><small>PHONE / WHATSAPP</small><b>{profile.phone}</b></div>
                  <ArrowUpRight/>
                </a>
                <button
                  type="button"
                  className={`copy-pill ${copiedKey === 'phone' ? 'copied' : ''}`}
                  onClick={() => handleCopy(profile.phone, 'phone')}
                  aria-label="Copy phone number"
                  title="Copy phone"
                >
                  {copiedKey === 'phone' ? <Check size={14} className="copied-icon"/> : <Copy size={14}/>}
                  <span>{copiedKey === 'phone' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            )}

            <a className="contact-method" href={profile.github} target="_blank" rel="noreferrer">
              <span><Github/></span>
              <div><small>GITHUB</small><b>github.com/AKASHA-GR</b></div>
              <ArrowUpRight/>
            </a>
            <a className="contact-method" href={profile.linkedin} target="_blank" rel="noreferrer">
              <span><Linkedin/></span>
              <div><small>LINKEDIN</small><b>linkedin.com/in/akasha-gr</b></div>
              <ArrowUpRight/>
            </a>
            <p className="email-note">Open to entry-level Java developer roles, internships, and engineering collaborations.</p>
          </div>

          <form className="contact-form glass-card" onSubmit={submitContact}>
            {sent ? (
              <div className="sent-state">
                <CheckCircle2 size={32}/>
                <h3>Message sent successfully</h3>
                <p>Thanks for reaching out! I'll get back to you shortly.</p>
                <button type="button" className="reset-btn" onClick={() => setSent(false)}>
                  <RotateCcw size={14} style={{ display: 'inline', marginRight: 6 }}/> Send another message
                </button>
              </div>
            ) : (
              <>
                {errorMsg && (
                  <div className="form-alert-error">
                    <span>{errorMsg}</span>
                    <button
                      type="button"
                      className="form-fallback-btn"
                      onClick={() => {
                        const subject = encodeURIComponent(form.subject || 'Portfolio enquiry')
                        const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
                        window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
                      }}
                    >
                      Open Email Client (mailto) →
                    </button>
                  </div>
                )}
                <div className="form-row">
                  <label>Your name<input required value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="Name"/></label>
                  <label>Email address<input required type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} placeholder="you@example.com"/></label>
                </div>
                <label>Subject<input required value={form.subject} onChange={e => setForm({...form, subject:e.target.value})} placeholder="What would you like to discuss?"/></label>
                <label>Message<textarea required rows="5" value={form.message} onChange={e => setForm({...form, message:e.target.value})} placeholder="Write your message..."/></label>
                <button className="button-primary submit-button" type="submit" disabled={submitting}>
                  {submitting ? (
                    <>Sending... <Loader2 size={16} className="submitting-spinner"/></>
                  ) : (
                    <>Send message <Send size={16}/></>
                  )}
                </button>
                <p className="form-hint">
                  {endpoint
                    ? 'Your message will be delivered directly to inbox.'
                    : 'Submitting opens your email application with the message pre-filled. (Configure VITE_FORMSPREE_ID in .env for direct background delivery).'}
                </p>
              </>
            )}
          </form>
        </div>
      </section>
    </main>
    <footer className="footer"><div className="section-shell footer-inner"><a className="brand" href="#home"><span className="brand-mark">A<span>.</span></span><span>AKASHA G R</span></a><p>Designed & Developed by Akasha G R © 2026</p><a href="#home" className="back-top">BACK TO TOP ↑</a></div></footer>
  </div>
}

export default App
