"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, LoaderCircle, Sparkles } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { Container } from "@/components/ui/container";

const ease = [0.22, 1, 0.36, 1] as const;

const experiments = [
  { id: "interaction", number: "01", label: "Interaction" },
  { id: "motion", number: "02", label: "Motion" },
  { id: "feedback", number: "03", label: "Feedback" },
] as const;

type ExperimentId = (typeof experiments)[number]["id"];
type FeedbackState = "idle" | "processing" | "complete";

function InteractionExperiment({ reduceMotion }: { reduceMotion: boolean | null }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function handleMove(event: MouseEvent<HTMLButtonElement>) {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setOffset({
      x: (event.clientX - bounds.left - bounds.width / 2) * 0.08,
      y: (event.clientY - bounds.top - bounds.height / 2) * 0.12,
    });
  }

  return (
    <div className="flex h-full min-h-52 items-center justify-center p-3 min-[360px]:min-h-60 min-[360px]:p-5 sm:min-h-72 sm:p-10">
      <div className="text-center">
        <span className="font-mono text-label uppercase tracking-[0.15em] text-muted">Move with intent</span>
        <motion.button
          animate={{ x: offset.x, y: offset.y }}
          className="group relative mt-5 flex min-w-48 items-center justify-between overflow-hidden border border-accent-primary/55 bg-accent-primary px-4 py-3.5 text-left text-background outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary focus-visible:ring-offset-4 focus-visible:ring-offset-background min-[360px]:mt-6 min-[360px]:min-w-56 min-[360px]:px-5 min-[360px]:py-4 sm:min-w-64 sm:px-6"
          onMouseLeave={() => setOffset({ x: 0, y: 0 })}
          onMouseMove={handleMove}
          transition={{ duration: reduceMotion ? 0 : 0.25, ease }}
          type="button"
          whileHover={reduceMotion ? undefined : { boxShadow: "0 16px 50px rgba(124, 92, 255, 0.24)" }}
          whileTap={reduceMotion ? undefined : { scale: 0.985 }}
        >
          <span className="relative z-10 font-display text-xs font-semibold uppercase tracking-[-0.01em] min-[360px]:text-sm min-[360px]:tracking-[-0.02em]">Explore the work</span>
          <ArrowRight aria-hidden="true" className="relative z-10 size-4 transition-transform duration-300 group-hover:translate-x-1" />
          <span aria-hidden="true" className="absolute inset-y-0 left-0 w-0 bg-accent-secondary transition-[width] duration-500 ease-out group-hover:w-full" />
        </motion.button>
        <p className="mt-4 text-xs leading-6 text-muted">A quiet response that follows attention.</p>
      </div>
    </div>
  );
}

function MotionExperiment({ reduceMotion }: { reduceMotion: boolean | null }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex h-full min-h-52 items-center justify-center p-3 min-[360px]:min-h-60 min-[360px]:p-5 sm:min-h-72 sm:p-10">
      <motion.div className="w-full max-w-sm overflow-hidden border border-line bg-background/80" layout={!reduceMotion}>
        <div className="flex items-center justify-between border-b border-line px-3.5 py-3 min-[360px]:px-5 min-[360px]:py-4">
          <div className="flex items-center gap-3">
            <span className="grid size-8 place-items-center bg-accent-secondary/10 text-accent-secondary"><Sparkles aria-hidden="true" className="size-3.5" /></span>
            <div>
              <span className="block font-display text-sm font-semibold tracking-[-0.02em] text-foreground">Design review</span>
              <span className="block font-mono text-label uppercase tracking-[0.11em] text-muted">Ready for review</span>
            </div>
          </div>
          <span className="size-2 rounded-full bg-accent-secondary" aria-label="Online" />
        </div>
        <motion.div className="px-3.5 py-4 min-[360px]:px-5 min-[360px]:py-5" layout={!reduceMotion}>
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : -6, scale: reduceMotion ? 1 : 0.985 }}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 8, scale: reduceMotion ? 1 : 0.985 }}
              key={expanded ? "details" : "summary"}
              transition={{ duration: reduceMotion ? 0 : 0.28, ease }}
            >
              <span className="font-mono text-label uppercase tracking-[0.12em] text-accent-highlight">{expanded ? "Review notes" : "Overview"}</span>
              <p className="mt-2 text-sm leading-6 text-foreground">
                {expanded ? "Spacing is resolved. The final interaction pass is ready to inspect." : "A focused handoff with the decisions that matter kept in view."}
              </p>
            </motion.div>
          </AnimatePresence>
          <button
            aria-expanded={expanded}
            className="mt-5 inline-flex min-h-10 items-center gap-2 border-b border-line pb-1 font-mono text-label uppercase tracking-[0.11em] text-muted outline-none transition-colors hover:border-accent-highlight hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            onClick={() => setExpanded((value) => !value)}
            type="button"
          >
            {expanded ? "Show overview" : "View details"}
            <ArrowRight aria-hidden="true" className={`size-3 transition-transform ${expanded ? "-rotate-90" : "rotate-0"}`} />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

function FeedbackExperiment({ reduceMotion }: { reduceMotion: boolean | null }) {
  const [status, setStatus] = useState<FeedbackState>("idle");
  const timers = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function runFeedback() {
    timers.current.forEach(clearTimeout);
    setStatus("processing");
    timers.current = [
      setTimeout(() => setStatus("complete"), reduceMotion ? 150 : 1150),
      setTimeout(() => setStatus("idle"), reduceMotion ? 1100 : 3300),
    ];
  }

  const statusCopy = status === "idle" ? "Ready when you are" : status === "processing" ? "Saving changes" : "Changes saved";

  return (
    <div className="flex h-full min-h-52 items-center justify-center p-3 min-[360px]:min-h-60 min-[360px]:p-5 sm:min-h-72 sm:p-10">
      <div className="w-full max-w-sm border border-line bg-background/80 p-4 min-[360px]:p-5 sm:p-6">
        <div aria-live="polite" className="flex min-h-12 items-center gap-3">
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              animate={{ opacity: 1, scale: 1 }}
              className={`grid size-9 shrink-0 place-items-center rounded-full ${status === "complete" ? "bg-accent-secondary text-background" : "bg-panel-elevated text-muted"}`}
              exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.8 }}
              initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.8 }}
              key={status}
              transition={{ duration: reduceMotion ? 0 : 0.22, ease }}
            >
              {status === "processing" ? <LoaderCircle aria-hidden="true" className={`size-4 ${reduceMotion ? "" : "animate-spin"}`} /> : status === "complete" ? <Check aria-hidden="true" className="size-4" /> : <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-highlight" />}
            </motion.span>
          </AnimatePresence>
          <div>
            <span className="block font-display text-sm font-semibold tracking-[-0.02em] text-foreground">{statusCopy}</span>
            <span className="block font-mono text-label uppercase tracking-[0.1em] text-muted">{status === "processing" ? "Please wait" : status === "complete" ? "Everything is up to date" : "No pending changes"}</span>
          </div>
        </div>
        <button
          className="mt-5 min-h-12 w-full border border-line bg-panel-elevated px-4 py-3 font-mono text-label uppercase tracking-[0.12em] text-foreground outline-none transition-[border-color,background-color] hover:border-accent-secondary/70 hover:bg-accent-secondary/[0.06] focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background disabled:cursor-wait disabled:opacity-60"
          disabled={status === "processing"}
          onClick={runFeedback}
          type="button"
        >
          {status === "processing" ? "Processing" : status === "complete" ? "Saved" : "Save changes"}
        </button>
      </div>
    </div>
  );
}

export function UiLab() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<ExperimentId>("interaction");
  const activeIndex = experiments.findIndex((experiment) => experiment.id === active);

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? experiments.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + experiments.length) % experiments.length;
    const next = experiments[nextIndex];
    setActive(next.id);
    document.getElementById(`ui-lab-tab-${next.id}`)?.focus();
  }

  return (
    <section aria-labelledby="ui-lab-title" className="relative overflow-hidden border-t border-line/50 py-[var(--section-space)]" id="ui-lab">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 size-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-primary/[0.045] blur-[130px]" />
      <Container className="relative">
        <motion.header
          className="grid gap-5 min-[360px]:gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease }}
          viewport={{ once: true, amount: 0.45 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        >
          <div>
            <div className="flex items-center gap-3 font-mono text-label uppercase tracking-[0.16em] text-muted"><span className="h-px w-8 bg-accent-primary" />06 / UI Lab</div>
            <h2 className="mt-3 max-w-4xl font-display text-section-wide font-semibold leading-[0.94] tracking-[-0.05em] text-foreground min-[360px]:mt-4 sm:mt-5 sm:leading-[0.88] sm:tracking-[-0.065em]" id="ui-lab-title">
              SMALL DETAILS<span className="text-accent-primary">.</span><br /><span className="text-muted">BIG DIFFERENCE</span><span className="text-accent-secondary">.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-muted sm:text-base sm:leading-8 lg:pb-1">A few interface experiments exploring interaction, motion and visual feedback.</p>
        </motion.header>

        <motion.div
          className="mt-7 min-[360px]:mt-9 sm:mt-11"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          transition={{ delay: reduceMotion ? 0 : 0.12, duration: reduceMotion ? 0 : 0.65, ease }}
          viewport={{ once: true, amount: 0.25 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        >
          <div className="relative overflow-hidden border border-line/80 bg-panel/40">
            <div className="flex items-center justify-between gap-2 border-b border-line/70 px-3 py-2.5 min-[360px]:px-4 min-[360px]:py-3 sm:px-5">
              <div className="flex items-center gap-2 font-mono text-label uppercase tracking-[0.12em] text-muted"><span className="size-1.5 rounded-full bg-accent-secondary" />Interactive lab</div>
              <span className="font-mono text-label uppercase tracking-[0.1em] text-muted/60">0{activeIndex + 1} / 03</span>
            </div>
            <div aria-hidden="true" className="absolute inset-0 top-10 bg-[linear-gradient(rgba(41,49,60,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(41,49,60,0.16)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
            <div className="relative">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: reduceMotion ? 0 : -8, scale: reduceMotion ? 1 : 0.99 }}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 10, scale: reduceMotion ? 1 : 0.99 }}
                  key={active}
                  role="tabpanel"
                  id={`ui-lab-panel-${active}`}
                  aria-labelledby={`ui-lab-tab-${active}`}
                  transition={{ duration: reduceMotion ? 0 : 0.32, ease }}
                >
                  {active === "interaction" && <InteractionExperiment reduceMotion={reduceMotion} />}
                  {active === "motion" && <MotionExperiment reduceMotion={reduceMotion} />}
                  {active === "feedback" && <FeedbackExperiment reduceMotion={reduceMotion} />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div aria-label="UI Lab experiments" className="grid grid-cols-3 border-x border-b border-line/80" role="tablist">
            {experiments.map((experiment, index) => {
              const isActive = experiment.id === active;
              return (
                <motion.button
                  aria-controls={`ui-lab-panel-${experiment.id}`}
                  aria-selected={isActive}
                  className={`relative min-h-16 px-1.5 py-3 text-left outline-none transition-colors focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-primary min-[360px]:min-h-20 min-[360px]:px-2 min-[360px]:py-4 sm:min-h-24 sm:px-5 ${index > 0 ? "border-l border-line/80" : ""} ${isActive ? "bg-panel-elevated/80 text-foreground" : "text-muted/50 hover:bg-panel/60 hover:text-muted"}`}
                  id={`ui-lab-tab-${experiment.id}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  key={experiment.id}
                  onClick={() => setActive(experiment.id)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  role="tab"
                  tabIndex={isActive ? 0 : -1}
                  transition={{ delay: reduceMotion ? 0 : 0.22 + index * 0.07, duration: reduceMotion ? 0 : 0.4, ease }}
                  viewport={{ once: true }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                >
                  <span className={`block font-mono text-label tracking-[0.12em] ${isActive ? "text-accent-secondary" : "text-muted/50"}`}>{experiment.number}</span>
                  <span className="mt-1.5 block font-display text-[0.57rem] font-semibold uppercase tracking-[-0.01em] min-[360px]:mt-2 min-[360px]:text-[0.68rem] sm:text-sm">{experiment.label}</span>
                  {isActive && <motion.span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 bg-accent-secondary" layoutId="ui-lab-active" transition={{ duration: reduceMotion ? 0 : 0.3, ease }} />}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
