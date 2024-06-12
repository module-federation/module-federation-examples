/* client side javascript */

/**
 * Checkout page
 * - form validation
 * - react to store selected event (explore)
 */
const $checkoutForm = document.querySelector(".c_Checkout__form");
if ($checkoutForm) {
  const $submit = $checkoutForm.querySelector("button[type=submit]");
  const $storeId = document.getElementById("c_storeId");

  const update = () => {
    const isValid = $checkoutForm.checkValidity() && $storeId.value;
    $submit.disabled = !isValid;
  };

  $checkoutForm.addEventListener("input", update);
  update();

  const $storePicker = document.querySelector(".c_Checkout__store");
  $storePicker.addEventListener("explore:store-selected", function (e) {
    console.log("checkout: store-selected", e, e.detail);
    document.getElementById("c_storeId").value = e.detail;
    update();
  });
}

/**
 * Mini cart fragment
 * - updated content on updated event
 * - highlight animation
 */
document.addEventListener("checkout:cart-updated", async function () {
  const $miniCart = document.querySelector(".c_MiniCart");
  if ($miniCart) {
    // update mini cart
    const res = await fetch("/checkout/mini-cart");
    const html = await res.text();
    $miniCart.outerHTML = html;

    // highlight updated mini cart
    const $newMiniCart = document.querySelector(".c_MiniCart");
    $newMiniCart.classList.add("c_MiniCart--highlight");
    setTimeout(() => {
      $newMiniCart.classList.remove("c_MiniCart--highlight");
    }, 600);
  }
});

/**
 * Add to cart fragment
 * - api call
 * - updated mini cart event
 */
const $addToCart = document.querySelector(".c_AddToCart");
if ($addToCart) {
  $addToCart.addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new URLSearchParams(new FormData($addToCart));
    const res = await fetch("/checkout/cart/add", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      document.dispatchEvent(new Event("checkout:cart-updated"));
      console.log($addToCart.querySelector(".c_AddToCart__confirmed"));

      $addToCart
        .querySelector(".c_AddToCart__confirmed")
        .classList.remove("c_AddToCart__confirmed--hidden");
    }
  });
}

/**
 * Thanks page
 * - confetti on load
 */
const $thanksPage = document.querySelector(".c_Thanks");
if ($thanksPage) {
  import("https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/+esm").then(
    ({ default: confetti }) => {
      var end = Date.now() + 1000;

      const settings = {
        particleCount: 3,
        scalar: 1.5,
        colors: ["#FFDE54", "#FF5A54", "#54FF90"],
        spread: 70,
      };
      /**
       * Animates confetti particles.
       */
      function frame() {
        confetti({
          ...settings,
          angle: 60,
          origin: { x: 0 },
        });
        confetti({
          ...settings,
          angle: 120,
          origin: { x: 1 },
        });

        if (Date.now() < end) {
          window.requestAnimationFrame(frame);
        }
      }
      frame();
    },
  );
}
