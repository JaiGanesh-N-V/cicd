

const template= (data)=>{
    var total = 0
    data.product.forEach(element => {
        total+=parseInt(element.quantity);
        
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
          margin-right:10px;
      }
      .con1{
          width: 50%;
      }
      table{
          border: 1px;
      }
      th,td{
          border: 1px solid black;
          padding: 4px;
      }
      td{
          margin-bottom:10px;
      }
      tr,td{
          border-top: none;
          border-bottom:none;
      }
  </style>
  </head>
  <body>
    <div class="con">
        <div style="display:flex; align-items:center; justify-content:center;">
            <img class="logo" src="http://localhost:3001/src/assets/logo.jpg" alt="logo"/>
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
    <div style="display:flex; justify-content:center; ">
        <h2 style="border: 1px solid black; padding:4px 10px 4px 10px;">Sale Order</h2>
    </div>
    <div style="display:flex; justify-content:space-between;">
        
    <div class="con1" style="border:1px solid; padding:5px;">
        <div style="display:flex; margin-bottom:8px; ">
            <p>To : </p>
            <div>
                <p style="margin-left:4px;">ASHOK TEXTILE - MARKETING <br>10/243, THURAIYUR MAIN ROAD,<br>PONNERI POST,<br>NAMAKKAL-637013,<br>TAMILNADU, INDIA</p>
            </div>
        </div>
        <div style="display: flex;"><p style="margin-right:20px;">GSTIN : 33AFCPA0546G2Z6</p> <p>StateCode:33</p></div>
    </div>
    <div class="con1" style="display:flex; align-items: center; border:1px solid; padding:5px;">
        <div><p>Order No</p>
        <p>Order Date</p>
        <p>Order Ref. No</p>
        <p>Agent/Customer Name</p>
        <p>UTR NO</p>
        </div>
        <div>
            <p>: ${data.orderno}</p>
            <p>: ${data.date}</p>
            <p>: App</p>
            <p>: ${data.name}</p>
            <p>: ${data.UTRno}</p>
        </div>
    </div>
    </div>
    <p>Dear Sir,</p>
    <p style="text-align:center;">We are placed to confirm the order as given below</p>
    <p>Item Description :</p>
    <table style="border:1px solid black; border-collapse:collapse; width:100%;">
        <tr >
            <th style="width:10%;">S.No</th>
            <th style="width:30%;">Description of the Fabric</th>
            <th style="width:10%;">HSN Code</th>
            <th style="width:10%; text-align:center;">Quantity in Meter</th>
            <th style="width:10%; text-align:center;">Rate/ Meter</th>
            <th style="width:8%; text-align:center;">Disc</th>
            <th style="width:10%; text-align:center;">Gst (%)</th>
            <th style="width:12%; text-align:center;">Packing</th>
        </tr>
        ${data.product.map((item,index)=>
            (`<tr>
                <td style="text-align:center;">${index+1}</td>
                <td>${item.name}</td>
                <td style="text-align:center;">${item.hsncode}</td>
                <td style="text-align:center;">${item.quantity}</td>
                <td style="text-align:center;">${item.rate}</td>
                <td style="text-align:center;">${item.disc}</td>
                <td style="text-align:center;">${item.gst}</td>
                <td style="text-align:center;">${item.packing}</td>
            </tr>`

            )
        )
    }
        
        
        
    </table>
    <div  style="border:1px solid;padding:8px;  display:flex;">
            <p style="width:50%; text-align:center;">Total</p>
            <p style="width:10%; text-align:center;">${total}</p>
        </div>
    <div style="border:1px solid;  display:flex;">
        <div class="con1" style="display:flex; padding:8px;">
            <div>
                <P>Piece Length</P>
                <P>Transporter Name</P>
                <P>Delivery Place</P>
                <P>Freight</P><P>Original documents to be send</P><P>Payment Terms</P><P>Remarks</P>
            </div>
            <div >
                <P>:</P>
                <P>:</P>
                <P>:</P>
                <P>:</P><P>:</P><P>:</P><P>:</P>
            </div>
        </div>
        <div class="con1" style="border-left:1px solid; padding:8px;">
            <p>Bank Details</p>
        </div>
    </div>
    <div style="padding:8px; border:1px solid">
        <p style="text-align:right;">For Ashok Textile - </p>
        <div style="display:flex;  justify-content:space-between; height:60px; align-items:flex-end;"><p>Prepared By</p>
        <p>Approved By</p>
        <p>Authorized Signature</p></div>
    </div>
    
    
  </body>
</html>
`
)};

export default template;
