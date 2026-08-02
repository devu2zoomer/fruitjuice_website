import { useEffect, useState, useCallback } from "react";

function getRoute() {
  const hash = window.location.hash.replace(/^#/, "");
  return hash.startsWith("/") ? hash : "/";
}

/**
 * Minimal hash-based router. Avoids pulling in react-router-dom for what is,
 * for now, just a couple of top-level pages (login / admin dashboard) on top
 * of the single-page marketing site.
 */
export function useHashRoute() {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = useCallback((path) => {
    window.location.hash = path;
  }, []);

  return [route, navigate];
}
