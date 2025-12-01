import { Metadata } from "next";
import {
  User,
  Building2,
  Bell,
  Shield,
  Link2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Save,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CustomerHeader } from "@/components/customer/header";

export const metadata: Metadata = {
  title: "Settings",
};

// Placeholder data
const user = {
  name: "John Doe",
  email: "john@example.com",
  phone: "(512) 555-1234",
  role: "CUSTOMER",
};

const organization = {
  name: "Acme Property Management",
  type: "MULTIFAMILY",
  website: "https://acmeproperties.com",
  phone: "(512) 555-0000",
  address: "123 Main Street",
  city: "Austin",
  state: "TX",
  zip: "78701",
};

const integrations = [
  {
    name: "Google Ads",
    description: "Connect your Google Ads account",
    connected: true,
    icon: "G",
    color: "bg-red-500",
  },
  {
    name: "Facebook Ads",
    description: "Connect your Facebook Business account",
    connected: true,
    icon: "f",
    color: "bg-blue-600",
  },
  {
    name: "LinkedIn Ads",
    description: "Connect your LinkedIn Campaign Manager",
    connected: false,
    icon: "in",
    color: "bg-sky-600",
  },
];

const notifications = [
  {
    id: "new_lead",
    label: "New Lead Notifications",
    description: "Get notified when a new lead is captured",
    email: true,
    push: true,
  },
  {
    id: "campaign_alerts",
    label: "Campaign Alerts",
    description: "Alerts for campaign performance issues",
    email: true,
    push: false,
  },
  {
    id: "weekly_reports",
    label: "Weekly Reports",
    description: "Receive weekly performance summaries",
    email: true,
    push: false,
  },
  {
    id: "billing",
    label: "Billing Notifications",
    description: "Invoice and payment notifications",
    email: true,
    push: false,
  },
];

export default function SettingsPage() {
  return (
    <>
      <CustomerHeader
        title="Settings"
        description="Manage your account and preferences"
      />

      <div className="space-y-6 p-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Settings
            </CardTitle>
            <CardDescription>
              Update your personal information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <Input defaultValue={user.name} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <Input type="email" defaultValue={user.email} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <Input type="tel" defaultValue={user.phone} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Role
                </label>
                <Input defaultValue={user.role} disabled />
              </div>
            </div>
            <div className="flex justify-end">
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Organization Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Organization Settings
            </CardTitle>
            <CardDescription>
              Manage your organization information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Organization Name
                </label>
                <Input defaultValue={organization.name} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Organization Type
                </label>
                <Input defaultValue={organization.type} disabled />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  <Globe className="mr-1 inline h-4 w-4" />
                  Website
                </label>
                <Input type="url" defaultValue={organization.website} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  <Phone className="mr-1 inline h-4 w-4" />
                  Phone
                </label>
                <Input type="tel" defaultValue={organization.phone} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                <MapPin className="mr-1 inline h-4 w-4" />
                Address
              </label>
              <Input defaultValue={organization.address} />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">City</label>
                <Input defaultValue={organization.city} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">State</label>
                <Input defaultValue={organization.state} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  ZIP Code
                </label>
                <Input defaultValue={organization.zip} />
              </div>
            </div>
            <div className="flex justify-end">
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Integrations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link2 className="h-5 w-5" />
              Ad Platform Integrations
            </CardTitle>
            <CardDescription>
              Connect your advertising accounts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {integrations.map((integration) => (
                <div
                  key={integration.name}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${integration.color} text-sm font-bold text-white`}
                    >
                      {integration.icon}
                    </div>
                    <div>
                      <p className="font-medium">{integration.name}</p>
                      <p className="text-sm text-gray-500">
                        {integration.description}
                      </p>
                    </div>
                  </div>
                  {integration.connected ? (
                    <div className="flex items-center gap-2">
                      <Badge variant="success">Connected</Badge>
                      <Button variant="outline" size="sm">
                        Disconnect
                      </Button>
                    </div>
                  ) : (
                    <Button size="sm">Connect</Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Settings
            </CardTitle>
            <CardDescription>
              Configure how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium">{notification.label}</p>
                    <p className="text-sm text-gray-500">
                      {notification.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        defaultChecked={notification.email}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <Mail className="h-4 w-4 text-gray-400" />
                      Email
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        defaultChecked={notification.push}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <Bell className="h-4 w-4 text-gray-400" />
                      Push
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security
            </CardTitle>
            <CardDescription>
              Manage your account security
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium">Password</p>
                <p className="text-sm text-gray-500">
                  Last changed 30 days ago
                </p>
              </div>
              <Button variant="outline">Change Password</Button>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-gray-500">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Button variant="outline">Enable 2FA</Button>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium">Active Sessions</p>
                <p className="text-sm text-gray-500">
                  Manage devices where you&apos;re logged in
                </p>
              </div>
              <Button variant="outline">View Sessions</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
