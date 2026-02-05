/**
 * Landing Page Component
 * Marketing landing page with hero, features, and CTAs
 * Shows different content based on authentication state
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth-store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, MessageSquare, TrendingUp, Users, Zap, Sword } from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  // Guest view - show marketing content with login/register CTAs
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-tertiary">
        {/* Hero Section */}
        <section className="px-6 py-20 lg:py-32">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6">
              MuOnline Season 19.2
            </h1>
            <p className="text-xl md:text-2xl text-text-muted mb-4">
              Mu Kacher • Chat-First CMS
            </p>
            <p className="text-lg text-text-muted mb-8 max-w-2xl mx-auto">
              Experience the next generation of MuOnline server with real-time chat, rankings, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-lg px-8 py-6"
                onClick={() => navigate('/register')}
              >
                Create Account
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10 text-lg px-8 py-6"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-20 bg-bg-secondary/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-text-primary mb-12">
              Why Choose Our Server?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <Card className="border-white/10 bg-bg-secondary p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary">Real-Time Chat</h3>
                  <p className="text-text-muted">Stay connected with our global chat system. Discuss strategies, trade items, and build alliances.</p>
                </div>
              </Card>

              {/* Feature 2 */}
              <Card className="border-white/10 bg-bg-secondary p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-success" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary">Secure Accounts</h3>
                  <p className="text-text-muted">Your account is safe with our secure authentication system. Play with peace of mind.</p>
                </div>
              </Card>

              {/* Feature 3 */}
              <Card className="border-white/10 bg-bg-secondary p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-warning/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-warning" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary">Live Rankings</h3>
                  <p className="text-text-muted">Compete for top spots on our dynamic leaderboards. Track your progress and become a legend.</p>
                </div>
              </Card>

              {/* Feature 4 */}
              <Card className="border-white/10 bg-bg-secondary p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary">Active Community</h3>
                  <p className="text-text-muted">Join thousands of players in our vibrant community. Make friends and form guilds.</p>
                </div>
              </Card>

              {/* Feature 5 */}
              <Card className="border-white/10 bg-bg-secondary p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary">Fast Gameplay</h3>
                  <p className="text-text-muted">Experience low-latency gameplay on our optimized infrastructure. Smooth battles, no lag.</p>
                </div>
              </Card>

              {/* Feature 6 */}
              <Card className="border-white/10 bg-bg-secondary p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                    <Sword className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary">Season 19.2</h3>
                  <p className="text-text-muted">The latest season with new features, classes, and items. Start your adventure today!</p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-20 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              Ready to Begin Your Adventure?
            </h2>
            <p className="text-lg text-text-muted">
              Join thousands of players in the world of MuOnline. Create your account now and start your journey!
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-lg px-12 py-6"
              onClick={() => navigate('/register')}
            >
              Start Playing Now
            </Button>
          </div>
        </section>
      </div>
    );
  }

  // Authenticated user view - show welcome and quick actions
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-tertiary">
      {/* Welcome Section */}
      <section className="px-6 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-6">
            <svg
              className="w-10 h-10 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-4">
            Welcome Back, {user?.username || 'Player'}!
          </h1>
          <p className="text-xl md:text-2xl text-text-muted">
            Your adventure in MuOnline Season 19.2 continues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-lg px-8 py-6"
              onClick={() => navigate('/chat')}
            >
              Go to Chat
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary/10 text-lg px-8 py-6"
              onClick={() => navigate('/character')}
            >
              View Character
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-text-primary mb-8">
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card
              className="border-white/10 bg-bg-secondary p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => navigate('/chat')}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary">Global Chat</h3>
                <p className="text-sm text-text-muted">Connect with players worldwide</p>
              </div>
            </Card>

            <Card
              className="border-white/10 bg-bg-secondary p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => navigate('/ranking')}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-warning/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-warning" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary">Rankings</h3>
                <p className="text-sm text-text-muted">Check top players and guilds</p>
              </div>
            </Card>

            <Card
              className="border-white/10 bg-bg-secondary p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => navigate('/download')}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-success/20 flex items-center justify-center">
                  <Sword className="w-6 h-6 text-success" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary">Download</h3>
                <p className="text-sm text-text-muted">Get the game client</p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
