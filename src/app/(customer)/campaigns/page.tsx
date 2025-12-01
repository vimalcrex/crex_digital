import { Metadata } from "next";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Play,
  Pause,
  DollarSign,
  MousePointer,
  Users,
  Eye,
  Building2,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CustomerHeader } from "@/components/customer/header";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Campaigns",
};

// Placeholder data
const campaigns = [
  {
    id: "1",
    name: "Summer Leasing Special",
    property: "The Heights at Downtown",
    status: "ACTIVE",
    goal: "LEASING",
    platform: "GOOGLE",
    dailyBudget: 50,
    totalSpend: 1250,
    impressions: 45200,
    clicks: 1280,
    leads: 12,
    ctr: 2.83,
    cpc: 0.98,
    startDate: "2024-06-01",
  },
  {
    id: "2",
    name: "Fall Move-In Promo",
    property: "Park View Apartments",
    status: "ACTIVE",
    goal: "LEASING",
    platform: "FACEBOOK",
    dailyBudget: 35,
    totalSpend: 890,
    impressions: 32100,
    clicks: 856,
    leads: 8,
    ctr: 2.67,
    cpc: 1.04,
    startDate: "2024-08-15",
  },
  {
    id: "3",
    name: "Luxury Living Campaign",
    property: "The Heights at Downtown",
    status: "PAUSED",
    goal: "BRAND_AWARENESS",
    platform: "GOOGLE",
    dailyBudget: 75,
    totalSpend: 2100,
    impressions: 89000,
    clicks: 2450,
    leads: 28,
    ctr: 2.75,
    cpc: 0.86,
    startDate: "2024-05-01",
  },
  {
    id: "4",
    name: "Senior Living Open House",
    property: "Sunset Ridge Living",
    status: "DRAFT",
    goal: "LEASING",
    platform: "FACEBOOK",
    dailyBudget: 40,
    totalSpend: 0,
    impressions: 0,
    clicks: 0,
    leads: 0,
    ctr: 0,
    cpc: 0,
    startDate: null,
  },
];

const platformColors: Record<string, string> = {
  GOOGLE: "bg-red-100 text-red-700",
  FACEBOOK: "bg-blue-100 text-blue-700",
  LINKEDIN: "bg-sky-100 text-sky-700",
};

const statusColors: Record<string, "success" | "secondary" | "destructive" | "outline"> = {
  ACTIVE: "success",
  PAUSED: "secondary",
  DRAFT: "outline",
  COMPLETED: "secondary",
  ARCHIVED: "destructive",
};

const goalLabels: Record<string, string> = {
  LEASING: "Leasing",
  LEASE_UP: "Lease-Up",
  ACQUISITION: "Acquisition",
  DISPOSITION: "Disposition",
  BRAND_AWARENESS: "Brand Awareness",
};

export default function CampaignsPage() {
  // Calculate totals
  const totalSpend = campaigns.reduce((sum, c) => sum + c.totalSpend, 0);
  const totalLeads = campaigns.reduce((sum, c) => sum + c.leads, 0);
  const activeCampaigns = campaigns.filter((c) => c.status === "ACTIVE").length;

  return (
    <>
      <CustomerHeader
        title="Campaigns"
        description="Manage your advertising campaigns"
        action={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Campaign
          </Button>
        }
      />

      <div className="p-6">
        {/* Stats */}
        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-green-100 p-2">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{formatCurrency(totalSpend)}</p>
                <p className="text-sm text-gray-500">Total Spend</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-blue-100 p-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeCampaigns}</p>
                <p className="text-sm text-gray-500">Active Campaigns</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-purple-100 p-2">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalLeads}</p>
                <p className="text-sm text-gray-500">Total Leads</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-orange-100 p-2">
                <MousePointer className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">2.73%</p>
                <p className="text-sm text-gray-500">Avg. CTR</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search campaigns..." className="pl-10" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        {/* Campaigns Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm text-gray-500">
                    <th className="pb-3 font-medium">Campaign</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Platform</th>
                    <th className="pb-3 font-medium text-right">Budget/Day</th>
                    <th className="pb-3 font-medium text-right">Spend</th>
                    <th className="pb-3 font-medium text-right">Impr.</th>
                    <th className="pb-3 font-medium text-right">Clicks</th>
                    <th className="pb-3 font-medium text-right">CTR</th>
                    <th className="pb-3 font-medium text-right">Leads</th>
                    <th className="pb-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {campaigns.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-gray-50">
                      <td className="py-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {campaign.name}
                          </p>
                          <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                            <Building2 className="h-3 w-3" />
                            {campaign.property}
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <Badge variant={statusColors[campaign.status]}>
                          {campaign.status}
                        </Badge>
                      </td>
                      <td className="py-4">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                            platformColors[campaign.platform]
                          }`}
                        >
                          {campaign.platform}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        {formatCurrency(campaign.dailyBudget)}
                      </td>
                      <td className="py-4 text-right font-medium">
                        {formatCurrency(campaign.totalSpend)}
                      </td>
                      <td className="py-4 text-right">
                        {campaign.impressions.toLocaleString()}
                      </td>
                      <td className="py-4 text-right">
                        {campaign.clicks.toLocaleString()}
                      </td>
                      <td className="py-4 text-right">{campaign.ctr}%</td>
                      <td className="py-4 text-right font-medium">
                        {campaign.leads}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center justify-end gap-1">
                          {campaign.status === "ACTIVE" ? (
                            <Button variant="ghost" size="sm" title="Pause">
                              <Pause className="h-4 w-4" />
                            </Button>
                          ) : campaign.status !== "COMPLETED" ? (
                            <Button variant="ghost" size="sm" title="Start">
                              <Play className="h-4 w-4" />
                            </Button>
                          ) : null}
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
