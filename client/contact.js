document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      subject: form.subject.value.trim(),
      message: form.message.value.trim()
    };

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch("https://kirubakaran-mkk-portfolio.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Message sent successfully!");
        form.reset();
      } else {
        alert("❌ Error: " + (data.error || "Something went wrong."));
      }
    } catch (err) {
      console.error(err);
      alert("❌ Failed to send message. " + err.message);
    }
  });
});
