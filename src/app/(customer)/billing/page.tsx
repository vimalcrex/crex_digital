import { Metadata } from "next";
import {
  CreditCard,
  Download,
  FileText,
  Calendar,
  CheckCircle,
  AlertCircle,
  Clock,
  DollarSign,
  Building2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CustomerHeader } from "@/components/customer/header";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Billing",
};

// Placeholder data
const subscription = {
  plan: "Professional",
  status: "ACTIVE",
  setupFeePaid: true,
  monthlyFee: 500,
  nextBillingDate: "2024-07-01",
  paymentMethod: {
    type: "card",
    brand: "Visa",
    last4: "4242",
    expMonth: 12,
    expYear: 2025,
  },
};

const currentMonthUsage = {
  platformFee: 500,
  adSpend: 4250,
  total: 4750,
  properties: 3,
  campaigns: 4,
};

const invoices = [
  {
    id: "INV-2024-006",
    date: "2024-06-01",
    period: "June 2024",
    platformFee: 500,
    adSpend: 4120,
    total: 4620,
    status: "PAID",
    paidAt: "2024-06-01",
  },
  {
    id: "INV-2024-005",
    date: "2024-05-01",
    period: "May 2024",
    platformFee: 500,
    adSpend: 3890,
    total: 4390,
    status: "PAID",
    paidAt: "2024-05-01",
  },
  {
    id: "INV-2024-004",
    date: "2024-04-01",
    period: "April 2024",
    platformFee: 500,
    adSpend: 4250,
    total: 4750,
    status: "PAID",
    paidAt: "2024-04-01",
  },
  {
    id: "INV-2024-003",
    date: "2024-03-01",
    period: "March 2024",
    platformFee: 500,
    adSpend: 3650,
    total: 4150,
    status: "PAID",
    paidAt: "2024-03-01",
  },
];

const statusColors: Record<string, "success" | "destructive" | "secondary" | "outline"> = {
  PAID: "success",
  PENDING: "outline",
  FAILED: "destructive",
  REFUNDED: "secondary",
};

const statusIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  PAID: CheckCircle,
  PENDING: Clock,
  FAILED: AlertCircle,
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BillingPage() {
  return (
    <>
      <CustomerHeader
        title="Billing"
        description="Manage your subscription and invoices"
      />

      <div className="space-y-6 p-6">
        {/* Subscription & Payment Info */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Subscription Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Subscription</span>
                <Badge variant="success">{subscription.status}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-blue-50 p-4">
                <div>
                  <p className="font-semibold text-blue-900">
                    {subscription.plan} Plan
                  </p>
                  <p className="text-sm text-blue-700">
                    {formatCurrency(subscription.monthlyFee)}/month platform fee
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Change Plan
                </Button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Setup Fee</span>
                  <span className="flex items-center gap-1 font-medium text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    Paid
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Next Billing Date</span>
                  <span className="font-medium">
                    {formatDate(subscription.nextBillingDate)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Billing Cycle</span>
                  <span className="font-medium">Monthly</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method Card */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                  <CreditCard className="h-6 w-6 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">
                    {subscription.paymentMethod.brand} ****
                    {subscription.paymentMethod.last4}
                  </p>
                  <p className="text-sm text-gray-500">
                    Expires {subscription.paymentMethod.expMonth}/
                    {subscription.paymentMethod.expYear}
                  </p>
                </div>
                <Badge variant="outline">Default</Badge>
              </div>

              <Button variant="outline" className="w-full">
                <CreditCard className="mr-2 h-4 w-4" />
                Update Payment Method
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Current Month Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Current Month Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-4">
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <DollarSign className="h-4 w-4" />
                  Platform Fee
                </div>
                <p className="mt-2 text-2xl font-bold">
                  {formatCurrency(currentMonthUsage.platformFee)}
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <DollarSign className="h-4 w-4" />
                  Ad Spend (MTD)
                </div>
                <p className="mt-2 text-2xl font-bold">
                  {formatCurrency(currentMonthUsage.adSpend)}
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Building2 className="h-4 w-4" />
                  Active Properties
                </div>
                <p className="mt-2 text-2xl font-bold">
                  {currentMonthUsage.properties}
                </p>
              </div>
              <div className="rounded-lg bg-blue-50 p-4">
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <DollarSign className="h-4 w-4" />
                  Estimated Total
                </div>
                <p className="mt-2 text-2xl font-bold text-blue-900">
                  {formatCurrency(currentMonthUsage.total)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Invoice History */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Invoice History</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm text-gray-500">
                    <th className="pb-3 font-medium">Invoice</th>
                    <th className="pb-3 font-medium">Period</th>
                    <th className="pb-3 font-medium text-right">Platform Fee</th>
                    <th className="pb-3 font-medium text-right">Ad Spend</th>
                    <th className="pb-3 font-medium text-right">Total</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {invoices.map((invoice) => {
                    const StatusIcon = statusIcons[invoice.status] || Clock;
                    return (
                      <tr key={invoice.id} className="hover:bg-gray-50">
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">{invoice.id}</span>
                          </div>
                        </td>
                        <td className="py-4">
                          <div>
                            <p className="font-medium">{invoice.period}</p>
                            <p className="text-sm text-gray-500">
                              {formatDate(invoice.date)}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 text-right">
                          {formatCurrency(invoice.platformFee)}
                        </td>
                        <td className="py-4 text-right">
                          {formatCurrency(invoice.adSpend)}
                        </td>
                        <td className="py-4 text-right font-semibold">
                          {formatCurrency(invoice.total)}
                        </td>
                        <td className="py-4">
                          <Badge
                            variant={statusColors[invoice.status]}
                            className="gap-1"
                          >
                            <StatusIcon className="h-3 w-3" />
                            {invoice.status}
                          </Badge>
                        </td>
                        <td className="py-4">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
