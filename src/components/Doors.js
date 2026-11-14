import React, { useState } from "react";
import { FiCheck } from "react-icons/fi";
import { profile } from "../data/profile";

const pad = (n) => String(n).padStart(2, "0");

const Plate = ({ children }) => <span className="door__plate">{children}</span>;
const Handle = ({ side = "right" }) => (
  <span className={`door__handle door__handle--${side}`} aria-hidden="true">
    <i />
  </span>
);

function Door({ s, i }) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((o) => !o);

  const leaves =
    s.open === "double" ? (
      <>
        <span className="door__leaf door__leaf--l">
          <Plate>{s.plate}</Plate>
          <Handle side="seam-l" />
        </span>
        <span className="door__leaf door__leaf--r">
          <Handle side="seam-r" />
        </span>
      </>
    ) : s.open === "slide-up" ? (
      <span className="door__clip">
        <span className="door__leaf">
          <Plate>{s.plate}</Plate>
          <span className="door__lift" aria-hidden="true" />
        </span>
      </span>
    ) : (
      <span className="door__leaf">
        <Plate>{s.plate}</Plate>
        <Handle side={s.open === "swing-right" ? "left" : "right"} />
      </span>
    );

  return (
    <div className={`door door--${s.open} ${open ? "is-open" : ""}`} style={{ "--door": s.color }} data-reveal="zoom">
      <div
        className="door__frame"
        role="button"
        tabIndex={0}
        aria-expanded={open}
        aria-label={`${open ? "Close" : "Open"} the ${s.title} door`}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        }}
      >
        <span className="door__room">
          <span className="door__content">
            <span className="door__num">{pad(i + 1)}</span>
            <strong>{s.title}</strong>
            <em>{s.subtitle}</em>
            <ul>
              {s.points.map((p) => (
                <li key={p}>
                  <FiCheck /> {p}
                </li>
              ))}
            </ul>
          </span>
        </span>
        {leaves}
      </div>
      <span className="door__caption">
        {s.title}
        <small>{open ? "Click to close" : "Click to open"}</small>
      </span>
    </div>
  );
}

function Doors() {
  return (
    <section id="services" className="section doors-section">
      <div className="container">
        <header className="section__head section__head--center" data-reveal>
          <span className="eyebrow">What I do</span>
          <h2 className="section__title">Magic happens behind the doors</h2>
          <p className="section__sub">Knock on any door — each one opens a different way.</p>
        </header>

        <div className="doors">
          {profile.services.map((s, i) => (
            <Door key={s.title} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Doors;
