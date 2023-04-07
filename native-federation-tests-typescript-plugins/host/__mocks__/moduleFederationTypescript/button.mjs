// src/components/button/Button.tsx
import { jsx } from "react/jsx-runtime";
var Button = ({ onClick }) => /* @__PURE__ */ jsx("button", { onClick, children: "Federated button" });
var Button_default = Button;

// src/components/button/Inner/Inner.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var InnerButton = ({ onClick }) => /* @__PURE__ */ jsx2("button", { onClick });
var Inner_default = InnerButton;

// src/components/button/index.ts
var button_default = Button_default;
export {
  Inner_default as Inner,
  button_default as default
};
