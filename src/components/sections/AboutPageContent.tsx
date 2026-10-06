"use client";

import { ArrowUpRight, Braces, ContactRound, Phone } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/container";

const ease = [0.22, 1, 0.36, 1] as const;

const education = [
  {
    number: "01",
    years: "2019 — 2023",
    institution: "MBESociety’s College of Engineering",
    qualification: "Bachelor of Technology in Computer Science",
    location: "Ambajogai, Maharashtra",
    metricLabel: "GPA",
    metric: "8.27 / 10",
    coursework: [
      "Web Development",
      "Data Structures & Algorithms (Java)",
      "Computer Networks",
      "Operating Systems",
      "DBMS",
    ],
  },
  {
    number: "02",
    years: "2018 — 2019",
    institution: "Yogeshwari Mahavidyalaya",
    qualification: "Higher Secondary Certificate (HSC / 12th)",
    location: "Ambajogai, Maharashtra",
    metricLabel: "Percentage",
    metric: "65%",
    coursework: ["Science"],
  },
] as const;

const focusStyles = "outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background";

export function AboutContact() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <section className="overflow-hidden border-t border-line/50 pb-10 pt-[var(--section-space)] min-[360px]:pb-12 sm:pb-16" id="about" aria-labelledby="about-title">
        <Container>
        <motion.header
          className="grid gap-5 min-[360px]:gap-7 lg:grid-cols-[1.2fr_0.8fr] lg:items-end"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease }}
          viewport={{ once: true, amount: 0.4 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        >
          <div>
            <div className="flex items-center gap-3 font-mono text-label uppercase tracking-[0.16em] text-muted"><span className="h-px w-8 bg-accent-primary" />07 / About</div>
            <h2 className="mt-3 font-display text-section font-semibold leading-[0.92] tracking-[-0.055em] text-foreground min-[360px]:mt-4 sm:mt-5 sm:leading-[0.86] sm:tracking-[-0.07em]" id="about-title">
              BEYOND THE<br /><span className="text-muted">INTERFACE</span><span className="text-accent-primary">.</span>
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-7 text-muted sm:text-base sm:leading-8 lg:pb-1">
            Computer Science graduate with a focus on building thoughtful, production-ready digital experiences.
          </p>
        </motion.header>
        </Container>
      </section>

      <section aria-labelledby="education-title" className="pb-[var(--section-space)] pt-4 sm:pt-6" id="education">
        <Container>
          <div className="grid gap-8 min-[360px]:gap-10 lg:grid-cols-[0.36fr_0.64fr] lg:gap-16 xl:gap-24">
            <motion.header
              className="self-start lg:sticky lg:top-28"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              transition={{ duration: reduceMotion ? 0 : 0.55, ease }}
              viewport={{ once: true, amount: 0.6 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            >
              <span className="font-mono text-label uppercase tracking-[0.16em] text-accent-secondary">Education journey</span>
              <h2 className="mt-3 font-display text-[clamp(2rem,10vw,5rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-foreground min-[360px]:mt-4 sm:leading-[0.9] sm:tracking-[-0.06em]" id="education-title">WHERE IT<br /><span className="text-muted">STARTED.</span></h2>
              <p className="mt-5 max-w-xs text-sm leading-7 text-muted">A foundation in computer science, shaped through two chapters in Ambajogai.</p>
            </motion.header>

            <div className="relative pl-6 min-[360px]:pl-7 sm:pl-10">
              <div aria-hidden="true" className="absolute bottom-8 left-[0.22rem] top-3 w-px bg-line sm:left-[0.47rem]" />
              <motion.div
                aria-hidden="true"
                className="absolute left-[0.19rem] top-3 h-[calc(100%-2.75rem)] w-0.5 origin-top bg-gradient-to-b from-accent-primary via-accent-secondary to-accent-highlight sm:left-[0.44rem]"
                initial={reduceMotion ? false : { scaleY: 0 }}
                transition={{ duration: reduceMotion ? 0 : 1.05, ease }}
                viewport={{ once: true, amount: 0.25 }}
                whileInView={reduceMotion ? undefined : { scaleY: 1 }}
              />

              {education.map((entry, index) => (
                <motion.article
                  className={`relative ${index === 0 ? "border-b border-line/70 pb-10 min-[360px]:pb-12 sm:pb-16" : "pt-10 min-[360px]:pt-12 sm:pt-16"}`}
                  initial={reduceMotion ? false : { opacity: 0, x: 14 }}
                  key={entry.institution}
                  transition={{ delay: reduceMotion ? 0 : index * 0.14, duration: reduceMotion ? 0 : 0.6, ease }}
                  viewport={{ once: true, amount: 0.35 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                >
                  <span aria-hidden="true" className={`absolute -left-[1.68rem] top-2 grid size-3.5 place-items-center rounded-full border bg-background min-[360px]:-left-[1.93rem] min-[360px]:size-4 sm:-left-[2.22rem] ${index === 0 ? "border-accent-primary" : "border-accent-highlight"}`}>
                    <span className={`size-1.5 rounded-full ${index === 0 ? "bg-accent-primary" : "bg-accent-highlight"}`} />
                  </span>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className={`font-mono text-label tracking-[0.14em] ${index === 0 ? "text-accent-primary" : "text-accent-highlight"}`}>{entry.number} / {entry.years}</span>
                    <span className="font-mono text-label uppercase tracking-[0.11em] text-muted">{entry.location}</span>
                  </div>

                  <div className="mt-5 grid gap-5 min-[360px]:mt-6 min-[360px]:gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                    <div>
                      <h3 className={`max-w-2xl break-words font-display font-semibold leading-[1.04] tracking-[-0.045em] text-foreground ${index === 0 ? "text-[clamp(1.55rem,8vw,4.25rem)]" : "text-[clamp(1.4rem,7vw,3rem)]"}`}>{entry.institution}</h3>
                      <p className="mt-4 max-w-xl text-sm leading-7 text-muted sm:text-base">{entry.qualification}</p>
                    </div>
                    <div className="border-l border-line pl-4 sm:min-w-32">
                      <span className="block font-mono text-label uppercase tracking-[0.12em] text-muted">{entry.metricLabel}</span>
                      <strong className={`mt-1 block font-display font-semibold tracking-[-0.055em] text-foreground ${index === 0 ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"}`}>{entry.metric}</strong>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-line/70 pt-4 min-[360px]:mt-8 min-[360px]:pt-5">
                    <span className="font-mono text-label uppercase tracking-[0.12em] text-muted/70">Studied through</span>
                    <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2" aria-label={`Relevant coursework at ${entry.institution}`}>
                      {entry.coursework.map((course, courseIndex) => (
                        <li className="flex items-center gap-4 font-mono text-label uppercase leading-5 tracking-[0.07em] text-muted" key={course}>
                          {course}<span aria-hidden="true" className={`size-1 rounded-full ${courseIndex === entry.coursework.length - 1 ? "hidden" : "bg-line"}`} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="contact-title" className="relative border-t border-line/70 py-[var(--section-space)]" id="contact">
        <div aria-hidden="true" className="pointer-events-none absolute right-0 top-20 size-96 translate-x-1/2 rounded-full bg-accent-primary/[0.045] blur-[120px]" />
        <Container className="relative">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            transition={{ duration: reduceMotion ? 0 : 0.7, ease }}
            viewport={{ once: true, amount: 0.25 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          >
            <div className="grid gap-5 min-[360px]:gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <span className="font-mono text-label uppercase tracking-[0.16em] text-accent-secondary">Contact / Next chapter</span>
                <h2 className="mt-3 font-display text-display font-semibold leading-[0.88] tracking-[-0.06em] text-foreground min-[360px]:mt-4 sm:leading-[0.82] sm:tracking-[-0.075em]" id="contact-title">
                  LET&apos;S<br /><span className="text-muted">CONNECT</span><span className="text-accent-secondary">.</span>
                </h2>
              </div>
              <div className="lg:pb-1 lg:text-right">
                <span className="font-mono text-label uppercase tracking-[0.12em] text-muted">Name</span>
                <p className="mt-1 font-display text-xl font-semibold tracking-[-0.035em] text-foreground">Aniket Pandit</p>
              </div>
            </div>

            <a
              className={`group mt-8 grid gap-4 border-y border-line/80 py-6 transition-[border-color,background-color] hover:border-accent-primary/60 hover:bg-accent-primary/[0.025] min-[360px]:mt-10 min-[360px]:gap-6 min-[360px]:py-7 sm:mt-14 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:py-9 ${focusStyles}`}
              href="mailto:aniketpandit548@gmail.com"
            >
              <div className="min-w-0">
                <span className="font-mono text-label uppercase tracking-[0.12em] text-muted">Email</span>
                <span className="mt-2.5 block font-display text-[clamp(1rem,5.3vw,3.8rem)] font-semibold leading-tight tracking-[-0.035em] text-foreground transition-colors [overflow-wrap:anywhere] group-hover:text-accent-primary min-[360px]:mt-3 min-[360px]:tracking-[-0.045em]">aniketpandit548@gmail.com</span>
              </div>
              <span className="inline-flex min-h-10 items-center gap-3 font-mono text-label uppercase tracking-[0.12em] text-foreground">Send a message <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" /></span>
            </a>

            <div className="grid border-b border-line/80 md:grid-cols-[1.1fr_0.9fr]">
              <a className={`group flex min-h-24 items-center justify-between gap-4 border-b border-line/80 py-5 transition-colors hover:text-accent-highlight min-[360px]:min-h-28 min-[360px]:gap-5 min-[360px]:py-6 md:border-b-0 md:border-r md:pr-8 ${focusStyles}`} href="tel:+918975751690">
                <div>
                  <span className="font-mono text-label uppercase tracking-[0.12em] text-muted">Phone</span>
                  <span className="mt-2 block font-display text-[clamp(1.2rem,6vw,2.4rem)] font-semibold tracking-[-0.04em] text-foreground decoration-accent-highlight/70 underline-offset-8 group-hover:underline">+91 8975751690</span>
                </div>
                <Phone aria-hidden="true" className="size-4 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-highlight" />
              </a>

              <div className="grid grid-cols-2 md:pl-8">
                <a aria-label="GitHub profile (opens in a new tab)" className={`group flex min-h-24 flex-col justify-center gap-2.5 border-r border-line/80 px-3 transition-colors hover:text-accent-secondary min-[360px]:min-h-28 min-[360px]:gap-3 min-[360px]:px-4 sm:px-6 ${focusStyles}`} href="https://github.com/aniketpandit" rel="noopener noreferrer" target="_blank">
                  <Braces aria-hidden="true" className="size-4 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-secondary" />
                  <span className="font-mono text-label uppercase tracking-[0.12em] text-foreground">GitHub <ArrowUpRight aria-hidden="true" className="ml-1 inline size-3" /></span>
                </a>
                <a aria-label="LinkedIn profile (opens in a new tab)" className={`group flex min-h-24 flex-col justify-center gap-2.5 px-3 transition-colors hover:text-accent-primary min-[360px]:min-h-28 min-[360px]:gap-3 min-[360px]:px-4 sm:px-6 ${focusStyles}`} href="https://linkedin.com/in/aniketpandit" rel="noopener noreferrer" target="_blank">
                  <ContactRound aria-hidden="true" className="size-4 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-primary" />
                  <span className="font-mono text-label uppercase tracking-[0.12em] text-foreground">LinkedIn <ArrowUpRight aria-hidden="true" className="ml-1 inline size-3" /></span>
                </a>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      <motion.footer
        className="border-t border-line/70 py-9 min-[360px]:py-12 sm:py-16"
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        transition={{ duration: reduceMotion ? 0 : 0.5, ease }}
        viewport={{ once: true, amount: 0.7 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      >
        <Container className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="font-display text-[clamp(1.7rem,4vw,3.6rem)] font-semibold uppercase leading-[0.98] tracking-[-0.055em] text-foreground">Designed with intent.<br /><span className="text-muted">Built with code.</span></p>
          <span className="font-display text-sm font-bold tracking-[-0.02em] text-foreground">ANIKET<span className="text-accent-primary">.</span></span>
        </Container>
      </motion.footer>
    </>
  );
}
