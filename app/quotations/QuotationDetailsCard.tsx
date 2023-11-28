'use client'
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import { useRef } from 'react';

export default function QuotationDetailsCard({ quotation }: { quotation: any }) {
  // For typescript, we need to specify the type of the ref
  const componentRef = useRef(null);
  return (
    <div>

      <div ref={componentRef} className="grid grid-rows-4 p-2 overflow-auto ">
        <div className=" p-2 text-center">{quotation?.doc_num}</div>
        <div className=" p-2 text-center">
          {(quotation.customers ? (quotation?.customers?.name) : "")}
        </div>
        <div className=" p-2 text-center">
          {quotation?.project_name}
        </div>
        <div className=" p-2 text-center">
          {quotation?.currency && (new Intl.NumberFormat('en-US', { style: 'currency', currency: quotation?.currency }).format(quotation.grand_total!))}
        </div>
        <div className=" p-2 text-center">
          <div>
            {quotation?.status}
          </div>
        </div>
      </div>
      <div className='flex justify-end p-5'>
        <ReactToPrint content={() => componentRef.current}>
          <PrintContextConsumer>
            {({ handlePrint }) => (
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg" onClick={handlePrint}>Print this out!</button>
            )}
          </PrintContextConsumer>
        </ReactToPrint>
      </div>
    </div>
  );
}