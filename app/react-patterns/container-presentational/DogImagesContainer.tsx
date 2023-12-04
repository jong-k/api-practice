"use client";
import { useState, useEffect } from "react";
import DogImages from "./DogImages";

export default function DogImagesContainer() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetch("https://dog.ceo/api/breed/labrador/images/random/6")
      .then((res) => res.json())
      .then((data) => setDogs(data.message));
  }, []);

  // return <DogImages dogs={dogs} />;
  return <DogImages />;
}
