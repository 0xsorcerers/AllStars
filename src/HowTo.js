import React, { useEffect, useState } from 'react';
import './HowTo.css';
import comicClub from './assets/images/howto/comic-club.webp';
import comicPickBounty from './assets/images/howto/comic-pick-bounty.webp';
import comicMakeCash from './assets/images/howto/comic-make-cash.webp';

/**
 * In-app comic How To guide.
 * Each page: header → description → comic strip → golden hint.
 * Flashy arrow moves between comic pages.
 */
const HOW_TO_SECTIONS = [
  {
    id: 'dino',
    header: 'The game feels better with an All Star Cat beside you',
    description:
      'Players playing with an All Star Cats NFT pay the least. Holders benefit hugely from gameplay discounts and winning incentives that non-holders simply do not get.',
    comic: comicClub,
    comicAlt:
      'Comic strip: a suited cat arm at a neon nightclub door points at a crew of anthropomorphic cat players in NBA club jerseys— some resting, some strategizing, some focused, some celebrating — and calls out “You.”',
    goldenHint:
      'Click the ALL STARS button to mint one or more All Star Cats. There will never be more than 4663 All Star Cats.',
  },
  {
    id: 'pick-bounty',
    header: 'Pick a Baller off the tray',
    description:
      'Every showdown starts with a mark. Single out any player in the NBA All Star selector tray by clicking on your pick — that Baller becomes your witty opponent for the round.',
    comic: comicPickBounty,
    comicAlt:
      'Comic strip: POV from through Binoculars to across the polished hardwood arena looking toward the sideline bench, where a legendary lineup of NBA All-Stars in diverse team jerseys sit ready.',
    goldenHint:
      'Click on any of the 18 NBA players on display in the selection tray.',
  },
  {
    id: 'hunt',
    header: 'All the best in your showdown!',
    description:
      'Simply push the Play button to begin your draw. Two fully on-chain draws are requested — if they match, you have bested the Baller you selected and an autopayment is sent to you. If not, your playing fee goes to fatten the pot for the next game.',
    comic: comicMakeCash,
    comicAlt:
      'Comic strip: a cigar-smoking BundleCat holds a framed photo of a crew of anthropomorphic cat players, with a saying beneath the frame saying Go Big or Go Home.',
    goldenHint: 'All you need to do is push it. Click Play!',
  },
];

const HowTo = ({ open, onClose }) => {
  const [page, setPage] = useState(0);
  const total = HOW_TO_SECTIONS.length;
  const section = HOW_TO_SECTIONS[page];
  const isFirst = page <= 0;
  const isLast = page >= total - 1;

  useEffect(() => {
    if (!open) return undefined;
    setPage(0);
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        setPage((p) => Math.min(total - 1, p + 1));
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        setPage((p) => Math.max(0, p - 1));
      }
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose, total]);

  if (!open || !section) return null;

  const goNext = () => setPage((p) => Math.min(total - 1, p + 1));
  const goPrev = () => setPage((p) => Math.max(0, p - 1));

  return (
    <div
      className="howto-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="How To Play"
    >
      <div
        className="howto-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="howto-toolbar">
          <div className="howto-brand">
            <span className="howto-kicker">
              All Star Cats · Lesson {page + 1}/{total}
            </span>
            <h1 className="howto-title">How To Play</h1>
          </div>
          <button
            type="button"
            className="howto-close"
            onClick={onClose}
            aria-label="Close How To"
            title="Close"
          >
            ×
          </button>
        </header>

        <div className="howto-scroll" key={section.id}>
          <article className="howto-section howto-section--page">
            <h2 className="howto-section-header">{section.header}</h2>
            <p className="howto-section-desc">{section.description}</p>
            {section.comic && (
              <figure className="howto-comic">
                <img
                  src={section.comic}
                  alt={section.comicAlt || section.header}
                  className="howto-comic-img"
                  draggable={false}
                />
              </figure>
            )}
            {section.goldenHint && (
              <aside className="howto-golden-hint" aria-label="Golden hint">
                <span className="howto-golden-label">Golden hint</span>
                <p className="howto-golden-text">{section.goldenHint}</p>
              </aside>
            )}
          </article>
        </div>

        <nav className="howto-pager" aria-label="How To page navigation">
          <div className="howto-dots" role="tablist" aria-label="Lessons">
            {HOW_TO_SECTIONS.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === page}
                aria-label={`Go to lesson ${i + 1}: ${s.header}`}
                className={`howto-dot${i === page ? ' is-active' : ''}`}
                onClick={() => setPage(i)}
              />
            ))}
          </div>

          <div className="howto-arrows">
            {!isFirst && (
              <button
                type="button"
                className="howto-arrow howto-arrow--up"
                onClick={goPrev}
                aria-label="Previous lesson"
                title="Previous"
              >
                <span className="howto-arrow-glyph" aria-hidden>▲</span>
                <span className="howto-arrow-label">Back</span>
              </button>
            )}
            {!isLast ? (
              <button
                type="button"
                className="howto-arrow howto-arrow--down howto-arrow--flashy"
                onClick={goNext}
                aria-label="Next lesson"
                title="Next comic"
              >
                <span className="howto-arrow-label">Next</span>
                <span className="howto-arrow-glyph" aria-hidden>▼</span>
                <span className="howto-arrow-pulse" aria-hidden />
              </button>
            ) : (
              <button
                type="button"
                className="howto-arrow howto-arrow--done"
                onClick={onClose}
                aria-label="Close How To and start hunting"
                title="Got it"
              >
                <span className="howto-arrow-label">Got it</span>
              </button>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default HowTo;
