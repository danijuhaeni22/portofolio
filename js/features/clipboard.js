import { toast } from "./toast.js";

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    toast("Copied ✅");
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();

    try {
      document.execCommand("copy");
      toast("Copied ✅");
    } catch {
      toast("Copy failed ❌");
    } finally {
      ta.remove();
    }
  }
}
