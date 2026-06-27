import React, { useState } from 'react';
import SectionLabel from '../ui/SectionLabel';
import GoldDivider from '../ui/GoldDivider';
import { Send, MapPin, Mail, Phone, Instagram, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Simulate sending contact inquiry
    setSubmitted(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="py-24 px-4 md:px-8 bg-bg-primary min-h-screen">
      <div className="max-w-5xl mx-auto">
        
        {/* Contact title */}
        <SectionLabel label="Contact Altar Room" />
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-center text-text-heading mt-1">
          Reach Out For Guidance
        </h1>
        <p className="font-sans text-xs sm:text-sm text-text-muted text-center max-w-lg mx-auto mt-2">
          Have an inquiry regarding specific crystal weights, custom orders, or group tarot bookings in Ludhiana? Leave me a message below.
        </p>

        <GoldDivider />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-12 items-start">
          
          {/* Form container on left */}
          <div className="md:col-span-7 bg-white rounded-3xl border border-gold/15 p-6 sm:p-10 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-gold via-rose to-crystal"></div>

            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
                <h3 className="font-display font-bold text-2xl text-text-heading">Inquiry Transmitted!</h3>
                <p className="text-xs text-text-muted max-w-sm mx-auto leading-relaxed">
                  Thank you so much. Your energy inquiry has been safely delivered to my altar space. I review daily communications and will reply to your email within 24–48 hours. Stay blessed!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs text-text-heading text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Gurpreet Kaur"
                      className="w-full px-4 py-2.5 rounded-xl border border-gold/20 bg-bg-primary focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. gurpreet@gmail.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-gold/20 bg-bg-primary focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Subject / Area of Interest</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Custom Amethyst weights / Rescheduling / Media"
                    className="w-full px-4 py-2.5 rounded-xl border border-gold/20 bg-bg-primary focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Your Narrative / Inquiry *</label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share details regarding your requirements or queries..."
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl border border-gold/20 bg-bg-primary focus:outline-none focus:border-gold resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-text-heading text-bg-primary font-bold tracking-wider hover:bg-cta-hover transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm border border-gold/15"
                >
                  <Send className="w-4 h-4 transform rotate-45" /> Deliver Message
                </button>
              </form>
            )}
          </div>

          {/* Details container on right */}
          <div className="md:col-span-5 bg-white rounded-3xl border border-gold/15 p-6 sm:p-8 shadow-sm space-y-6">
            <h3 className="font-display font-bold text-text-heading text-xl">Our Sanctuary details</h3>
            
            <p className="text-xs text-text-muted leading-relaxed">
              We operate predominantly online to offer maximum comfort and reach. Standard office communications are processed out of our crystal packaging room in Ludhiana.
            </p>

            <div className="space-y-4 text-xs text-text-body">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gold shrink-0" />
                <div>
                  <h4 className="font-semibold text-text-heading">Sanctuary Location:</h4>
                  <p className="text-text-muted">Model Town / Sarabha Nagar, Ludhiana, Punjab, India</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-crystal shrink-0" />
                <div>
                  <h4 className="font-semibold text-text-heading">Email Communication:</h4>
                  <p className="text-text-muted">guidance@ludhianastarotoracle.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-rose shrink-0" />
                <div>
                  <h4 className="font-semibold text-text-heading">WhatsApp Helpline:</h4>
                  <p className="text-text-muted">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Instagram className="w-5 h-5 text-gold shrink-0" />
                <div>
                  <h4 className="font-semibold text-text-heading">Instagram Profile:</h4>
                  <a
                    href="https://instagram.com/ludhianastarotoracle9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold font-medium hover:underline"
                  >
                    @ludhianastarotoracle9
                  </a>
                </div>
              </div>
            </div>

            {/* Quick map mock illustration */}
            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-gold/10 relative">
              <div className="absolute inset-0 bg-bg-secondary/40 flex flex-col items-center justify-center text-center p-4">
                <MapPin className="w-8 h-8 text-gold animate-bounce mb-2" />
                <span className="font-display font-bold text-text-heading">Ludhiana, Punjab</span>
                <span className="text-[10px] text-text-muted uppercase mt-0.5 tracking-wider">Mailing & At-home center</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
