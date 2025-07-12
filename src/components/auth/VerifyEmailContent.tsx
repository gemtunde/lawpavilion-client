"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Loader } from "lucide-react";
import { toast } from "sonner";
import useVerifyEmail from "@/hooks/mutations/auth/useVerifyEmail";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") as string;

  const verifyEmailMutation = useVerifyEmail();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!token) {
      toast("Invalid or expired reset link");
      router.replace("/forgot-password");
      return;
    }
    const data = {
      token: token,
    };
    verifyEmailMutation.mutate(data, {
      onSuccess: (res) => {
        console.log("Response:", res);
        toast.success("Password reset was successful");
        setTimeout(() => {
          router.replace("/auth/login");
        }, 4000);
      },
      onError: (error) => {
        toast.error(error?.message ?? "An error occurred. Please try again");
      },
    });
  };

  // Handle case where no token is provided
  // if (!token) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
  //       <Card className="w-full max-w-md shadow-xl border-0">
  //         <CardContent className="text-center py-12">
  //           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
  //             <XCircle className="w-8 h-8 text-red-600" />
  //           </div>
  //           <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Link</h2>
  //           <p className="text-gray-600 mb-6">No verification token found in the URL.</p>
  //           <div className="space-y-3">
  //             <Link href="/auth/login">
  //               <Button className="w-full">Back to Sign In</Button>
  //             </Link>
  //             <Link href="/auth/register">
  //               <Button variant="outline" className="w-full">Create New Account</Button>
  //             </Link>
  //           </div>
  //         </CardContent>
  //       </Card>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardContent className="text-center py-12">
          {/* {isLoading && (
            <>
              <Loader2 className="w-16 h-16 mx-auto mb-6 animate-spin text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Email</h2>
              <p className="text-gray-600">Please wait while we verify your email address...</p>
            </>
          )} */}

          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Email Verification!
            </h2>
            <p className="text-gray-600 mb-6">
              Please click on the link below to verify your email address
            </p>
            <form>
              <div className="space-y-3">
                <Button
                  disabled={verifyEmailMutation.isPending}
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Click to verify your email
                  {verifyEmailMutation.isPending ? (
                    <Loader className="animate-spin" />
                  ) : (
                    <ArrowRight className="w-4 h-4 ml-2" />
                  )}
                </Button>

                {/* <Link href="/auth/login">
                  <Button variant="outline" className="w-full">Sign In</Button>
                </Link> */}
              </div>
            </form>
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-700">
                🎉 Redirecting to setup in 3 seconds...
              </p>
            </div>
          </>

          {/* {isError && (
            <>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h2>
              <p className="text-gray-600 mb-6">
                {(error as any)?.response?.data?.message || 
                 (error as any)?.message || 
                 'Email verification failed. The link may be expired or invalid.'}
              </p>
              <div className="space-y-3">
                <Link href="/auth/login">
                  <Button className="w-full">Back to Sign In</Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="outline" className="w-full">Create New Account</Button>
                </Link>
              </div>
              
         
              <div className="mt-6 p-4 bg-amber-50 rounded-lg text-left">
                <h3 className="font-medium text-amber-800 mb-2">Common Issues:</h3>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• Link may have expired (valid for 24 hours)</li>
                  <li>• Link may have already been used</li>
                  <li>• Try requesting a new verification email</li>
                </ul>
              </div>
            </>
          )} */}
        </CardContent>
      </Card>
    </div>
  );
}
export default VerifyEmailContent;
