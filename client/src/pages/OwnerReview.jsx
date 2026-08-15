import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  Trash2,
  ExternalLink,
  MessageSquare,
  User,
  Mail,
  CalendarDays,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../services/api";

function OwnerReview() {
  const navigate = useNavigate();

  const [ratings, setRatings] = useState([]);
  const [totalRatings, setTotalRatings] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);

  // =====================================================
  // FETCH REVIEWS
  // =====================================================

  const fetchRatings = async () => {
    try {
      setLoading(true);

      const response = await api.get("/ratings");

      if (response.data.success) {
        setRatings(response.data.ratings || []);
        setTotalRatings(response.data.totalRatings || 0);
        setAverageRating(response.data.averageRating || 0);
      } else {
        setRatings([]);
        setTotalRatings(0);
        setAverageRating(0);
      }
    } catch (error) {
      console.error("Ratings fetch error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to load reviews"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  // =====================================================
  // DELETE REVIEW
  // =====================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleteLoading(id);

      const response = await api.delete(`/ratings/${id}`);

      if (response.data.success) {
        toast.success("Review deleted successfully");

        setRatings((previous) =>
          previous.filter(
            (rating) => rating._id !== id
          )
        );

        // Recalculate statistics locally
        const remainingRatings = ratings.filter(
          (rating) => rating._id !== id
        );

        const newTotal = remainingRatings.length;

        const newAverage =
          newTotal > 0
            ? (
                remainingRatings.reduce(
                  (sum, item) => sum + item.rating,
                  0
                ) / newTotal
              ).toFixed(1)
            : 0;

        setTotalRatings(newTotal);
        setAverageRating(Number(newAverage));
      }
    } catch (error) {
      console.error("Review delete error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to delete review"
      );
    } finally {
      setDeleteLoading(null);
    }
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =====================================================
  // STAR RENDER
  // =====================================================

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={17}
            className={
              star <= rating
                ? "fill-[#D6B84C] text-[#D6B84C]"
                : "text-[#CFC8B8] dark:text-[#4A463E]"
            }
          />
        ))}
      </div>
    );
  };

  // =====================================================
  // LOADING STATE
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F3F0E8] dark:bg-[#10100F]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#D8D1BF] border-t-[#A37D1D] dark:border-[#34312B] dark:border-t-[#D6B84C]" />

          <p className="text-sm text-[#777266] dark:text-[#A6A198]">
            Loading reviews...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F0E8] text-[#25231F] dark:bg-[#10100F] dark:text-[#F1EFE8]">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <header className="sticky top-0 z-30 border-b border-[#DDD8CC] bg-[#FAF8F2]/95 backdrop-blur dark:border-[#2D2B27] dark:bg-[#181715]/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-3">

            <button
              type="button"
              onClick={() => navigate("/owner")}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D8D1BF] text-[#666158] transition hover:bg-[#ECE7DC] dark:border-[#34312B] dark:text-[#A6A198] dark:hover:bg-[#24221E]"
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#927016] dark:text-[#D6B84C]">
                Portfolio
              </p>

              <h1 className="text-lg font-bold">
                Reviews Management
              </h1>
            </div>

          </div>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="hidden items-center gap-2 rounded-xl border border-[#D8D1BF] px-4 py-2.5 text-sm font-medium text-[#666158] transition hover:bg-[#ECE7DC] sm:flex dark:border-[#34312B] dark:text-[#A6A198] dark:hover:bg-[#24221E]"
          >
            <ExternalLink size={16} />
            View Portfolio
          </button>

        </div>
      </header>

      {/* =====================================================
          MAIN
          ===================================================== */}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* =================================================
            PAGE INTRO
            ================================================= */}

        <section className="mb-8 rounded-2xl border border-[#DDD8CC] bg-[#FAF8F2] p-6 shadow-sm dark:border-[#2D2B27] dark:bg-[#181715]">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EFE7D3] text-[#806510] dark:bg-[#29251D] dark:text-[#D6B84C]">
              <MessageSquare size={22} />
            </div>

            <div>
              <p className="text-sm text-[#777266] dark:text-[#A6A198]">
                Manage visitor feedback
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                Reviews & Ratings
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#777266] dark:text-[#A6A198]">
                View the ratings and feedback submitted
                by visitors to your portfolio. You can
                remove reviews that you do not want to
                display publicly.
              </p>
            </div>

          </div>

        </section>

        {/* =================================================
            STATISTICS
            ================================================= */}

        <section className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {/* TOTAL REVIEWS */}

          <div className="rounded-2xl border border-[#DDD8CC] bg-[#FAF8F2] p-6 shadow-sm dark:border-[#2D2B27] dark:bg-[#181715]">

            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EFE7D3] text-[#806510] dark:bg-[#29251D] dark:text-[#D6B84C]">
                <MessageSquare size={20} />
              </div>

              <div>
                <p className="text-sm text-[#777266] dark:text-[#A6A198]">
                  Total Reviews
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {totalRatings}
                </p>
              </div>

            </div>

          </div>

          {/* AVERAGE RATING */}

          <div className="rounded-2xl border border-[#DDD8CC] bg-[#FAF8F2] p-6 shadow-sm dark:border-[#2D2B27] dark:bg-[#181715]">

            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EFE7D3] text-[#806510] dark:bg-[#29251D] dark:text-[#D6B84C]">
                <Star
                  size={20}
                  className="fill-current"
                />
              </div>

              <div>
                <p className="text-sm text-[#777266] dark:text-[#A6A198]">
                  Average Rating
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <p className="text-2xl font-bold">
                    {averageRating}
                  </p>

                  <Star
                    size={18}
                    className="fill-[#D6B84C] text-[#D6B84C]"
                  />
                </div>
              </div>

            </div>

          </div>

          {/* FIVE STAR REVIEWS */}

          <div className="rounded-2xl border border-[#DDD8CC] bg-[#FAF8F2] p-6 shadow-sm dark:border-[#2D2B27] dark:bg-[#181715]">

            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EFE7D3] text-[#806510] dark:bg-[#29251D] dark:text-[#D6B84C]">
                <Star
                  size={20}
                  className="fill-current"
                />
              </div>

              <div>
                <p className="text-sm text-[#777266] dark:text-[#A6A198]">
                  5 Star Reviews
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {
                    ratings.filter(
                      (item) => item.rating === 5
                    ).length
                  }
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            REVIEW LIST HEADING
            ================================================= */}

        <div className="mb-5">

          <h2 className="text-xl font-bold">
            Visitor Reviews
          </h2>

          <p className="mt-1 text-sm text-[#777266] dark:text-[#A6A198]">
            {ratings.length}{" "}
            {ratings.length === 1
              ? "review"
              : "reviews"}{" "}
            available
          </p>

        </div>

        {/* =================================================
            EMPTY STATE
            ================================================= */}

        {ratings.length === 0 ? (

          <section className="rounded-2xl border border-dashed border-[#CFC6B6] bg-[#FAF8F2] px-6 py-16 text-center dark:border-[#39362F] dark:bg-[#181715]">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EFE7D3] text-[#806510] dark:bg-[#29251D] dark:text-[#D6B84C]">
              <MessageSquare size={24} />
            </div>

            <h3 className="text-lg font-semibold">
              No reviews yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#777266] dark:text-[#A6A198]">
              Visitor reviews and ratings will appear
              here when someone submits feedback on
              your portfolio.
            </p>

          </section>

        ) : (

          /* =================================================
             REVIEW CARDS
             ================================================= */

          <div className="grid gap-5 lg:grid-cols-2">

            {ratings.map((rating) => (

              <article
                key={rating._id}
                className="rounded-2xl border border-[#DDD8CC] bg-[#FAF8F2] p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#B18A22]/40 hover:shadow-lg dark:border-[#2D2B27] dark:bg-[#181715] dark:hover:border-[#D6B84C]/30"
              >

                {/* CARD HEADER */}

                <div className="flex items-start justify-between gap-4">

                  <div className="flex items-start gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EFE7D3] text-[#806510] dark:bg-[#29251D] dark:text-[#D6B84C]">
                      <User size={20} />
                    </div>

                    <div>

                      <h3 className="font-semibold">
                        {rating.name || "Anonymous Visitor"}
                      </h3>

                      {rating.email && (
                        <div className="mt-1 flex items-center gap-1.5 text-xs text-[#777266] dark:text-[#A6A198]">
                          <Mail size={13} />
                          {rating.email}
                        </div>
                      )}

                    </div>

                  </div>

                  {/* DELETE */}

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(rating._id)
                    }
                    disabled={
                      deleteLoading === rating._id
                    }
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#D8D1BF] text-[#777266] transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#34312B] dark:text-[#A6A198] dark:hover:border-red-900/50 dark:hover:bg-red-950/20 dark:hover:text-red-400"
                    title="Delete review"
                  >
                    <Trash2 size={16} />
                  </button>

                </div>

                {/* RATING */}

                <div className="mt-5 flex items-center justify-between gap-4">

                  {renderStars(rating.rating)}

                  <span className="rounded-full border border-[#C9A227]/30 bg-[#E8D9A8]/40 px-3 py-1.5 text-xs font-semibold text-[#806510] dark:border-[#D6B84C]/30 dark:bg-[#D6B84C]/10 dark:text-[#D6B84C]">
                    {rating.rating}/5
                  </span>

                </div>

                {/* DESCRIPTION */}

                {rating.description ? (

                  <div className="mt-5 rounded-xl border border-[#DDD8CC] bg-[#F5F1E8] p-4 dark:border-[#302D28] dark:bg-[#211F1C]">

                    <p className="text-sm leading-6 text-[#666158] dark:text-[#A6A198]">
                      "{rating.description}"
                    </p>

                  </div>

                ) : (

                  <p className="mt-5 text-sm italic text-[#999286] dark:text-[#777269]">
                    No written feedback provided.
                  </p>

                )}

                {/* DATE */}

                {rating.createdAt && (

                  <div className="mt-5 flex items-center gap-2 border-t border-[#DDD8CC] pt-4 text-xs text-[#777266] dark:border-[#302D28] dark:text-[#A6A198]">

                    <CalendarDays size={14} />

                    <span>
                      {formatDate(rating.createdAt)}
                    </span>

                  </div>

                )}

              </article>

            ))}

          </div>

        )}

      </main>
    </div>
  );
}

export default OwnerReview;