import { Metadata } from "next";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  ExternalLink,
  Eye,
  FileText,
  Copy,
  Building2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CustomerHeader } from "@/components/customer/header";

export const metadata: Metadata = {
  title: "Landing Pages",
};

// Placeholder data
const landingPages = [
  {
    id: "1",
    title: "Summer Special - The Heights",
    slug: "heights-summer-special",
    status: "PUBLISHED",
    property: "The Heights at Downtown",
    views: 1245,
    submissions: 48,
    conversionRate: 3.86,
    lastUpdated: "2024-06-15",
  },
  {
    id: "2",
    title: "Park View - Fall Move-In",
    slug: "parkview-fall-movein",
    status: "PUBLISHED",
    property: "Park View Apartments",
    views: 892,
    submissions: 32,
    conversionRate: 3.59,
    lastUpdated: "2024-08-20",
  },
  {
    id: "3",
    title: "Luxury Living Showcase",
    slug: "heights-luxury-living",
    status: "DRAFT",
    property: "The Heights at Downtown",
    views: 0,
    submissions: 0,
    conversionRate: 0,
    lastUpdated: "2024-09-01",
  },
  {
    id: "4",
    title: "Senior Living Open House",
    slug: "sunset-senior-openhouse",
    status: "ARCHIVED",
    property: "Sunset Ridge Living",
    views: 456,
    submissions: 15,
    conversionRate: 3.29,
    lastUpdated: "2024-04-10",
  },
];

const statusColors: Record<string, "success" | "secondary" | "destructive" | "outline"> = {
  PUBLISHED: "success",
  DRAFT: "outline",
  ARCHIVED: "secondary",
};

export default function LandingPagesPage() {
  const totalViews = landingPages.reduce((sum, p) => sum + p.views, 0);
  const totalSubmissions = landingPages.reduce((sum, p) => sum + p.submissions, 0);
  const publishedPages = landingPages.filter((p) => p.status === "PUBLISHED").length;

  return (
    <>
      <CustomerHeader
        title="Landing Pages"
        description="Create and manage your property landing pages"
        action={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Landing Page
          </Button>
        }
      />

      <div className="p-6">
        {/* Stats */}
        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-blue-100 p-2">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{publishedPages}</p>
                <p className="text-sm text-gray-500">Published Pages</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-green-100 p-2">
                <Eye className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Total Views</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-purple-100 p-2">
                <FileText className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalSubmissions}</p>
                <p className="text-sm text-gray-500">Form Submissions</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-orange-100 p-2">
                <Eye className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">3.62%</p>
                <p className="text-sm text-gray-500">Avg. Conversion</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search landing pages..." className="pl-10" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        {/* Landing Pages Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {landingPages.map((page) => (
            <Card key={page.id} className="overflow-hidden">
              {/* Preview Placeholder */}
              <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileText className="h-12 w-12 text-gray-300" />
                </div>
                <div className="absolute right-2 top-2">
                  <Badge variant={statusColors[page.status]}>{page.status}</Badge>
                </div>
                <div className="absolute bottom-2 right-2 flex gap-1">
                  <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-900">{page.title}</h3>
                  <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                    <Building2 className="h-3 w-3" />
                    {page.property}
                  </div>
                </div>

                <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
                  <code className="rounded bg-gray-100 px-2 py-0.5 text-xs">
                    /{page.slug}
                  </code>
                </div>

                <div className="grid grid-cols-3 gap-4 border-t pt-4">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">
                      {page.views.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">Views</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">
                      {page.submissions}
                    </p>
                    <p className="text-xs text-gray-500">Leads</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">
                      {page.conversionRate}%
                    </p>
                    <p className="text-xs text-gray-500">Conv.</p>
                  </div>
                </div>

                <div className="mt-4 flex justify-between border-t pt-4">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Add Landing Page Card */}
          <Card className="flex min-h-[380px] cursor-pointer items-center justify-center border-2 border-dashed border-gray-200 bg-gray-50 transition-colors hover:border-blue-300 hover:bg-blue-50">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Plus className="h-6 w-6 text-blue-600" />
              </div>
              <p className="font-medium text-gray-900">Create Landing Page</p>
              <p className="mt-1 text-sm text-gray-500">
                Build a new page from template
              </p>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
