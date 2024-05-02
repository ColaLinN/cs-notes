---
slug: overview
title: Why Distributed Systems?
# id: the-overview-of-distributed-systems
# hide_title: false
hide_table_of_contents: false
# sidebar_label: Markdown :)
# custom_edit_url: https://github.com/facebook/docusaurus/edit/master/docs/api-doc-markdown.md
description: Distributed systems are a collection of independent computers that appear to the users of the system as a single computer.
tags:
  - distributed system
  - system
# image: https://i.imgur.com/mErPwqL.png
sidebar_position: 1
---

##  Why Distributed Systems?

Dsitributed System has been used broadly in real life. For example, Google, Amazon, Tiktok, etc. 

**The Challenges/Ability of Distributed System**

1. Failure Tolerance
2. Managing Distributed State
3. Scalability
4. Architecture and Design

## Thought Experiement: Two General Problem

1. It is impossible to reach a final agreement.

2. But we can solve it by bypassing some assumptions and allow trade-offs.

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
         3. Option3: Only allow one outstanding request at a time, server discards the request <= Seq+1
3. Exactly-once
   1. Real-world case: launch a missile, need to ensure the command is sent exactly once so that the boom will not be triggered twice
   1. it's not possible because the server can crash, either
      1. the server crashed before the execution arrived
      2. the server crashes after the execution arrives





