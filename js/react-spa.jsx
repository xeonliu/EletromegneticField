import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

const LESSON_PAGES = [
  "page1","page2","page3","page4","page5","page6","page7","page8","page9",
  "page9_1","page9_2","page9_3","page9_4","page9_5","page9_6",
  "page10","page11","page12","page13","page14","page15","page16",
];

const getPageFromHash = () => {
  const hash = window.location.hash.replace("#", "");
  if (!hash) return "";
  return LESSON_PAGES.includes(hash) ? hash : "";
};

function App() {
  const [currentPage, setCurrentPage] = useState(getPageFromHash());
  const iframeRef = useRef(null);

  useEffect(() => {
    const onHashChange = () => setCurrentPage(getPageFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    if (currentPage) {
      window.location.hash = currentPage;
    } else if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }
  }, [currentPage]);

  const currentIndex = useMemo(
    () => LESSON_PAGES.findIndex((item) => item === currentPage),
    [currentPage]
  );

  const goPrev = () => {
    if (currentIndex > 0) setCurrentPage(LESSON_PAGES[currentIndex - 1]);
  };

  const goNext = () => {
    if (currentIndex >= 0 && currentIndex < LESSON_PAGES.length - 1) {
      setCurrentPage(LESSON_PAGES[currentIndex + 1]);
    }
  };

  const onIframeLoad = () => {
    if (!iframeRef.current) return;
    try {
      const path = iframeRef.current.contentWindow.location.pathname || "";
      const matched = path.match(/\/pages\/(page[\d_]+)\.html$/);
      if (matched && LESSON_PAGES.includes(matched[1]) && matched[1] !== currentPage) {
        setCurrentPage(matched[1]);
      }
    } catch (_) {}
  };

  return (
    <main className="spa-shell">
      <aside className="spa-sidebar">
        <div className="spa-brand">
          <h3>互动演示</h3>
          <h1>带电粒子在电磁场中的运动</h1>
        </div>
        <button className="btn btn-primary btn-lg w-100" onClick={() => setCurrentPage("page1")}>
          开始
        </button>
        <div className="spa-nav-title">章节导航</div>
        <div className="spa-nav-list">
          {LESSON_PAGES.map((page, index) => (
            <button
              key={page}
              className={`btn btn-sm ${currentPage === page ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setCurrentPage(page)}
            >
              第 {index + 1} 节
            </button>
          ))}
        </div>
      </aside>

      <section className="spa-content">
        {!currentPage ? (
          <section className="spa-welcome">
            <h3>互动演示</h3>
            <h1>带电粒子在电磁场中的运动</h1>
            <button className="btn btn-primary btn-lg" onClick={() => setCurrentPage("page1")}>
              开始
            </button>
          </section>
        ) : (
          <>
            <div className="spa-toolbar">
              <button className="btn btn-outline-secondary" onClick={goPrev} disabled={currentIndex <= 0}>
                上一节
              </button>
              <span>{`当前：第 ${currentIndex + 1} 节`}</span>
              <button
                className="btn btn-outline-secondary"
                onClick={goNext}
                disabled={currentIndex === LESSON_PAGES.length - 1}
              >
                下一节
              </button>
            </div>
            <iframe
              ref={iframeRef}
              className="spa-frame"
              title="教学内容"
              src={`/pages/${currentPage}.html`}
              onLoad={onIframeLoad}
            />
          </>
        )}
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
