import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Shield, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    crmLoginId: '',
    password: '',
    captcha: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // TODO: Replace with your actual backend API endpoint
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          crmLoginId: formData.crmLoginId,
          password: formData.password,
          captcha: formData.captcha
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      // TODO: Handle successful login (store token, redirect, etc.)
      console.log('Login successful:', data);
      
    } catch (err) {
      setError('Invalid credentials or captcha. Please try again.');
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
              CRM Portal - Secure Access
            </p>
          </div>
        </div>

        {/* Login Form */}
        <Card className="shadow-lg border-border">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl font-semibold text-center">
              Secure Login
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the CRM system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* CRM Login ID */}
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

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Captcha */}
              <div className="space-y-2">
                <Label htmlFor="captcha" className="text-sm font-medium">
                  Security Verification
                </Label>
                <div className="space-y-2">
                  {/* Placeholder for actual captcha implementation */}
                  <div className="h-16 bg-muted border border-border rounded-md flex items-center justify-center text-muted-foreground">
                    [CAPTCHA Verification Required]
                  </div>
                  <Input
                    id="captcha"
                    name="captcha"
                    type="text"
                    required
                    placeholder="Enter the captcha code"
                    value={formData.captcha}
                    onChange={handleInputChange}
                    className="h-11"
                  />
                </div>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full h-11 font-medium"
                disabled={isLoading}
              >
                {isLoading ? 'Authenticating...' : 'Secure Login'}
              </Button>

              {/* Forgot Password Link */}
              <div className="text-center">
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:text-primary-light transition-colors underline-offset-4 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="text-center space-y-2">
          <p className="text-xs text-muted-foreground">
            This is a secure government portal. Unauthorized access is prohibited.
          </p>
          <p className="text-xs text-muted-foreground">
            Multiple failed login attempts will result in account suspension.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;