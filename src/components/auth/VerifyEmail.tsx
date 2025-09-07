import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";

export default function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { email, type } = location.state || {};

  useEffect(() => {
    if (!email || !type) {
      navigate("/login");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          toast({
            title: "Code expired",
            description: "The verification code has expired. Please request a new one.",
            variant: "destructive",
          });
          navigate(type === "reset" ? "/reset-password" : "/register");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [email, type, navigate, toast]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      toast({
        title: "Invalid code",
        description: "Please enter the complete 6-digit code.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate verification process
    setTimeout(() => {
      const pendingOTP = JSON.parse(localStorage.getItem("pendingOTP") || "{}");
      
      if (!pendingOTP.otp || pendingOTP.email !== email || pendingOTP.type !== type) {
        toast({
          title: "Invalid session",
          description: "Please start the verification process again.",
          variant: "destructive",
        });
        setIsLoading(false);
        navigate("/login");
        return;
      }

      if (Date.now() > pendingOTP.expiresAt) {
        toast({
          title: "Code expired",
          description: "The verification code has expired. Please request a new one.",
          variant: "destructive",
        });
        setIsLoading(false);
        navigate(type === "reset" ? "/reset-password" : "/register");
        return;
      }

      if (otp !== pendingOTP.otp) {
        toast({
          title: "Invalid code",
          description: "The verification code is incorrect. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Verification successful
      localStorage.removeItem("pendingOTP");

      if (type === "verification") {
        // Mark user as verified
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const userIndex = users.findIndex((u: any) => u.email === email);
        if (userIndex !== -1) {
          users[userIndex].verified = true;
          localStorage.setItem("users", JSON.stringify(users));
        }

        toast({
          title: "Email verified",
          description: "Your email has been verified successfully. You can now login.",
        });
        navigate("/login");
      } else {
        // Redirect to create new password
        navigate("/create-new-password", { state: { email } });
      }

      setIsLoading(false);
    }, 1000);
  };

  const handleResendCode = () => {
    // Generate new OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem("pendingOTP", JSON.stringify({
      email,
      otp: newOtp,
      type,
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
    }));

    setTimeLeft(600);
    toast({
      title: "Code resent",
      description: `New verification code sent to ${email}.`,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Verify Email</CardTitle>
          <CardDescription className="text-center">
            Enter the 6-digit code sent to {email}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="otp">Verification Code</Label>
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={setOtp}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
            
            <div className="text-center text-sm text-muted-foreground">
              Code expires in: {formatTime(timeLeft)}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading || otp.length !== 6}>
              {isLoading ? "Verifying..." : "Verify Code"}
            </Button>
          </form>
          
          <div className="mt-4 text-center space-y-2">
            <Button
              variant="ghost"
              className="text-sm"
              onClick={handleResendCode}
              disabled={timeLeft > 540} // Allow resend after 1 minute
            >
              Resend code
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}