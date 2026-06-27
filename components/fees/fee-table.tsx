import { Fee } from "@/types/fee";
import { DeleteFeeButton } from "@/components/fees/delete-fee-button";
import { UpdateFeeDialog } from "./update-fee-dialog"; 

interface Props {
  fees: Fee[];
}

export function FeeTable({ fees }: Props) {
  // Helper to format currency values safely
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD", 
    }).format(amount);
  };

  // Helper to format dates cleanly if they come in standard formats (YYYY-MM-DD)
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border-collapse table-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Student</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Amount</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Payment Date</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Remarks</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {fees.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-500">
                No fee records found.
              </td>
            </tr>
          ) : (
            fees.map((fee) => (
              <tr key={fee.id} className="group hover:bg-gray-50">
                {/* Student ID */}
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  {fee.studentName}
                </td>
                
                {/* Amount */}
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-semibold">
                  {formatCurrency(fee.amount)}
                </td>
                
                {/* Payment Date */}
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(fee.paymentDate)}
                </td>
                
                {/* Remarks */}
                <td className="px-4 py-3 text-sm text-gray-500 max-w-xs truncate" title={fee.remarks}>
                  {fee.remarks || <span className="text-gray-300 italic">None</span>}
                </td>
                
                {/* Actions */}
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <div className="flex items-center space-x-2">
                    <UpdateFeeDialog fee={fee} />
                    <DeleteFeeButton id={fee.id} />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}