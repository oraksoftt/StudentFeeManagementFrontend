import { getFees } from "@/services/fee.service";
import { CreateFeeDialog } from "@/components/fees/create-fee-dialog";
import { FeeTable } from "@/components/fees/fee-table";
export default async function FeesPage() {
  const data = await getFees();
  const fees = data?.data || [];
 
   return (
     <>
       <div className="flex justify-between mb-4">
         <h1 className="text-2xl font-bold">
           Fee
         </h1>
       </div>
 
       <CreateFeeDialog />
       <FeeTable fees={fees} />
     </>
   );
}