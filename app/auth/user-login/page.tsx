'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { useAuth } from '@/lib/auth/auth-context';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/ui/input-otp';
import { toast } from 'sonner';
import { AlertCircle } from 'lucide-react';

export default function UserLoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      toast.info(`OTP sent to ${email}. Use any 6-digit code (e.g., 123456) for testing`);
      setStep('otp');
    } catch (error) {
      toast.error('Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (otp.length === 6) {
        await signIn(email, otp);
        toast.success('Signed in successfully!');
        router.push('/');
      } else {
        toast.error('Please enter a valid 6-digit OTP');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>User Login</CardTitle>
          <CardDescription>
            {step === 'email' ? 'Enter your email to receive an OTP' : 'Enter the OTP sent to your email'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Test Instructions Alert */}
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 flex gap-3">
            <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-primary mb-1">Testing:</p>
              <p className="text-xs text-muted-foreground">
                Use any email and any 6-digit code (e.g., 123456)
              </p>
            </div>
          </div>

          {step === 'email' ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Email Address</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-4">
                Or <a href="/auth/admin-login" className="text-primary hover:underline">login as admin</a>
              </p>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Enter 6-Digit OTP</label>
                <div className="flex justify-center mt-4 mb-4">
                  <InputOTP maxLength={6} value={otp} onChange={setOtp}>
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
                <p className="text-xs text-muted-foreground text-center">
                  OTP sent to {email}
                </p>
              </div>
              <Button type="submit" className="w-full" disabled={loading || otp.length !== 6}>
                {loading ? 'Verifying...' : 'Verify OTP'}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => { setStep('email'); setOtp(''); }}
                disabled={loading}
              >
                Back
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
