import React, { FC } from "react";
import { Helmet } from "react-helmet-async";

type PageHelmetProps = {
  title?: string;
  description?: string;
};

const appName = "PotaRecette";

const PageHelmet: FC<PageHelmetProps> = ({ title = "", description = "" }) => {
  return (
    <Helmet title={title ? `${title} | ${appName}` : undefined} defaultTitle={appName}>
      <link rel="icon" href="/images/favicon.ico" />
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default PageHelmet;
