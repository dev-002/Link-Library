import React from "react";
import { Link } from "react-router-dom";

export default function Linkpath({ name, TO, icon }) {
  return (
    <li className="my-3">
      <Link
        className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md "
        to={TO}
      >
        {icon}
        <span className="mx-4 font-medium">{name}</span>
      </Link>
    </li>
  );
}
