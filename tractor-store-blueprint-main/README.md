# The Tractor Store - Blueprint

## What is The Tractor Store?

The Tractor Store is a template to experiment with micro frontend architecture.
Goal is to create a real world application where developers can experiment with different integration techniques.

The idea is similar to [TodoMVC](http://todomvc.com/) or [Movies](https://tastejs.com/movies/), but with a focus on micro frontends.

## About this project

- Three systems: Explore, Decide, Buy along the customer journey (buying process)
- Store that sells tractors
- E-commerce platform (homepage, catalog, product details, cart, checkout, thank you page)
- Special features: Add to cart animation, recommendations, store picker, thank you confetti
- Focus on frontend aspects. Backend and database are mocked with static data.
- Styling is provided in the blueprint. It's not the focus of this project.
- Static assets (images, fonts, helpers, ...) are provided. They can be copied or linked to directly (CDN).

## Design principals

- Each system can be developed and deployed independently by different teams
- The freedom to change a systems technology stack without affecting the others must be guaranteed
- Self-contained systems: Each system has its own database, backend and frontend
- Loose coupling: Systems should be able to function independently of each other as best as possible
- Provide a way to run the entire application locally for development and testing

## Implementation choices

- All described features must be implemented (user stories). End-to-end tests are provided to verify the implementation.
- The concrete implementation is up to you (frontend framework, style handling, etc.)
- Communication between systems can be achieved with different techniques (client, server, shared state, events, event-bus, etc.)
- Server- and/or client-rendering is possible
- An application shell is not required, but can be implemented if desired
- Deployment can be done with different techniques (container, serverless, static, etc.)
- Optional feature: extract shared UI components into a pattern library (button, ...)

## Goal of the project

There is no one-size-fits-all solution for micro frontends.
The goal of this project is to provide a central place, where different micro frontend integration techniques can be compared and evaluated.

- Make pros and cons of different tech-stacks and integration techniques visible and discussable
  - Organizational scalability (more teams, more systems)
  - Technical scalability (more users, more features)
  - Performance characteristics (Core-Web-Vitals, ...)
  - Development experience
- Share knowledge and learnings with the community
- Provide a blueprint for others to experiment with a specific micro frontends tech stack

## Implementation gallery

- Fork the blueprint or any other implementation
- Submit a an issue with a link to your implementation (github repo)
- Describe you tech stack and integration techniques using the issue template
- Extra points if you provide a hosted version of your implementation

## Anatomy of the project

### Boundaries 📄

- 🔴 Explore
  - 📄 Home
  - 📄 Category
  - 📄 Stores
  - 🧩 Header (🔴🟢🟡 every page, except checkout)
  - 🧩 Footer (🔴🟢🟡 every page)
  - 🧩 Recommendations (🔴 home, 🟢 product, 🟡 cart)
  - 🧩 Store Picker (🟡 checkout)
- 🟢 Decide
  - 📄 Product detail
- 🟡 Buy
  - 📄 Cart
  - 📄 Checkout
  - 📄 Thank you
  - 🧩 Mini Cart (🔴 header)
  - 🧩 Add To Cart Button (🟢 product details)

### Concepts 🧠

- Inter-team navigation (server- and/or client-side)
- Communication parent-child (variant change > recommendations, add to cart)
- Communication sibling (add to cart > mini cart)
- Communication child-parent (in store pickup > explore )
- Potential client-side interactions (variant change, remove from cart, form validation)
- Nested integration (page > header > mini cart)
- [Bonus] Shared UI components / pattern library (button)

### Infrastructure 🏗️

- Deployment
- Integration service
- Ende-zu-Ende-Tests (planned)
