/* eslint-disable semi */
/* eslint-disable no-undef */
/* eslint-disable no-trailing-spaces */
/* eslint-disable curly */
/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { useState,useEffect } from "react";

function AdminPage() {
  const [pagesData, setPagesData] = useState([]);

  async function fectPageTitles() {
    try {
      const getPageTitles = await fetch("/api/pages");
      const allPageTitles = await getPageTitles.json();
      return allPageTitles;
    } catch (error) {
      console.error(error);
      return "Page TITLES  are not coming!! investigate why";
    }
  }

  async function fectPagesData(pageTitle) {
    try {
      const getPagesData = await fetch(`api/pages/${pageTitle}`);
      const pagesData = await getPagesData.json();
      return pagesData;
    } catch (error) {
      console.error(error);
      return "Pages DATA are not  coming!! investigate why";
    }
  }

  useEffect(() => {
    fectPageTitles()
      .then((pagesTitleResults) => {
        const data = pagesTitleResults.map((page) => fectPagesData(page.page_title));
        return data;
      })
      .then((pagesData) => setPagesData(pagesData));
  }, []);

  if (!pagesData) <p>Loading..</p>;

  console.log(pagesData);

}

export default AdminPage;
