import type { ProjectMockupKind } from "@/types/project";

interface ProjectMockupProps {
  kind: ProjectMockupKind;
}

const chartHeights = [38, 58, 44, 72, 62, 86, 74];

function EducationMockup() {
  return (
    <div className="grid h-full min-h-[18rem] grid-cols-[2.75rem_1fr] overflow-hidden rounded-lg border border-line/80 bg-background shadow-2xl min-[360px]:min-h-[20rem] min-[360px]:grid-cols-[3.4rem_1fr] sm:min-h-[27rem] sm:grid-cols-[8rem_1fr] sm:rounded-xl">
      <aside className="border-r border-line/70 bg-panel p-2 min-[360px]:p-2.5 sm:p-4">
        <div className="flex items-center gap-2">
          <span className="grid size-6 place-items-center rounded-md bg-accent-primary font-mono text-[0.48rem] text-white">AP</span>
          <span className="hidden font-display text-[0.65rem] font-semibold text-foreground sm:inline">EDUCORE</span>
        </div>
        <div className="mt-7 space-y-2">
          {["Overview", "Students", "Courses", "Schedule", "Reports"].map((item, index) => (
            <div
              className={`flex items-center gap-2 rounded-md px-2 py-2 ${index === 0 ? "bg-accent-primary/15 text-foreground" : "text-muted"}`}
              key={item}
            >
              <span className={`size-1.5 rounded-full ${index === 0 ? "bg-accent-primary" : "bg-line"}`} />
              <span className="hidden font-mono text-[0.48rem] sm:inline">{item}</span>
            </div>
          ))}
        </div>
      </aside>

      <div className="min-w-0 p-2.5 min-[360px]:p-3 sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[0.46rem] uppercase tracking-[0.14em] text-muted">Dashboard / Overview</p>
            <p className="mt-1.5 font-display text-sm font-semibold text-foreground sm:text-lg">Good morning, Aniket</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden rounded-md border border-line px-2 py-1 font-mono text-[0.45rem] text-muted sm:block">This week</span>
            <span className="size-6 rounded-full border border-line bg-panel-elevated" />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-1.5 min-[360px]:mt-5 min-[360px]:gap-2 sm:grid-cols-4 sm:gap-3">
          {[
            ["Students", "1,248", "bg-accent-primary"],
            ["Classes", "32", "bg-accent-secondary"],
            ["Attendance", "92%", "bg-accent-highlight"],
            ["Upcoming", "08", "bg-accent-primary"],
          ].map(([label, value, accentClass]) => (
            <div className="rounded-lg border border-line/70 bg-panel p-2.5 sm:p-3" key={label}>
              <div className={`mb-3 h-1 w-5 rounded-full ${accentClass}`} />
              <p className="font-mono text-[0.4rem] uppercase tracking-[0.1em] text-muted sm:text-[0.46rem]">{label}</p>
              <p className="mt-1 font-display text-sm font-semibold text-foreground sm:text-lg">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-[1.45fr_0.75fr]">
          <div className="rounded-lg border border-line/70 bg-panel p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[0.48rem] uppercase tracking-[0.1em] text-foreground">Weekly attendance</p>
              <span className="font-mono text-[0.42rem] text-accent-secondary">+4.2%</span>
            </div>
            <div className="mt-5 flex h-24 items-end gap-2 sm:h-28 sm:gap-3">
              {chartHeights.map((height, index) => (
                <div className="flex h-full flex-1 items-end" key={height}>
                  <div
                    className={`w-full rounded-t-sm ${index === 5 ? "bg-accent-primary" : "bg-line/80"}`}
                    style={{ height: `${height}%` }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="hidden rounded-lg border border-line/70 bg-panel p-4 sm:block">
            <p className="font-mono text-[0.48rem] uppercase tracking-[0.1em] text-foreground">Upcoming</p>
            <div className="mt-4 space-y-3">
              {["Design systems", "Web engineering", "API workshop"].map((item, index) => (
                <div className="flex gap-2 border-b border-line/60 pb-2.5 last:border-0" key={item}>
                  <span className="font-mono text-[0.42rem] text-accent-primary">{String(index + 9).padStart(2, "0")}:00</span>
                  <span className="font-mono text-[0.43rem] text-muted">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3 hidden overflow-hidden rounded-lg border border-line/70 bg-panel sm:block">
          <div className="grid grid-cols-[1fr_0.7fr_0.55fr] border-b border-line/60 px-3 py-2 font-mono text-[0.4rem] uppercase tracking-[0.08em] text-muted">
            <span>Course</span><span>Instructor</span><span>Status</span>
          </div>
          {[["Modern interfaces", "A. Sharma"], ["API fundamentals", "R. Patel"]].map(([course, instructor]) => (
            <div className="grid grid-cols-[1fr_0.7fr_0.55fr] px-3 py-2 font-mono text-[0.42rem] text-foreground" key={course}>
              <span>{course}</span><span className="text-muted">{instructor}</span><span className="text-accent-secondary">Active</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnalyticsMockup() {
  return (
    <div className="flex h-full min-h-[15rem] flex-col rounded-lg border border-line/80 bg-background p-3 min-[360px]:min-h-[17rem] min-[360px]:p-4 sm:min-h-[20rem] sm:rounded-xl sm:p-5">
      <div className="flex items-center justify-between border-b border-line/60 pb-4">
        <div>
          <p className="font-mono text-[0.45rem] uppercase tracking-[0.14em] text-muted">Analytics / Overview</p>
          <p className="mt-1 font-display text-sm font-semibold text-foreground">Performance signals</p>
        </div>
        <div className="flex gap-1.5"><span className="size-1.5 rounded-full bg-accent-secondary" /><span className="size-1.5 rounded-full bg-line" /></div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-1.5 min-[360px]:gap-2">
        {["Views", "Sessions", "Actions"].map((label, index) => (
          <div className="rounded-md border border-line/60 bg-panel px-2 py-2 min-[360px]:px-3 min-[360px]:py-2.5" key={label}>
            <p className="font-mono text-[0.42rem] uppercase text-muted">{label}</p>
            <p className="mt-1 font-display text-base font-semibold text-foreground">{["8.4K", "3.2K", "846"][index]}</p>
          </div>
        ))}
      </div>
      <div className="relative mt-4 flex flex-1 items-end overflow-hidden rounded-lg border border-line/60 bg-panel px-3 pb-3 pt-8">
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 400 130">
          <path d="M0 105 C45 88 64 98 105 70 S177 82 215 43 S288 68 328 29 S372 28 400 13" fill="none" stroke="var(--color-primary)" strokeWidth="2" />
          <path d="M0 105 C45 88 64 98 105 70 S177 82 215 43 S288 68 328 29 S372 28 400 13 L400 130 L0 130 Z" fill="url(#analytics-fill)" />
          <defs><linearGradient id="analytics-fill" x1="0" x2="0" y1="0" y2="1"><stop stopColor="var(--color-primary)" stopOpacity=".22" /><stop offset="1" stopColor="var(--color-primary)" stopOpacity="0" /></linearGradient></defs>
        </svg>
        <div className="relative flex w-full justify-between font-mono text-[0.4rem] text-muted"><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span></div>
      </div>
    </div>
  );
}

function SchedulingMockup() {
  const days = Array.from({ length: 21 }, (_, index) => index + 1);
  return (
    <div className="h-full min-h-[18rem] rounded-lg border border-line/80 bg-background p-3 min-[360px]:min-h-[20rem] min-[360px]:p-4 sm:min-h-[22rem] sm:rounded-xl">
      <div className="flex items-center justify-between">
        <div><p className="font-mono text-[0.43rem] uppercase tracking-[0.12em] text-muted">October / 2026</p><p className="mt-1 font-display text-sm font-semibold text-foreground">Choose a time</p></div>
        <div className="flex gap-1"><span className="grid size-6 place-items-center rounded-md border border-line text-[0.55rem] text-muted">‹</span><span className="grid size-6 place-items-center rounded-md border border-line text-[0.55rem] text-muted">›</span></div>
      </div>
      <div className="mt-5 grid grid-cols-7 gap-1 text-center font-mono text-[0.38rem] text-muted">
        {"MTWTFSS".split("").map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}
        {days.map((day) => <span className={`grid aspect-square place-items-center rounded-md ${day === 16 ? "bg-accent-primary text-white" : day === 11 || day === 18 ? "text-muted/30" : "text-foreground"}`} key={day}>{day}</span>)}
      </div>
      <div className="mt-5 border-t border-line/60 pt-4">
        <p className="font-mono text-[0.42rem] uppercase tracking-[0.1em] text-muted">Available times</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {["09:30", "11:00", "14:30"].map((time, index) => <span className={`rounded-md border px-2 py-2 text-center font-mono text-[0.47rem] ${index === 1 ? "border-accent-secondary/60 bg-accent-secondary/10 text-accent-secondary" : "border-line text-muted"}`} key={time}>{time}</span>)}
        </div>
      </div>
    </div>
  );
}

function LabMockup() {
  return (
    <div className="grid h-full min-h-[15rem] grid-cols-[1fr_0.8fr] gap-2 rounded-lg border border-line/80 bg-background p-3 min-[360px]:min-h-[17rem] min-[360px]:gap-3 min-[360px]:p-4 sm:min-h-[20rem] sm:rounded-xl sm:p-5">
      <div className="flex flex-col gap-3">
        <div className="flex flex-1 flex-col justify-between rounded-lg border border-line/60 bg-panel p-4">
          <div className="flex items-center justify-between"><span className="font-mono text-[0.44rem] uppercase tracking-[0.12em] text-muted">Button / states</span><span className="size-1.5 rounded-full bg-accent-secondary" /></div>
          <div className="space-y-2"><div className="h-7 w-24 rounded-full bg-accent-primary" /><div className="h-7 w-24 rounded-full border border-line bg-panel-elevated" /></div>
        </div>
        <div className="rounded-lg border border-line/60 bg-panel p-3">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-line"><div className="h-full w-2/3 rounded-full bg-accent-secondary" /></div>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-lg border border-line/60 bg-panel p-4">
        <p className="font-mono text-[0.44rem] uppercase tracking-[0.12em] text-muted">Motion / path</p>
        <div className="absolute inset-x-4 bottom-5 top-14 rounded-lg border border-dashed border-line">
          <span className="absolute left-[12%] top-[18%] size-3 rounded-full bg-accent-highlight shadow-[0_0_18px_var(--color-highlight)]" />
          <span className="absolute bottom-[18%] right-[16%] size-2 rounded-full bg-accent-primary" />
          <svg className="h-full w-full" viewBox="0 0 100 100"><path d="M18 25 C55 5 35 85 82 72" fill="none" stroke="var(--color-border)" strokeDasharray="4 5" /></svg>
        </div>
      </div>
    </div>
  );
}

export function ProjectMockup({ kind }: ProjectMockupProps) {
  if (kind === "education") return <EducationMockup />;
  if (kind === "analytics") return <AnalyticsMockup />;
  if (kind === "scheduling") return <SchedulingMockup />;
  return <LabMockup />;
}
