# Field Issue AI Memory Demo

This demo supports the talk **AI Memory for Engineering Teams**.

A semiconductor tool reports an intermittent wafer-alignment failure. Raw logs cannot leave the fab, so a local model produces a sanitized debug packet. Remote engineering turns that packet into an isolated case workspace for an assigned engineer.

The case—not a global memory file—holds the investigation, actions, evidence, agent context, and resolution. Only verified, human-reviewed learning is later promoted into shared component knowledge.

Core loop:

1. Capture raw evidence onsite.
2. Process it into a sanitized debug packet.
3. Create an issue-specific engineering case.
4. Investigate, fix, and verify.
5. Propose reusable learning for human-reviewed promotion.

Key lines:

> Raw logs stay in the fab. Debug memory travels to engineering.

> Every issue creates a case. Only verified learning becomes shared memory.

Reset before each rehearsal:

```bash
./scripts/reset-demo.sh
```

