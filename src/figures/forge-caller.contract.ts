/**
 * Wave P latch — forge-caller
 * Repo: ai-agent-taskforce
 * Role: squad latch. A sortie may start only when every seat has a
 * figure id that is not a banned boardroom token.
 * Knowledge required: taskforce already owns sortie-caller (Wave G).
 * This figure does not reuse planner / executor / monitor / data_agent.
 * Primary path: src/figures/forge-caller.contract.ts
 */
export const WAVE_ID = "P-latch-20261001" as const;
export const FIGURE_ID = "forge-caller" as const;
export const ROLE = "squad-latch" as const;

export const BANNED_SEATS = [
  "planner",
  "executor",
  "monitor",
  "data_agent",
  "planner-alpha",
  "executor-beta",
] as const;

export interface SquadSeat {
  figureId: string;
  duty: string;
}

export interface SquadLatch {
  waveId: typeof WAVE_ID;
  figureId: typeof FIGURE_ID;
  seats: SquadSeat[];
  ready: boolean;
}

export function latchSquad(seats: SquadSeat[]): SquadLatch {
  if (seats.length < 1 || seats.length > 5) {
    throw new Error("forge-caller accepts 1 to 5 seats");
  }
  for (const seat of seats) {
    const id = seat.figureId.trim().toLowerCase();
    if (!id || !seat.duty.trim()) {
      throw new Error("each seat needs figureId and duty");
    }
    if ((BANNED_SEATS as readonly string[]).includes(id)) {
      throw new Error(`banned boardroom token: ${seat.figureId}`);
    }
  }
  return {
    waveId: WAVE_ID,
    figureId: FIGURE_ID,
    seats,
    ready: true,
  };
}

/** Measurable self-check. Expected: ready=true, bannedThrows=true. */
export function selfCheck(): { ready: boolean; bannedThrows: boolean } {
  const squad = latchSquad([
    { figureId: "forge-caller", duty: "call the latch" },
    { figureId: "quill-latch", duty: "hold revisions" },
    { figureId: "flux-warden", duty: "gate routes" },
  ]);
  let bannedThrows = false;
  try {
    latchSquad([{ figureId: "planner", duty: "nope" }]);
  } catch {
    bannedThrows = true;
  }
  return { ready: squad.ready && squad.seats.length === 3, bannedThrows };
}
