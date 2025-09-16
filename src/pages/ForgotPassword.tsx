import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [step, setStep] = useState<'request' | 'verify' | 'reset'>('request');
  const [formData, setFormData] = useState({
    crmLoginId: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // TODO: Replace with your actual backend API endpoint
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          crmLoginId: formData.crmLoginId
        }),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      setSuccess('OTP sent to your registered email/phone');
      setStep('verify');
    } catch (err) {
      setError('Unable to process request. Please verify your Login ID.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // TODO: Replace with your actual backend API endpoint
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          crmLoginId: formData.crmLoginId,
          otp: formData.otp
        }),
      });

      if (!response.ok) {
        throw new Error('Verification failed');
      }

      setSuccess('OTP verified successfully');
      setStep('reset');
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // TODO: Replace with your actual backend API endpoint
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          crmLoginId: formData.crmLoginId,
          otp: formData.otp,
          newPassword: formData.newPassword
        }),
      });

      if (!response.ok) {
        throw new Error('Password reset failed');
      }

      setSuccess('Password reset successfully! You can now login with your new password.');
    } catch (err) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Government Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
              <Shield className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              Himachal Pradesh Police
            </h1>
            <p className="text-lg font-semibold text-primary">
              Cyber Crime Helpline 1930
            </p>
            <p className="text-sm text-muted-foreground">
              Password Recovery
            </p>
          </div>
        </div>

        {/* Recovery Form */}
        <Card className="shadow-lg border-border">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl font-semibold text-center">
              {step === 'request' && 'Reset Password'}
              {step === 'verify' && 'Verify OTP'}
              {step === 'reset' && 'Set New Password'}
            </CardTitle>
            <CardDescription className="text-center">
              {step === 'request' && 'Enter your CRM Login ID to receive reset instructions'}
              {step === 'verify' && 'Enter the OTP sent to your registered email/phone'}
              {step === 'reset' && 'Create a new secure password'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-4 border-success bg-success-light">
                <CheckCircle className="h-4 w-4 text-success" />
                <AlertDescription className="text-success-foreground">{success}</AlertDescription>
              </Alert>
            )}

            {step === 'request' && (
              <form onSubmit={handleRequestReset} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="crmLoginId" className="text-sm font-medium">
                    CRM Login ID / Username
                  </Label>
                  <Input
                    id="crmLoginId"
                    name="crmLoginId"
                    type="text"
                    required
                    placeholder="Enter your CRM Login ID"
                    value={formData.crmLoginId}
                    onChange={handleInputChange}
                    className="h-11"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Reset Code'}
                </Button>
              </form>
            )}

            {step === 'verify' && (
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp" className="text-sm font-medium">
                    Enter OTP
                  </Label>
                  <Input
                    id="otp"
                    name="otp"
                    type="text"
                    required
                    placeholder="Enter 6-digit OTP"
                    value={formData.otp}
                    onChange={handleInputChange}
                    className="h-11"
                    maxLength={6}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </Button>
              </form>
            )}

            {step === 'reset' && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-sm font-medium">
                    New Password
                  </Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    required
                    placeholder="Enter new password"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    placeholder="Confirm new password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="h-11"
                  />
                </div>

                <div className="text-xs text-muted-foreground space-y-1">
                  <p>Password Requirements:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>At least 8 characters long</li>
                    <li>Include uppercase and lowercase letters</li>
                    <li>Include numbers and special characters</li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? 'Resetting...' : 'Reset Password'}
                </Button>
              </form>
            )}

            {/* Back to Login */}
            <div className="text-center mt-4">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-light transition-colors underline-offset-4 hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="text-center space-y-2">
          <p className="text-xs text-muted-foreground">
            For security reasons, reset codes expire in 10 minutes.
          </p>
          <p className="text-xs text-muted-foreground">
            Contact system administrator if you continue to experience issues.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;