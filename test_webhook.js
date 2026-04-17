async function testWebhook() {
  const url = 'https://script.google.com/macros/s/AKfycbyrw7emobLwnRS9M27RwwqPRcM1F2Wd5ayuo86jDp5n6L_UNa_b9rp22MNnTIzC0JFfHQ/exec';
  const testData = {
    fullName: 'Test User (Antigravity)',
    businessName: 'Automation Test Inc',
    email: 'test@example.com',
    phone: '000-000-0000',
    industry: 'Technology',
    contactMethod: 'WhatsApp',
    leadVolume: '150-500',
    responseTime: 'Under 1 hour',
    adSpend: 'R15k–R50k',
    bottleneck: 'Testing the webhook direct connection',
    submittedAt: new Date().toISOString()
  };

  console.log('Sending test request (Global Fetch) to:', url);
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });

    const status = response.status;
    const text = await response.text();
    
    console.log('Status Code:', status);
    console.log('Raw Response:', text);
    
    if (status === 200) {
      if (text.includes('"result":"success"')) {
        console.log('✅ SUCCESS: Your Google Sheet script processed the data correctly.');
      } else {
        console.log('⚠️ SEMI-SUCCESS: The server responded, but the script returned an error or unexpected text.');
      }
    } else {
      console.log('❌ FAILED: The URL returned an error status code.');
    }
  } catch (error) {
    console.error('❌ ERROR during test:', error);
  }
}

testWebhook();
