// Types out the HCL block in the hero, then reveals the apply result.
// Without JS (or with reduced motion) the full block is simply visible.
(function () {
  var terminal = document.querySelector(".terminal");
  var hcl = document.getElementById("hcl");
  if (!terminal || !hcl) return;

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (reduceMotion) return;

  terminal.classList.add("typing");

  // Collect the text nodes so typing preserves the syntax-highlight spans.
  var walker = document.createTreeWalker(hcl, NodeFilter.SHOW_TEXT);
  var nodes = [];
  while (walker.nextNode()) {
    nodes.push({ node: walker.currentNode, text: walker.currentNode.data });
    walker.currentNode.data = "";
  }

  var i = 0; // node index
  var j = 0; // char index within node
  var CHAR_DELAY = 14;

  hcl.classList.add("cursor");

  function tick() {
    if (i >= nodes.length) {
      hcl.classList.remove("cursor");
      terminal.classList.add("done");
      return;
    }
    var entry = nodes[i];
    entry.node.data += entry.text.charAt(j);
    j += 1;
    if (j >= entry.text.length) {
      i += 1;
      j = 0;
    }
    window.setTimeout(tick, CHAR_DELAY);
  }

  window.setTimeout(tick, 400);
})();
