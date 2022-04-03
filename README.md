# Larval — A journey into experimental stock option trading strategies

*(note: knowledge of how stock options work is needed for this readme)*

I made this short and to the point readme as many people have had various of questions related to this tool I made (www.larval.com) and I feel I may not be articulating my responses as well as I’d like. So, I thought it might make the most sense to simply take you down the road that lead me to creating it. So, here goes…

Not that long ago, after over a 15 years of picking stocks I came to an obvious conclusion: **I will never consistently beat the market in any meaningful way and it’s not worth my time or effort pretending I can**. So, I decided to sell almost all of my individual stock holdings and buy triple leveraged index ETFs (TQQQ, UPRO, UDOW). This sounds very risky on its face until you think about it. These leveraged funds track surprisingly well over time, give me 3x premiums to sell covered calls and puts on, and let me keep a lot more cash on the sidelines. The cherry on top is if a truly major crash was to occur my losses compound into smaller and smaller amounts faster. That is to say, if I buy $300 worth of QQQ and $100 worth of TQQQ I would eventually lose more with the QQQ in a major downturn.

Now that my long-term portfolio strategy is essentially on autopilot, and I have a lot more cash on the sidelines to use as collateral, I thought I could try to find something that I was actually consistently good at and worked in any market. Enter stock options, where good money usually goes to die, but luckily it didn’t take me too long to figure out that being on the side that sells options tends to pan out better most of the time. Acting essentially as an insurance agent for people buying lottery ticket options, my internal dialogue subtly changed from trying to predict the future to simply trying to not be extremely wrong about the future, which turned out to be a much easier task.

On the quest for options with high premiums to sell I found my way to various websites that showed stocks with high IV (implied volatility). Of course these premiums tended to be high for a good reason, events are expected to occur that will make for volatile movements one way or another. Never the less, I did consistently well with this strategy, mostly because I stayed so far OTM (out of the money) that I was safe most of the time. Still, it was tedious to find enough of these plays to safely diversify myself and I had to sit in these options for waiting for an event or expiration. It is a lot of effort for modest gains, so I continued looking for additional strategies.

At some point I started to investigate the behavior of options during and immediately after the volatile events themselves. Frequently I would find extremely erratic and irrational fills, sometimes to the point of near impossible profitability for the buyer. At this point I asked myself the obvious question, “Why not me?”. I should be the person selling these options and getting these insane fills, I just have to be aware when these volatile events happen.

Since my profession is in software development I knew I could slap something together to find these events for me, sometime reasonably close to when they first start happening. So, I ended up dusting off a mini-pc I use as a server in my house and put a little tiny monitor on it that beeps at me when volatile price changes occur in a short window of time (~5 minutes). This became what I did for 2 years: **hear a beep, look down at this tiny monitor, check the earliest option chain, set some high limit orders if I like what I see, go back to work**. They didn’t always fill of course, but when they did it was like free money.

![desk](https://user-images.githubusercontent.com/17552747/161402711-d65a8c49-8172-4b18-a15a-83f7b70d465c.jpg)

> *Look at that adorable little screen on my unkempt desk, I really need to tidy that up.*

I kept this evolving strategy to myself over those 2 years, because why would I crowd this little niche market I found? There’s no benefit for me to do that. But, as time went by, I realized that I’ve been tweaking my strategy and created a lot of nuance with the stocks, strikes and limits I actually use. Hell, sometimes I’m on the buy side now if I suspect the IV hasn’t come in enough yet. On top of this mood change I became motivated to make a project outside of my day job, as I used to enjoy programming as a hobby before it became my profession.

So, with this newly creative mood and old domain I set aside years ago collecting dust, I began porting what was on that mini-pc to a portable website I can use anywhere. Thus, www.larval.com was created.

![ss](https://user-images.githubusercontent.com/17552747/161402716-5a3820ed-b801-4eda-acc7-dc640867eda9.jpg)

> *Much more refined and gentlemanly than that mini-pc, if you ask me.*

I’m not sharing any explicit details of what works for me, that’s still just for me. I’m just throwing this vague tool into the ether for fun and to see if other people can find their own strategies… because, why not?

