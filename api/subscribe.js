export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email_address } = req.body;
  if (!email_address) {
    return res.status(400).json({ error: 'Email address is required' });
  }

  try {
    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const LIST_ID = process.env.MAILCHIMP_LIST_ID || '6ea3f2773c'; 

    if (!API_KEY) {
      return res.status(500).json({ error: 'Mailchimp API key not configured on server' });
    }

    const DATACENTER = API_KEY.split('-')[1];
    const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`;

    const data = {
      email_address,
      status: 'subscribed'
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`anystring:${API_KEY}`).toString('base64')}`
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();

    if (response.status >= 400) {
      return res.status(response.status).json(responseData);
    }

    return res.status(200).json(responseData);
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
}
