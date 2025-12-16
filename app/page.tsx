import Header from '@/component/home/Header';
import BlogList from '@/component/home/BlogList';
import Newsletter from '@/component/home/Newsletter';
import QuizzesSection from '@/component/home/QuizzesSection';
import PollsSection from '@/component/home/PollsSection';
import ForumSection from '@/component/home/ForumSection';
import AMASection from '@/component/home/AMASection';
import InsightsSection from '@/component/home/InsightsSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TechyBlogs - Tech Community Platform',
  description: 'Discover blogs, quizzes, polls, forums, AMAs, trends, and insights on AI, SaaS, UX, Cybersecurity, and Emerging Tech.',
  keywords: 'tech blog, technology, AI, SaaS, UX, cybersecurity, emerging tech, community, forum, AMA',
  openGraph: {
    title: 'TechyBlogs - Tech Community Platform',
    description: 'Your all-in-one tech knowledge and community platform',
    type: 'website',
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header Section */}
      <Header />

      {/* Main Blog List Section */}
      <section id="blogs" className="container mx-auto px-4 py-16">
        <BlogList />
      </section>

      {/* Quizzes Section */}
      <QuizzesSection />

      {/* Polls Section */}
      <PollsSection />

      {/* Forum Section */}
      <ForumSection />

      {/* AMA Section */}
      <AMASection />

      {/* Insights Section */}
      <InsightsSection />

      {/* Newsletter Section */}
      <section className="container mx-auto px-4 py-16">
        <Newsletter />
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join Our Growing Tech Community
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Share knowledge, take quizzes, participate in discussions, and stay ahead of emerging technologies.
          </p>
        </div>
      </section>
    </main>
  );
}

