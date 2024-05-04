---
title: Distributed State and Consistency
tags:
  - distributed system
  - system
sidebar_position: 4
---

## Distributed State

Distributed State:

1. Information retained in one place that describes something, or is determined by something, somewhere else in the system.

2. Benefits from distributed state
   1. performance
   2. reliability
   3. coherence

New problem occurs while introducing distributed state



## Consistency

- Serializability
  - The legal history sequence
  - Respect local event order
- Linearizability
  - The legal history sequence
  - Respect local event order in real time

> Serializability in database is smilar to the linearizability. It emphasis that the execution result of txns are like running them serializably, i.e. one by one, even if they are actually executed concurrently.

