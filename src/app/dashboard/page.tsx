
'use client';
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowDown, ArrowUp, Users, DollarSign, ShoppingCart } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { TrendingProductsSidebar } from '../components/ProductPanel'; 
import { Card, CardHeader, CardTitle, CardContent } from '../components/Examplecard';
type Metric = {
  title: string;
  value: number;
  change: number;
  icon: React.ReactNode;
};

type DataPoint = {
  name: string;
  value: number;
};


const metrics: Metric[] = [
  { title: "Total Users", value: 2453, change: 12.5, icon: <Users className="h-4 w-4" /> },
  { title: "Revenue", value: 45690, change: -2.3, icon: <DollarSign className="h-4 w-4" /> },
  { title: "Orders", value: 356, change: 8.1, icon: <ShoppingCart className="h-4 w-4" /> },
];

const chartData: DataPoint[] = [
  { name: 'Jan', value: 100 },
  { name: 'Feb', value: 120 },
  { name: 'Mar', value: 110 },
  { name: 'Apr', value: 140 },
  { name: 'May', value: 130 },
  { name: 'Jun', value: 160 },
];

const DashboardContent: React.FC = () => (
  <>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
            {metric.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metric.title === "Revenue" ? `$${metric.value.toLocaleString()}` : metric.value.toLocaleString()}
            </div>
            <p className="text-xs flex items-center">
              {metric.change > 0 ? (
                <ArrowUp className="text-green-500 mr-1 h-4 w-4" />
              ) : (
                <ArrowDown className="text-red-500 mr-1 h-4 w-4" />
              )}
              <span className={metric.change > 0 ? "text-green-500" : "text-red-500"}>
                {Math.abs(metric.change)}%
              </span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  </>
);

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <DashboardContent />;
      case "Inventory":
        return <div className="text-xl">Inventory</div>;
      case "Orders and Transactions":
        return <div className="text-xl">Orders and Transactions</div>;
      case "Financing":
        return <div className="text-xl">Financing</div>;
      case "Notifications":
        return <div className="text-xl">Notifications</div>;
      case "Settings":
        return <div className="text-xl">Settings</div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex overflow-hidden">
        <div className="p-8 w-full  bg-gray-100">
          <h2 className="text-2xl font-bold mb-4">{activeTab}</h2>
          {renderContent()}
        </div>
      </div>
      <div className="w-1/4 p-4">
        <TrendingProductsSidebar />
      </div>
    </div>
  );
};

export default Dashboard;