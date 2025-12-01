import { Metadata } from "next";
import {
  Building2,
  Plus,
  MapPin,
  Home,
  MoreVertical,
  Search,
  Filter,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CustomerHeader } from "@/components/customer/header";

export const metadata: Metadata = {
  title: "Properties",
};

// Placeholder data - will be replaced with real data from Supabase
const properties = [
  {
    id: "1",
    name: "The Heights at Downtown",
    type: "APARTMENT",
    status: "ACTIVE",
    address: "123 Main Street",
    city: "Austin",
    state: "TX",
    zip: "78701",
    units: 250,
    activeCampaigns: 2,
    totalLeads: 48,
    monthlySpend: 2140,
  },
  {
    id: "2",
    name: "Park View Apartments",
    type: "APARTMENT",
    status: "ACTIVE",
    address: "456 Oak Avenue",
    city: "Dallas",
    state: "TX",
    zip: "75201",
    units: 180,
    activeCampaigns: 1,
    totalLeads: 32,
    monthlySpend: 890,
  },
  {
    id: "3",
    name: "Sunset Ridge Living",
    type: "SENIOR_LIVING",
    status: "PAUSED",
    address: "789 Sunset Blvd",
    city: "Houston",
    state: "TX",
    zip: "77001",
    units: 120,
    activeCampaigns: 0,
    totalLeads: 15,
    monthlySpend: 0,
  },
];

const propertyTypeLabels: Record<string, string> = {
  APARTMENT: "Apartment",
  STUDENT_HOUSING: "Student Housing",
  SENIOR_LIVING: "Senior Living",
  BUILD_TO_RENT: "Build to Rent",
  OFFICE: "Office",
  RETAIL: "Retail",
  INDUSTRIAL: "Industrial",
  MIXED_USE: "Mixed Use",
};

export default function PropertiesPage() {
  return (
    <>
      <CustomerHeader
        title="Properties"
        description="Manage your property listings"
        action={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Property
          </Button>
        }
      />

      <div className="p-6">
        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search properties..."
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <Card key={property.id} className="overflow-hidden">
              {/* Property Image Placeholder */}
              <div className="relative h-40 bg-gradient-to-br from-blue-500 to-blue-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Building2 className="h-16 w-16 text-white/30" />
                </div>
                <div className="absolute right-2 top-2">
                  <Badge
                    variant={property.status === "ACTIVE" ? "success" : "secondary"}
                  >
                    {property.status}
                  </Badge>
                </div>
                <button className="absolute right-2 bottom-2 rounded-full bg-white/20 p-1.5 hover:bg-white/30">
                  <MoreVertical className="h-4 w-4 text-white" />
                </button>
              </div>

              <CardContent className="p-4">
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-900">{property.name}</h3>
                  <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="h-3 w-3" />
                    {property.city}, {property.state}
                  </div>
                </div>

                <div className="mb-4 flex items-center gap-2">
                  <Badge variant="outline">
                    <Home className="mr-1 h-3 w-3" />
                    {propertyTypeLabels[property.type]}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {property.units} units
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 border-t pt-4">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">
                      {property.activeCampaigns}
                    </p>
                    <p className="text-xs text-gray-500">Campaigns</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">
                      {property.totalLeads}
                    </p>
                    <p className="text-xs text-gray-500">Leads</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">
                      ${property.monthlySpend.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">MTD Spend</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Add Property Card */}
          <Card className="flex min-h-[320px] cursor-pointer items-center justify-center border-2 border-dashed border-gray-200 bg-gray-50 transition-colors hover:border-blue-300 hover:bg-blue-50">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Plus className="h-6 w-6 text-blue-600" />
              </div>
              <p className="font-medium text-gray-900">Add New Property</p>
              <p className="mt-1 text-sm text-gray-500">
                Start advertising a new property
              </p>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
