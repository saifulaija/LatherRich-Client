import React from "react";
import { NavLink } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons"; // Import the RightOutlined icon from Ant Design

interface PageNavigationProps {
  title: string;
}

const PageNavigation: React.FC<PageNavigationProps> = ({
  title,
}): JSX.Element => {
  const renderTitle = () => {
    // Split the title string into parts using ' <RightOutlined /> ' as a separator
    const parts = title.split(" <RightOutlined /> ");

    // Render each part with appropriate formatting
    return parts.map((part, index) => (
      <span key={index}>
        {index > 0 && <RightOutlined />}{" "}
        {/* Render RightOutlined for all parts except the first */}
        {part}
      </span>
    ));
  };

  return (
    <div className="h-6 flex justify-start gap-1 font-medium items-center ps-2-2  ">
      <NavLink to="/">Home</NavLink> <RightOutlined />
      {renderTitle()} {/* Render the parsed title */}
    </div>
  );
};

export default PageNavigation;
