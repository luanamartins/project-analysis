// Only Chrome & Opera have an error attribute on the event.
window.addEventListener("error", function (e) {
    console.log(e.error.message, "from", e.error.stack);
});