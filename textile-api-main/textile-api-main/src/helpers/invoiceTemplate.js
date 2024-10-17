
const invoiceTemplate= (data)=>{
    var total = 0
    data.product.forEach(element => {
        total+=parseInt(element.quantity);
        
    });

    var totalValue = 0
    data.product.forEach(element => {
        totalValue+=parseInt(element.value);
        
    });
    
    
    return(`<!DOCTYPE html>
<html>
  <head> 
  <style>
      body{
          padding: 20px;
          font-size: 10px;
          font-family: 'Segoe UI';
          font-weight: 500;
      }
      p{
          padding: 0px;
          margin: 2px;
      }
      
      .heading{
          margin-bottom: 2px;
          font-size: 12px;
          color: purple;
      }
      
      .con{
          border: 1px solid black;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 5px;
      }
      .logo{
          height: 100px;
      }
      .con1{
          width: 50%;
      }
      table{
          border: 1px;
          border-collapse:collapse;
      }
      th,td{
          border: 1px solid black;
          padding: 4px;
      }
      tr,td{
          border-top: none;
          border-bottom:none;   
      }
      
  </style>
  </head>
  <body>
      <div style="border: 1px solid black;">
          <p style="text-align: center;">TAXABLE INVOICE</p>
      </div>
    <div class="con">
        <div style="display:flex; align-items:center; justify-content:center;">
            <img class="logo" src='http://localhost:3001/src/assets/logo.jpg' alt="logo"/>
            <div>
                <h3 class="heading">Ashok Textile</h3>
                <p class="heading">Admin Division</p>
                <p>No. 10/243 - A,Thuraiyur Main Road,<br>Namakkal - 637013<br>TamilNadu,India.  Phone: 04286 - 253077, 04286-252018</p>
            </div>
        </div>
        <div style="display:flex">
            <div>
                <p>GSTIN</p>
                <P>PAN</P>
                <P>CIN</P>
                <p>Fax</p>
                <p>Email</p>
                <p>Website</p>
            </div>
            <div style="margin-left: 5px">
                <p>: 33AFCPA0546G2Z6</p>
                <p>: AFCPA0546G</p>
                <p>: U17111TZ1995PTC005791</p>
                <p>: 04286-252690</p>
                <p>: marketing@ashoktextilemills.com</p>
                <p>: www.ashoktextilemills.com</p>
            </div>
        </div>
    </div>
    
    <div style="display:flex;">
        <div style="border: 1px solid black;" class="con1">
            <div style="display:flex; padding:8px;">
            <div>
                <p>Invoice Serial Number</p>
                <P>Invoice Date</P>
                <P>E-WAY Bill No.</P>
                <p>IR.No.</p>
                <p>Ack.no</p>
                <p>Ack.Date</p>
                <p>Agent Name</p>
            </div>
            <div style="margin-left: 5px">
                <p>: AT/FI/00507</p>
                <p>: 11/06/2024</p>
                <p>: 551663050742</p>
                <p>: C8CN8N80987987HN9877655</p>
                <p>: 152418265150558</p>
                <p>: 11/06/2024</p>
                <p>: DIRECT</p>
            </div>
        </div>
        </div>
        <div class="con1" style="border: 1px solid black;">
            <div style="display:flex; padding:8px;">
            <div>
                <p>TransportName</p>
                <P>Vehile No</P>
                <P>Date&Time of Supply</P>
                <p>Place of Supply</p>
                <p>Customer PO No./Date</p>
                <p>Payment Terms</p>
                <p>LR No.</p>
                <p>LR Date.</p>
            </div>
            <div style="margin-left: 5px">
                <p>: BCC TRANSPORT</p>
                <p>: TN 90 A 1760</p>
                <p>: 11/06/2024</p>
                <p>: SURAT</p>
                <p>: PHONE/30/05/24</p>
                <p>: AGAINST</p>
                <p>: </p>
                <p>: 11/06/2024</p>
            </div>
        </div>
        </div>
    </div>
    <div style="display:flex;">
        <div class="con1" style="border: 1px solid black; text-align:center;">Details of Receiver (Billed to)</div>
        <div class="con1" style="border: 1px solid black; text-align:center;">Details of Consignee (Shiped to)</div>
    </div>
    <div style="display:flex;">
        <div class="con1" style="border: 1px solid black;">
            <div style="display:flex; padding:8px;">
            <div>
                <p>Name</p>
                <P style=''>Address</P>
                <P>GSTIN</P>
                <p>State Code</p>
                <p>PAN</p>
            </div>
            <div style="margin-left: 5px">
                <p>: MAHALAXMI INDUSTRIES FAB PVT LTD</p>
                <p>: 105,manzine,new cloth market sarangpur ahmedabad-380002</p>
                <p>: 24AAPCM8654C1Z9</p>
                <p>: 24</p>
                <p>: AAPCM8654C</p>
            </div>
        </div>
        </div>
        <div class="con1" style="border: 1px solid black;">
            <div style="display:flex; padding:8px;">
            <div>
               <p>Name</p>
                <P>Address</P>
                <P>GSTIN</P>
                <p>State Code</p>
                <p>PAN</p>
            </div>
            <div style="margin-left: 5px">
                <p>: VIKAS TRENDZ PRIVATE LIMITED</p>
                <p>: block no-505, NH-8 road, palsana,surat-394315 </p>
                <p>: 24AADCV4818M1Z1</p>
                <p>: 24</p>
                <p>: AADCV4818M</p>
            </div>
        </div>
        </div>
    </div>
    <table style="width:100%">
        <tr>
            <th>S.No</th>
            <th style="width:250px;">Description of Goods</th>
            <th>HSN Code</th>
            <th>Quantity in Meter</th>
            <th>Unit</th>
            <th>Rate (per item)</th>
            <th>Value (Rs.)</th>
        </tr>
        
        ${data.product.map((item,index)=>
            (`<tr>
                <td style="text-align:center;">${index+1}</td>
                <td>${item.name}</td>
                <td style="text-align:center;">${item.hsncode}</td>
                <td style="text-align:center;">${item.quantity}</td>
                <td style="text-align:center;">${item.unit}</td>
                <td style="text-align:center;">${item.rate}</td>
                <td style="text-align:end;">${item.value}</td>
            </tr>`

            )
        )
    }




        <tr>
            <th style="border-right:none; border-bottom:none; text-align:center;" colspan="3">Total</th>
            <td style="border:none; border-top:1px solid; text-align:center;">${total}</td>
            <td style="border:none; border-top:1px solid;" colspan="2"></td>
            <td style=" text-align:end; border:none; border-top:1px solid; border-right:1px solid;">${totalValue}</td>
            
        </tr>
    </table>
    <div style="border: 1px solid black; display:flex;" >
        <div style="width:66.66%;">
            <div style="display:flex;border: 1px solid black;">
            <p>Pack.Slip No.:<span></span></p>
            <p style="margin-left:200px;">No.of Bales/Rolls :<span></span></p>
        </div>
        <div style="display:flex;">
            <div style="width:50%; padding:6px; border: 1px solid black;">
                <p style="text-decoration: underline;">BankDetails</p>
                <div  style="display:flex;">
                    <div>
                        <p>Bank Name</p>
                        <p>Branch</p>
                        <p>Bank Address</p>
                        <p>Bank A/C No.</p>
                        <p>RTGS / IFSC Code</p>
                        <p>Tax is Payable in<br> Reverse Charges</p>
                    </div>
                    <div>
                    <p>: INDIAN BANK</p>
                    <p>: NAMAKKAL</p>
                    <p>:  No.31 RANGAR SANNADHI  Street</p>
                    <p>: 7471513244</p>
                    <p>: IDIB000N011</p>
                    <p>: No</p>
                </div>
                </div>
            </div>
            <div  style="width:50%; border:1px solid black; display:flex; justify-content:center; align-items:center;">
                <img src="https://api.qrserver.com/v1/create-qr-code/?data=https://ashoktextiles.s3.amazonaws.com/invoice/invoice_${data.orderno}.pdf&amp;size=150x150"/>
            </div>
            
        </div>
        </div>
        
    
    
    <div style="width:33.33%;border: 1px solid black;" >
                <div style=" display:flex;">
                    <div style=" width:50%;">
                        <p>Discount</p>
                        <p>Freight</p>
                        <p>Insurance</p>
                        <p>Packing and Handling</p>
                        <p>Others</p>
                        <p>Total Taxable Value</p>
                        <p>CGST</p>
                        <p>SGST</p>
                        <p>IGST <span>5.00%</span></p>
                        <p>TCS <span>0.00</span></p>
                        <p>Round Off</p>
                        <p >Grand Total Amount</p>
                    </div>
                    <div style="margin-left:20px; width:50%;">
                    <p>: <span style="float:right;">200</span></p>
                    <p>: <span style="float:right;">0</span></p>
                    <p>: <span style="float:right;">0</span></p>
                    <p>: <span style="float:right;">0</span></p>
                    <p>: <span style="float:right;">0</span></p>
                    <p>: <span style="float:right;">0</span></p>
                    <p>: <span style="float:right;">0</span></p>
                    <p>: <span style="float:right;">0</span></p>
                    <p>: <span style="float:right;">0</span></p>
                    <p>: <span style="float:right;">0</span></p>
                    <p>: <span style="float:right;">0</span></p>
                    <p style="background-color:lightgray;">: <span style="float:right;">0</span></p>
                </div>
                </div>
                
            </div>
    </div>
    
    
    <div style="padding:8px; border:1px solid">
        <p>Terms & Conditions</p>
        <p>1.Certified that amount indicated in this document represents the price actually charged by us and there is no additional consideration flowing directly or 
indirectly from such sales over and above what has been declared.<br>2.Any Dispute/Claim under this invoice shall be referred to the Sole Arbitrator appointed  
by Managing Director of M/s.Ashok Textile as per the provisions contemplated under the Arbitration and Conciliation Act 1996. 
<br>3.The Venue and Jurisdiction for Arbitration and for Court proceedings will be at Namakkal only4.Goods once sold will not be taken back.5.Our responsibility  
ceases once the goods have been delivered to the carrier.</p>
    </div>
    
    <div style="padding:8px; border:1px solid">
        <div style="display:flex;">
            <div>
            <p>Declaration  :</p>
            <p>Certified that the particulars given above are true & Correct and the amount indicated represent the price actually charged and that there is no flow of  
additional consideration directly or indirectly from the buyer.</p>
        </div>
        <div style="width:20%;">
            <p style="text-align:right;">For Ashok Textile - </p>
            <img alt="sign"/>
        </div>
        </div>
        
        <div style="display:flex;  justify-content:space-between; height:60px; align-items:flex-end;"><p>Prepared By</p>
        <p>Approved By</p>
        <p>Authorized Signature</p></div>
    </div>
    
  </body>
</html>

`
)};

export default invoiceTemplate;
