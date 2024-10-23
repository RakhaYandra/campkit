import { useQuery } from '@tanstack/react-query';
import { getUserBorrowings } from '../../services/api';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export default function Borrowings() {
  const { data: borrowings = [], isLoading } = useQuery({
    queryKey: ['borrowings'],
    queryFn: getUserBorrowings
  });

  const getStatusColor = (status) => {
    const statusColors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'confirmed': 'bg-blue-100 text-blue-800',
      'active': 'bg-green-100 text-green-800',
      'returned': 'bg-gray-100 text-gray-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'dd MMM yyyy');
    } catch {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Borrowings</h1>
      </div>

      {borrowings.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-gray-500">
            No borrowing history found
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {borrowings.map((borrowing) => (
            <Card key={borrowing.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Booking Code</p>
                    <p className="font-semibold">{borrowing.booking_code}</p>
                  </div>
                  <Badge className={`${getStatusColor(borrowing.status)}`}>
                    {borrowing.status}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Items</p>
                    <div className="space-y-2">
                      {borrowing.items?.map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span>{item.product_name} x{item.quantity}</span>
                          <span>${item.subtotal}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Borrow Date</p>
                        <p>{formatDate(borrowing.borrow_date)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Return Date</p>
                        <p>{formatDate(borrowing.return_date)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Total Price</p>
                        <p className="font-semibold">${borrowing.total_price}</p>
                      </div>
                    </div>
                  </div>

                  {borrowing.admin_notes && (
                    <div className="border-t pt-4">
                      <p className="text-sm text-gray-500">Admin Notes</p>
                      <p className="text-sm mt-1">{borrowing.admin_notes}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}