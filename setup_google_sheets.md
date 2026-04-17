# Linking Your Form to Google Sheets

To automatically update your Google Sheet when a form is submitted, we've set up a "Webhook" system. This is the most reliable and fastest way for an automation business.

Follow these 3 steps to finish the setup:

## 1. Prepare Your Google Sheet
1. Open your Google Sheet.
2. Add the following headers in the first row (Row 1):
   `Full Name`, `Business Name`, `Email`, `Phone`, `Industry`, `Contact Method`, `Lead Volume`, `Response Time`, `Ad Spend`, `Bottleneck`, `Submitted At`

## 2. Add the Automation Script
1. In your Google Sheet, go to **Extensions** > **Apps Script**.
2. Delete any existing code and paste the following script:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Append the row to the sheet
    sheet.appendRow([
      data.fullName || "",
      data.businessName || "",
      data.email || "",
      data.phone || "",
      data.industry || "",
      data.contactMethod || "",
      data.leadVolume || "",
      data.responseTime || "",
      data.adSpend || "",
      data.bottleneck || "",
      data.submittedAt || new Date().toISOString()
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click the **Save** icon (disk) and name it "Kengan Form Hook".
4. Click the **Deploy** button > **New deployment**.
5. Select type: **Web app**.
6. Set "Execute as" to **Me**.
7. Set "Who has access" to **Anyone** (this is important for the script to receive data from your site).
8. Click **Deploy**. Copy the **Web App URL** provided.

## 3. Link the Website
1. Open the `.env` file in your project root.
2. Add your new URL like this (replace the placeholder):
   `GSHEET_WEBHOOK_URL="PASTE_YOUR_COPIED_URL_HERE"`
3. Restart your backend server.

---

### Why this method?
- **Fast:** Data appears in your sheet in milliseconds.
- **Free:** No paid subscriptions for Zapier or Make required.
- **Secure:** Your credentials stay private.
