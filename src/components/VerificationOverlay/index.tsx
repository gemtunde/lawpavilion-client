"use client";

import { Button } from "@/components/ui/button";
//import Image from 'next/image'
import { useAuth } from "@/context/useAuth";
//import axiosApi from '@/services/axiosApi'
import { toast } from "sonner";
//import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, RefreshCw, CheckCircle, Loader2 } from "lucide-react";
//import { toast } from 'sonner';
import useResendVerificationEmail from "@/hooks/mutations/auth/useResendVerificationEmail";
import { useState } from "react";

export default function EmailVerificationOverlay() {
  const { user, refreshAuth } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const resendEmail = useResendVerificationEmail();

  // Don't show overlay if user is verified or doesn't exist
  if (!user || user.isVerified) {
    return null;
  }

  const handleResendEmail = async () => {
    try {
      await resendEmail.mutateAsync();
      toast.success("Verification email sent! Please check your inbox.");
    } catch (error) {
      console.error("Resend email error:", error);
      toast.error("Failed to send verification email");
    }
  };

  const handleRefreshStatus = async () => {
    setIsRefreshing(true);
    try {
      await refreshAuth();
      if (user?.isVerified) {
        toast.success("Email verification confirmed!");
      } else {
        toast.info("Email not yet verified. Please check your email.");
      }
    } catch (error) {
      console.error("Refresh verification status error:", error);
      toast.error("Failed to refresh verification status");
    } finally {
      setIsRefreshing(false);
    }
  };
  // <Image
  //         src="/asset/email-verify.svg" // Put a nice illustration in /public
  //         alt="Verify Email"
  //         width={150}
  //         height={150}
  //         className="mx-auto mb-4"
  //       />
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 animate-in fade-in-0 zoom-in-95 duration-300">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl text-gray-900">
            Verify Your Email
          </CardTitle>
          <CardDescription className="text-base">
            Please verify your email address to continue using SwiftNaira
            Payments
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Email Info */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-blue-900">
                  Verification email sent to:
                </p>
                <p className="text-blue-700 font-mono text-sm break-all">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">What to do next:</h3>
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-green-600 text-sm font-bold">1</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Check your email inbox (and spam folder)
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-green-600 text-sm font-bold">2</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Click the verification link in the email
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-green-600 text-sm font-bold">3</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Return here and click I have verified my email
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleRefreshStatus}
              disabled={isRefreshing}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {isRefreshing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />I have verified my
                  email
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={handleResendEmail}
              disabled={resendEmail.isPending}
              className="w-full"
            >
              {resendEmail.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Resend verification email
                </>
              )}
            </Button>
          </div>

          {/* Help Text */}
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <p className="text-amber-800 text-sm">
              <strong>Cannot find the email?</strong> Check your spam folder or
              try resending. The verification link expires in 24 hours.
            </p>
          </div>

          {/* Security Notice */}
          <div className="text-center">
            <p className="text-xs text-gray-500">
              🔒 This verification step helps keep your account secure
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
