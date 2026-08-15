import { useEffect, useState } from "react";
import api from "../services/api";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [portfolio, setPortfolio] = useState(null);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // ==========================================
  // GET PORTFOLIO CONTACT INFORMATION
  // ==========================================

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await api.get("/portfolio");

        if (response.data.success) {
          setPortfolio(response.data.portfolio);
        }
      } catch (error) {
        console.error("Portfolio fetch error:", error);
      }
    };

    fetchPortfolio();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    // Frontend validation
    if (!formData.name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }

    if (!formData.email.trim()) {
      setErrorMessage("Please enter your email.");
      return;
    }

    if (!formData.message.trim()) {
      setErrorMessage("Please enter your message.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/messages", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });

      const data = response.data;

      console.log("Message API response:", data);

      if (!data.success) {
        throw new Error(
          data.message || "Failed to send message."
        );
      }

      setSuccessMessage(
        "Message sent successfully. Thank you for contacting me!"
      );

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);

      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="
        bg-[#E9E4D8]
        px-5
        py-20
        transition-colors
        duration-300

        sm:px-8
        lg:px-14
        lg:py-24

        dark:bg-[#141311]
      "
    >
      <div className="mx-auto max-w-7xl">

        {/* =========================
            SECTION HEADING
        ========================= */}

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
            Get In Touch
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
            Contact Me
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
            Have a question, opportunity, or just want to
            connect? Send me a message and I will get back
            to you as soon as possible.
          </p>
        </div>

        {/* =========================
            CONTACT GRID
        ========================= */}

        <div
          className="
            grid
            gap-8

            lg:grid-cols-[0.8fr_1.2fr]
          "
        >

          {/* =========================
              LEFT INFORMATION
          ========================= */}

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
              Let's connect
            </h3>

            <p
              className="
                mt-4
                text-sm
                leading-7
                text-[#6D6960]

                dark:text-[#A6A198]
              "
            >
              I am always open to discussing new projects,
              internship opportunities, collaborations, or
              interesting ideas.
            </p>

            <div className="mt-8 space-y-5">

              {/* EMAIL */}

              <div>
                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-[#927016]

                    dark:text-[#D6B84C]
                  "
                >
                  Email
                </p>

                <a
                  href={
                    portfolio?.email
                      ? `mailto:${portfolio.email}`
                      : "#"
                  }
                  className="
                    mt-1
                    inline-block
                    break-all
                    text-sm
                    text-[#4F4A42]
                    transition-colors
                    hover:text-[#927016]

                    dark:text-[#C9C4BA]
                    dark:hover:text-[#D6B84C]
                  "
                >
                  {portfolio?.email || "Loading..."}
                </a>
              </div>

              {/* PHONE */}

              <div>
                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-[#927016]

                    dark:text-[#D6B84C]
                  "
                >
                  Contact
                </p>

                <a
                  href={
                    portfolio?.phone
                      ? `tel:${portfolio.phone}`
                      : "#"
                  }
                  className="
                    mt-1
                    inline-block
                    break-all
                    text-sm
                    text-[#4F4A42]
                    transition-colors
                    hover:text-[#927016]

                    dark:text-[#C9C4BA]
                    dark:hover:text-[#D6B84C]
                  "
                >
                  {portfolio?.phone || "Loading..."}
                </a>
              </div>

              {/* RESPONSE */}

              <div>
                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-[#927016]

                    dark:text-[#D6B84C]
                  "
                >
                  Response
                </p>

                <p
                  className="
                    mt-1
                    text-sm
                    text-[#6D6960]

                    dark:text-[#A6A198]
                  "
                >
                  I usually respond as soon as possible.
                </p>
              </div>

            </div>
          </div>

          {/* =========================
              CONTACT FORM
          ========================= */}

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
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* NAME + EMAIL */}

              <div
                className="
                  grid
                  gap-5

                  sm:grid-cols-2
                "
              >

                {/* NAME */}

                <div>
                  <label
                    htmlFor="name"
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
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    disabled={loading}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-[#D3CCBD]
                      bg-[#FBF9F4]
                      px-4
                      py-3
                      text-sm
                      text-[#211F1B]
                      outline-none

                      transition-all
                      duration-200

                      placeholder:text-[#9A948A]

                      focus:border-[#A77C16]
                      focus:ring-2
                      focus:ring-[#C9A227]/20

                      disabled:cursor-not-allowed
                      disabled:opacity-60

                      dark:border-[#39362F]
                      dark:bg-[#141311]
                      dark:text-[#F1EFE8]
                      dark:placeholder:text-[#777169]

                      dark:focus:border-[#D6B84C]
                      dark:focus:ring-[#D6B84C]/20
                    "
                  />
                </div>

                {/* EMAIL */}

                <div>
                  <label
                    htmlFor="email"
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
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    disabled={loading}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-[#D3CCBD]
                      bg-[#FBF9F4]
                      px-4
                      py-3
                      text-sm
                      text-[#211F1B]
                      outline-none

                      transition-all
                      duration-200

                      placeholder:text-[#9A948A]

                      focus:border-[#A77C16]
                      focus:ring-2
                      focus:ring-[#C9A227]/20

                      disabled:cursor-not-allowed
                      disabled:opacity-60

                      dark:border-[#39362F]
                      dark:bg-[#141311]
                      dark:text-[#F1EFE8]
                      dark:placeholder:text-[#777169]

                      dark:focus:border-[#D6B84C]
                      dark:focus:ring-[#D6B84C]/20
                    "
                  />
                </div>

              </div>

              {/* SUBJECT */}

              <div>
                <label
                  htmlFor="subject"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-[#211F1B]

                    dark:text-[#F1EFE8]
                  "
                >
                  Subject
                </label>

                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What would you like to discuss?"
                  disabled={loading}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-[#D3CCBD]
                    bg-[#FBF9F4]
                    px-4
                    py-3
                    text-sm
                    text-[#211F1B]
                    outline-none

                    transition-all
                    duration-200

                    placeholder:text-[#9A948A]

                    focus:border-[#A77C16]
                    focus:ring-2
                    focus:ring-[#C9A227]/20

                    disabled:cursor-not-allowed
                    disabled:opacity-60

                    dark:border-[#39362F]
                    dark:bg-[#141311]
                    dark:text-[#F1EFE8]
                    dark:placeholder:text-[#777169]

                    dark:focus:border-[#D6B84C]
                    dark:focus:ring-[#D6B84C]/20
                  "
                />
              </div>

              {/* MESSAGE */}

              <div>
                <label
                  htmlFor="message"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-[#211F1B]

                    dark:text-[#F1EFE8]
                  "
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  rows={6}
                  disabled={loading}
                  className="
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-[#D3CCBD]
                    bg-[#FBF9F4]
                    px-4
                    py-3
                    text-sm
                    leading-6
                    text-[#211F1B]
                    outline-none

                    transition-all
                    duration-200

                    placeholder:text-[#9A948A]

                    focus:border-[#A77C16]
                    focus:ring-2
                    focus:ring-[#C9A227]/20

                    disabled:cursor-not-allowed
                    disabled:opacity-60

                    dark:border-[#39362F]
                    dark:bg-[#141311]
                    dark:text-[#F1EFE8]
                    dark:placeholder:text-[#777169]

                    dark:focus:border-[#D6B84C]
                    dark:focus:ring-[#D6B84C]/20
                  "
                />
              </div>

              {/* SUCCESS MESSAGE */}

              {successMessage && (
                <div
                  className="
                    rounded-xl
                    border
                    border-green-300
                    bg-green-50
                    px-4
                    py-3
                    text-sm
                    text-green-700

                    dark:border-green-900
                    dark:bg-green-950/30
                    dark:text-green-400
                  "
                >
                  {successMessage}
                </div>
              )}

              {/* ERROR MESSAGE */}

              {errorMessage && (
                <div
                  className="
                    rounded-xl
                    border
                    border-red-300
                    bg-red-50
                    px-4
                    py-3
                    text-sm
                    text-red-700

                    dark:border-red-900
                    dark:bg-red-950/30
                    dark:text-red-400
                  "
                >
                  {errorMessage}
                </div>
              )}

              {/* SUBMIT BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="
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
                  disabled:hover:translate-y-0

                  dark:bg-[#C09A2D]
                  dark:text-[#171511]

                  dark:hover:bg-[#D6B84C]
                "
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Contact;