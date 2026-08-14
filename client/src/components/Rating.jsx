import { useEffect, useState } from "react";

function Rating() {
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [alreadyRated, setAlreadyRated] = useState(false);

  const API_URL = "http://localhost:5000/api/ratings";

  // ==========================================
  // Generate/Get Visitor ID
  // ==========================================

  const getVisitorId = () => {
    let visitorId = localStorage.getItem("portfolioVisitorId");

    if (!visitorId) {
      visitorId =
        "visitor-" +
        Date.now() +
        "-" +
        Math.random().toString(36).substring(2, 10);

      localStorage.setItem("portfolioVisitorId", visitorId);
    }

    return visitorId;
  };

  // ==========================================
  // Check if visitor already rated
  // ==========================================

  useEffect(() => {
    const hasRated = localStorage.getItem("portfolioHasRated");

    if (hasRated === "true") {
      setAlreadyRated(true);
    }

    getVisitorId();
  }, []);

  // ==========================================
  // Fetch Ratings
  // ==========================================

  const fetchRatings = async () => {
    try {
      setFetching(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch ratings");
      }

      const data = await response.json();

      if (data.success) {
        setRatings(data.ratings || []);
        setAverageRating(data.averageRating || 0);
        setTotalRatings(data.totalRatings || 0);
      }
    } catch (error) {
      console.error("Rating fetch error:", error);
      setError("Unable to load reviews right now.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  // ==========================================
  // Submit Rating
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (alreadyRated) {
      setError("You have already submitted a review.");
      return;
    }

    if (!rating) {
      setError("Please select a rating.");
      return;
    }

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!description.trim()) {
      setError("Please write your feedback.");
      return;
    }

    try {
      setLoading(true);

      const visitorId = getVisitorId();

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          visitorId,
          rating,
          name: name.trim(),
          email: email.trim(),
          description: description.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to submit rating"
        );
      }

      setMessage("Thank you for your feedback!");

      setName("");
      setEmail("");
      setDescription("");
      setRating(0);
      setHoverRating(0);

      localStorage.setItem("portfolioHasRated", "true");
      setAlreadyRated(true);

      await fetchRatings();
    } catch (error) {
      console.error("Rating submit error:", error);
      setError(error.message || "Unable to submit your review.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Render Stars
  // ==========================================

  const renderStars = (value, interactive = false) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            disabled={!interactive}
            onClick={
              interactive
                ? () => setRating(star)
                : undefined
            }
            onMouseEnter={
              interactive
                ? () => setHoverRating(star)
                : undefined
            }
            onMouseLeave={
              interactive
                ? () => setHoverRating(0)
                : undefined
            }
            className={`
              text-2xl
              transition-transform
              duration-200

              ${
                interactive
                  ? "cursor-pointer hover:scale-110"
                  : "cursor-default"
              }

              ${
                star <=
                (interactive
                  ? hoverRating || rating
                  : value)
                  ? "text-[#C9A227]"
                  : "text-[#D2CDC2] dark:text-[#403C34]"
              }
            `}
            aria-label={`${star} star${
              star > 1 ? "s" : ""
            }`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  // ==========================================
  // Main UI
  // ==========================================

  return (
    <section
      id="ratings"
      className="
        bg-[#F4F0E7]
        px-5
        py-20
        transition-colors
        duration-300

        sm:px-8
        lg:px-14
        lg:py-24

        dark:bg-[#11100E]
      "
    >
      <div className="mx-auto max-w-7xl">

        {/* =====================================
            SECTION HEADING
            ===================================== */}

        <div className="mb-12">

          <p
            className="
              mb-3
              text-xs
              font-semibold
              uppercase
              tracking-[0.2em]
              text-[#927016]

              dark:text-[#D6B84C]
            "
          >
            Visitor Feedback
          </p>

          <h2
            className="
              text-3xl
              font-bold
              text-[#211F1B]

              sm:text-4xl

              dark:text-[#F1EFE8]
            "
          >
            Ratings & Reviews
          </h2>

          <p
            className="
              mt-4
              max-w-2xl
              text-sm
              leading-7
              text-[#6D6960]

              sm:text-base

              dark:text-[#A6A198]
            "
          >
            Your feedback helps me improve my portfolio
            and showcase better work.
          </p>
        </div>

        {/* =====================================
            SUMMARY + FORM
            ===================================== */}

        <div
          className="
            grid
            gap-8

            lg:grid-cols-[0.8fr_1.2fr]
          "
        >

          {/* =====================================
              RATING SUMMARY
              ===================================== */}

          <div
            className="
              rounded-2xl
              border
              border-[#D3CCBD]
              bg-[#F7F3EA]
              p-7

              dark:border-[#302D28]
              dark:bg-[#1A1917]
            "
          >

            <p
              className="
                text-sm
                font-medium
                text-[#6D6960]

                dark:text-[#A6A198]
              "
            >
              Overall Rating
            </p>

            <div className="mt-5 flex items-center gap-5">

              <span
                className="
                  text-5xl
                  font-bold
                  text-[#211F1B]

                  dark:text-[#F1EFE8]
                "
              >
                {averageRating.toFixed(1)}
              </span>

              <div>
                {renderStars(averageRating)}

                <p
                  className="
                    mt-2
                    text-xs
                    text-[#817B71]

                    dark:text-[#918C83]
                  "
                >
                  Based on {totalRatings}{" "}
                  {totalRatings === 1
                    ? "review"
                    : "reviews"}
                </p>
              </div>
            </div>

            <div
              className="
                mt-7
                border-t
                border-[#DDD6C9]
                pt-6

                dark:border-[#302D28]
              "
            >
              <p
                className="
                  text-sm
                  leading-6
                  text-[#6D6960]

                  dark:text-[#A6A198]
                "
              >
                I appreciate every review and
                suggestion. Thank you for taking
                the time to share your experience.
              </p>
            </div>
          </div>

          {/* =====================================
              REVIEW FORM
              ===================================== */}

          <div
            className="
              rounded-2xl
              border
              border-[#D3CCBD]
              bg-[#F7F3EA]
              p-7

              dark:border-[#302D28]
              dark:bg-[#1A1917]
            "
          >

            <h3
              className="
                text-xl
                font-semibold
                text-[#211F1B]

                dark:text-[#F1EFE8]
              "
            >
              Leave a Review
            </h3>

            <p
              className="
                mt-2
                text-sm
                text-[#6D6960]

                dark:text-[#A6A198]
              "
            >
              Share your thoughts about my
              portfolio.
            </p>

            {alreadyRated ? (
              <div
                className="
                  mt-7
                  rounded-xl
                  border
                  border-[#C9A227]/30
                  bg-[#E8D9A8]/30
                  p-5

                  dark:border-[#D6B84C]/30
                  dark:bg-[#D6B84C]/10
                "
              >
                <p
                  className="
                    text-sm
                    font-medium
                    text-[#806510]

                    dark:text-[#D6B84C]
                  "
                >
                  ✓ You have already submitted
                  your review. Thank you!
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-7"
              >

                {/* Stars */}

                <div>
                  <label
                    className="
                      mb-3
                      block
                      text-sm
                      font-medium
                      text-[#211F1B]

                      dark:text-[#F1EFE8]
                    "
                  >
                    Your Rating
                  </label>

                  {renderStars(rating, true)}
                </div>

                {/* Name + Email */}

                <div
                  className="
                    mt-6
                    grid
                    gap-5

                    sm:grid-cols-2
                  "
                >

                  <div>
                    <label
                      className="
                        mb-2
                        block
                        text-sm
                        font-medium
                        text-[#211F1B]

                        dark:text-[#F1EFE8]
                      "
                    >
                      Name
                    </label>

                    <input
                      type="text"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      placeholder="Your name"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-[#D3CCBD]
                        bg-[#FCFAF5]
                        px-4
                        py-3
                        text-sm
                        text-[#211F1B]
                        outline-none

                        focus:border-[#A77C16]

                        dark:border-[#302D28]
                        dark:bg-[#12110F]
                        dark:text-[#F1EFE8]

                        dark:focus:border-[#D6B84C]
                      "
                    />
                  </div>

                  <div>
                    <label
                      className="
                        mb-2
                        block
                        text-sm
                        font-medium
                        text-[#211F1B]

                        dark:text-[#F1EFE8]
                      "
                    >
                      Email
                    </label>

                    <input
                      type="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      placeholder="your@email.com"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-[#D3CCBD]
                        bg-[#FCFAF5]
                        px-4
                        py-3
                        text-sm
                        text-[#211F1B]
                        outline-none

                        focus:border-[#A77C16]

                        dark:border-[#302D28]
                        dark:bg-[#12110F]
                        dark:text-[#F1EFE8]

                        dark:focus:border-[#D6B84C]
                      "
                    />
                  </div>
                </div>

                {/* Description */}

                <div className="mt-5">

                  <label
                    className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-[#211F1B]

                      dark:text-[#F1EFE8]
                    "
                  >
                    Your Feedback
                  </label>

                  <textarea
                    value={description}
                    onChange={(e) =>
                      setDescription(e.target.value)
                    }
                    placeholder="Write your feedback..."
                    rows={5}
                    className="
                      w-full
                      resize-none
                      rounded-xl
                      border
                      border-[#D3CCBD]
                      bg-[#FCFAF5]
                      px-4
                      py-3
                      text-sm
                      leading-6
                      text-[#211F1B]
                      outline-none

                      focus:border-[#A77C16]

                      dark:border-[#302D28]
                      dark:bg-[#12110F]
                      dark:text-[#F1EFE8]

                      dark:focus:border-[#D6B84C]
                    "
                  />
                </div>

                {/* Error */}

                {error && (
                  <div
                    className="
                      mt-5
                      rounded-xl
                      border
                      border-red-200
                      bg-red-50
                      px-4
                      py-3
                      text-sm
                      text-red-700

                      dark:border-red-900/50
                      dark:bg-red-950/20
                      dark:text-red-400
                    "
                  >
                    {error}
                  </div>
                )}

                {/* Success */}

                {message && (
                  <div
                    className="
                      mt-5
                      rounded-xl
                      border
                      border-green-200
                      bg-green-50
                      px-4
                      py-3
                      text-sm
                      text-green-700

                      dark:border-green-900/50
                      dark:bg-green-950/20
                      dark:text-green-400
                    "
                  >
                    {message}
                  </div>
                )}

                {/* Submit */}

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    mt-6
                    inline-flex
                    w-full
                    items-center
                    justify-center
                    rounded-full

                    bg-[#9B7416]
                    px-6
                    py-3

                    text-sm
                    font-semibold
                    text-white

                    transition-all
                    duration-300

                    hover:-translate-y-0.5
                    hover:bg-[#806010]
                    hover:shadow-md

                    disabled:cursor-not-allowed
                    disabled:opacity-60

                    dark:bg-[#C09A2D]
                    dark:text-[#171511]

                    dark:hover:bg-[#D6B84C]
                  "
                >
                  {loading
                    ? "Submitting..."
                    : "Submit Review"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* =====================================
            REVIEWS
            ===================================== */}

        <div className="mt-12">

          <div className="mb-6 flex items-center justify-between">

            <h3
              className="
                text-xl
                font-semibold
                text-[#211F1B]

                dark:text-[#F1EFE8]
              "
            >
              What Visitors Say
            </h3>

            {totalRatings > 0 && (
              <span
                className="
                  text-xs
                  font-medium
                  text-[#817B71]

                  dark:text-[#918C83]
                "
              >
                {totalRatings}{" "}
                {totalRatings === 1
                  ? "Review"
                  : "Reviews"}
              </span>
            )}
          </div>

          {fetching ? (
            <div
              className="
                rounded-2xl
                border
                border-[#D3CCBD]
                bg-[#F7F3EA]
                px-6
                py-10
                text-center

                dark:border-[#302D28]
                dark:bg-[#1A1917]
              "
            >
              <p
                className="
                  text-sm
                  text-[#6D6960]

                  dark:text-[#A6A198]
                "
              >
                Loading reviews...
              </p>
            </div>
          ) : ratings.length > 0 ? (
            <div
              className="
                grid
                gap-5

                md:grid-cols-2
                lg:grid-cols-3
              "
            >
              {ratings.map((item) => (
                <div
                  key={item._id}
                  className="
                    rounded-2xl
                    border
                    border-[#D3CCBD]
                    bg-[#F7F3EA]
                    p-6

                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:shadow-md

                    dark:border-[#302D28]
                    dark:bg-[#1A1917]
                  "
                >

                  {/* Stars */}

                  {renderStars(item.rating)}

                  {/* Name */}

                  <h4
                    className="
                      mt-4
                      text-base
                      font-semibold
                      text-[#211F1B]

                      dark:text-[#F1EFE8]
                    "
                  >
                    {item.name || "Anonymous"}
                  </h4>

                  {/* Review */}

                  {item.description && (
                    <p
                      className="
                        mt-3
                        text-sm
                        leading-6
                        text-[#6D6960]

                        dark:text-[#A6A198]
                      "
                    >
                      "{item.description}"
                    </p>
                  )}

                  {/* Date */}

                  {item.createdAt && (
                    <p
                      className="
                        mt-5
                        text-[11px]
                        text-[#918B81]

                        dark:text-[#706B63]
                      "
                    >
                      {new Date(
                        item.createdAt
                      ).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div
              className="
                rounded-2xl
                border
                border-dashed
                border-[#CFC6B6]
                bg-[#F2EEE5]
                px-6
                py-12
                text-center

                dark:border-[#39362F]
                dark:bg-[#1A1917]
              "
            >
              <p
                className="
                  text-sm
                  font-medium
                  text-[#6D6960]

                  dark:text-[#A6A198]
                "
              >
                No reviews yet. Be the first
                to leave feedback!
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

export default Rating;