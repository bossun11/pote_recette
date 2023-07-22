import React, { FC } from "react";
import { Helmet } from "react-helmet-async";

type PageHelmetProps = {
  title?: string;
};

const PageHelmet: FC<PageHelmetProps> = ({ title = "" }) => {
  return (
    <Helmet title={title ? `${title} | PotaRecette` : undefined} defaultTitle="PotaRecette">
      <link rel="icon" href="/images/favicon.ico" />
    </Helmet>
  );
};

export default PageHelmet;
