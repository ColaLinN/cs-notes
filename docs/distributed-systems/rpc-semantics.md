---
title: RPC Semantics
tags:
  - distributed system
  - system
sidebar_position: 2
---



## RPC(Remote Procedure Call) Semantics

Purpose: We need to define the message protocol which hides the complexity of the communicates

Three Semantics

1. At-least-once
   1. It is useful when the operation is Idempotent
2. At-most-once
   1. When should we discard the old RPC?
      1. Three Choices:
         1. Option1: Never
         2. Option2: 
         3. Option3: Only allow one outstanding request at a time, server discards the `request with SeqNum <= CurSeq+1`
3. Exactly-once
   1. Real-world case: launch a missile, need to ensure the command is sent exactly once so that the boom will not be triggered twice
   1. it's not possible because the server can crash, either
      1. the server crashed before the execution arrived
      2. the server crashes after the execution arrives

