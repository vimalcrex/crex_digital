import { Metadata } from "next";
import {
  DollarSign,
  MousePointer,
  Eye,
  Users,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Building2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CustomerHeader } from "@/components/customer/header";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dashboard",
};

// Placeholder data - will be replaced with real data
const stats = [
  {
    name: "Total Spend (MTD)",
    value: 4250,
    change: 8.2,
    trend: "up",
    format: "currency",
    icon: DollarSign,
    color: "green",
  },
  {
    name: "Impressions",
    value: 125400,
    change: 12.5,
    trend: "up",
    format: "number",
    icon: Eye,
    color: "blue",
  },
  {
    name: "Clicks",
    value: 3420,
    change: 5.8,
    trend: "up",
    format: "number",
    icon: MousePointer,
    color: "purple",
  },
  {
    name: "Leads",
    value: 48,
    change: -2.1,
    trend: "down",
    format: "number",
    icon: Users,
    color: "orange",
  },
];

const activeCampaigns = [
  {
    id: "1",
    name: "Summer Leasing Special",
    property: "The Heights at Downtown",
    status: "ACTIVE",
    spend: 1250,
    leads: 12,
    platform: "GOOGLE",
  },
  {
    id: "2",
    name: "Fall Move-In Promo",
    property: "Park View Apartments",
    status: "ACTIVE",
    spend: 890,
    leads: 8,
    platform: "FACEBOOK",
  },
  {
    id: "3",
    name: "Luxury Living Campaign",
    property: "The Heights at Downtown",
    status: "PAUSED",
    spend: 2100,
    leads: 28,
    platform: "GOOGLE",
  },
];

const recentLeads = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    property: "The Heights at Downtown",
    source: "Google Ads",
    createdAt: "2 hours ago",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    property: "Park View Apartments",
    source: "Facebook",
    createdAt: "4 hours ago",
  },
  {
    id: "3",
    name: "Mike Williams",
    email: "mike.w@example.com",
    property: "The Heights at Downtown",
    source: "Google Ads",
    createdAt: "Yesterday",
  },
];

const colorMap: Record<string, { bg: string; text: string }> = {
  green: { bg: "bg-green-100", text: "text-green-600" },
  blue: { bg: "bg-blue-100", text: "text-blue-600" },
  purple: { bg: "bg-purple-100", text: "text-purple-600" },
  orange: { bg: "bg-orange-100", text: "text-orange-600" },
};

export default function CustomerDashboardPage() {
  return (
    <>
      <CustomerHeader
        title="Dashboard"
        description="Overview of your marketing performance"
      />

      <div className="space-y-6 p-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.name}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`rounded-lg p-2 ${colorMap[stat.color].bg}`}>
                    <stat.icon
                      className={`h-5 w-5 ${colorMap[stat.color].text}`}
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
          {/* Active Campaigns */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Active Campaigns</CardTitle>
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeCampaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="flex items-center justify-between rounded-lg border border-gray-100 p-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">
                          {campaign.name}
                        </p>
                        <Badge
                          variant={
                            campaign.status === "ACTIVE"
                              ? "success"
                              : "secondary"
                          }
                        >
                          {campaign.status}
                        </Badge>
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                        <Building2 className="h-3 w-3" />
                        {campaign.property}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        {formatCurrency(campaign.spend)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {campaign.leads} leads
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Leads */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Leads</CardTitle>
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-600">
                        {lead.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{lead.name}</p>
                        <p className="text-sm text-gray-500">{lead.property}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">{lead.source}</Badge>
                      <p className="mt-1 text-xs text-gray-500">
                        {lead.createdAt}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50">
              <p className="text-gray-500">
                Performance chart will be displayed here
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
