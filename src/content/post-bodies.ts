// Blog post bodies, keyed by slug. Lightweight markdown: paragraphs separated by
// blank lines, "## " headings, "- " bullets, "> " quotes, **bold**, `code`,
// and [links](https://...). Rendered by src/components/blog/post-body.tsx.

export const postBodies: Record<string, string> = {
  "hardening-ml-delivery": `
April was a wild month. GPT-4.1 landed, then o3 and o4-mini a couple of days later, and Meta dropped Llama 4 right at the start of the month. I spent a good chunk of it doing what I suspect a lot of you did: re-running the same prompts against new models and squinting at the outputs.

And that's when it hit me. The question I kept getting from teammates wasn't "which model is best?" It was "how scary would it be to switch?" If the honest answer is "very," the model isn't the problem. The delivery pipeline is.

## Notebooks are where ideas are born, not where they should live

I love notebooks. Most of my best experiments started in one. But I've also inherited more than one "production system" that was really a notebook someone scheduled with cron and then left the company.

The pattern I push for now is simple: keep a **lab** space where people can move fast and break things, and a **production** repo where anything that touches users goes through a PR, tests, and review. You promote work from one to the other on purpose. Nobody should be scared to experiment, and nobody should be surprised by what's running in prod.

## Make the model a config value

This one sounds obvious but it rarely is. If changing models means editing code in six places, you'll never do it. I like having the model, its parameters, and the prompt version all live in config, with one code path that reads them.

Then a model swap becomes a one-line diff that goes through the same checks as everything else. That's exactly where you want it.

## Tests that catch the boring failures

You don't need a research-grade eval suite on day one. Start with the stuff that actually breaks:

- **Data contracts.** Did an upstream column change type or go null? Fail loudly before the model ever sees it.
- **Feature and schema compatibility.** If the input shape changes, catch it in CI, not in a user complaint.
- **A small golden set.** Even 30 to 50 hand-checked examples will catch a surprising number of regressions when you swap models.

## Trace everything

When something goes wrong, you want to see the whole story: the request, what data was pulled, which model answered, and what it said. Request to retrieval to model output, all in one trace. Without that you're guessing, and guessing at 11pm before a demo is not fun. Trust me on that one.

## The goal is boring

None of this is glamorous. That's sort of the point. Model releases are going to keep coming every few weeks, and I'd much rather spend that time asking "is the new one better for us?" than "will the new one break everything?"

If your team can swap a model on a Tuesday afternoon without a war room, you're in good shape.
`,

  "mcp-tool-integrations": `
For about a year, every time I wanted an LLM to talk to one of our internal systems, I wrote a custom integration. A wrapper here, some JSON schema there, a slightly different version of the same thing for each framework. It worked, but it never felt like the right shape.

Then in late March, OpenAI announced they were adopting the Model Context Protocol, the open standard Anthropic put out late last year. Google followed with its own Agent2Agent protocol in April, and with Claude 4 coming out last month, it really feels like the ground has shifted. MCP stopped being "that Anthropic thing" and started looking like plumbing everyone agrees on.

## What MCP actually gets right

The simplest way I explain it to people: MCP is a standard way for an AI app to discover and call tools, read resources, and use prompt templates from a server. You write the server once, and any client that speaks MCP can use it.

What I like about it in practice:

- **Write once, use anywhere.** One MCP server for our document store works in my editor, in a desktop assistant, and in our own agent code.
- **Clear boundaries.** The server owns the auth and the business logic. The model just sees well-described tools. That separation makes security reviews a lot easier.
- **Discovery is built in.** Clients ask the server what it can do. No more hardcoding tool lists in three places.

## Where it still hurts

It's not all sunshine. A few things I've bumped into:

- **Auth is still maturing.** Remote servers with proper OAuth are getting better, but it's early. Expect some rough edges.
- **Tool overload.** It's tempting to connect ten servers with fifty tools each. Don't. Models get noticeably worse at picking the right tool when you flood them with options.
- **Trust.** An MCP server is code that your agent will happily call. Treat third-party servers like any other dependency: read them, pin them, and be careful about what data they can reach.

## How I'm using it now

My rule is: if a tool is going to be used by more than one app, it becomes an MCP server. If it's a one-off for a single agent, I keep it as a plain function. That's kept things simple.

The bigger shift is mental. I've stopped thinking of "the agent" as one big program and started thinking of it as a model plus a set of capabilities it can plug into. That framing has made our designs a lot cleaner.

If you've been holding off because it felt like a fad, I think the window for that excuse has closed. Pick one internal system, wrap it, and see how it feels.
`,

  "rag-guardrails": `
Every time a model ships with a bigger context window, someone declares RAG dead. Gemini 2.5 Pro went GA last month with a million tokens of context, and sure enough, the hot takes showed up right on schedule.

I get the appeal. Why build retrieval when you can just paste everything in? But after a couple of years building assistants on top of real enterprise data, I can tell you RAG isn't going anywhere. What's changing is that the hard part was never the retrieval trick. It's the guardrails around it.

## Long context doesn't replace retrieval

A few reasons I still retrieve, even with huge windows:

- **Cost and latency.** Stuffing a million tokens into every request is slow and expensive. Most questions need a few pages, not the whole library.
- **Access control.** In an enterprise, not everyone can see every document. Retrieval is where you enforce that. You can't "un-paste" a confidential file from a prompt.
- **Freshness.** Data changes. An index you can update is a lot easier to manage than rebuilding giant prompts.

Long context is great as a complement, though. I'll happily retrieve generously and let the model read more around each hit.

## Measure retrieval on its own

The biggest mistake I see is only judging the final answer. If the answer is wrong, you have no idea whether retrieval failed or the model did. So I track retrieval separately:

- **Hit rate at top-k.** Did the right document show up in the results at all?
- **MRR.** How high up did it show up?
- **Per query type.** "What's the limit for X?" and "summarize everything about Y" behave very differently. Break your metrics down.

## Chunk the way your experts think

Fixed-size chunks are fine for a demo. In production, I try to mirror how subject matter experts actually think about the content. If a compliance team thinks in terms of permits, conditions, and sites, then the chunks and metadata should follow that structure. The jump in quality from this alone is often bigger than any embedding model upgrade.

## Golden sets and regression tests

I keep a set of real questions with known good answers and run it on every change: new chunking, new embedding model, new prompt, new LLM. If the numbers drop, the change doesn't ship. It's simple and it has saved me more than once.

## Have a plan for when retrieval is weak

This is the guardrail people skip. When the top results have low similarity, or nothing relevant comes back, the model should say so instead of improvising. A clear "I couldn't find this in the documents, here's who to ask" builds far more trust than a confident wrong answer.

RAG in production is honestly pretty unglamorous. But that's where the trust comes from, and trust is the whole game with enterprise users.
`,

  "context-engineering": `
Sometime in late June, "context engineering" started showing up everywhere. Andrej Karpathy and Shopify's Tobi Lütke both pushed the term, and I'll admit my first reaction was an eye roll. Great, another rebrand.

But the more I thought about it, the more I came around. "Prompt engineering" always made it sound like the job was finding magic words. That was never really what the work was. The work is deciding what goes into the model's context window, and in what shape. Now it has a better name.

## The context window is a budget

Every token you put in front of the model competes for its attention. System instructions, tool definitions, retrieved documents, conversation history, scratch notes from earlier steps. It all adds up fast, especially for agents that run for many turns.

I've started thinking of it like a budget. For every piece of context, I ask: does the model actually need this to do the next step well? If not, it goes.

## Things that made a real difference for me

- **Fewer, better tools.** Trimming a tool list from 25 to 8 well-described tools improved tool selection more than any prompt tweak I tried.
- **Summarize old turns.** Long conversations drift. Compressing older history into a short running summary keeps the model focused on what matters now.
- **Structured retrieval results.** Instead of dumping raw chunks, I pass the source, the date, and the relevant snippet. The model cites better and hallucinates less.
- **Write things down outside the window.** For longer tasks, having the agent keep notes in a file or a scratchpad and re-read them beats keeping everything in context.

## Bad context looks like a bad model

This is the part that gets people. When an agent goes off the rails, the first instinct is to blame the model or try a bigger one. Nine times out of ten, when I dig into the trace, the model was doing something reasonable with confusing or conflicting context. Two instructions that disagree. A stale document. A tool description that's ambiguous.

Kimi K2 and Grok 4 both came out this month, and I've been testing them too. They're impressive. But honestly, the gains I've gotten from cleaning up context have been bigger than the gains from swapping models.

## Where I'd start

If you've got an agent or assistant in production, pull up a few full traces and just read exactly what the model saw. Not what you think it saw. What it actually saw. I promise you'll find something to cut.
`,

  "gpt-5-and-open-weights": `
August had one of those weeks where you can barely keep up. OpenAI released gpt-oss, its first open-weight models in years, on the 5th. Anthropic shipped Claude Opus 4.1 the same day. Then GPT-5 arrived two days later.

Most of the attention went to GPT-5, which makes sense. But for a lot of the teams I work with, gpt-oss was the bigger news.

## Why open weights matter so much here

In Saudi Arabia, and in a lot of regulated industries everywhere, data residency is a real constraint, not a checkbox. Some data simply can't leave certain environments. For those workloads, the conversation used to end quickly: "We'd love to use a frontier model, but we can't send this data out."

Strong open-weight models change that. You can run them in your own environment, on your own hardware or your own cloud region, and keep the data where it needs to be. They're not frontier-level at everything, but for a lot of real tasks like classification, extraction, and answering questions over internal documents, they're more than good enough.

## So, build or host?

Here's roughly how I'm thinking about it now:

- **Sensitive data, well-defined task:** a self-hosted open-weight model is a serious option. Validate it with your own evals first.
- **Hard reasoning, low sensitivity:** use the best hosted model you can. GPT-5 and Opus 4.1 are genuinely better at the hard stuff.
- **Mixed workloads:** route. Keep the sensitive steps in-house and send the rest out. More on routing another time.

The thing I'd warn against is picking a side on principle. "We only use open models" and "we only use API models" are both ways of skipping the actual analysis.

## Hosting isn't free

Self-hosting sounds cheaper until you price it out properly. GPUs, autoscaling, monitoring, security patching, and someone on call when it falls over at 2am. For low or bursty volume, a hosted API often wins on total cost even when the per-token price looks higher.

## A word on routers

GPT-5's built-in router, which decides how much thinking to do for each request, is interesting too. It also means the same prompt might get handled differently from one day to the next. If you rely on consistent behavior, pin your settings and keep your evals running. Assume nothing stays still.

Honestly, this was the most exciting month in a while. Having real choice between hosted and self-hosted is a big deal for the kinds of projects I care about.
`,

  "agents-that-finish-the-job": `
Claude Sonnet 4.5 dropped a couple of days ago, along with the Claude Agent SDK, and the headline that caught my eye was the model working on its own for 30+ hours on a single task. A couple of weeks earlier, OpenAI shipped GPT-5-Codex, which is also built for long agentic coding sessions.

Whatever you think of the exact numbers, the direction is clear: models can now stay on task for a really long time. Which means the bottleneck has moved. It's not "can the model do this step?" anymore. It's "can my harness keep it on track for 200 steps?"

## The loop is simple. The details aren't.

At its core, an agent is just a loop: look at the context, pick an action, call a tool, look at the result, repeat. You can write that in 50 lines. The hard part is everything around the loop.

Here's what I've learned matters most.

## Give it a way to check its own work

The single biggest improvement in my agents came from adding verification. If it's writing code, it runs the tests. If it's filling in a report, it checks the totals add up. If it's booking something, it reads back what was actually saved.

Agents that can check their own work catch their own mistakes. Agents that can't will confidently tell you they're done when they aren't.

## Write the plan down

For anything beyond a few steps, I have the agent write a short plan first and keep it in a file it can update. When it gets lost, and on long tasks it will, it can go back and re-read where it was. That works way better than hoping it remembers everything from 80 turns ago.

## Know when to stop

Two failure modes I see constantly:

- **Stopping too early.** The agent does 70% and declares victory. Clear success criteria and a verification step fix most of this.
- **Never stopping.** The agent loops on the same failing approach forever. Put a cap on retries, and when it hits the cap, have it stop and explain what it tried.

## Make failure recoverable

Long-running agents will hit errors: timeouts, rate limits, a tool that returns garbage. Design for it. Save progress as you go, make actions safe to retry where you can, and make sure a crash at step 150 doesn't mean starting over from step 1.

## Humans at the right moments

Fully autonomous is great for low-risk stuff. For anything irreversible, like sending emails, spending money, or deleting data, I still want a human to approve it. The trick is putting those checkpoints in the right places so you're not approving every tiny action.

It's a genuinely exciting time to be building these things. The models finally have the stamina. Now it's on us to build harnesses that deserve it.
`,

  "agent-builders-skills-agentkit": `
October felt like every AI company decided at once that it was time to own the agent platform. OpenAI's DevDay brought AgentKit, with a visual Agent Builder, plus the Apps SDK for building apps inside ChatGPT. A week or so later Anthropic launched Agent Skills, along with Claude Haiku 4.5. And that's before counting all the smaller launches in between.

I spent a good part of the month trying things out. Here's where I landed.

## Visual builders: great for some things

I went in skeptical about drag-and-drop agent builders, and I came out... a little less skeptical. They're genuinely good for:

- **Prototyping fast.** Getting a flow in front of a stakeholder in an afternoon is valuable.
- **Simple, linear workflows.** Classify, look something up, respond. A canvas works fine for that.
- **Non-developers.** Letting an ops team tweak a flow themselves without filing a ticket is a real win.

Where they fall down for me is anything with real complexity. Branching logic, error handling, versioning, code review, testing. All the stuff that keeps production systems healthy is just easier in code. I've been burned before by "low-code" systems that turned into giant, untestable flowcharts nobody wanted to touch.

## Skills are the one that stuck

Agent Skills surprised me the most. The idea is simple: a folder with instructions, and optionally scripts and resources, that the model only loads when it's relevant. It's basically packaged know-how.

Why I like it:

- **It's good context engineering.** The model sees a short description of each skill and only pulls in the full details when it needs them. That keeps the context window lean.
- **It's just files.** I can version them in git, review them in a PR, and share them across a team.
- **It captures the stuff that's hard to prompt.** Our house style for reports, the exact steps for a deployment, how we format a compliance summary. Things that used to live in someone's head.

## Haiku 4.5 is quietly a big deal

Smaller, cheaper, fast models getting this good matters more than people think. A lot of agent steps don't need the biggest model. I've started using small models for the routine steps and saving the heavy hitters for planning and the hard calls.

## Where I've landed

My setup right now: code for the agent loop and anything that needs testing, Skills for packaging domain knowledge, MCP for connecting tools, and visual builders for quick prototypes that may or may not graduate to code.

The platform race is going to keep heating up. My advice is to keep your core logic portable so you're not locked in when the next big launch comes along. Because there will be a next one, probably next month.
`,

  "picking-a-model-in-a-crowded-month": `
November was ridiculous. GPT-5.1 on the 12th. Gemini 3 on the 18th. Claude Opus 4.5 on the 24th. Three frontier releases in under two weeks, each one topping some leaderboard, each with a launch thread full of charts.

I got the same question from three different people that month: "So which one should we use?" My honest answer was "I don't know yet, let's find out." That's not a dodge. It's the only answer that holds up.

## Benchmarks aren't your workload

Public benchmarks are useful for a rough sense of capability. But your users aren't solving competition math or a standard coding benchmark. They're asking questions about your documents, in your domain, in your language, with your edge cases.

I've seen a model that's clearly "worse" on the leaderboards beat the leader on a specific task by a wide margin. Happens all the time.

## Build a small eval set you trust

You don't need thousands of examples. Here's what I do:

- **Collect 50 to 100 real examples.** Pull them from logs or from users, and include the weird ones.
- **Write down what "good" looks like.** For some tasks it's an exact answer. For others, it's a checklist: did it cite the source, did it stay in scope, did it get the number right.
- **Include the failures you care about.** If hallucinating a policy would be a disaster, make sure your set tests for it.
- **Grade with a mix.** Code checks where you can, an LLM judge with a clear rubric where you can't, and a human spot check on a sample.

## Look beyond accuracy

Once you've got scores, look at the stuff that actually decides whether a model works in production:

- **Cost per task**, not per token. A cheaper model that needs three retries isn't cheaper.
- **Latency.** Especially for anything user-facing.
- **Consistency.** Run the same eval a few times. Some models vary more than you'd expect.
- **Tool use.** For agents, how reliably it calls the right tool with the right arguments matters more than raw knowledge.

## What I actually found

Without turning this into a leaderboard of my own: the three models had different strengths across my tasks, and the "best" one changed depending on what I was measuring. That's exactly why I'd never pick based on launch-day hype.

## Make switching cheap

This ties back to something I wrote about in May. If your eval set runs with one command and your model is a config value, a month like November is fun instead of stressful. You run the evals, look at the numbers, and decide. Done.

If you take one thing from this post, let it be this: spend a day building your own eval set. It'll pay for itself the next time three models drop in the same week. And at this rate, that'll be soon.
`,

  "2025-the-year-agents-got-real": `
Happy new year! I wanted to take a minute to look back at 2025, because honestly it moved faster than any year I can remember in this field. At the start of the year, "agents" mostly meant cool demos that fell apart after five steps. By the end, I was using them every day for real work.

## What stood out to me

**MCP won.** It went from one company's proposal to something every major player supports. In December it was even donated to a new foundation under the Linux Foundation, which is about as clear a signal as you get that it's here to stay. I wrote about why I switched back in June, and I'm glad I did it early.

**Coding agents went mainstream.** Claude Code, Codex, Jules, Cursor's agent mode, and plenty more. I went from being skeptical to using a coding agent for a large part of my day. I'll write a proper reflection on that at some point, because my workflow changed a lot.

**Models got stamina.** Early in the year, keeping an agent on track for 20 steps was hard. By the fall, models were running for hours. That changed what's worth automating.

**Open weights got serious.** Between gpt-oss, the Qwen and DeepSeek releases, and Kimi K2, self-hosting stopped being a big compromise for a lot of tasks. For regulated environments like many I work in, that's huge.

**"Context engineering" got a name.** Small thing, but it gave people a better way to talk about the actual work.

## What I got wrong

I thought visual agent builders would take over more than they did. They found a niche, but most serious agent work I saw stayed in code. I also underestimated how quickly smaller models would get good. By the end of the year, I was routing a lot of work to small, cheap models that would have seemed impossible in January.

## What I'm watching in 2026

A few predictions, which I fully expect to look silly by December:

- **Evals become a normal part of CI.** Not a research thing, a build step. Teams that ship AI without them will have a rough year.
- **Agent security becomes the main conversation.** As agents get more access to real systems, prompt injection stops being theoretical. I think we'll see some painful public incidents.
- **Arabic and other non-English models get much better.** There's a lot of investment in the region, and I'm excited to see where it goes.
- **Voice agents get good enough for real customer service.** Not just demos, actual phone lines.
- **Costs keep dropping, so the question becomes "what's worth automating?"** rather than "can we afford it?"

## A personal note

This blog started as a place to keep my own notes, and it's been really nice hearing from people who found the posts useful. Thanks for reading. If there's a topic you'd like me to dig into this year, reach out. I read everything.

Here's to 2026. Let's build some agents that actually deserve the hype.
`,

  "building-bilingual-assistants": `
A lot of the AI work I do is for Arabic-speaking users, and I want to talk about something that comes up on almost every project: building an assistant that works properly in Arabic is not the same as building an English one and translating it.

It sounds obvious when you say it out loud. But I've lost count of how many times I've seen the "translate in, translate out" approach, and it almost always shows.

## Arabic isn't one language in practice

Modern Standard Arabic is what you see in formal writing and the news. But people don't text like that. On WhatsApp, in chat, in voice notes, people write in their dialect: Gulf, Egyptian, Levantine, Maghrebi, and they all differ quite a bit.

So the first question on any project is: who are the users and how do they actually write? An assistant that only handles formal Arabic will feel stiff and miss a lot of real messages. If your users are in Riyadh or Dammam, it needs to get Gulf dialect, including the casual, abbreviated way people type.

## Code-switching is the norm

Lots of people mix Arabic and English in the same sentence, sometimes in the same word. Technical terms, brand names, and dates often stay in English. Some people write Arabic in Latin letters with numbers standing in for sounds ("Arabizi").

Your assistant needs to understand all of that and reply in the right language. My rule of thumb: answer in the language and register the user used. If they write casual Gulf Arabic, don't reply in formal MSA. It feels like talking to a government form.

## The practical gotchas

A few things that bite almost every time:

- **Tokenizer costs.** Arabic text often takes more tokens than the same content in English, depending on the model. That affects cost and context budget, so measure it on your actual data.
- **RTL in the UI.** Mixed Arabic and English text, numbers, and punctuation can render in confusing orders. Test with real mixed content, not just clean Arabic sentences.
- **Normalization.** Different forms of alef, optional diacritics, and Arabic versus Western numerals can break search and matching if you don't normalize.
- **Names and dates.** Hijri and Gregorian dates, and names that can be transliterated five different ways.

## Evaluate in Arabic, with Arabic speakers

This is the big one. Your eval set needs to be in the languages and dialects your users actually use, written or reviewed by native speakers. A model that scores great on English benchmarks can be noticeably weaker in dialect. I've seen it happen.

It's also great to see more investment in Arabic-first models in the region, like ALLaM from Saudi Arabia and Jais from the UAE. They're worth including in your evals, especially for dialect-heavy use cases.

## Respect the culture, not just the language

Tone matters a lot. Greetings, politeness conventions, and religious expressions that people commonly use all affect whether an assistant feels natural or robotic. Getting these right is the difference between something people tolerate and something they actually like using.

Building Arabic-first takes more effort upfront. But it's the difference between an assistant that technically supports Arabic and one that Arabic speakers actually want to talk to.
`,

  "evals-as-ci": `
For a long time, evals in my projects were something we ran occasionally. Usually before a big demo, or after someone complained. They lived in a notebook, and running them was a bit of an event.

Earlier this year I flipped that around, and I wish I'd done it sooner. Evals are now part of CI, just like unit tests. If they don't pass, the change doesn't deploy. No exceptions.

## Why it took me so long

Honestly, I think I was treating evals as a research problem. I wanted the perfect metric, the perfect dataset, the perfect judge. So I didn't build anything, because nothing was perfect.

What finally clicked is that unit tests aren't perfect either. They don't prove your code is correct. They just catch the regressions you know to look for. Evals can do exactly the same job.

## What my setup looks like

Nothing fancy:

- **A versioned eval set in the repo.** Real examples, with expected behavior written down. It grows every time we find a new bug.
- **Different checks for different things.** Exact-match or code checks for structured output and tool calls. An LLM judge with a tight rubric for open-ended answers. A few hard rules, like "never confirms a booking without a time."
- **Thresholds, not vibes.** Each category has a minimum pass rate. Safety-critical ones need 100%.
- **Runs on every PR that touches prompts, models, tools, or retrieval.** The results show up right in the PR.

## Every bug becomes a test

This is the habit that made the biggest difference. When something goes wrong in production, the fix isn't done until there's an eval case that would have caught it. Over time, your eval set turns into a record of every mistake you've learned from, and the same mistake never ships twice.

## Keep it fast and cheap

If evals take an hour and cost a fortune, people will find ways to skip them. I keep a fast core set that runs on every PR in a few minutes, and a bigger set that runs nightly or before releases. Caching responses for unchanged cases helps a lot too.

## Watch out for judge drift

If you use an LLM as a judge, the judge is part of your test setup. Pin its model and prompt, and spot-check it against human grades every so often. A judge that quietly gets more lenient is worse than no judge, because it gives you false confidence.

## The real benefit: speed

The funny thing is, adding this gate made us faster, not slower. When there's a safety net, you can change a prompt or try a new model without that nervous feeling. You make the change, look at the numbers, and ship.

We've had another round of big model releases recently, and the eval suite made deciding whether to upgrade a one-afternoon job instead of a one-week debate. That alone was worth it.

No green, no deploy. It's a simple rule and it's changed how I build.
`,

  "small-models-big-savings": `
Here's a confession: for a while, I sent everything to the biggest model available. It was easier. The answers were good, and at prototype scale, the bill didn't matter.

Then things went to production, the volume went up, and suddenly the bill mattered a lot. That's when I got serious about routing.

## Most requests are easy

When I actually looked at the traffic on one of my assistants, the majority of requests were simple. Greetings, FAQs, "what are your hours," a status check. A big frontier model handles those perfectly. So does a model that costs a fraction as much and answers twice as fast.

The expensive model was earning its keep on maybe one request in five: the ambiguous ones, the multi-step ones, the ones where getting it wrong actually costs something.

## How I route

There are lots of ways to do this. Here's what's worked for me:

- **Route by task, not by guesswork.** In an agent, different steps have different difficulty. Classifying intent or pulling fields out of a message? Small model. Planning a multi-step action or handling a tricky complaint? Big model.
- **Escalate on low confidence.** Let the small model try first, and escalate if it signals uncertainty or fails a validation check.
- **Keep the rules simple.** A routing system so clever nobody understands it is its own problem. I'd rather have three clear rules than a black box.

## Caching is free money

Prompt caching is one of the most underused tricks out there. If your system prompt, tool definitions, and reference documents stay the same between requests, cache them. On long, stable prompts, the savings can be dramatic, and you get lower latency on top.

I also cache full responses for truly repeated questions where the answer doesn't change. Just be careful with anything personal or time-sensitive.

## Measure the right thing

Cost per token is the wrong metric. What you care about is **cost per resolved task**. A cheap model that gets it wrong and needs a retry, or worse, needs a human to step in, can easily cost more than doing it right the first time with a bigger model.

So I track a few numbers together: cost per resolved conversation, resolution rate, and how often things get escalated to a human. If routing lowers cost but resolution drops, that's not a win.

## Don't let savings break quality

Every routing change goes through the eval suite, same as anything else. I run the evals against the routed setup, not just the individual models, because the interactions matter. A small model that's fine on its own can still pass bad context to the next step.

## The result

On the projects where I've done this properly, costs dropped a lot while quality held steady or even got a bit better, mostly because the fast model made the simple stuff feel snappier.

If you're sending everything to your biggest model, pull a week of logs and sort the requests by difficulty. I bet you'll be surprised how much of it is easy.
`,

  "agent-security-prompt-injection": `
Here's something I tell every team building agents: at some point, your agent is going to read text written by someone who wants to mess with it. An email, a web page, a PDF, a support ticket, a calendar invite. If your agent processes outside content, that day is coming.

And there's no prompt you can write that fully fixes it. Prompt injection isn't a bug you patch. It's a property of how these models work. They don't reliably tell the difference between your instructions and instructions hidden in the data.

So instead of trying to make the model un-trickable, I design systems where a tricked model can't do much damage.

## The dangerous combination

Simon Willison described this really clearly last year as the "lethal trifecta." An agent becomes dangerous when it has all three of these:

- **Access to private data**
- **Exposure to untrusted content**
- **A way to send data out** (email, web requests, posting somewhere)

If an agent has all three, a malicious document can tell it to grab something private and send it somewhere. Take away any one of the three, and the risk drops a lot. That's my first design check on every agent now.

## Least privilege, for real

This is old security advice, but it matters even more with agents:

- **Scope tools tightly.** If the agent only needs to read one calendar, don't give it access to the whole workspace.
- **Read-only by default.** Write access is the exception, and it needs a reason.
- **Separate credentials per agent.** Not a shared admin token. If one agent gets tricked, the blast radius should be small.
- **Allowlist destinations.** If the agent can make web requests or send messages, limit where they can go.

## Enforce rules in code, not prompts

"Never send customer data to external addresses" in a system prompt is a suggestion. The same rule enforced in the tool code is an actual rule. If something really must never happen, make it impossible in code. The model can be convinced of anything. Your code can't.

## Humans approve the irreversible stuff

Payments, deleting data, sending messages to customers, changing permissions. Anything that's hard to undo should need a human click, at least until you have a lot of evidence the system behaves. Show the human exactly what's about to happen, not a vague summary.

## Be careful with MCP servers too

Every tool you connect is part of your attack surface. Third-party MCP servers can have tool descriptions that contain instructions, or can change after you installed them. Review them like any other dependency, pin versions, and don't connect things you don't need.

## Test it like an attacker

I keep a small set of injection attempts in my eval suite: hidden instructions in documents, fake "system" messages in emails, requests to reveal the system prompt. It won't catch everything, but it catches regressions and keeps the team thinking about it.

None of this makes agents perfectly safe. But it moves you from "one clever email away from a disaster" to "a tricked agent can only do a small number of harmless things." That's a much better place to be.
`,

  "one-agent-or-many": `
Every few weeks someone shows me an architecture diagram with six agents on it. A planner agent, a researcher agent, a writer agent, a critic agent, a manager agent to coordinate them all, and usually one more for good measure. It looks great on a slide.

And then I ask, "Have you tried just one agent with good tools?" Usually the answer is no.

## Why I default to one agent

A single agent with a solid set of tools and good context has some big advantages:

- **It sees everything.** No information gets lost when passing work from one agent to another.
- **It's easier to debug.** One trace, one loop, one place to look when something goes wrong.
- **It's cheaper.** Multi-agent setups often use several times more tokens, since every agent needs its own context.
- **Fewer moving parts.** Every handoff between agents is another place where things can break.

Most of the time when someone builds multiple agents, what they really needed was better tools or better context for one agent.

## When multiple agents actually help

That said, there are real cases where splitting things up wins. Here are the ones I've seen hold up:

- **Parallel exploration.** If you need to research ten things at once, sending out several sub-agents in parallel and combining their results is fast and works well. Each one gets a clean context for its piece.
- **Protecting the main context.** A sub-agent can dig through a mountain of logs or documents and return just a short summary. The main agent stays focused instead of drowning in detail.
- **Different permissions.** If one part of the task needs access to sensitive systems and another reads untrusted content, separating them into agents with different tool sets is a good security boundary.
- **Truly different jobs.** When the tasks share very little context and need different instructions, splitting them can be cleaner.

## My rule of thumb

Start with one agent. Only split when you can point to a specific problem: the context is getting too big, the work could clearly run in parallel, or you need a security boundary. "It feels more organized" isn't a good enough reason.

When I do split, I keep it to a simple pattern: one main agent that hands off well-defined tasks to sub-agents and gets back short, structured results. I avoid agents chatting freely with each other. That tends to turn into an expensive group chat that goes in circles.

## Be clear about handoffs

If you do go multi-agent, the handoffs are where most bugs live. Be very explicit about what each sub-agent receives and what it must return. Treat it like an API contract: clear inputs, clear outputs, and validation on what comes back.

Multi-agent systems can be powerful. But a single agent with great tools is underrated, and it's almost always where I'd start.
`,

  "voice-agents-arabic": `
I've been playing with voice agents a lot lately, and I think we've crossed a line. A year or two ago, voice AI meant a stitched-together pipeline: speech-to-text, then an LLM, then text-to-speech, with awkward pauses between each step. Talking to it felt like a bad international call.

Realtime speech models changed that. Low latency, natural interruptions, and much more natural-sounding voices. For the first time, I can picture a voice agent handling real customer calls without people hanging up in frustration.

But I work with Arabic-speaking users a lot, so naturally my next question was: does it actually hold up in Arabic?

## Where it's good

The progress is real. For clear, fairly formal Arabic, recognition and responses are solid. Voices sound far more natural than they used to. And for simple, structured calls, like confirming an appointment, checking an order status, or answering common questions, I'd be comfortable putting it in front of customers with the right guardrails.

## Where it gets hard

- **Dialect.** This is the big one. People speak in their dialect on the phone, and Gulf dialect in particular is still weaker than MSA in a lot of models. Recognition errors in voice are worse than in text because you can't see what was misheard.
- **Code-switching.** People switch between Arabic and English mid-sentence all the time, especially for names, numbers, and technical terms. Some models handle this well, others get confused.
- **Names, numbers, and addresses.** These matter most and are the easiest to get wrong. A misheard digit in a phone number or a booking time is a real problem.
- **Latency on top of everything.** Every extra check you add for safety adds delay, and in voice, even a second of silence feels long.

## How I'd approach it

If I were building an Arabic voice agent today, here's what I'd do:

- **Start narrow.** One clear use case, like appointment confirmations, not "handle any call."
- **Read back the important stuff.** Always confirm names, numbers, dates, and times out loud before acting on them. It's slightly slower, but it saves a lot of pain.
- **Make handoff easy.** If the agent is unsure, or the caller is frustrated, route to a human quickly. A smooth handoff is worth more than a clever agent.
- **Test with real callers and real dialects.** Recordings from actual users, with background noise, different accents, and people talking fast. Clean studio audio will lie to you.
- **Measure what matters.** Task completion, handoff rate, and how often a confirmation had to be corrected.

## Worth watching closely

I'm genuinely excited about this. A lot of businesses in the region still run on phone calls and voice notes, and a good Arabic voice agent could make a real difference for them. We're not all the way there on dialect yet, but it's moving fast.

If you're building in this space, I'd love to compare notes.
`,

  "observability-for-agents": `
"Why did it do that?"

If you've built an agent, you've asked this question, probably more times than you'd like. A user reports something weird, and now you have to figure out what happened across a dozen model calls, a handful of tool calls, and some retrieval in the middle.

If all you have is scattered logs, that's an afternoon gone. With proper traces, it's usually a few minutes. That difference is why observability is one of the first things I set up now, not one of the last.

## Traces, not logs

Logs tell you individual things happened. Traces tell you the story. For an agent, I want one trace per run that shows every step in order:

- **The input**, and who or what triggered the run
- **Each model call**: the full prompt, the response, which model, token counts, latency
- **Each tool call**: arguments, result, errors, how long it took
- **Retrieval**: what was searched, what came back, and the scores
- **The final outcome**, and whether it counted as a success

When you can click through a run step by step and see exactly what the model saw at each point, most bugs become obvious pretty quickly.

## Use the standards

There's been good progress on OpenTelemetry conventions for generative AI, and most agent frameworks and observability tools support it now. I'd strongly recommend going that route instead of inventing your own format. It means your agent traces can sit alongside the rest of your system's traces, and you can switch tools later without re-instrumenting everything.

## Track the numbers that matter

Beyond individual traces, I keep an eye on a few metrics over time:

- **Success or resolution rate**, ideally by task type
- **Cost per run** and per resolved task
- **Latency**, especially the slow tail, not just the average
- **Tool error rates**, which often spike before users notice anything
- **Steps per run**, because a sudden jump usually means the agent is looping or struggling
- **Handoff rate** to humans, if you have that

When a number moves suddenly, that's your cue to go read some traces.

## Be careful with sensitive data

Traces capture everything, which is the point, but it also means they can capture personal or confidential information. Decide early what gets stored, mask or redact sensitive fields, set retention limits, and control who can access the traces. It's much easier to set this up from the start than to clean it up later.

## Close the loop

The best part is connecting observability back to evals. When I find a bad run in production, I turn it into an eval case so it can't happen again. Over time, production traces become the best source of test cases you have, because they reflect what real users actually do.

## Start today

If you have an agent in production without tracing, add it this week. Even basic tracing beats none. The next time someone asks "why did it do that?", you'll actually be able to answer.
`,

  "shipping-agents-for-small-businesses": `
Most of my career has been on big, enterprise-scale projects. But lately I've been building AI agents for small businesses: front-desk assistants that handle WhatsApp messages for places like clinics and law firms. I've learned more about building reliable agents from these projects than I expected.

The stakes feel different. When a small business owner trusts your agent with their customers, every mistake is personal for them. There's no big team to catch problems. It's just them and their phone.

## WhatsApp is where the customers are

In Saudi Arabia and the Gulf, WhatsApp isn't just a messaging app. It's how people contact businesses. They expect a reply fast, in their dialect, at 11pm on a weekend. A lot of small businesses can't keep up with that, so they lose leads.

That's the problem these agents solve: answer common questions, book and reschedule appointments, send reminders, follow up with people who didn't book, and hand off to a real person when needed.

## Lesson 1: Some things must never be left to the model

Booking rules are the perfect example. The agent should never book a slot that's already taken, outside business hours, or for a service that isn't offered. You can write that in the prompt, but prompts are suggestions.

So I enforce those rules in code. The model can suggest a booking, but code checks it against the real calendar before anything is confirmed. If the check fails, the agent gets a clear error and tries again. The customer never sees a double-booking.

## Lesson 2: Reminders have to fire exactly once

Sending a reminder twice is annoying. Not sending it at all means a no-show. Neither is acceptable. I ended up building the scheduler on top of the database with careful locking, so each reminder goes out exactly once, even if the server restarts mid-run. Boring engineering, but it's the kind of thing that makes or breaks trust.

## Lesson 3: The handoff is a feature, not a failure

At first I thought a good agent should handle everything. Wrong. A good agent knows when to step aside: when the customer is upset, when the question is outside its scope, when something sensitive comes up. Making that handoff smooth, with the staff member getting the full context, matters more than squeezing out a few more automated conversations.

## Lesson 4: Evals keep you honest

Every change, whether a prompt tweak or a model update, runs through an eval suite before it ships: booking scenarios, tricky dialect messages, edge cases, attempts to break the rules. If anything fails, it doesn't go out. With small clients, I can't afford to "test in production."

## Lesson 5: Cost matters more than you think

For a small business, the agent has to be cheap to run. With smart model choices and caching, I've gotten the cost down to a fraction of a cent per conversation. That's what makes it viable for a small clinic, not just a big company.

## The best part

What I love about these projects is the feedback loop. A clinic owner tells me they stopped losing late-night bookings, or a receptionist says they finally have time for the patients in front of them. That's a lot more satisfying than a dashboard metric.

If you want to see how I built it, the code for a sanitized version is up on my GitHub.
`,

  "a-year-of-agentic-coding": `
About a year ago, I was pretty skeptical about coding agents. I'd tried a few, and while the demos were impressive, my real experience was a lot of cleaning up confident but wrong code. I figured they'd be useful for boilerplate and not much else.

I was wrong. Today a coding agent is involved in a big part of my work, and the way I spend my days has genuinely changed. I wanted to write down what shifted, partly for you and partly for future me.

## I write less code and more specs

The biggest change is where my time goes. I spend a lot more time up front deciding what I want: writing down the goal, the constraints, how to tell if it worked. Then the agent does a lot of the typing.

It turns out the quality of what I get back depends almost entirely on how clearly I explain what I want. Vague request, vague result. The skill that matters most now is the same one that makes someone a good tech lead: being clear about what "done" means.

## Plan first, then build

For anything bigger than a quick fix, I have the agent explore the code and propose a plan before it writes anything. I read the plan, push back where it's wrong, and only then let it build. That step catches most of the "it completely misunderstood the task" problems before they cost me anything.

## Tests became more important, not less

If the agent can run tests, it can check its own work. So I care about tests more now than I ever did. A codebase with good tests is one where I can hand off bigger tasks with confidence. A codebase without them is one where I have to check everything by hand.

## I keep notes for the agent

Every project I work on now has a short file explaining how things work: how to run it, how to test it, the conventions, the gotchas. I write it for the agent, but honestly it helps new humans on the team too. I also keep reusable instructions for tasks I do often, so I'm not explaining the same thing every time.

## What I still don't hand over

There's a lot I'm happy to delegate. But some things stay with me:

- **Architecture decisions.** The agent can suggest options, but I decide how the system fits together.
- **Security-sensitive code.** Auth, permissions, anything touching secrets or money. I write or review that line by line.
- **Anything irreversible.** Deploying to production, migrating data, deleting things. I want my hands on those.
- **Final review.** I read every diff before it's merged. Every one. "The agent wrote it" is never an excuse for a bug.

## The honest downsides

It's not all great. It's easy to get lazy and accept code you don't fully understand. Agents can be confidently wrong in subtle ways, especially in less common parts of a codebase. And reviewing a lot of generated code is its own kind of tiring. I've had to be deliberate about staying sharp.

## Where I've landed

A year in, I think of a coding agent as a very fast, very well-read collaborator who needs clear direction and a careful reviewer. I get a lot more done, and more of my time goes to the parts of the job I actually enjoy: figuring out what to build and why.

If you're still skeptical, I get it. I was too. Try it on a real task, with a clear spec and good tests, and see how it feels.
`,
};
