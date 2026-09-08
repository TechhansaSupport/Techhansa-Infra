import React from 'react';

export function PrivacyPolicy() {
  return (
    <div className="pt-32 pb-24 container mx-auto px-8 max-w-4xl min-h-[60vh] bg-slate-50 text-foreground">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-lg text-muted prose-headings:text-foreground prose-a:text-blue">
        <p>Your privacy is important to us. This privacy policy explains how Techhansa Infra collects, uses, and protects your personal data when you use our website and inquiry forms.</p>
        <h2>Data Collection</h2>
        <p>We collect information such as name, phone number, and email address when you submit an inquiry form or register interest for our projects.</p>
        <h2>Use of Information</h2>
        <p>Your information is used solely by our internal sales and relationship managers to provide you with project brochures, pricing details, and arrange site visits.</p>
      </div>
    </div>
  );
}

export function Disclaimer() {
  return (
    <div className="pt-32 pb-24 container mx-auto px-8 max-w-4xl min-h-[60vh] bg-slate-50 text-foreground">
      <h1 className="text-4xl font-bold mb-8">Terms & Disclaimer</h1>
      <div className="prose prose-lg text-muted prose-headings:text-foreground prose-a:text-blue">
        <p>The information on this website is provided for general informational purposes only.</p>
        <h2>Artistic Impressions</h2>
        <p>All images, renders, and floor plans are artistic impressions and are subject to change. They do not constitute a legal offering.</p>
        <h2>RERA Guidelines</h2>
        <p>We comply fully with RERA guidelines. Please verify all details including project status and amenities directly with our authorized sales representatives before making a purchase decision.</p>
      </div>
    </div>
  );
}
