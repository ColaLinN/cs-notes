---
title: Logical Time
tags:
  - distributed system
  - system
sidebar_position: 3
---

## Time, Clock, and Ordering of Event

```
1. The accuracy of the physical clock 

2. How to sync the time? 

   1. Physical Lock
      1. Beacon-based approach
         1. The master periodically broadcasts the time to clients
         2. Problem: the unstable latency in sending synchronize

      2. Interrogation-based protocols
         1. The clients repeately quries the server, the delay is RTT(Round Traced Time)
         2. Problem: 
            1. NTP, PTP

3. How to order events without the physical clock?

   1. **Happens-before in distributed systems**

      1. Sample:

         1. for example, cooking before eating
         2. Transitivity: cooking before sleep

      2. Hapens before relationship

         1. Captures logical (causal) dependencies between events
         2. (Irreflexive) partial ordering: →
            1. `a -> b, then b -\->a`
            2. `a -> b, b -> c then a -> c`

      3. Concept

         1. Processes
         2. Messages
         3. Events: what's the event? send msg, recv msg, **event happens**

      4. Rules

         1. Within a process, a comes before b then a → b

            **if a = send(M), and b = recv(M), then a → b**

            transitivity: if a → b and b → c then a → c

         2. a → b means “b could have been influenced by a”

         3. a → b and b → a: events are **concurrent**

            1. what does concurrent means?
               1. no one can tell whether a or b happened first!

   2. **Logical Clock(Lamport Clock)**

      1. Goal: if a < b, then C(a) < C(b)

      2. Conditions:

         1. in a process i, a comes before b, that means Ci(a) < Ci(b)
         2. if i sends a, and j receives b, Ci(a) < Ci(b)

      3. Implementation

         1. Keep a local clock T
         2. Increment T whenever an event happens
         3. Send Clock value Tm(Time of Message) on all message
         4. On the mesage reciept: Max(T, Tm) + 1
            1. the receiving message's T will reset the current machine's T
         5. 事件发生、发送消息、收到消息时都要赋值当前T为Max(T, Trecv) + 1

      4. Use the logical clock to form a total ordering: 

         1. if C(a) < C(b), so a => b
         2. what if C(a)==C(b)
            1. the tie breaker: processID
         3. **If a ->b, doesn't mean a => b. because the T on different processes is different** (wrong!!!)
            1. 错误理解意思了
               1. 为什么 a -> b不意味着a=>b？
               2. 因为a可能在
               3. a => b意味着 a->b嘛？
            2. 正确解答：
               1. a->b means a=>b
               2. but a=>b, i.e. C(a)<C(b) doesn't mean a->b!!!!!

      5. Mutual Exclusion (相互排斥)

         1. it's not a trivial problem

         2. Implementation

            1. To acquire the lock:

               • Send *request* to everyone, including self

            2. three request types:

               1. request (broadcast)
               2. release  (broadcast)
               3. Acknowledge (on receipt)

            3. Each Node:

               1. Holds the request queue
               2. Records the latest timestamp received from other Nodes

      6. TCP ensures the msg received is the newest and latest in the msg tunnel between a and b

      7. Problem: 

         1. Lamport Logical Clock has issue
            1. When a -> b, then C(a) < C(b)
            2. But on converse, if C(a) < C(b), it doesn't mean a -> b, they could also be concurrent in different processes

   3. **Vector Clock**

      1. One where the converse is true 

         • If *C(a) < C(b)*, then *a → b*

         Note that there must still be concurrent events

         • sometimes neither *C(a) < C(b)* or *C(b) < C(a)*

      2. Rules

         1. Clock is a vector, the length is #(the number of) Nodes
         2. On node *i*, increment *C[i]* on each event  所以说发送消息和event是两种事情
            1. node 0 (3, 5, 2); after event: (4, 5, 2)
         3. On receipt of message with clock Cm on node i:
            1. Increment C[i]
            2. for each j != i
               1. C[j] = max(C[j], Cm[j])
               2. node 0 (4, 5, 2) receives message (2, 7, 0): (5, 7, 2)

      3. ~~Vector Clock doesn't increase itself clock based on the clock sent from others~~

      4. Compare vectors element by element

         1. concurrent
            1. for two vectors x and y, if Cx[i] < Cy[i], and Cx[j] > Cy[j] for some i and j
         2. Happens before
            1. if Cx[i] <= Cy[i] for all i, and there exsits j such that Cx[j] < Cy[j]
               1. that means Cx happens before Cy






```

