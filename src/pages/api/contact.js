export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return new Response(JSON.stringify({ success: false, error: "Invalid request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!body || typeof body.name === "undefined" || !body.name) {
    return new Response(
      JSON.stringify({ success: false, error: "Name is required.", fields: { name: ["Name is required."] } }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
  if (!body.email || !body.email.includes("@")) {
    return new Response(
      JSON.stringify({ success: false, error: "Enter a valid email address.", fields: { email: ["Enter a valid email address."] } }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
  if (!body.subject || !body.subject.trim()) {
    return new Response(
      JSON.stringify({ success: false, error: "Subject is required.", fields: { subject: ["Subject is required."] } }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
  if (!body.message || !body.message.trim()) {
    return new Response(
      JSON.stringify({ success: false, error: "Message is required.", fields: { message: ["Message is required."] } }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const contactToEmail = process.env.CONTACT_TO_EMAIL;

  if (!resendApiKey || !contactToEmail) {
    console.error("Missing RESEND_API_KEY or CONTACT_TO_EMAIL env for contact form.");
    return new Response(
      JSON.stringify({ success: false, error: "Contact form is not configured." }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  const htmlBody = [
    "<h2>New contact form submission</h2>",
    "<ul>",
    "<li><strong>Name:</strong> " + body.name + "</li>",
    "<li><strong>Email:</strong> " + body.email + "</li>",
    "<li><strong>Subject:</strong> " + body.subject + "</li>",
    "<li><strong>Message:</strong> " + body.message + "</li>",
    "</ul>",
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + resendApiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: [contactToEmail],
        reply_to: body.email,
        subject: body.subject,
        html: htmlBody,
      }),
    });

    let data;
    const text = await res.text();
    try { data = JSON.parse(text); } catch { data = { raw: text }; }

    if (!res.ok) {
      console.error("Resend API error:", res.status, data);
      return new Response(
        JSON.stringify({ success: false, error: "Failed to send message. Please try again later." }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Thanks for reaching out. Ill get back to you soon." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Contact form send failed:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to send message. Please try again later." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
