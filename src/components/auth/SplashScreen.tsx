import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function SplashScreen() {
  const [showButtons, setShowButtons] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show the splash screen for 2 seconds, then show auth options
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Check if user is already logged in
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [navigate]);

  if (!showButtons) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="text-center space-y-8">
          <div className="animate-pulse">
            <div className="w-24 h-24 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground text-4xl font-bold">S</span>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">SalesApp</h1>
            <p className="text-muted-foreground text-lg">Managing your sales with ease</p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="text-center space-y-6">
            <div>
              <div className="w-20 h-20 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground text-3xl font-bold">S</span>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to SalesApp</h1>
              <p className="text-muted-foreground">Choose an option to get started</p>
            </div>
            
            <div className="space-y-3">
              <Button 
                onClick={() => navigate("/login")}
                className="w-full"
                size="lg"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate("/register")}
                variant="outline"
                className="w-full"
                size="lg"
              >
                Create Account
              </Button>
            </div>
            
            <div className="text-xs text-muted-foreground">
              Manage your sales, customers, and orders efficiently
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}