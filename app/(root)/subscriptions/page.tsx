// app/subscriptions/page.tsx
import { PricingTable } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function SubscriptionsPage() {
    const { userId } = await auth();
    if (!userId) redirect('/sign-in');

    return (
        <main className="wrapper section-padding min-h-screen">
            <div className="subscriptions-header">
                <h1 className="subscriptions-title">Choose your plan</h1>
                <p className="subscriptions-subtitle">
                    Unlock more books, longer sessions, and session history as you grow.
                </p>
            </div>

            <div className="pricing-table-wrapper">
                <PricingTable />
            </div>
        </main>
    );
}