import SubscriptionForm from "@/components/auth/subscription-form";

export default function Subscribe() {
  return (
    <main className="flex min-h-screen p-8 pb-20 flex-col gap-[32px] row-start-2 items-center justify-center relative ">
      <h1 className="mb-8 mt-[10vh] text-3xl font-bold text-center">
        Choose Your Subscription
      </h1>
      <p>You can subscribe to the service by filling out the form below.</p>
      <SubscriptionForm />
    </main>
  );
}
