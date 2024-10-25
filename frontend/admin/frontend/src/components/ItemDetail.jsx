import React from "react";

const ItemDetail = ({ item, zIndex }) => {
  return (
    <div
      className="item-detail"
      style={{ position: "relative", zIndex: zIndex }}
    >
      <h2>Item Details</h2>
      <p>
        <strong>ID:</strong> {item.id}
      </p>
      <p>
        <strong>Name:</strong> {item.name}
      </p>
      <p>
        <strong>Code:</strong> {item.code}
      </p>
      <p>
        <strong>Price:</strong> ${item.price}
      </p>
      <p>
        <strong>Available:</strong> {item.isAvailable ? "Yes" : "No"}
      </p>
      <div>
        <strong>Categories:</strong>
        <ul>
          {item.Categories.map((category, index) => (
            <li key={index}>{category.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ItemDetail;
