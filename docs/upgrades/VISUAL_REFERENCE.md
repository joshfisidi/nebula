# Nebula Visual Reference (Operator-provided)

These references are inspiration anchors, not hard constraints.

## Source images
- `docs/upgrades/reference-images/graph-clusters-01.png`
- `docs/upgrades/reference-images/neon-knowledge-02.png`
- `docs/upgrades/reference-images/hierarchy-map-03.png`
- `docs/upgrades/reference-images/cosmic-clusters-04.png`

## Extracted design direction
1. **Cluster readability first**
   - clear hubs and spokes
   - local neighborhoods understandable at a glance
2. **Cinematic visual depth**
   - glow/bloom layers used intentionally for emphasis
   - contrast between background and semantic highlights
3. **Semantic visual language**
   - color, size, and edge thickness encode meaning (importance, type, confidence, activity)
4. **Multi-scale legibility**
   - clean high-level overview at zoomed-out levels
   - rich labels/details progressively revealed as users zoom in
5. **Aesthetic ambition**
   - aim for best-in-class visual quality while preserving production performance budgets

## Non-negotiables
- Performance and interaction stability cannot be sacrificed for style.
- Every visual feature must be measurable (fps, draw calls, interaction latency).
- New visual upgrades should include rollback-safe flags and validation evidence.