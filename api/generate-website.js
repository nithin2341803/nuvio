export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!process.env.AI_GATEWAY_API_KEY) return res.status(503).json({ error: 'AI is not configured on this deployment yet.' });

  try {
    const business = req.body || {};
    const prompt = `You are Nuvio's website content architect. Turn this business intake into polished, concise content for a systematic Starter website. Never invent facts, awards, numbers, addresses, reviews, or claims. Return ONLY valid JSON with these keys: businessName, businessType, tagline, description, about, services, products, whyUs, highlights, extra, seoTitle, seoDescription. services/products/whyUs/highlights must be pipe-separated strings. extra may be a short FAQ/offer section only if supported by the input. Write natural professional English suitable for an Indian business. Business intake: ${JSON.stringify(business)}`;
    const response = await fetch('https://ai-gateway.vercel.sh/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: process.env.NUVIO_AI_MODEL || 'anthropic/claude-opus-5',
        temperature: 0.4,
        messages: [
          { role: 'system', content: 'You output strict JSON only.' },
          { role: 'user', content: prompt }
        ]
      })
    });
    const raw = await response.text();
    if (!response.ok) return res.status(502).json({ error: 'AI provider error', detail: raw.slice(0, 500) });
    const data = JSON.parse(raw);
    const text = data?.choices?.[0]?.message?.content || '';
    const cleaned = text.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
    const result = JSON.parse(cleaned);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: 'Could not generate website content', detail: error.message });
  }
}
