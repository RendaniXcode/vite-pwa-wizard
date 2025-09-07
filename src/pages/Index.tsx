import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/FeatureCard";
import { PWAIcon } from "@/components/PWAIcon";
import heroLogo from "@/assets/pwa-hero-logo.png";
import { 
  Settings, 
  Puzzle, 
  Wifi, 
  Zap, 
  MessageSquare, 
  RotateCcw, 
  Image, 
  Bug 
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Zero-Config",
      description: "Sensible built-in default configs for common use cases"
    },
    {
      icon: <Puzzle className="w-6 h-6" />,
      title: "Extensible", 
      description: "Expose the full ability to customize the behavior of the plugin"
    },
    {
      icon: <Wifi className="w-6 h-6" />,
      title: "Offline Support",
      description: "Generate Service Worker with Offline support (via Workbox)"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Fully tree shakable",
      description: "Auto inject Web App Manifest"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Prompt for new content",
      description: "Built-in support for Vanilla JavaScript, Vue 3, React, Svelte, SolidJS and Preact"
    },
    {
      icon: <RotateCcw className="w-6 h-6" />,
      title: "Stale-while-revalidate",
      description: "Automatic reload when new content is available"
    },
    {
      icon: <Image className="w-6 h-6" />,
      title: "Static assets handling",
      description: "Configure static assets for offline support"
    },
    {
      icon: <Bug className="w-6 h-6" />,
      title: "Development Support",
      description: "Debug your custom service worker logic as you develop your application"
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PWAIcon className="w-8 h-8 text-pwa-teal" />
            <span className="text-xl font-bold text-foreground">Vite PWA</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-muted-foreground hover:text-pwa-teal transition-colors">Guide</a>
            <a href="#" className="text-muted-foreground hover:text-pwa-teal transition-colors">Deploy</a>
            <a href="#" className="text-muted-foreground hover:text-pwa-teal transition-colors">Workbox</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-feature opacity-30"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-feature rounded-full text-sm font-medium text-pwa-teal border border-pwa-cyan/20">
                  <PWAIcon className="w-4 h-4" />
                  PWA integrations for Vite
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight">
                  <span className="text-pwa-teal">PWA</span><br />
                  <span className="bg-gradient-hero bg-clip-text text-transparent">Vite Plugin</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Zero-config and framework-agnostic PWA Plugin for Vite and the ecosystem
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                  Get Started
                </Button>
                <Button variant="github" size="lg" className="text-lg px-8 py-6">
                  View on GitHub
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-hero opacity-20 rounded-2xl blur-3xl"></div>
              <img 
                src={heroLogo} 
                alt="PWA Vite Plugin Logo" 
                className="relative w-full max-w-md mx-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Everything you need for a <span className="text-pwa-teal">modern PWA</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built-in support for all major frameworks with zero configuration required
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-pwa-teal/10"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-5xl font-bold text-primary-foreground">
              Ready to build your next PWA?
            </h2>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Get started with Vite PWA plugin today and create fast, reliable, and engaging web applications
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="text-lg px-8 py-6 bg-white/20 text-white border-white/30 hover:bg-white hover:text-pwa-teal">
                Read Documentation
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white hover:text-pwa-teal">
                View Examples
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <PWAIcon className="w-6 h-6 text-pwa-teal" />
              <span className="text-lg font-semibold text-foreground">Vite PWA</span>
            </div>
            <div className="flex items-center gap-6 text-muted-foreground">
              <a href="#" className="hover:text-pwa-teal transition-colors">Documentation</a>
              <a href="#" className="hover:text-pwa-teal transition-colors">GitHub</a>
              <a href="#" className="hover:text-pwa-teal transition-colors">NPM</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;