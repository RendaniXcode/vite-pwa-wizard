import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MobileCard } from "@/components/MobileCard";
import { StatCard } from "@/components/StatCard";
import { FeatureCard } from "@/components/FeatureCard";
import { ArrowLeft, DollarSign, Package, Users, TrendingUp, Check, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StyleGuide() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-header text-primary-foreground p-6">
        <div className="max-w-6xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="mb-4 text-primary-foreground hover:bg-primary-foreground/20"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold">Design System Style Guide</h1>
          <p className="text-primary-foreground/80 mt-2">
            Field Sales App - Professional mobile-first design
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-12">
        {/* Color Palette Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Color Palette</h2>
          
          <div className="space-y-8">
            {/* Primary Colors */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Primary Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ColorSwatch name="Primary" className="bg-primary text-primary-foreground" token="--primary" />
                <ColorSwatch name="Secondary" className="bg-secondary text-secondary-foreground" token="--secondary" />
                <ColorSwatch name="Accent" className="bg-accent text-accent-foreground" token="--accent" />
                <ColorSwatch name="Muted" className="bg-muted text-muted-foreground" token="--muted" />
              </div>
            </div>

            {/* App Theme Colors */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">App Theme Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ColorSwatch name="Success Green" className="bg-app-success text-white" token="--success-green" />
                <ColorSwatch name="Warning Orange" className="bg-app-warning text-white" token="--warning-orange" />
                <ColorSwatch name="Egg Yellow" className="bg-app-egg text-white" token="--egg-yellow" />
                <ColorSwatch name="Farm Brown" className="bg-app-farm text-white" token="--farm-brown" />
              </div>
            </div>

            {/* Background & Foreground */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Background & Text</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ColorSwatch name="Background" className="bg-background text-foreground border-2 border-border" token="--background" />
                <ColorSwatch name="Foreground" className="bg-foreground text-background" token="--foreground" />
                <ColorSwatch name="Card" className="bg-card text-card-foreground border-2 border-border" token="--card" />
                <ColorSwatch name="Border" className="bg-border text-foreground" token="--border" />
              </div>
            </div>

            {/* Status Colors */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Status Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ColorSwatch name="Destructive" className="bg-destructive text-destructive-foreground" token="--destructive" />
                <ColorSwatch name="Popover" className="bg-popover text-popover-foreground border-2 border-border" token="--popover" />
                <ColorSwatch name="Input" className="bg-input text-foreground" token="--input" />
                <ColorSwatch name="Ring" className="bg-ring text-white" token="--ring" />
              </div>
            </div>
          </div>
        </section>

        {/* Gradients Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Gradients</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GradientCard name="Primary Gradient" className="bg-gradient-primary text-white" />
            <GradientCard name="Success Gradient" className="bg-gradient-success text-white" />
            <GradientCard name="Card Gradient" className="bg-gradient-card text-foreground border border-border" />
            <GradientCard name="Header Gradient" className="bg-gradient-header text-white" />
          </div>
        </section>

        {/* Shadows Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Shadows</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ShadowCard name="Card Shadow" className="shadow-card bg-card" />
            <ShadowCard name="Button Shadow" className="shadow-button bg-primary text-primary-foreground" />
            <ShadowCard name="Mobile Shadow" className="shadow-mobile bg-card" />
          </div>
        </section>

        {/* Typography Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Typography</h2>
          <Card className="bg-card border-border">
            <CardContent className="p-6 space-y-4">
              <div>
                <h1 className="text-4xl font-bold text-foreground">Heading 1</h1>
                <p className="text-sm text-muted-foreground">4xl - 36px</p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground">Heading 2</h2>
                <p className="text-sm text-muted-foreground">3xl - 30px</p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-foreground">Heading 3</h3>
                <p className="text-sm text-muted-foreground">2xl - 24px</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-foreground">Heading 4</h4>
                <p className="text-sm text-muted-foreground">xl - 20px</p>
              </div>
              <div>
                <p className="text-base text-foreground">Body Text - Regular</p>
                <p className="text-sm text-muted-foreground">base - 16px</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Small Text - Muted</p>
                <p className="text-xs text-muted-foreground">sm - 14px</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Button Variants Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Button Variants</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Variants</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="mobile">Mobile</Button>
                <Button variant="success">Success</Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Sizes</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon"><Check className="h-4 w-4" /></Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">States</h3>
              <div className="flex flex-wrap gap-3">
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Badge Variants Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Badge Variants</h2>
          <div className="flex flex-wrap gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </section>

        {/* Card Components Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Card Components</h2>
          
          <div className="space-y-8">
            {/* Standard Card */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Standard Card</h3>
              <Card className="max-w-md">
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card description with muted text</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">This is the card content area with regular text styling.</p>
                </CardContent>
              </Card>
            </div>

            {/* Mobile Card */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Mobile Card</h3>
              <MobileCard className="max-w-md">
                <h4 className="font-semibold text-foreground mb-2">Mobile Card Component</h4>
                <p className="text-sm text-muted-foreground">
                  Optimized for mobile with gradient background and hover effects
                </p>
              </MobileCard>
            </div>

            {/* Stat Card */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Stat Card</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                <StatCard
                  title="Total Revenue"
                  value="R 45,230"
                  icon={<DollarSign />}
                  trend="+12.5%"
                  trendUp={true}
                />
                <StatCard
                  title="Total Sales"
                  value="1,234"
                  icon={<Package />}
                  trend="-3.2%"
                  trendUp={false}
                />
              </div>
            </div>

            {/* Feature Card */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Feature Card</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                <FeatureCard
                  icon={<Users className="w-6 h-6" />}
                  title="Customer Management"
                  description="Track and manage customer relationships with detailed profiles and purchase history"
                />
                <FeatureCard
                  icon={<TrendingUp className="w-6 h-6" />}
                  title="Sales Analytics"
                  description="Real-time insights into your sales performance and revenue trends"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Icons Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Icons (Lucide React)</h2>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-6 items-center justify-center">
                <div className="text-center space-y-2">
                  <DollarSign className="w-8 h-8 mx-auto text-app-success" />
                  <p className="text-xs text-muted-foreground">DollarSign</p>
                </div>
                <div className="text-center space-y-2">
                  <Package className="w-8 h-8 mx-auto text-primary" />
                  <p className="text-xs text-muted-foreground">Package</p>
                </div>
                <div className="text-center space-y-2">
                  <Users className="w-8 h-8 mx-auto text-accent" />
                  <p className="text-xs text-muted-foreground">Users</p>
                </div>
                <div className="text-center space-y-2">
                  <TrendingUp className="w-8 h-8 mx-auto text-app-success" />
                  <p className="text-xs text-muted-foreground">TrendingUp</p>
                </div>
                <div className="text-center space-y-2">
                  <Check className="w-8 h-8 mx-auto text-app-success" />
                  <p className="text-xs text-muted-foreground">Check</p>
                </div>
                <div className="text-center space-y-2">
                  <AlertCircle className="w-8 h-8 mx-auto text-app-warning" />
                  <p className="text-xs text-muted-foreground">AlertCircle</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Spacing & Layout */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Spacing & Layout</h2>
          <Card className="bg-card border-border">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-4 bg-primary"></div>
                <span className="text-sm text-muted-foreground">1rem (16px)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 h-4 bg-primary"></div>
                <span className="text-sm text-muted-foreground">1.5rem (24px)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 h-4 bg-primary"></div>
                <span className="text-sm text-muted-foreground">2rem (32px)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-48 h-4 bg-primary"></div>
                <span className="text-sm text-muted-foreground">3rem (48px)</span>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Border Radius */}
        <section className="pb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Border Radius</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card border border-border p-6 rounded-sm">
              <p className="text-sm font-medium text-foreground">Small</p>
              <p className="text-xs text-muted-foreground">calc(0.5rem - 4px)</p>
            </div>
            <div className="bg-card border border-border p-6 rounded-md">
              <p className="text-sm font-medium text-foreground">Medium</p>
              <p className="text-xs text-muted-foreground">calc(0.5rem - 2px)</p>
            </div>
            <div className="bg-card border border-border p-6 rounded-lg">
              <p className="text-sm font-medium text-foreground">Large</p>
              <p className="text-xs text-muted-foreground">0.5rem</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Helper Components
function ColorSwatch({ name, className, token }: { name: string; className: string; token: string }) {
  return (
    <div className={`${className} p-4 rounded-lg`}>
      <p className="font-semibold text-sm mb-1">{name}</p>
      <p className="text-xs opacity-80">{token}</p>
    </div>
  );
}

function GradientCard({ name, className }: { name: string; className: string }) {
  return (
    <div className={`${className} p-8 rounded-lg`}>
      <p className="font-semibold">{name}</p>
    </div>
  );
}

function ShadowCard({ name, className }: { name: string; className: string }) {
  return (
    <div className={`${className} p-6 rounded-lg border border-border`}>
      <p className="font-semibold text-foreground">{name}</p>
      <p className="text-sm text-muted-foreground mt-2">Interactive elevation example</p>
    </div>
  );
}
