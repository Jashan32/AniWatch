import ReCAPTCHA from "react-google-recaptcha";

const ReCaptcha = ({ onVerify }) => {
  const handleCaptchaChange = (token) => {
    onVerify(token); // Send token to parent
  };

  return (
    <div className="mt-4 " onClick={() => levisi(false)}>
      <ReCAPTCHA
        sitekey="6Ldpd9cqAAAAACUzAEjsAzU3RZa8IKoxX0RKoi7D"
        onChange={handleCaptchaChange}
        theme="dark"
        size="normal"
      />
    </div>
  );
};

export default ReCaptcha;