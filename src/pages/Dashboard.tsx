import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      navigate("/");
      return;
    }
    setCurrentUser(JSON.parse(user));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate("/");
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Space for phone notch */}
      <div className="h-12 bg-gradient-to-r from-primary to-primary/80"></div>
      
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              Welcome back, {currentUser.firstName}!
            </h1>
            <p className="text-muted-foreground text-sm">
              Here's your sales dashboard
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <Button 
                onClick={() => navigate("/style-guide")} 
                variant="outline" 
                size="sm"
                className="text-xs"
              >
                Style Guide
              </Button>
              <Button 
                onClick={handleLogout} 
                variant="outline" 
                size="sm"
                className="text-xs"
              >
                Logout
              </Button>
            </div>
          </div>

          {/* Cards Section */}
          <div className="space-y-4">
            <Card className="border-0 shadow-sm bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold">Sales</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-4">
                <p className="text-muted-foreground text-sm">
                  Manage your sales records
                </p>
                <Button 
                  className="w-full h-12 bg-primary hover:bg-primary/90" 
                  onClick={() => navigate("/sales")}
                >
                  View Sales
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold">Farmer Back Office</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-4">
                <p className="text-muted-foreground text-sm">
                  Manage incoming orders (Demo)
                </p>
                <Button 
                  className="w-full h-12 bg-app-success hover:bg-app-success/90 text-white" 
                  onClick={() => navigate("/farmer-back-office")}
                >
                  Open Back Office
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}