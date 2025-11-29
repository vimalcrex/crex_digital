import { Metadata } from "next";
import {
  DollarSign,
  Users,
  Building2,
  Megaphone,
  TrendingUp,
  TrendingDown,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

// Placeholder data - will be replaced with real data from the database
const stats = [
  {
    name: "Total Ad Spend (MTD)",
    value: 124500,
    change: 12.5,
    trend: "up",
    format: "currency",
    icon: DollarSign,
  },
  {
    name: "Active Customers",
    value: 48,
    change: 8.2,
    trend: "up",
    format: "number",
    icon: Users,
  },
  {
    name: "Properties",
    value: 156,
    change: 4.1,
    trend: "up",
    format: "number",
    icon: Building2,
  },
  {
    name: "Active Campaigns",
    value: 89,
    change: -2.3,
    trend: "down",
    format: "number",
    icon: Megaphone,
  },
];

const recentCustomers = [
  {
    id: "1",
    name: "Sunrise Apartments",
    email: "admin@sunriseapts.com",
    status: "ACTIVE",
    spend: 4500,
    joinedAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Metro Commercial",
    email: "contact@metrocommercial.com",
    status: "PENDING",
    spend: 0,
    joinedAt: "2024-01-18",
  },
  {
    id: "3",
    name: "Park Place Properties",
    email: "info@parkplace.com",
    status: "ACTIVE",
    spend: 8200,
    joinedAt: "2024-01-10",
  },
];

const aiInsights = [
  {
    type: "budget",
    title: "Budget Rebalance Recommended",
    description:
      "3 campaigns have underperforming ad sets. Rebalancing could improve ROAS by 15%.",
    action: "Review Campaigns",
  },
  {
    type: "creative",
    title: "Creative Fatigue Detected",
    description:
      "5 ad creatives have been running for 30+ days with declining CTR.",
    action: "View Creatives",
  },
  {
    type: "landing",
    title: "Landing Page A/B Winner",
    description:
      'Variant B for "The Heights" is outperforming by 23%. Ready to promote.',
    action: "Apply Winner",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">
            Overview of your CREX Digital platform
          </p>
        </div>
        <Button>
          <Megaphone className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div
                  className={`rounded-lg p-2 ${
                    stat.name.includes("Spend")
                      ? "bg-green-100"
                      : stat.name.includes("Customer")
                      ? "bg-blue-100"
                      : stat.name.includes("Properties")
                      ? "bg-purple-100"
                      : "bg-orange-100"
                  }`}
                >
                  <stat.icon
                    className={`h-5 w-5 ${
                      stat.name.includes("Spend")
                        ? "text-green-600"
                        : stat.name.includes("Customer")
                        ? "text-blue-600"
                        : stat.name.includes("Properties")
                        ? "text-purple-600"
                        : "text-orange-600"
                    }`}
                  />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {formatPercent(stat.change / 100)}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-gray-900">
                  {stat.format === "currency"
                    ? formatCurrency(stat.value)
                    : formatNumber(stat.value)}
                </p>
                <p className="text-sm text-gray-500">{stat.name}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* AI Insights */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>AI Insights</CardTitle>
            <Badge variant="secondary">3 New</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiInsights.map((insight, index) => (
              <div
                key={index}
                className="flex items-start gap-4 rounded-lg border border-gray-100 bg-gray-50 p-4"
              >
                <div
                  className={`rounded-full p-2 ${
                    insight.type === "budget"
                      ? "bg-yellow-100"
                      : insight.type === "creative"
                      ? "bg-red-100"
                      : "bg-green-100"
                  }`}
                >
                  <div
                    className={`h-2 w-2 rounded-full ${
                      insight.type === "budget"
                        ? "bg-yellow-500"
                        : insight.type === "creative"
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{insight.title}</h4>
                  <p className="mt-1 text-sm text-gray-500">
                    {insight.description}
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  {insight.action}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Customers */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Customers</CardTitle>
            <Button variant="ghost" size="sm">
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-600">
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {customer.name}
                      </p>
                      <p className="text-sm text-gray-500">{customer.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        customer.status === "ACTIVE" ? "success" : "secondary"
                      }
                    >
                      {customer.status}
                    </Badge>
                    <p className="mt-1 text-sm text-gray-500">
                      {customer.spend > 0
                        ? formatCurrency(customer.spend)
                        : "No spend yet"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
