import { Metadata } from "next";
import {
  Search,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  Building2,
  Download,
  Users,
  UserCheck,
  UserX,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CustomerHeader } from "@/components/customer/header";

export const metadata: Metadata = {
  title: "Leads",
};

// Placeholder data
const leads = [
  {
    id: "1",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@email.com",
    phone: "(512) 555-1234",
    property: "The Heights at Downtown",
    source: "Google Ads",
    status: "NEW",
    moveInDate: "2024-07-01",
    bedrooms: 2,
    createdAt: "2024-06-10T14:30:00",
  },
  {
    id: "2",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.j@email.com",
    phone: "(214) 555-5678",
    property: "Park View Apartments",
    source: "Facebook",
    status: "CONTACTED",
    moveInDate: "2024-08-15",
    bedrooms: 1,
    createdAt: "2024-06-09T10:15:00",
  },
  {
    id: "3",
    firstName: "Michael",
    lastName: "Williams",
    email: "m.williams@email.com",
    phone: "(713) 555-9012",
    property: "The Heights at Downtown",
    source: "Google Ads",
    status: "QUALIFIED",
    moveInDate: "2024-06-20",
    bedrooms: 3,
    createdAt: "2024-06-08T16:45:00",
  },
  {
    id: "4",
    firstName: "Emily",
    lastName: "Brown",
    email: "emily.brown@email.com",
    phone: "(512) 555-3456",
    property: "The Heights at Downtown",
    source: "LinkedIn",
    status: "CONVERTED",
    moveInDate: "2024-07-01",
    bedrooms: 2,
    createdAt: "2024-06-05T09:00:00",
  },
  {
    id: "5",
    firstName: "David",
    lastName: "Lee",
    email: "david.lee@email.com",
    phone: "(214) 555-7890",
    property: "Park View Apartments",
    source: "Facebook",
    status: "LOST",
    moveInDate: "2024-06-15",
    bedrooms: 1,
    createdAt: "2024-06-01T11:30:00",
  },
];

const statusColors: Record<string, "success" | "secondary" | "destructive" | "outline" | "default"> = {
  NEW: "default",
  CONTACTED: "outline",
  QUALIFIED: "secondary",
  CONVERTED: "success",
  LOST: "destructive",
};

const sourceColors: Record<string, string> = {
  "Google Ads": "bg-red-100 text-red-700",
  Facebook: "bg-blue-100 text-blue-700",
  LinkedIn: "bg-sky-100 text-sky-700",
  Direct: "bg-gray-100 text-gray-700",
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(dateString: string) {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function LeadsPage() {
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "NEW").length;
  const convertedLeads = leads.filter((l) => l.status === "CONVERTED").length;
  const conversionRate = ((convertedLeads / totalLeads) * 100).toFixed(1);

  return (
    <>
      <CustomerHeader
        title="Leads"
        description="Manage and track your leads"
        action={
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        }
      />

      <div className="p-6">
        {/* Stats */}
        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-blue-100 p-2">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalLeads}</p>
                <p className="text-sm text-gray-500">Total Leads</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-yellow-100 p-2">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{newLeads}</p>
                <p className="text-sm text-gray-500">New Leads</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-green-100 p-2">
                <UserCheck className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{convertedLeads}</p>
                <p className="text-sm text-gray-500">Converted</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-purple-100 p-2">
                <UserX className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{conversionRate}%</p>
                <p className="text-sm text-gray-500">Conversion Rate</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search leads..." className="pl-10" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        {/* Leads Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm text-gray-500">
                    <th className="pb-3 font-medium">Contact</th>
                    <th className="pb-3 font-medium">Property</th>
                    <th className="pb-3 font-medium">Source</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Move-in</th>
                    <th className="pb-3 font-medium">Beds</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-600">
                            {lead.firstName[0]}
                            {lead.lastName[0]}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {lead.firstName} {lead.lastName}
                            </p>
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {lead.email}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-1 text-sm">
                          <Building2 className="h-3 w-3 text-gray-400" />
                          {lead.property}
                        </div>
                      </td>
                      <td className="py-4">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                            sourceColors[lead.source] || sourceColors.Direct
                          }`}
                        >
                          {lead.source}
                        </span>
                      </td>
                      <td className="py-4">
                        <Badge variant={statusColors[lead.status]}>
                          {lead.status}
                        </Badge>
                      </td>
                      <td className="py-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-gray-400" />
                          {formatDate(lead.moveInDate)}
                        </div>
                      </td>
                      <td className="py-4 text-sm">{lead.bedrooms} BR</td>
                      <td className="py-4 text-sm text-gray-500">
                        <div>{formatDate(lead.createdAt)}</div>
                        <div className="text-xs">{formatTime(lead.createdAt)}</div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" title="Call">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Email">
                            <Mail className="h-4 w-4" />
                          </Button>
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
