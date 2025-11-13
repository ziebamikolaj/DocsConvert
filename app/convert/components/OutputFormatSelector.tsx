import React from "react";

interface OutputFormatSelectorProps {
  outputFormat: "html" | "xml" | "htl";
  setOutputFormat: (format: "html" | "xml" | "htl") => void;
}

const OutputFormatSelector: React.FC<OutputFormatSelectorProps> = ({
  outputFormat,
  setOutputFormat,
}) => {
  return (
    <div className="space-y-4">
      <label className="flex justify-center text-sm font-medium text-gray-700">
        Output Format
      </label>
      <div className="flex justify-center">
        {(["html", "xml", "htl"] as const).map((format, index) => (
          <button
            key={format}
            onClick={() => setOutputFormat(format)}
            className={` ${index === 0 ? "rounded-l-md" : ""} ${index === 2 ? "rounded-r-md" : ""} ${
              outputFormat === format
                ? "bg-primary text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            } relative inline-flex items-center border border-gray-300 px-4 py-2 text-sm font-medium transition-colors duration-200 ease-in-out focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
          >
            {format.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OutputFormatSelector;
