import { useState } from 'react';
import { BLOG_DATA, getWhatsAppUrl } from '../constants';
import { Calendar, Clock, Tag, ArrowRight, X, BookOpen, ChevronRight } from 'lucide-react';

/* ───────── Blog Post Modal ───────── */
const BlogModal = ({ post, onClose }) => {
  if (!post) return null;

  const paragraphs = post.content.split('\n\n');

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-background rounded-3xl overflow-hidden shadow-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-primary to-primary-700 p-8 text-white">
          <button
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            onClick={onClose}
          >
            <X size={18} />
          </button>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full mb-4">
            {post.category}
          </span>
          <div className="text-5xl mb-4">{post.icon}</div>
          <h2 className="text-xl sm:text-2xl font-bold leading-tight mb-4">{post.title}</h2>
          <div className="flex flex-wrap gap-4 text-sm text-white/80">
            <span className="flex items-center gap-1.5"><Calendar size={14} />{post.date}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} />{post.readTime}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="prose prose-sm max-w-none text-foreground space-y-4">
            {paragraphs.map((para, i) => {
              if (para.startsWith('**') && para.endsWith('**')) {
                return (
                  <h3 key={i} className="text-base font-bold text-foreground-bold mt-6 mb-2">
                    {para.replace(/\*\*/g, '')}
                  </h3>
                );
              }
              if (para.includes('\n-')) {
                const [heading, ...items] = para.split('\n');
                return (
                  <div key={i}>
                    {heading && !heading.startsWith('-') && (
                      <p className="text-sm text-muted-foreground mb-2">{heading}</p>
                    )}
                    <ul className="space-y-1.5">
                      {items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-foreground">
                          <ChevronRight size={14} className="text-primary flex-shrink-0 mt-0.5" />
                          <span>{item.replace('- ', '')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }
              return (
                <p key={i} className="text-sm text-muted-foreground leading-relaxed">
                  {para}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary-50 text-primary text-xs font-medium rounded-full"
              >
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 p-5 bg-primary-50 rounded-2xl border border-primary-100 text-center">
            <p className="text-sm font-semibold text-foreground-bold mb-3">
              Ready to start your recovery?
            </p>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 text-sm"
            >
              Book Free Consultation
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ───────── Blog Card ───────── */
const BlogCard = ({ post, onRead }) => (
  <div className="group bg-background rounded-2xl border border-border shadow-sm hover:shadow-xl transition-all duration-400 overflow-hidden flex flex-col h-full fade-up">
    {/* Icon banner */}
    <div className="relative h-36 bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center flex-shrink-0 group-hover:from-primary group-hover:to-primary-700 transition-all duration-400">
      <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{post.icon}</span>
      <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 bg-white/90 text-primary text-xs font-bold rounded-full shadow-sm">
        {post.category}
      </span>
    </div>

    {/* Body */}
    <div className="p-5 flex flex-col flex-grow">
      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
        <span className="flex items-center gap-1"><Calendar size={11} />{post.date}</span>
        <span className="flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
      </div>

      <h3 className="text-sm font-bold text-foreground-bold mb-2 leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200">
        {post.title}
      </h3>

      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-grow mb-4">
        {post.excerpt}
      </p>

      <button
        onClick={() => onRead(post)}
        className="mt-auto w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-primary-50 hover:bg-primary text-primary hover:text-white rounded-xl transition-all duration-300 font-semibold text-sm"
      >
        <BookOpen size={14} />
        Read Article
      </button>
    </div>
  </div>
);

/* ───────── Main Blog Section ───────── */
const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...new Set(BLOG_DATA.map((p) => p.category))];

  const filtered = activeCategory === 'All'
    ? BLOG_DATA
    : BLOG_DATA.filter((p) => p.category === activeCategory);

  return (
    <section id="blog" className="section-padding bg-background">
      <div className="container-max">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 px-2">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
            Health Resources
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground-bold mb-4">
            Physiotherapy Blog &amp; Guides
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Expert physiotherapy articles from PhysioGrow Clinic &amp; Academy, Lahore — covering back pain,
            knee pain, sports injuries, stroke rehab, and more to help you make informed health decisions.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-primary-50 text-primary hover:bg-primary hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <BlogCard key={post.id} post={post} onRead={setSelectedPost} />
          ))}
        </div>

        {/* SEO disclaimer */}
        <p className="text-center text-xs text-muted-foreground mt-10 max-w-xl mx-auto leading-relaxed">
          PhysioGrow Clinic &amp; Academy — Best Physiotherapy in Lahore. Serving patients across Allama Iqbal Town,
          Gulshan Block, and all over Lahore with evidence-based physiotherapy treatment.
        </p>
      </div>

      {/* Modal */}
      <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </section>
  );
};

export default Blog;
