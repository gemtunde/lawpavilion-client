//import { ServiceType } from "@/app/(auth)/register/page";
import { ServiceType } from "@/app/auth/register/page";
import { Card, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { ReactNode } from "react";

type AuthFormCardProps = {
  title?: string;
  titleBanner: string;
  url: string;
  description?: string;
  descriptionBanner?: string;
  children: ReactNode;
  services: ServiceType[];
};

export function AuthFormCard({
  titleBanner,
  descriptionBanner,
  url,
  services,
  children,
}: AuthFormCardProps) {
  return (
    <main className="min-h-screen flex">
      {/* Left Side - Hero Image */}
      <section className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 via-blue-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${url})`,
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <div className="space-y-8 bg-black/40 backdrop-blur-xs p-6 rounded-lg">
            <div>
              <h2 className="text-4xl font-bold mb-4 leading-tight">
                {titleBanner}
              </h2>
              <p className="text-xl text-white/90 leading-relaxed">
                {descriptionBanner}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {services.map((service) => (
                <div className="flex items-center space-x-4" key={service.id}>
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{service.name}</h3>
                    <p className="text-white/80">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Right Side - Login Form */}
      <section className="w-full lg:w-1/2 flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center gap-2 mt-6  mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">
              Law Pavilion
            </span>
          </div>

          <Card className="border-0 ">
            <CardContent className="px-4">{children}</CardContent>
          </Card>

          <footer className="mt-8 text-center text-xs text-gray-500">
            <p>Protected by 256-bit SSL encryption</p>
          </footer>
        </div>
      </section>
    </main>
  );
}
