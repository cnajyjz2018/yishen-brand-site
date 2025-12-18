<script>
async function loadHTML(id, url) {
  const el = document.getElementById(id);
  if (!el) return;
  const res = await fetch(url);
  el.innerHTML = await res.text();
}
document.addEventListener("DOMContentLoaded", () => {
  loadHTML("header", "/partials/header.html");
  loadHTML("footer", "/partials/footer.html");
});
</script>
