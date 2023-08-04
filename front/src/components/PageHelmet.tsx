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
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={appName} />
      <meta name="twitter:title" content="summary_large_image" />
      <meta property="og:url" content={process.env.REACT_APP_HEROKU_FRONTEND_APP_URL} />
      <meta
        property="og:image"
        content={`${process.env.REACT_APP_HEROKU_FRONTEND_APP_URL}/images/ogp.png`}
      />
    </Helmet>
  );
};

export default PageHelmet;
