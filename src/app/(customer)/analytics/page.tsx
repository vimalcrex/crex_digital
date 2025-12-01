import { Metadata } from "next";
import {
  DollarSign,
  MousePointer,
  Eye,
  Users,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CustomerHeader } from "@/components/customer/header";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Analytics",
};

// Placeholder data
const stats = [
  {
    name: "Total Spend",
    value: 12450,
    previousValue: 11200,
    format: "currency",
    icon: DollarSign,
    color: "green",
  },
  {
    name: "Impressions",
    value: 345200,
    previousValue: 298000,
    format: "number",
    icon: Eye,
    color: "blue",
  },
  {
    name: "Clicks",
    value: 9420,
    previousValue: 8100,
    format: "number",
    icon: MousePointer,
    color: "purple",
  },
  {
    name: "Leads",
    value: 148,
    previousValue: 132,
    format: "number",
    icon: Users,
    color: "orange",
  },
];

const platformBreakdown = [
  {
    platform: "Google Ads",
    spend: 7250,
    impressions: 198000,
    clicks: 5420,
    leads: 86,
    ctr: 2.74,
    cpc: 1.34,
    color: "bg-red-500",
  },
  {
    platform: "Facebook",
    spend: 4200,
    impressions: 125000,
    clicks: 3400,
    leads: 52,
    ctr: 2.72,
    cpc: 1.24,
    color: "bg-blue-500",
  },
  {
    platform: "LinkedIn",
    spend: 1000,
    impressions: 22200,
    clicks: 600,
    leads: 10,
    ctr: 2.7,
    cpc: 1.67,
    color: "bg-sky-500",
  },
];

const propertyPerformance = [
  {
    property: "The Heights at Downtown",
    spend: 6800,
    leads: 82,
    costPerLead: 82.93,
    change: 12.5,
  },
  {
    property: "Park View Apartments",
    spend: 3650,
    leads: 45,
    costPerLead: 81.11,
    change: 8.2,
  },
  {
    property: "Sunset Ridge Living",
    spend: 2000,
    leads: 21,
    costPerLead: 95.24,
    change: -5.3,
  },
];

const weeklyData = [
  { week: "Week 1", spend: 2800, leads: 32 },
  { week: "Week 2", spend: 3100, leads: 38 },
  { week: "Week 3", spend: 3250, leads: 42 },
  { week: "Week 4", spend: 3300, leads: 36 },
];

const colorMap: Record<string, { bg: string; text: string }> = {
  green: { bg: "bg-green-100", text: "text-green-600" },
  blue: { bg: "bg-blue-100", text: "text-blue-600" },
  purple: { bg: "bg-purple-100", text: "text-purple-600" },
  orange: { bg: "bg-orange-100", text: "text-orange-600" },
};

function calculateChange(current: number, previous: number): number {
  return ((current - previous) / previous) * 100;
}

export default function AnalyticsPage() {
  return (
    <>
      <CustomerHeader
        title="Analytics"
        description="Track your marketing performance"
        action={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Last 30 Days
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        }
      />

      <div className="space-y-6 p-6">
        {/* Main Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const change = calculateChange(stat.value, stat.previousValue);
            const isPositive = change >= 0;

            return (
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
                        isPositive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {isPositive ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                      {Math.abs(change).toFixed(1)}%
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
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Platform Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {platformBreakdown.map((platform) => (
                  <div key={platform.platform} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{platform.platform}</span>
                      <span className="text-sm text-gray-500">
                        {formatCurrency(platform.spend)}
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                      <div
                        className={`h-full ${platform.color}`}
                        style={{
                          width: `${(platform.spend / 12450) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{platform.leads} leads</span>
                      <span>CTR: {platform.ctr}%</span>
                      <span>CPC: {formatCurrency(platform.cpc)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyData.map((week) => (
                  <div
                    key={week.week}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{week.week}</p>
                      <p className="text-sm text-gray-500">
                        {week.leads} leads generated
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {formatCurrency(week.spend)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatCurrency(week.spend / week.leads)}/lead
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Property Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Property Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm text-gray-500">
                    <th className="pb-3 font-medium">Property</th>
                    <th className="pb-3 font-medium text-right">Spend</th>
                    <th className="pb-3 font-medium text-right">Leads</th>
                    <th className="pb-3 font-medium text-right">Cost/Lead</th>
                    <th className="pb-3 font-medium text-right">Change</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {propertyPerformance.map((property) => (
                    <tr key={property.property} className="hover:bg-gray-50">
                      <td className="py-4 font-medium">{property.property}</td>
                      <td className="py-4 text-right">
                        {formatCurrency(property.spend)}
                      </td>
                      <td className="py-4 text-right">{property.leads}</td>
                      <td className="py-4 text-right">
                        {formatCurrency(property.costPerLead)}
                      </td>
                      <td className="py-4 text-right">
                        <span
                          className={`inline-flex items-center gap-1 ${
                            property.change >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {property.change >= 0 ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          {Math.abs(property.change)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Performance Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50">
              <p className="text-gray-500">
                Interactive performance chart will be displayed here
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
