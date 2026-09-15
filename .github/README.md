# GitHub Copilot Configuration

This directory contains configuration files for GitHub Copilot to provide better assistance when working on the AI Task Force Pro project.

## Structure

```
.github/
├── copilot-instructions.md          # Main repository-wide instructions
├── agents/                           # Specialized agent definitions
│   ├── react-component-agent.md      # React/TypeScript component development
│   ├── testing-agent.md              # Testing and quality assurance
│   ├── documentation-agent.md        # Documentation writing
│   ├── Chaos-Gremlin.md              # Existing sarcastic sidekick (do not clone)
│   ├── my-agent.agent.md             # Cipher / vault specialist (do not clone)
│   ├── density-warden.md             # Prestige density scoring
│   ├── merge-surgeon.md              # Branch / PR shipping
│   ├── drop-caller.md                # fortnite-guide-builder field ops
│   ├── dubline-producer.md           # aura-music-interface signal
│   ├── bounty-scout.md               # scoped hunt only
│   ├── concordance-cartographer.md   # chromatic-concordance-ui map
│   └── boardroom-chair.md            # orchestrator seating chart
└── instructions/                     # Path-specific instructions
    ├── api-routes.instructions.md    # API routes best practices
    └── typescript.instructions.md    # TypeScript coding guidelines
```

## Agents Directory

Wave 2026-09-15 added seven action figures that bind to other DubjamMusic repos. They do not replace Cipher, Chaos Gremlin, documentation, React, or testing agents. Roster source of truth: docs/action-figures/ACTION_FIGURES.md and docs/action-figures/roster.json.

## Invoking new figures

```
@copilot Use Density Warden to score this run
```

```
@copilot Use Merge Surgeon to open a PR instead of committing to main
```

## Best Practices

Adding a new action figure: never copy an old persona file and rename it. Bind the figure to a different repo surface and a different pass test.
