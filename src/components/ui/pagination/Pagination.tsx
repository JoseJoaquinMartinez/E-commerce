import React from "react";
import {
  IoChevronBackOutline,
  IoChevronForwardCircleOutline,
} from "react-icons/io5";

interface Props {
  totalPages: number;
}

export const Pagination = ({}: Props) => {
  return (
    <div className="flex text-center mt-10 mb-32 justify-center">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          <li className="page-item ">
            <a
              className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href="#"
              aria-disabled="true"
            >
              <IoChevronBackOutline className="inline-block" />
            </a>
          </li>
          <li className="page-item">
            <a
              className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href="#"
            >
              1
            </a>
          </li>
          <li className="page-item active">
            <a
              className="page-link relative block py-1.5 px-3  border-0 bg-blue-600 outline-none transition-all duration-300 rounded text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md"
              href="#"
            >
              2 <span className="visually-hidden"></span>
            </a>
          </li>
          <li className="page-item">
            <a
              className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href="#"
            >
              3
            </a>
          </li>
          <li className="page-item">
            <a
              className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href="#"
            >
              <IoChevronForwardCircleOutline />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
