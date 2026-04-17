import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const posts = [
  {
    id: 1,
    title: "Why South African Businesses Lose 80% of Their Leads Before Monday Morning",
    excerpt: "Load shedding, weekends, and manual follow-ups are leaking millions out of the SA economy. Here's how to fix it.",
    date: "14 Apr 2026",
    tag: "Lead Generation",
    imgColor: "var(--color-accent-1)"
  },
  {
    id: 2,
    title: "n8n vs Zapier: Which Automation Platform is Right for SA Businesses?",
    excerpt: "A deep dive into pricing, data compliance (POPIA), and flexibility for South African agencies.",
    date: "02 Apr 2026",
    tag: "n8n",
    imgColor: "var(--color-accent-2)"
  },
  {
    id: 3,
    title: "POPIA and Automation: How to Stay Compliant While Running Automated Lead Systems",
    excerpt: "Automating your pipeline doesn't mean ignoring data privacy. Learn how to stay POPIA compliant by design.",
    date: "28 Mar 2026",
    tag: "SA Business",
    imgColor: "var(--color-secondary)"
  },
  {
    id: 4,
    title: "How a Durban Insurance Broker Went from 13 to 32 Policies a Month Without Spending More on Ads",
    excerpt: "The exact webhook-to-WhatsApp automation sequence that doubled close rates for a local brokerage.",
    date: "15 Mar 2026",
    tag: "WhatsApp Marketing",
    imgColor: "#E0E7FF"
  }
];

const allTags = ["All", "Automation", "n8n", "Zapier", "Claude AI", "Lead Generation", "WhatsApp Marketing", "SA Business"];

const Blog = () => {
  useScrollReveal();
  const [activeTag, setActiveTag] = useState("All");

  const filteredPosts = activeTag === "All" ? posts : posts.filter(p => p.tag === activeTag);

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container fade-up" style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 className="heading-xl text-navy">Automation Insights</h1>
        <p className="body-lg text-navy" style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--color-secondary)', opacity: 0.8 }}>
          Strategies, case studies, and technical deep-dives into building revenue-generating AI systems in South Africa.
        </p>
      </div>

      <div className="container fade-up delay-100" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '60px' }}>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: '1px solid var(--color-accent-2)',
              background: activeTag === tag ? 'var(--color-navy)' : 'transparent',
              color: activeTag === tag ? '#fff' : 'var(--color-navy)',
              cursor: 'pointer',
              fontWeight: activeTag === tag ? 'bold' : 'normal',
              transition: 'all 0.2s ease'
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      <section className="section bg-light" style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="grid grid-2">
            {filteredPosts.map((post, index) => (
              <div key={post.id} className="card fade-up" style={{ transitionDelay: `${(index % 2) * 100}ms`, padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '200px', width: '100%', overflow: 'hidden' }}>
                  <img src="/blog-cover.png" alt="Blog cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--color-accent-1)', background: 'var(--color-bg-light)', padding: '4px 10px', borderRadius: '4px' }}>{post.tag}</span>
                    <span style={{ fontSize: '0.8rem', opacity: 0.6, display: 'flex', alignItems: 'center', gap: '5px' }}><Calendar size={14} /> {post.date}</span>
                  </div>
                  <h3 className="heading-sm text-navy" style={{ marginBottom: '15px' }}>{post.title}</h3>
                  <p style={{ opacity: 0.8, marginBottom: '25px', flex: 1 }}>{post.excerpt}</p>
                  <Link to="#" style={{ color: 'var(--color-accent-1)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', alignSelf: 'flex-start' }}>
                    Read More <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          {filteredPosts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', opacity: 0.6 }}>
              <p>No posts found for this tag.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
