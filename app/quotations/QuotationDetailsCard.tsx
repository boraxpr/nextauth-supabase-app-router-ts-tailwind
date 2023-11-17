'use client'
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import { useRef } from 'react';

export default function QuotationDetailsCard({ quotation }: { quotation: any }) {
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint content={() => componentRef.current}>
        <PrintContextConsumer>
          {({ handlePrint }) => (
            <button onClick={handlePrint}>Print to PDF</button>
          )}
        </PrintContextConsumer>
      </ReactToPrint>
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
    </div>
  );
}