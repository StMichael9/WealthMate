// components/CustomTooltip.jsx
function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <div className="bg-white text-sm shadow-lg rounded-md p-2 border border-gray-200">
        <p className="font-semibold text-gray-700">{name}</p>
        <p className="text-gray-500">${value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
}

export default CustomTooltip;
