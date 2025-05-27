import React, { useState } from "react";

const Invite = () => {
  const [formData, setFormData] = useState({
    recipientEmail: "",
    senderName: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:3001/api/users/v1/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: formData.recipientEmail,
          Name: formData.senderName,
        }),
      });

      if (response.ok) {
        alert("Email sent successfully!");
        setFormData({
          recipientEmail: "",
          senderName: "",
          message: "", // message is not used in the backend but you may keep it in form
        });
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again.");

    } finally {
      setIsSubmitting(false);
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#f8fafc",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
      color: "#334155",
    },
    wrapper: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "2rem",
    },
    header: {
      background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
      borderRadius: "16px",
      padding: "2rem",
      marginBottom: "2rem",
      position: "relative",
      overflow: "hidden",
    },
    headerTitle: {
      color: "#1e40af",
      fontSize: "2rem",
      fontWeight: "600",
      marginBottom: "0.5rem",
      position: "relative",
      zIndex: 1,
      margin: 0,
    },
    headerSubtitle: {
      color: "#475569",
      fontSize: "1.1rem",
      position: "relative",
      zIndex: 1,
      margin: 0,
    },
    decorativeIcon: {
      position: "absolute",
      top: "-10%",
      right: "-5%",
      width: "120px",
      height: "120px",
      opacity: 0.2,
    },
    formContainer: {
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "2rem",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      border: "1px solid #e2e8f0",
    },
    formGroup: {
      marginBottom: "1.5rem",
    },
    formRow: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "1.5rem",
    },
    formRowThreeCol: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: "1.5rem",
    },
    label: {
      display: "block",
      fontWeight: "500",
      color: "#374151",
      marginBottom: "0.5rem",
      fontSize: "0.95rem",
    },
    input: {
      width: "100%",
      padding: "0.75rem 1rem",
      border: "2px solid #e5e7eb",
      borderRadius: "8px",
      fontSize: "1rem",
      transition: "all 0.2s ease",
      backgroundColor: "#ffffff",
      outline: "none",
      boxSizing: "border-box",
    },
    inputFocus: {
      borderColor: "#3b82f6",
      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
    },
    textarea: {
      width: "100%",
      padding: "0.75rem 1rem",
      border: "2px solid #e5e7eb",
      borderRadius: "8px",
      fontSize: "1rem",
      transition: "all 0.2s ease",
      backgroundColor: "#ffffff",
      outline: "none",
      resize: "vertical",
      minHeight: "120px",
      fontFamily: "inherit",
      boxSizing: "border-box",
    },
    selectContainer: {
      position: "relative",
    },
    select: {
      width: "100%",
      padding: "0.75rem 2.5rem 0.75rem 1rem",
      border: "2px solid #e5e7eb",
      borderRadius: "8px",
      fontSize: "1rem",
      transition: "all 0.2s ease",
      backgroundColor: "#ffffff",
      outline: "none",
      appearance: "none",
      cursor: "pointer",
      boxSizing: "border-box",
    },
    selectArrow: {
      position: "absolute",
      right: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
      color: "#6b7280",
    },
    submitButton: {
      background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
      color: "white",
      padding: "0.875rem 2rem",
      border: "none",
      borderRadius: "8px",
      fontSize: "1rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.2s ease",
      width: "100%",
      marginTop: "1rem",
    },
    submitButtonHover: {
      transform: "translateY(-1px)",
      boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)",
    },
    submitButtonDisabled: {
      opacity: 0.5,
      cursor: "not-allowed",
      transform: "none",
    },
    loadingSpinner: {
      display: "inline-block",
      width: "20px",
      height: "20px",
      border: "2px solid rgba(255, 255, 255, 0.3)",
      borderRadius: "50%",
      borderTopColor: "white",
      animation: "spin 1s ease-in-out infinite",
      marginRight: "8px",
    },
    footer: {
      textAlign: "center",
      marginTop: "2rem",
      color: "#6b7280",
      fontSize: "0.875rem",
    },
    "@media (max-width: 768px)": {
      formRow: {
        gridTemplateColumns: "1fr",
      },
      formRowThreeCol: {
        gridTemplateColumns: "1fr",
      },
    },
  };

  const [focusedInput, setFocusedInput] = useState("");
  const [hoveredButton, setHoveredButton] = useState(false);

  const getInputStyle = (inputName) => ({
    ...styles.input,
    ...(focusedInput === inputName ? styles.inputFocus : {}),
  });

  const getTextareaStyle = () => ({
    ...styles.textarea,
    ...(focusedInput === "message" ? styles.inputFocus : {}),
  });

  const getButtonStyle = () => ({
    ...styles.submitButton,
    ...(hoveredButton && !isSubmitting ? styles.submitButtonHover : {}),
    ...(isSubmitting ? styles.submitButtonDisabled : {}),
  });

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          @media (max-width: 768px) {
            .form-row { grid-template-columns: 1fr !important; }
            .form-row-three-col { grid-template-columns: 1fr !important; }
          }
        `}
      </style>

      <div style={styles.wrapper}>
        {/* Header Section */}
        <div style={styles.header}>
          <div style={styles.decorativeIcon}>
            <svg
              viewBox="0 0 100 100"
              style={{ width: "100%", height: "100%" }}
            >
              <circle cx="20" cy="20" r="8" fill="#fbbf24" opacity="0.7" />
              <circle cx="60" cy="30" r="12" fill="#34d399" opacity="0.6" />
              <circle cx="80" cy="70" r="6" fill="#f87171" opacity="0.8" />
              <path
                d="M10 80 Q30 60 50 80 T90 80"
                stroke="#6366f1"
                strokeWidth="2"
                fill="none"
                opacity="0.5"
              />
            </svg>
          </div>

          <h1 style={styles.headerTitle}>Send Email Notification</h1>
          <p style={styles.headerSubtitle}>
            Send personalized emails to users about their expense tracking
            activities
          </p>
        </div>

        {/* Form Section */}
        <div style={styles.formContainer}>
          <div>
            {/* Recipient and Sender Row */}
            <div style={styles.formRow} className="form-row">
              <div style={styles.formGroup}>
                <label style={styles.label}>Recipient Email *</label>
                <input
                  type="email"
                  name="recipientEmail"
                  value={formData.recipientEmail}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedInput("recipientEmail")}
                  onBlur={() => setFocusedInput("")}
                  required
                  style={getInputStyle("recipientEmail")}
                  placeholder="user@example.com"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Your Name *</label>
                <input
                  type="text"
                  name="senderName"
                  value={formData.senderName}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedInput("senderName")}
                  onBlur={() => setFocusedInput("")}
                  required
                  style={getInputStyle("senderName")}
                  placeholder="Your name"
                />
              </div>
            </div>

            
            

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              onMouseEnter={() => setHoveredButton(true)}
              onMouseLeave={() => setHoveredButton(false)}
              style={getButtonStyle()}
            >
              {isSubmitting ? (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={styles.loadingSpinner}></span>
                  Sending...
                </span>
              ) : (
                "Send Email"
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p>© Expense Tracker | Secure Email Notifications</p>
        </div>
      </div>
    </div>
  );
};

export default Invite;
