import React from 'react';

export default function HeroSection() {
  return (
    <>
      {/* Navbar نظيف بالكامل باللغة الإنجليزية بدون زرار اللغة */}
      <header className="nav-bergo">
        <div className="nav-inner-bergo">
          <a href="#" className="logo-bergo">NOBI</a>
          
          <nav className="nav-links-bergo">
            <a href="#features">Features</a>
            <a href="#results">Results</a>
            <a href="#feedback">Feedback</a>
            <a href="#packages">Packages</a>
            <a href="#shop">Shop</a>
            <a href="#faq">FAQ</a>
          </nav>

          <div className="nav-cta-bergo">
            <a href="#chat" className="btn-chat-bergo">Chat Now</a>
          </div>
        </div>
      </header>

      {/* Hero Section متسنتر 100% مع خلفية إضاءة سينمائية */}
      <section className="hero-bergo">
        <div className="hero-overlay-bergo"></div>
        
        <div className="hero-container-bergo">
          {/* Tag علوي احترافي */}
          <div className="tag-bergo">
            <span className="red-dot"></span>
            ELITE COACHING — EST. 2026
          </div>

          {/* العنوان الضخم في النص لغة إنجليزية */}
          <h1 className="title-bergo">
            <span className="text-white">TRAIN RIGHT.</span>
            <span className="text-red">SEE THE DIFFERENCE.</span>
          </h1>

          {/* وصف احترافي متسنتر */}
          <p className="desc-bergo">
            Elite online coaching, premium gear, and the high-performance mindset to dominate. Designed strictly for champions who refuse to settle.
          </p>

          {/* زر الاتصال والتفاعل الرئيسي */}
          <div className="actions-bergo">
            <a href="#packages" className="btn-main-bergo">JOIN THE PROGRAM &rarr;</a>
          </div>
        </div>
      </section>
    </>
  );
}
export function Arrow(props) {
  return (
    <svg className="arrow icon" viewBox="0 0 24 24" {...props}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
