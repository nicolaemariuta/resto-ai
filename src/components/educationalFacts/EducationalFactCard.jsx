

export default function EducationalFactCard({ fact }) {
  const { title, text, source, link } = fact;

  return (
    <article
      className="relative rounded-md bg-yellow-200/90 border border-yellow-300
                 text-slate-900 shadow-lg shadow-yellow-900/30 px-3 py-2
                 text-sm"
    >
      {/* little pin circle at top */}
      <div className="absolute -top-1.5 right-6 h-3 w-3 rounded-full bg-amber-500 shadow" />

      <h3 className="font-semibold mb-1 text-xs sm:text-sm">
        {title}
      </h3>

      <p className="text-xs sm:text-sm mb-2 leading-snug">
        {text}
      </p>

      {(source || link) && (
        <div className="border-t border-yellow-300/60 pt-1 mt-1">
          <span className="text-[0.7rem] font-semibold mr-1">Source:</span>
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="text-[0.7rem] text-emerald-800 underline truncate inline-block max-w-full align-middle"
              title={link}
            >
              {link}
            </a>
          ) : (
            <span className="text-[0.7rem] text-slate-700">{source}</span>
          )}
        </div>
      )}
    </article>
  );
}
