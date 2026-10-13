"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ArrowRight } from "lucide-react";
import UploadCvModal, { CandidateAnalysisData } from "@/components/careers/uploade_cv/page";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";
import { EligibilityModal, CandidateProfileData, defaultCandidateData } from "./submit-resume/SubmitResume";
import { ApplicationFormModal } from "./application-form/ApplicationForm";
import { ReviewSubmitModal } from "./review-submit/ReviewSubmit";

export default function JobCardButtons({ job }: { job: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);
  const [isAppFormOpen, setIsAppFormOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [candidateData, setCandidateData] = useState<CandidateProfileData>(defaultCandidateData);

  // Prevent scrolling when modal is open (locks both the native scrollbar and Lenis)
  useEffect(() => {
    const anyOpen = isOpen || isEligibilityOpen || isAppFormOpen || isReviewOpen;
    if (anyOpen) lockScroll();
    return () => {
      if (anyOpen) unlockScroll();
    };
  }, [isOpen, isEligibilityOpen, isAppFormOpen, isReviewOpen]);

  return (
    <>
      <div className="mt-auto grid grid-cols-2 gap-3 pt-[clamp(10px,1vh,14px)]">
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex py-1.5 items-center justify-center gap-2 bg-[#f5791b] px-3 text-[13px] font-semibold text-white transition hover:bg-[#d96510]"
        >
          Apply Now <ArrowRight className="h-[18px] w-[18px]" />
        </button>
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex py-1.5 items-center justify-center border border-[#0e3b1c] bg-white px-3 text-[13px] font-semibold text-[#0e3b1c] transition hover:bg-[#0e3b1c] hover:text-white"
        >
          View Details
        </button>
      </div>

      {isOpen && typeof document !== "undefined"
        ? createPortal(
          <UploadCvModal
            job={job}
            onClose={() => setIsOpen(false)}
            onAnalyze={(data) => {
              if (data) {
                setCandidateData(data);
              }
              setIsOpen(false);
              setIsEligibilityOpen(true);
            }}
          />,
          document.body
        )
        : null}

      {isEligibilityOpen && typeof document !== "undefined"
        ? createPortal(
          <EligibilityModal
            isOpen={isEligibilityOpen}
            candidate={candidateData}
            score={candidateData.score}
            onCandidateChange={setCandidateData}
            onBack={() => {
              setIsEligibilityOpen(false);
              setIsOpen(true);
            }}
            onClose={() => setIsEligibilityOpen(false)}
            onApply={() => {
              setIsEligibilityOpen(false);
              setIsAppFormOpen(true);
            }}
          />,
          document.body
        )
        : null}

      {isAppFormOpen && typeof document !== "undefined"
        ? createPortal(
          <ApplicationFormModal
            isOpen={isAppFormOpen}
            candidateData={candidateData}
            onBack={() => {
              setIsAppFormOpen(false);
              setIsEligibilityOpen(true);
            }}
            onClose={() => setIsAppFormOpen(false)}
            onNext={(data) => {
              if (data) setCandidateData(data);
              setIsAppFormOpen(false);
              setIsReviewOpen(true);
            }}
          />,
          document.body
        )
        : null}

      {isReviewOpen && typeof document !== "undefined"
        ? createPortal(
          <ReviewSubmitModal
            isOpen={isReviewOpen}
            candidateData={candidateData}
            onBack={() => {
              setIsReviewOpen(false);
              setIsAppFormOpen(true);
            }}
            onClose={() => setIsReviewOpen(false)}
          />,
          document.body
        )
        : null}
    </>
  );
}
