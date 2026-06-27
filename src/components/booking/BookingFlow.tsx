import React, { useState, useEffect } from 'react';
import { SERVICES } from '../../data';
import { Service, Booking } from '../../types';
import { db } from '../../lib/db';
import { Check, Calendar, User, CreditCard, Sparkles, AlertCircle, Clock, Video, MessageSquare, ArrowRight, ArrowLeft } from 'lucide-react';

interface BookingFlowProps {
  setPath: (path: string) => void;
  preselectedServiceId?: string | null;
  setPreselectedServiceId?: (id: string | null) => void;
}

export default function BookingFlow({ setPath, preselectedServiceId = null, setPreselectedServiceId = () => {} }: BookingFlowProps) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Timepicker State (for live services)
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');

  // Client Details Form State
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [dob, setDob] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [heardFrom, setHeardFrom] = useState('Instagram');
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [error, setError] = useState('');

  // Payment State
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedBooking, setCompletedBooking] = useState<Booking | null>(null);

  // Check for preselected service from Services section or list
  useEffect(() => {
    const preselected = localStorage.getItem('lto_preselected_service') || preselectedServiceId;
    if (preselected) {
      const found = SERVICES.find(s => s.id === preselected);
      if (found) {
        setSelectedService(found);
        setStep(2); // If they preselected from home page, jump straight to calendar/details
      }
      localStorage.removeItem('lto_preselected_service');
      setPreselectedServiceId(null);
    }
  }, [preselectedServiceId]);

  // Handle service selection
  const handleSelectService = (service: Service) => {
    setSelectedService(service);
    setError('');
  };

  const handleStep1Submit = () => {
    if (!selectedService) {
      setError('Please select a service to proceed.');
      return;
    }
    setError('');
    // If it's async, skip calendar choose and go straight to details
    if (selectedService.deliveryType === 'async') {
      setStep(3);
    } else {
      setStep(2);
    }
  };

  const handleStep2Submit = () => {
    if (selectedService?.deliveryType === 'live' && (!selectedDate || !selectedTimeSlot)) {
      setError('Please choose a valid date and time slot for your live session.');
      return;
    }
    setError('');
    setStep(3);
  };

  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !whatsapp || !email || !question) {
      setError('Please fill in all required client details.');
      return;
    }
    if (whatsapp.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid 10-digit WhatsApp number.');
      return;
    }
    if (!policyAccepted) {
      setError('You must accept the rescheduling and non-refundable booking policy.');
      return;
    }
    setError('');
    setStep(4);
  };

  // Secure Razorpay Payment Trigger Simulator
  const handlePayment = () => {
    if (!selectedService) return;
    setIsProcessing(true);

    // Simulate 2 second payment processing
    setTimeout(() => {
      const refCode = `LTO-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      
      const newBooking: Booking = {
        id: `book_${Date.now()}`,
        bookingRef: refCode,
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        deliveryType: selectedService.deliveryType,
        clientName: name,
        clientWhatsapp: whatsapp,
        clientEmail: email,
        clientQuestion: question,
        heardFrom,
        amount: selectedService.price,
        paymentStatus: 'paid',
        bookingStatus: 'new',
        createdAt: new Date().toISOString(),
        ...(selectedService.deliveryType === 'live' ? {
          scheduledDate: selectedDate,
          scheduledTime: selectedTimeSlot
        } : {}),
        ...(dob ? { clientDob: dob } : {})
      };

      db.saveBooking(newBooking);
      setCompletedBooking(newBooking);
      setIsProcessing(false);

      // Save confirmation object in storage for result screen rendering
      localStorage.setItem('lto_latest_booking', JSON.stringify(newBooking));
      
      // Navigate to confirmation path
      setPath('#book/confirm');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  };

  // Generate dynamic date list for Calendar step (exclude Sundays, past dates)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    let count = 0;
    while (count < 14) {
      const futureDate = new Date();
      futureDate.setDate(today.getDate() + count);
      // Exclude Sunday (day 0)
      if (futureDate.getDay() !== 0 && futureDate > today) {
        dates.push(futureDate.toISOString().split('T')[0]);
      }
      count++;
    }
    return dates;
  };

  const timeSlots = [
    { label: 'Morning slots', slots: ['09:30 AM', '10:30 AM', '11:30 AM'] },
    { label: 'Afternoon slots', slots: ['01:30 PM', '02:30 PM', '03:30 PM'] },
    { label: 'Evening slots', slots: ['05:00 PM', '06:00 PM', '07:00 PM'] }
  ];

  const stepsIndicators = [
    { num: 1, title: 'Service' },
    { num: 2, title: 'Schedule' },
    { num: 3, title: 'Details' },
    { num: 4, title: 'Payment' }
  ];

  return (
    <section className="py-24 px-4 md:px-8 bg-bg-primary min-h-screen">
      <div className="max-w-4xl mx-auto">
        
        {/* Wizard Indicators */}
        <div className="flex items-center justify-between mb-12 max-w-lg mx-auto">
          {stepsIndicators.map((s, idx) => {
            // Check if step is skipped
            const isScheduleSkipped = selectedService?.deliveryType === 'async' && s.num === 2;
            if (isScheduleSkipped) return null;

            const isActive = step === s.num;
            const isCompleted = step > s.num || (selectedService?.deliveryType === 'async' && step === 3 && s.num === 2);

            return (
              <React.Fragment key={s.num}>
                <div className="flex flex-col items-center relative z-10">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border ${
                      isActive
                        ? 'bg-gold border-gold text-bg-dark shadow'
                        : isCompleted
                        ? 'bg-text-heading border-text-heading text-white'
                        : 'bg-white border-gold/20 text-text-muted'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : s.num}
                  </div>
                  <span className={`text-[10px] font-semibold uppercase tracking-wider mt-2 ${isActive ? 'text-gold' : 'text-text-muted'}`}>
                    {s.title}
                  </span>
                </div>
                {idx < stepsIndicators.length - 1 && (
                  <div className={`flex-1 h-[1.5px] -mt-6 transition-colors duration-300 ${isCompleted ? 'bg-text-heading' : 'bg-gold/15'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {error && (
          <div className="mb-6 bg-rose/5 border border-rose/30 text-text-heading p-4 rounded-xl flex items-start space-x-3 text-xs">
            <AlertCircle className="w-5 h-5 text-rose shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Wizard Contents */}
        <div className="bg-white border border-gold/15 rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
          {/* Subtle gold line pattern at top */}
          <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-gold via-rose to-crystal"></div>

          {/* STEP 1: SERVICE PICKER */}
          {step === 1 && (
            <div className="animate-fadeIn">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-heading mb-1">Pick Your Reading</h2>
              <p className="text-xs text-text-muted mb-8">Choose the type of spiritual focus and delivery framework you desire.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SERVICES.map((s) => {
                  const isSelected = selectedService?.id === s.id;
                  return (
                    <div
                      key={s.id}
                      onClick={() => handleSelectService(s)}
                      className={`border p-6 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between h-48 hover:-translate-y-1 relative ${
                        isSelected
                          ? 'border-gold bg-bg-secondary/40 shadow-md ring-1 ring-gold'
                          : 'border-gold/15 bg-white hover:border-gold/30 hover:shadow-sm'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-4 right-4 bg-gold text-bg-dark p-1 rounded-full">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}

                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-gold block mb-1">
                          {s.deliveryType === 'async' ? "Voice Reading" : "Live Session"}
                        </span>
                        <h3 className="font-display font-bold text-text-heading text-lg leading-tight">
                          {s.name}
                        </h3>
                        <p className="text-[11px] text-text-muted mt-2 line-clamp-2 leading-relaxed">
                          {s.tagline}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4 border-t border-gold/5 pt-3">
                        <span className="text-[10px] text-text-body font-sans font-semibold flex items-center gap-1.5">
                          {s.deliveryType === 'async' ? (
                            <>
                              <MessageSquare className="w-3.5 h-3.5 text-gold" /> Voice Note
                            </>
                          ) : (
                            <>
                              <Video className="w-3.5 h-3.5 text-crystal" /> Live Video
                            </>
                          )}
                        </span>
                        <span className="font-display font-extrabold text-text-heading text-lg">
                          ₹{s.price}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end mt-10">
                <button
                  onClick={handleStep1Submit}
                  className="px-8 py-3.5 rounded-full bg-text-heading text-bg-primary text-xs font-semibold tracking-wider hover:bg-cta-hover transition-all flex items-center gap-2 cursor-pointer shadow"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: DATE & TIME CHOOSE (LIVE SERVICES ONLY) */}
          {step === 2 && selectedService?.deliveryType === 'live' && (
            <div className="animate-fadeIn">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-heading mb-1">Schedule Live Video Slot</h2>
              <p className="text-xs text-text-muted mb-8">All live video sessions are conducted via Google Meet (India Standard Time - IST).</p>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Custom Calendar date buttons list */}
                <div className="md:col-span-5">
                  <label className="block text-xs font-semibold text-text-body uppercase tracking-wider mb-3">
                    1. Choose Date
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {getAvailableDates().map((d) => {
                      const isSelected = selectedDate === d;
                      const dateObj = new Date(d);
                      const formattedLabel = dateObj.toLocaleDateString('en-US', {
                        weekday: 'short',
                        day: 'numeric'
                      });
                      return (
                        <button
                          key={d}
                          type="button"
                          onClick={() => {
                            setSelectedDate(d);
                            setError('');
                          }}
                          className={`py-3 px-2 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-gold border-gold text-bg-dark shadow'
                              : 'bg-white border-gold/15 text-text-body hover:border-gold'
                          }`}
                        >
                          <span className="text-[10px] opacity-75 uppercase">
                            {dateObj.toLocaleDateString('en-US', { month: 'short' })}
                          </span>
                          <span className="text-sm font-bold mt-0.5">{dateObj.getDate()}</span>
                          <span className="text-[10px] font-sans font-light opacity-80 uppercase mt-0.5">
                            {dateObj.toLocaleDateString('en-US', { weekday: 'short' })}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slot Picker */}
                <div className="md:col-span-7">
                  <label className="block text-xs font-semibold text-text-body uppercase tracking-wider mb-3">
                    2. Select Time Slot (IST)
                  </label>
                  {selectedDate ? (
                    <div className="space-y-4">
                      {timeSlots.map((grp) => (
                        <div key={grp.label}>
                          <span className="text-[10px] text-text-muted uppercase font-bold tracking-widest block mb-2">
                            {grp.label}
                          </span>
                          <div className="grid grid-cols-3 gap-2">
                            {grp.slots.map((sl) => {
                              const isSelected = selectedTimeSlot === sl;
                              return (
                                <button
                                  key={sl}
                                  type="button"
                                  onClick={() => {
                                    setSelectedTimeSlot(sl);
                                    setError('');
                                  }}
                                  className={`py-2 rounded-xl border text-xs font-bold font-sans transition-all cursor-pointer ${
                                    isSelected
                                      ? 'bg-text-heading border-text-heading text-white shadow-sm'
                                      : 'bg-white border-gold/15 text-text-body hover:border-gold/30'
                                  }`}
                                >
                                  {sl}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-44 border border-dashed border-gold/15 rounded-2xl flex flex-col items-center justify-center text-center p-6 bg-bg-secondary/10">
                      <Clock className="w-8 h-8 text-gold/40 mb-2 animate-pulse" />
                      <p className="text-xs text-text-muted">
                        Please select a calendar date on the left first.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation row */}
              <div className="flex items-center justify-between mt-12 pt-6 border-t border-gold/5">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-full border border-gold/20 text-text-body hover:border-gold/40 text-xs font-semibold tracking-wider flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Services
                </button>
                
                <button
                  onClick={handleStep2Submit}
                  className="px-8 py-3.5 rounded-full bg-text-heading text-bg-primary text-xs font-semibold tracking-wider hover:bg-cta-hover transition-all flex items-center gap-2 cursor-pointer shadow"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: CLIENT DETAILS FORM */}
          {step === 3 && selectedService && (
            <div className="animate-fadeIn">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-heading mb-1">Tell Me About Yourself</h2>
              <p className="text-xs text-text-muted mb-8">This information creates the emotional sanctuary and target focus of your reading.</p>

              <form onSubmit={handleStep3Submit} className="space-y-5">
                
                {/* Quick Service selection review */}
                <div className="p-4 rounded-xl bg-bg-secondary/40 border border-gold/10 flex items-center justify-between text-xs text-text-body mb-6">
                  <span>Selected Reading: <strong>{selectedService.name} (₹{selectedService.price})</strong></span>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-gold font-bold hover:underline"
                  >
                    Change
                  </button>
                </div>

                {/* Name and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-text-body mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setError('');
                      }}
                      placeholder="e.g. Amanpreet Singh"
                      className="w-full px-4 py-2.5 rounded-xl border border-gold/20 bg-white text-xs text-text-heading focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-text-body mb-1">WhatsApp Number *</label>
                    <div className="relative">
                      <span className="absolute left-4 top-2.5 text-xs text-text-muted font-bold font-sans">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        value={whatsapp}
                        onChange={(e) => {
                          setWhatsapp(e.target.value);
                          setError('');
                        }}
                        placeholder="10-digit mobile"
                        className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-gold/20 bg-white text-xs text-text-heading focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>
                </div>

                {/* Email and Refer */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-text-body mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError('');
                      }}
                      placeholder="e.g. aman@gmail.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-gold/20 bg-white text-xs text-text-heading focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-text-body mb-1">How did you find me?</label>
                    <select
                      value={heardFrom}
                      onChange={(e) => setHeardFrom(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gold/20 bg-white text-xs text-text-heading focus:outline-none focus:border-gold"
                    >
                      <option value="Instagram">Instagram (@ludhianastarotoracle9)</option>
                      <option value="Google Search">Google Search</option>
                      <option value="Friend Referral">Friend Referral</option>
                      <option value="Other">Other Spiritual Circles</option>
                    </select>
                  </div>
                </div>

                {/* Birth Details (Conditional, requested for healing/combo) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gold/5 pt-4">
                  <div>
                    <label className="block text-xs font-semibold text-text-body mb-1">
                      Date of Birth {selectedService.id.includes('crystal') ? '*' : '(Optional)'}
                    </label>
                    <input
                      type="date"
                      required={selectedService.id.includes('crystal')}
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gold/20 bg-white text-xs text-text-heading focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-text-body mb-1">Birth Time (Optional)</label>
                    <input
                      type="time"
                      value={birthTime}
                      onChange={(e) => setBirthTime(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gold/20 bg-white text-xs text-text-heading focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                {/* Question Details Textarea */}
                <div>
                  <label className="block text-xs font-semibold text-text-body mb-1">
                    What questions or situation would you like guidance on? *
                  </label>
                  <textarea
                    required
                    value={question}
                    onChange={(e) => {
                      setQuestion(e.target.value);
                      setError('');
                    }}
                    placeholder="Be as specific or general as you feel comfortable. Up to 4 detailed questions."
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl border border-gold/20 bg-white text-xs text-text-heading focus:outline-none focus:border-gold resize-none"
                  />
                </div>

                {/* Non refundable agreement checkbox */}
                <div className="flex items-start space-x-3 bg-bg-secondary/30 p-4 rounded-xl border border-gold/10">
                  <input
                    type="checkbox"
                    id="policyAccepted"
                    checked={policyAccepted}
                    onChange={(e) => {
                      setPolicyAccepted(e.target.checked);
                      setError('');
                    }}
                    className="mt-1 accent-gold"
                  />
                  <label htmlFor="policyAccepted" className="text-[11px] text-text-body leading-relaxed cursor-pointer">
                    <strong>Rescheduling & Refund Policy *</strong>: I understand all tarot readings and healings are final, spiritual services, and non-refundable. Live video slots can be rescheduled up to 24 hours in advance.
                  </label>
                </div>

                {/* Navigation actions row */}
                <div className="flex items-center justify-between mt-10 pt-6 border-t border-gold/5">
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedService.deliveryType === 'async') {
                        setStep(1);
                      } else {
                        setStep(2);
                      }
                    }}
                    className="px-6 py-3 rounded-full border border-gold/20 text-text-body hover:border-gold/40 text-xs font-semibold tracking-wider flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-full bg-text-heading text-bg-primary text-xs font-semibold tracking-wider hover:bg-cta-hover transition-all flex items-center gap-2 cursor-pointer shadow"
                  >
                    Continue to Review <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* STEP 4: PAYMENT SUMMARY */}
          {step === 4 && selectedService && (
            <div className="animate-fadeIn">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-heading mb-1">Final Booking Summary</h2>
              <p className="text-xs text-text-muted mb-8">Confirm details and secure your reading booking instantly via Razorpay.</p>

              {/* Kunika styled summary banner */}
              <div className="grid grid-cols-2 border border-gold/25 rounded-2xl overflow-hidden mb-8 text-center bg-bg-secondary/40">
                <div className="border-r border-gold/15 py-4 flex flex-col justify-center">
                  <span className="text-[10px] text-text-muted uppercase tracking-widest font-semibold block mb-1">
                    Delivery Model
                  </span>
                  <span className="text-xs font-bold text-text-heading flex items-center justify-center gap-1">
                    {selectedService.deliveryType === 'async' ? (
                      <>
                        <MessageSquare className="w-4 h-4 text-gold" /> WhatsApp Voice
                      </>
                    ) : (
                      <>
                        <Video className="w-4 h-4 text-crystal" /> Google Meet Live
                      </>
                    )}
                  </span>
                </div>
                <div className="py-4 flex flex-col justify-center">
                  <span className="text-[10px] text-text-muted uppercase tracking-widest font-semibold block mb-1">
                    Required Exchange
                  </span>
                  <span className="font-display text-xl font-extrabold text-gold">
                    ₹{selectedService.price}
                  </span>
                </div>
              </div>

              {/* Review card */}
              <div className="space-y-4 text-xs text-text-body border border-gold/10 p-6 rounded-2xl bg-white">
                <div className="flex justify-between py-1 border-b border-gold/5">
                  <span className="text-text-muted">Target Service:</span>
                  <span className="font-bold text-text-heading">{selectedService.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gold/5">
                  <span className="text-text-muted">Client Name:</span>
                  <span className="font-medium text-text-heading">{name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gold/5">
                  <span className="text-text-muted">WhatsApp Number:</span>
                  <span className="font-medium text-text-heading">+91 {whatsapp}</span>
                </div>
                {selectedService.deliveryType === 'live' && (
                  <div className="flex justify-between py-1 border-b border-gold/5 bg-gold/5 px-2 rounded-lg">
                    <span className="text-gold font-semibold">Scheduled Date/Time:</span>
                    <span className="font-bold text-text-heading">{selectedDate} at {selectedTimeSlot} (IST)</span>
                  </div>
                )}
                <div className="py-1">
                  <span className="text-text-muted block mb-1">Questions summary (to be clarified):</span>
                  <p className="bg-bg-secondary/30 p-3 rounded-lg border border-gold/5 text-text-heading text-[11px] leading-relaxed italic">
                    "{question}"
                  </p>
                </div>
              </div>

              {/* Payment Processing Indicator / Trigger */}
              <div className="mt-10 flex flex-col items-center">
                {isProcessing ? (
                  <div className="flex flex-col items-center justify-center py-6 space-y-4">
                    <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin"></div>
                    <p className="text-xs text-text-muted animate-pulse font-sans font-medium">
                      Initializing secured checkout window. Please do not close this screen...
                    </p>
                  </div>
                ) : (
                  <div className="w-full space-y-4">
                    <button
                      onClick={handlePayment}
                      className="w-full py-4 rounded-full bg-text-heading text-bg-primary font-bold tracking-wider hover:bg-cta-hover transition-all duration-300 flex items-center justify-center gap-2 border border-gold/15 cursor-pointer shadow-md"
                    >
                      <CreditCard className="w-4 h-4 text-gold" /> Pay ₹{selectedService.price} Securely via Razorpay
                    </button>
                    
                    <p className="text-[10px] text-text-muted text-center flex items-center justify-center gap-1">
                      🔒 Payments are processed using highly secure UPI, Cards, Netbanking frameworks.
                    </p>
                  </div>
                )}
              </div>

              {/* Navigation Back */}
              {!isProcessing && (
                <div className="flex justify-start mt-8 pt-4 border-t border-gold/5">
                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-3 rounded-full border border-gold/20 text-text-body hover:border-gold/40 text-xs font-semibold tracking-wider flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" /> Edit Details
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
