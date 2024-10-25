import { Check, X } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      credits: "20 credits per day",
      features: ["Basic product access", "Email support"],
      notIncluded: [
        "Extensive product access",
        "Priority support",
        "Custom solutions",
      ],
      cta: "Get Started",
      ctaLink: "/signup",
    },
    {
      name: "Pro",
      price: "$15",
      credits: "1000 credits per day",
      features: [
        "Extensive product access",
        "Priority email support",
        "API access",
        "Advanced analytics",
      ],
      notIncluded: ["Custom solutions", "Dedicated account manager"],
      cta: "Upgrade to Pro",
      ctaLink: "/signup",
    },
    {
      name: "Enterprise",
      price: "Custom",
      credits: "Unlimited credits per day",
      features: [
        "All Pro features",
        "Custom solutions available",
        "Dedicated account manager",
        "24/7 phone support",
        "On-site training",
      ],
      notIncluded: [],
      cta: "Contact Us",
      ctaLink: "/contact",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold text-gray-900">
            Choose the Right Plan for You
          </span>
          <span className="mt-4 text-xl text-gray-600">
            Whether you're just starting out or scaling up, we have a plan that
            fits your needs.
          </span>
        </div>

        <div className="mt-16 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative bg-white rounded-2xl shadow-xl flex flex-col justify-between items-start"
            >
              <div className="p-8">
                <span className="text-xl font-semibold text-gray-900">
                  {plan.name}
                </span>
                <span className="mt-4 flex items-baseline">
                  <span className="text-5xl font-extrabold tracking-tight text-gray-900">
                    {plan.price}
                  </span>
                  {plan.name !== "Enterprise" && (
                    <span className="ml-1 text-xl font-semibold text-gray-500">
                      /month
                    </span>
                  )}
                </span>
                <span className="mt-2 text-gray-500">{plan.credits}</span>

                <ul className="mt-6 space-y-4 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-6 w-6 text-green-500" />
                      </div>
                      <span className="ml-3 text-base text-gray-700">
                        {feature}
                      </span>
                    </li>
                  ))}
                  {plan.notIncluded.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="flex-shrink-0">
                        <X className="h-6 w-6 text-red-500" />
                      </div>
                      <span className="ml-3 text-base text-gray-400">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pb-8 px-6">
                <Link
                  href={plan.ctaLink}
                  className={`block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${
                    plan.name === "Pro"
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>

              {plan.name === "Pro" && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 transform rounded-full bg-indigo-600 py-1 px-4 z-10">
                  <span className="text-xs font-semibold uppercase tracking-wider text-white">
                    Most Popular
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center flex flex-col items-center justify-center py-10">
          <span className="text-2xl font-extrabold text-gray-900">
            Need a custom solution?
          </span>
          <span className="mt-4 text-lg text-gray-600">
            Our enterprise plan offers unlimited credits and the ability to
            build extensive tools tailored to your needs.
          </span>
          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Contact Us for Enterprise Solutions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
