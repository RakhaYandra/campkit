// src/pages/ProductDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useState } from "react";

const dummyProduct = {
  id: 1,
  name: "Tent",
  description: "A spacious 4-person tent.",
  price_per_day: 20,
  available_quantity: 5,
  image_urls: ["/images/tent.jpg"],
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [dates, setDates] = useState({
    borrow_date: "",
    return_date: "",
  });

  const product = dummyProduct; // Use dummy data

  const handleBorrow = () => {
    const days = Math.ceil(
      (new Date(dates.return_date) - new Date(dates.borrow_date)) /
        (1000 * 60 * 60 * 24)
    );

    // Dummy borrow action
    console.log({
      items: [
        {
          product_id: product.id,
          quantity: parseInt(quantity),
          price_per_day: product.price_per_day,
          subtotal: product.price_per_day * days * quantity,
        },
      ],
      borrow_date: dates.borrow_date,
      return_date: dates.return_date,
      total_price: product.price_per_day * days * quantity,
    });

    // Navigate to borrowings page
    navigate("/borrowings");
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="space-y-6 p-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Borrow Date</label>
            <Input
              type="date"
              value={dates.borrow_date}
              onChange={(e) =>
                setDates({ ...dates, borrow_date: e.target.value })
              }
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Return Date</label>
            <Input
              type="date"
              value={dates.return_date}
              onChange={(e) =>
                setDates({ ...dates, return_date: e.target.value })
              }
              min={dates.borrow_date}
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Quantity</label>
          <Input
            type="number"
            min="1"
            max={product.available_quantity}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between text-lg font-medium">
            <span>Price per day:</span>
            <span>${product.price_per_day}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-gray-50">
        <Button
          className="w-full"
          onClick={handleBorrow}
          disabled={!dates.borrow_date || !dates.return_date}
        >
          Confirm Borrowing
        </Button>
      </CardFooter>
    </Card>
  );
}
