/**
 * @param {Object} props
 * @param {string} props.text
 * @param {boolean} [props.center]
 * @param {boolean} [props.white]
 */
const PreTitle = ({ text, center = false, white = false }) => {
  return (
    <div className={`flex items-center gap-3 mb-4 ${center ? "justify-center" : ""}`}>
      <div className="w-2 h-2 bg-accent"></div>
      <p
        className={`font-primary text-xs md:text-sm xl:text-base tracking-[3.2px] uppercase ${
          white ? "text-white" : ""
        }`}
      >
        {text}
      </p>
      <div className="w-2 h-2 bg-accent"></div>
    </div>
  )
}

export default PreTitle