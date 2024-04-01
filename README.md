# Module Federation Examples

This repository is to showcase examples of how Webpack 5's new Module Federation can be used.

### We are building a bigger ecosystem

|                                                                                                                [Rspack](https://github.com/web-infra-dev/rspack)                                                                                                                 |                                                 <a href="https://github.com/web-infra-dev/rspack" target="blank"><img src="https://lf3-static.bytednsdoc.com/obj/eden-cn/zq-uylkvT/ljhwZthlaukjlkulzlp/Rspack-1850.png" width="400" /></a>                                                 |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                                             [Modern.js](https://github.com/web-infra-dev/modern.js)                                                                                                              |                                               <a href="https://github.com/web-infra-dev/modern.js" target="blank"><img src="https://lf3-static.bytednsdoc.com/obj/eden-cn/zq-uylkvT/ljhwZthlaukjlkulzlp/Modern-0550.png" width="400" /></a>                                                |
|                                                                                                               [Garfish](https://github.com/web-infra-dev/garfish)                                                                                                                |                                                <a href="https://github.com/web-infra-dev/garfish" target="blank"><img src="https://lf3-static.bytednsdoc.com/obj/eden-cn/zq-uylkvT/ljhwZthlaukjlkulzlp/Garfish-1630.png" width="400" /></a>                                                |
|                                                                                                                   [Oxc](https://github.com/web-infra-dev/oxc)                                                                                                                    |                                                    <a href="https://github.com/web-infra-dev/oxc" target="blank"><img src="https://lf3-static.bytednsdoc.com/obj/eden-cn/zq-uylkvT/ljhwZthlaukjlkulzlp/Oxc-0724.png" width="400" /></a>                                                    |
| If you need **support**, consider looking at my sponsor profile [https://github.com/sponsors/ScriptedAlchemy](https://module-federation.github.io/redirect?utm_source=ModuleFederationExamples&utm_medium=https://github.com/sponsors/ScriptedAlchemy&utm_campaign=sponsor_link) |                                                                                                For companies that require consultations, contact me on twitter or email (on github profile)                                                                                                |
|                                                                                                                                   **Content**                                                                                                                                    |                                                                                                                                                                                                                                                                                            |
|                                                                                                                             **Youtube Screencasts**                                                                                                                              | [https://www.youtube.com/playlist?list=PLWSiF9YHHK-DqsFHGYbeAMwbd9xcZbEWJ](https://module-federation.github.io/redirect?utm_source=ModuleFederationExamples&utm_medium=https%3A%2F%2Fwww.youtube.com%2Fplaylist%3Flist%3DPLWSiF9YHHK-DqsFHGYbeAMwbd9xcZbEWJ&utm_campaign=youtube_playlist) |
|                                                                                                                                **New Info site**                                                                                                                                 |                                                                                                               [https://module-federation.io/](https://module-federation.io/)                                                                                                               |
|                                                                                                                                **Official Docs**                                                                                                                                 |                                [https://webpack.js.org/concepts/module-federation](https://module-federation.github.io/redirect?utm_source=ModuleFederationExamples&utm_campaign=webpack_docs&utm_medium=https://webpack.js.org/concepts/module-federation)                                |
|                                                                                                                            **Original Webpack Issue**                                                                                                                            |                              [https://github.com/webpack/webpack/issues/10352](https://module-federation.github.io/redirect?utm_source=ModuleFederationExamples&utm_campaign=merge_proposal_issue&utm_medium=https://github.com/webpack/webpack/issues/10352)                              |
|                                                                                                                                 **Medium post**                                                                                                                                  |                                                                                                          [https://link.medium.com/xzFgBBtAx6](https://link.medium.com/xzFgBBtAx6)                                                                                                          |
|                                                                                                                            **JSNation Presentation**                                                                                                                             |                                                             [https://github.com/sokra/slides/blob/master/content/ModuleFederationWebpack5.md](https://github.com/sokra/slides/blob/master/content/ModuleFederationWebpack5.md)                                                             |
|                                                                                                                          **Post about Dynamic Remotes**                                                                                                                          |                                                                        [https://h3manth.com/posts/dynamic-remotes-webpack-module-federation/](https://h3manth.com/posts/dynamic-remotes-webpack-module-federation/)                                                                        |

<p align="center"><a href="https://medusa.codes" target="_blank"><img src="https://pbs.twimg.com/media/Fcets1xXgAY3wZf?format=jpg&name=medium" width="800"/><a><p>

https://module-federation.github.io/

https://www.youtube.com/playlist?list=PLWSiF9YHHK-DqsFHGYbeAMwbd9xcZbEWJ

https://scriptedalchemy.medium.com/

# List of Examples

Click here to see the detailed list of examples in this repo [Full Examples List](./output.md)

# Check out our book

| <a href="https://module-federation.myshopify.com/products/practical-module-federation" target="_blank"><img src="./docs/MFCover.png" alt='Practical Module Federation Book' width="95%"/></a> | <a href="https://module-federation.myshopify.com/products/practical-module-federation" target="_blank">We will be actively updating this book over the next year as we learn more about best practices and what issues people are running into with Module Federation, as well as with every release of Webpack as it moves towards a release candidate and release. So with your one purchase you are buying a whole year of updates.</a> |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |

# Consultations

| <a href="https://calendly.com/scripted-alchemy/1-hr-group-consult" target="_blank">1 Hour group consultation</a> | \$100        |
| ---------------------------------------------------------------------------------------------------------------- | ------------ |
| <a href="https://calendly.com/scripted-alchemy/30-meeting-1-1" target="_blank">30 Min 1:1 consultation</a>       | \$60         |
| <a href="https://cb.run/WIVv" target="_blank">15 Min 1:1 consultation</a>                                        | \$30         |
| Bespoke API modifications and hands on code                                                                      | $300-$500/hr |

# Notes

The examples in this repository leverage [pnpm](https://pnpm.io/) and workspaces. To run from a git checkout locally, remove all of the proprietary example directories, ensure you have pnpm installed and run install `pnpm i` at the repo root.
You can then run `pnpm start` from any of the non-proprietary examples. Some examples may use a different command such as "dev" or "serve".

<img src="https://ssl.google-analytics.com/collect?v=1&t=event&ec=email&ea=open&t=event&tid=UA-120967034-1&z=1589682154&cid=ae045149-9d17-0367-bbb0-11c41d92b411&dt=ModuleFederationExamples&dp=/email/ModuleFederationExamplesRoot">

Module federation will work with any type of file that you're able to import, that Webpack understands how to process. It is not a JS only, or React only feature. Images, CSS, JSON, WASM, and anything else can be federated.

# Companies using Module Federation

- Netflix
- Auth0
- Best Buy
- SAP
- AWS
- SemRush
- Ford Motor Company
- JPMorgan Chase
- Microsoft
- Lululemon
- Housing.com
- VMware
- Talkdesk
- Cricket Wireless
- Reddit
- Bytedance
- Rivian (in the cars themselves)
- Realtor.com
- FICO
- Digital Ocean
- Alibaba
- Tencent
- Wayfair
- RingCentral
- Indeed
- Telia
- Beamery
- Amazon
- Sony
- Paypal
- OVO Energy
- MGM
- Lowes
- Home Depot
- Epic Games
- ExpediaGroup
- Verizon
- MindTickle
- Experian
- Herodevs
- CloudFlare
- Cisco
- Business Insider
- Box.com
- AfterPay
- OLX
- Shopify
- adidas
- and many more I cant remember

# Contribution to this repo

You decided to contribute to this project? Great, thanks a lot for pushing it!
