"use client";
import React from "react";
import {
  MapPin,
  Calendar,
  Clock,
  Building,
  Navigation,
  ExternalLink,
  Wifi,
  Wind,
  SquareParking,
  Utensils,
  PlusSquare,
  Accessibility,
  Info,
  ChevronRight,
  Maximize2,
  Hotel,
  ShieldAlert,
  Compass,
  Landmark,
  TrainTrack,
  QrCode,
  CheckCircle2,
} from "lucide-react";
import Swal from "sweetalert2";
import lfsIcon from "@/assets/icons/lfs.png";
import pp1Icon from "@/assets/image/pp1.png";

interface VenueInformationContentProps {
  delegate?: any;
}

export const VenueInformationContent: React.FC<VenueInformationContentProps> = ({
  delegate,
}) => {
  const delegateId =
    delegate?.delegateId || "AGS18/SR/DEL/D1/05/26/015";

  const handleNearbyHotels = () => {
    Swal.fire({
      title: "Nearby Recommended Hotels",
      html: `
        <div class="text-left text-xs space-y-2.5 font-sans pt-2">
          <div class="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
            <p class="font-bold text-slate-800 text-sm">Shangri-La Eros New Delhi</p>
            <p class="text-slate-500">Connaught Place, New Delhi (approx. 2.5 km)</p>
          </div>
          <div class="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
            <p class="font-bold text-slate-800 text-sm">The Taj Mahal Hotel</p>
            <p class="text-slate-500">Number One Mansingh Road, New Delhi (approx. 3.0 km)</p>
          </div>
          <div class="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
            <p class="font-bold text-slate-800 text-sm">The Imperial New Delhi</p>
            <p class="text-slate-500">Janpath, Connaught Place (approx. 2.8 km)</p>
          </div>
        </div>
      `,
      confirmButtonColor: "#059669",
      confirmButtonText: "Close",
    });
  };

  const handleParkingInfo = () => {
    Swal.fire({
      title: "Parking Information",
      html: `
        <div class="text-left text-xs space-y-2 font-sans pt-1">
          <p class="font-bold text-slate-800">Pragati Maidan Multi-level Parking</p>
          <p class="text-slate-600">• Entry via <strong>Gate 1</strong> and <strong>Gate 4</strong> (Bhairon Road Entrance).</p>
          <p class="text-slate-600">• Special VIP and Registered Delegate Parking pass required for Basement Level 2.</p>
          <p class="text-slate-600">• E-Vehicle Shuttle Service available from parking bay to Hall A & B.</p>
        </div>
      `,
      icon: "info",
      confirmButtonColor: "#059669",
    });
  };

  const handleVenueGuidelines = () => {
    Swal.fire({
      title: "Venue Security & Entry Guidelines",
      html: `
        <div class="text-left text-xs space-y-2 font-sans pt-1">
          <p class="text-slate-700">1. Carry your physical entry badge or digital QR Pass at all security gates.</p>
          <p class="text-slate-700">2. Valid Photo ID proof (Aadhaar / Passport / Govt ID) is mandatory.</p>
          <p class="text-slate-700">3. Metal detector screening active at all gate entrances.</p>
          <p class="text-slate-700">4. Baggage counters available at Gate 1 and Gate 4.</p>
        </div>
      `,
      confirmButtonColor: "#059669",
    });
  };

  return (
    <div className="space-y-3.5 font-inter w-full antialiased text-slate-800">
      {/* ── Page Header (100% Match to Contact Support & Payment History) ── */}
      <div className="mb-3 bg-transparent p-0 shadow-none">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-col w-full">
              <h1 className="text-2xl font-semibold font-poppins text-[#0A2947] uppercase tracking-tight mb-1">
                VENUE INFORMATION
              </h1>
              <div className="h-[2px] w-full bg-[#28396C] mb-1"></div>
            </div>
            <p className="text-gray-500 mt-1 font-medium italic text-xs">
              Find all the details about the event venue, location and facilities.
            </p>
          </div>
          <img
            src={typeof lfsIcon === "string" ? lfsIcon : lfsIcon.src}
            alt="Leaf Decorative"
            className="w-28 sm:w-40 md:w-44 h-auto object-contain pointer-events-none shrink-0 -mt-6 sm:-mt-8 relative z-10"
          />
        </div>
      </div>

      {/* ── Hero Venue Showcase Card & Quick Access Sidebar ── */}
      <div
        className="bg-white border border-slate-200/80 rounded-none p-4 sm:p-5 relative"
        style={{ boxShadow: "rgba(9, 30, 66, 0.05) 0px 1px 2px" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left / Center Showcase (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
              {/* Venue Image */}
              <div className="sm:col-span-5 overflow-hidden rounded-md border border-slate-200/80 shadow-xs group bg-slate-100">
                <img
                  src={typeof pp1Icon === "string" ? pp1Icon : pp1Icon.src}
                  alt="Bharat Mandapam Pragati Maidan"
                  className="w-full h-44 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Venue Title & Key Info */}
              <div className="sm:col-span-7 space-y-2 pt-1.5 sm:pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
                    <MapPin size={14} />
                  </div>
                  <h2 className="text-lg font-semibold text-emerald-800 tracking-tight">
                    Pragati Maidan, New Delhi
                  </h2>
                </div>

                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Bharat Mandapam, Pragati Maidan,
                  <br />
                  New Delhi – 110001, India
                </p>

                <div className="pt-1 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-[11px] font-semibold">
                    <CheckCircle2 size={13} className="text-emerald-600" />
                    Verified Official Venue
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200/80 text-[11px] font-semibold">
                    ID: {delegateId}
                  </span>
                </div>
              </div>
            </div>

            {/* 3 Metric Pills Row (Sharp edges, unique light shade backgrounds) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
              <div className="p-2.5 bg-[#f0fdf4] border border-[#bbf7d0] rounded-none flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-200">
                  <Calendar size={16} />
                </div>
                <div>
                  <p className="text-xs font-bold text-emerald-950">21 – 23 Aug 2026</p>
                  <p className="text-[10px] text-emerald-700 font-semibold">Event Dates</p>
                </div>
              </div>

              <div className="p-2.5 bg-[#eff6ff] border border-[#bfdbfe] rounded-none flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-md bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 border border-blue-200">
                  <Clock size={16} />
                </div>
                <div>
                  <p className="text-xs font-bold text-blue-950">08:00 AM – 06:00 PM</p>
                  <p className="text-[10px] text-blue-700 font-semibold">Event Timings (IST)</p>
                </div>
              </div>

              <div className="p-2.5 bg-[#fff7ed] border border-[#fed7aa] rounded-none flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 border border-amber-200">
                  <Building size={16} />
                </div>
                <div>
                  <p className="text-xs font-bold text-amber-950 truncate">Hall A, Hall B &amp; Rooms</p>
                  <p className="text-[10px] text-amber-700 font-semibold">Venue Areas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Quick Access Box (4 Cols) */}
          <div className="lg:col-span-4 bg-[#f4f9f6] border border-[#d8eae0] rounded-xl p-4 flex flex-col justify-between gap-3">
            <div>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                Quick Access
              </h3>

              <div className="space-y-2">
                <a
                  href="https://maps.google.com/?q=Bharat+Mandapam+Pragati+Maidan+New+Delhi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200/80 hover:border-emerald-500 hover:text-emerald-700 text-xs font-medium text-slate-700 transition-all shadow-2xs group"
                >
                  <span className="flex items-center gap-2">
                    <Navigation size={14} className="text-emerald-600" />
                    View on Map
                  </span>
                  <ChevronRight size={14} className="text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-0.5" />
                </a>

                <a
                  href="https://www.google.com/maps/dir//Bharat+Mandapam+Pragati+Maidan+New+Delhi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200/80 hover:border-emerald-500 hover:text-emerald-700 text-xs font-medium text-slate-700 transition-all shadow-2xs group"
                >
                  <span className="flex items-center gap-2">
                    <Compass size={14} className="text-emerald-600" />
                    Directions
                  </span>
                  <ChevronRight size={14} className="text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-0.5" />
                </a>

                <button
                  type="button"
                  onClick={handleNearbyHotels}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200/80 hover:border-emerald-500 hover:text-emerald-700 text-xs font-medium text-slate-700 transition-all shadow-2xs group text-left cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Hotel size={14} className="text-emerald-600" />
                    Nearby Hotels
                  </span>
                  <ChevronRight size={14} className="text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-0.5" />
                </button>

                <button
                  type="button"
                  onClick={handleParkingInfo}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200/80 hover:border-emerald-500 hover:text-emerald-700 text-xs font-medium text-slate-700 transition-all shadow-2xs group text-left cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <SquareParking size={14} className="text-emerald-600" />
                    Parking Information
                  </span>
                  <ChevronRight size={14} className="text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-0.5" />
                </button>

                <button
                  type="button"
                  onClick={handleVenueGuidelines}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200/80 hover:border-emerald-500 hover:text-emerald-700 text-xs font-medium text-slate-700 transition-all shadow-2xs group text-left cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <ShieldAlert size={14} className="text-emerald-600" />
                    Venue Guidelines
                  </span>
                  <ChevronRight size={14} className="text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Middle Grid Section: Location Map (7 Cols) & Venue Details (5 Cols) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Left Column: Location Map Card */}
        <div
          className="lg:col-span-7 bg-white border border-slate-200/80 rounded-none p-4 sm:p-5 relative flex flex-col justify-between h-full"
          style={{ boxShadow: "rgba(9, 30, 66, 0.05) 0px 1px 2px" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
              <MapPin size={14} />
            </div>
            <h3 className="text-sm font-semibold text-slate-800 tracking-tight">
              Location Map
            </h3>
          </div>

          <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-2xs flex-1 w-full h-full min-h-[295px]">
            {/* Map Overlay Card (Matching reference design) */}
            <div className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur-xs border border-slate-200 p-2.5 rounded-xl shadow-md max-w-[210px] space-y-1">
              <p className="font-bold text-slate-900 text-xs">Pragati Maidan</p>
              <p className="text-[10px] text-slate-500 leading-tight">
                Bharat Mandapam, Pragati Maidan, New Delhi – 110001
              </p>
              <a
                href="https://maps.google.com/?q=Bharat+Mandapam+Pragati+Maidan+New+Delhi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-semibold text-blue-600 hover:underline flex items-center gap-0.5 pt-0.5"
              >
                View larger map <ExternalLink size={10} />
              </a>
            </div>

            {/* Embedded Google Map */}
            <iframe
              title="Pragati Maidan Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.395679549303!2d77.23963497629532!3d28.6178972847587!2m2!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce320b925b42d%3A0xc3f58e17042045e7!2sBharat%20Mandapam%2C%20Pragati%20Maidan%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
              className="w-full h-full min-h-[295px] border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Right Column: Venue Details Card (100% Match to Reference Screenshot) */}
        <div
          className="lg:col-span-5 bg-white border border-slate-200/80 rounded-none p-4 sm:p-5 relative h-full"
          style={{ boxShadow: "rgba(9, 30, 66, 0.05) 0px 1px 2px" }}
        >
          <h3 className="text-sm font-bold text-slate-900 mb-5 tracking-tight">
            Venue Details
          </h3>

          <div className="space-y-3.5 font-sans">
            {/* Detail Item 1: Venue Name */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#e8f5ed] text-[#1b7a42] flex items-center justify-center shrink-0">
                <Building size={16} />
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-500">Venue Name</p>
                <p className="text-xs font-semibold text-slate-800">Pragati Maidan (Bharat Mandapam)</p>
              </div>
            </div>

            {/* Detail Item 2: Address */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#e8f5ed] text-[#1b7a42] flex items-center justify-center shrink-0">
                <MapPin size={16} />
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-500">Address</p>
                <p className="text-xs font-semibold text-slate-800">Pragati Maidan, New Delhi – 110001, India</p>
              </div>
            </div>

            {/* Detail Item 3: Entry Gates */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#e8f5ed] text-[#1b7a42] flex items-center justify-center shrink-0">
                <ShieldAlert size={16} />
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-500">Entry Gates</p>
                <p className="text-xs font-semibold text-slate-800">Gate 1, Gate 4, Gate 6</p>
              </div>
            </div>

            {/* Detail Item 4: Nearest Metro Station */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#e8f5ed] text-[#1b7a42] flex items-center justify-center shrink-0">
                <TrainTrack size={16} />
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-500">Nearest Metro Station</p>
                <p className="text-xs font-semibold text-slate-800">Pragati Maidan Metro Station (Blue Line) – 500 m</p>
              </div>
            </div>

            {/* Detail Item 5: Landmark */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#e8f5ed] text-[#1b7a42] flex items-center justify-center shrink-0">
                <Landmark size={16} />
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-500">Landmark</p>
                <p className="text-xs font-semibold text-slate-800">Opposite to Supreme Court of India</p>
              </div>
            </div>

            {/* Detail Item 6: Google Maps Plus Code */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#e8f5ed] text-[#1b7a42] flex items-center justify-center shrink-0">
                <QrCode size={16} />
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-500">Google Maps Plus Code</p>
                <p className="text-xs font-semibold text-slate-800">7J5M+FQ New Delhi, Delhi</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Section: Venue Facilities Grid (100% Match to Reference Screenshot) ── */}
      <div
        className="bg-white border border-slate-200/80 rounded-none p-4 sm:p-5 relative"
        style={{ boxShadow: "rgba(9, 30, 66, 0.05) 0px 1px 2px" }}
      >
        <h3 className="text-sm font-bold text-slate-900 mb-4 tracking-tight">
          Venue Facilities
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-y-3 sm:gap-y-0">
          {/* Facility 1: Wi-Fi */}
          <div className="flex items-center gap-1.5 px-1.5 lg:px-2 border-r border-slate-200/80">
            <Wifi size={18} className="text-[#1b7a42] shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-slate-900 leading-tight whitespace-nowrap">Wi-Fi</p>
              <p className="text-[9.5px] text-slate-500 font-medium leading-tight">Available</p>
            </div>
          </div>

          {/* Facility 2: Air Conditioned */}
          <div className="flex items-center gap-1.5 px-1.5 lg:px-2 border-r border-slate-200/80">
            <Wind size={18} className="text-[#1b7a42] shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-slate-900 leading-tight whitespace-nowrap">Air</p>
              <p className="text-[9.5px] text-slate-500 font-medium leading-tight">Conditioned</p>
            </div>
          </div>

          {/* Facility 3: Parking */}
          <div className="flex items-center gap-1.5 px-1.5 lg:px-2 border-r border-slate-200/80">
            <SquareParking size={18} className="text-[#1b7a42] shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-slate-900 leading-tight whitespace-nowrap">Parking</p>
              <p className="text-[9.5px] text-slate-500 font-medium leading-tight">Available</p>
            </div>
          </div>

          {/* Facility 4: Food Court */}
          <div className="flex items-center gap-1.5 px-1.5 lg:px-2 border-r border-slate-200/80">
            <Utensils size={18} className="text-[#1b7a42] shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-slate-900 leading-tight whitespace-nowrap">Food Court</p>
              <p className="text-[9.5px] text-slate-500 font-medium leading-tight">Available</p>
            </div>
          </div>

          {/* Facility 5: First Aid */}
          <div className="flex items-center gap-1.5 px-1.5 lg:px-2 border-r border-slate-200/80">
            <PlusSquare size={18} className="text-[#1b7a42] shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-slate-900 leading-tight whitespace-nowrap">First Aid</p>
              <p className="text-[9.5px] text-slate-500 font-medium leading-tight">Available</p>
            </div>
          </div>

          {/* Facility 6: Restrooms */}
          <div className="flex items-center gap-1.5 px-1.5 lg:px-2 border-r border-slate-200/80">
            <Building size={18} className="text-[#1b7a42] shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-slate-900 leading-tight whitespace-nowrap">Restrooms</p>
              <p className="text-[9.5px] text-slate-500 font-medium leading-tight">Available</p>
            </div>
          </div>

          {/* Facility 7: Wheelchair */}
          <div className="flex items-center gap-1.5 px-1.5 lg:px-2 border-r border-slate-200/80">
            <Accessibility size={18} className="text-[#1b7a42] shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-slate-900 leading-tight whitespace-nowrap">Wheelchair</p>
              <p className="text-[9.5px] text-slate-500 font-medium leading-tight">Accessible</p>
            </div>
          </div>

          {/* Facility 8: Information Desk */}
          <div className="flex items-center gap-1.5 px-1.5 lg:px-2">
            <Info size={18} className="text-[#1b7a42] shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-slate-900 leading-tight whitespace-nowrap">Information Desk</p>
              <p className="text-[9.5px] text-slate-500 font-medium leading-tight">Available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
