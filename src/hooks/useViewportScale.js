import { useLayoutEffect } from "react";

export function useViewportScale() {
  useLayoutEffect(() => {
    const root = document.documentElement;

    const updateScale = () => {
      const rootStyles = window.getComputedStyle(root);
      const designWidth = parseFloat(rootStyles.getPropertyValue("--app-design-width")) || 1280;
      const designHeight = parseFloat(rootStyles.getPropertyValue("--app-design-height")) || 800;
      const scale = Math.min(window.innerWidth / designWidth, window.innerHeight / designHeight);

      root.style.setProperty("--app-scale", scale.toFixed(4));
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    window.addEventListener("orientationchange", updateScale);

    return () => {
      window.removeEventListener("resize", updateScale);
      window.removeEventListener("orientationchange", updateScale);
      root.style.removeProperty("--app-scale");
    };
  }, []);
}
