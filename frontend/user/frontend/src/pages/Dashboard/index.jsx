import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { getBorrowingStats, getActiveBorrowings } from '@/services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from '@/context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  
  const { data: stats } = useQuery({
    queryKey: ['borrowing-stats'],
    queryFn: getBorrowingStats
  });

  const { data: activeBorrowings } = useQuery({
    queryKey: ['active-borrowings'],
    queryFn: getActiveBorrowings,
    refetchInterval: 1000 * 60 * 60 // Refetch every hour
  });

  // Check for overdue items
  const overdueItems = activeBorrowings?.filter(item => 
    new Date(item.return_date) < new Date()
  ) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="text-sm">
            Welcome back, <span className="font-medium">{user?.username}</span>
          </div>
        </div>
      </div>

      {/* Alerts for overdue items */}
      {overdueItems.length > 0 && (
        <Alert variant="destructive">
          <AlertDescription>
            You have {overdueItems.length} overdue item(s). Please return them as soon as possible to avoid additional charges.
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Borrowings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.totalBorrowings || 0}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Active Borrowings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.activeBorrowings || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Out of max 2 allowed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Spent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats?.totalSpent || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Borrowing History Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Borrowing History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.monthlyBorrowings || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  tickFormatter={(value) => format(parseISO(value), 'MMM')}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(value) => format(parseISO(value), 'MMMM yyyy')}
                  formatter={(value) => [`${value} items`, 'Borrowings']}
                />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Active Borrowings */}
      <Card>
        <CardHeader>
          <CardTitle>Active Borrowings</CardTitle>
        </CardHeader>
        <CardContent>
          {activeBorrowings?.length === 0 ? (
            <p className="text-center text-muted-foreground">No active borrowings</p>
          ) : (
            <div className="space-y-4">
              {activeBorrowings?.map((borrowing) => (
                <div key={borrowing.id} className="flex justify-between items-center border-b pb-4">
                  <div>
                    <p className="font-medium">{borrowing.items[0].product_name}</p>
                    <p className="text-sm text-muted-foreground">
                      Due: {format(parseISO(borrowing.return_date), 'dd MMM yyyy')}
                    </p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-sm ${
                    new Date(borrowing.return_date) < new Date()
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {new Date(borrowing.return_date) < new Date() ? 'Overdue' : 'Active'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}