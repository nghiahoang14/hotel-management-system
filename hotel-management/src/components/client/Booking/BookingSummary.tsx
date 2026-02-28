/* eslint-disable @typescript-eslint/no-explicit-any */
export const BookingSummary = ({ selections, nights }: any) => {
  const total = selections.reduce(
   
    (sum: number, r: any) =>
      sum + r.qty * r.price * nights,
    0
  );

  return (
    <div className="sticky top-28 border p-6 bg-white">
      <h3 className="text-lg font-semibold mb-4">
        Chọn phòng
      </h3>

      {selections.length === 0 && (
        <p className="text-sm text-gray-500">
          Chưa chọn phòng
        </p>
      )}

      {selections.map((r: any) => (
        <div key={r._id} className="flex justify-between mb-3">
          <div>
            <p className="font-medium">{r.name}</p>
            <p className="text-sm text-gray-500">
              {r.qty} phòng
            </p>
          </div>
          <p>
            {(r.qty * r.price * nights).toLocaleString()} ₫
          </p>
        </div>
      ))}

      <div className="border-t pt-4 mt-4 flex justify-between font-semibold">
        <span>Tổng</span>
        <span>{total.toLocaleString()} ₫</span>
      </div>

      <button
        disabled={total === 0}
        className="w-full mt-6 bg-[#A18348] text-white py-3 uppercase disabled:opacity-40"
      >
        KẾ TIẾP
      </button>
    </div>
  );
};
