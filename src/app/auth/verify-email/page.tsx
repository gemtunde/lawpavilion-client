import VerifyEmailContent from "@/components/auth/VerifyEmailContent";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="text-center py-12">
              <Loader2 className="w-16 h-16 mx-auto mb-6 animate-spin text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Loading...
              </h2>
              <p className="text-gray-600">Please wait...</p>
            </CardContent>
          </Card>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
