## Unless you are an author of StreamedFederation, you WILL NOT be able to run this.

You can see it in action here: https://youtu.be/kOuoSBTCzl4

Module Federation is fantastic, but some sophisticated enhancements - like streaming, are licensed pieces of closed-source software. While paying for javascript is unpopular - we need funding to enhance powerful tools, our toolbelts might be handy, as such we created some way for others to gain access to them. Unlike many other plugins - Module Federation is inaccessible and immutable. There are no hooks, and there is no way to extend its capabilities - this will not change and the reason is that federation is deeply integrated into base classes of most of webpacks core, public hooks would cause instability due to the nature of Module Federation which is already dynamic, webpack authors need to remain in control to minimize variability. Module Federation can only be altered by its creators, extensions demand author level understanding of the webpack core. Only the module-federation and webpack organizations are capable of extending the system without forking the core.

If you wish to alter the internal functionality of Module Federation - you can do so at the cost of forking webpack and maintaining a non-standard core. Before doing so, create an issue at webpack and see your goals are aligned with ours. Webpack does not handle implementation details, as such some requests might be outside the scope of webpack - which is just a compiler

### Reasoning

Like every project, there are goals.

Tools like StreamedFederation were built to solve author problems. In solving some of our problems, we realized that other companies might have a similar need. Since the goal of this project isn't about the number of downloads, users, or intended to resolve wide-spread community issues. The only reason StreamedFederation examples exist is for us to run and test our tools with the understanding that it might be valuable to some companies.

If companies need it we can supply it and continue investing time into Streamed Architecture. Otherwise, the goals of this project have been met - to solve the problems we have. There is no expectation that revenue will be generated and no expectation that users will want this.

We are happily using Federated Streaming technology and GitHub is a better place to store code instead of a personal computer.

**If you need these capabilities they are avaliable at a price** those funds help the organization continue to maintain and create other open-source tools that benefit everyone and the javascript ecosystem.

# Distributed Rendering across multiple servers

This example streams pre-rendered code from one server to another. Via module Federation `import()` and propriatery technology which enables webpack to stream imports from alternative file systems, in this case, the internet and an API

- `website1` is the host application.
- `website2` standalone application which exposes `Header` component.

# Running Demo

Run `yarn start`. This will build and serve both `website1` and `website2` on ports 3001 and 3002 respectively.

- [localhost:3001](http://localhost:3001/) (HOST)
- [localhost:3002](http://localhost:3002/) (STANDALONE REMOTE)
  <img src="https://ssl.google-analytics.com/collect?v=1&t=event&ec=email&ea=open&t=event&tid=UA-120967034-1&z=1589682154&cid=ae045149-9d17-0367-bbb0-11c41d92b411&dt=ModuleFederationExamples&dp=/email/MiltiThreadedSSR">
