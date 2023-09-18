import React, { FC } from "react";
import { Helmet } from "react-helmet-async";

type PageHelmetProps = {
  title?: string;
  description?: string;
  photoUrl?: string;
  url?: string;
};

const appName = "PotaRecette";

const PageHelmet: FC<PageHelmetProps> = ({ title = "", description = "", photoUrl, url }) => {
  return (
    <Helmet title={title ? `${title} | ${appName}` : undefined} defaultTitle={appName}>
      <link rel="icon" href="/images/favicon.ico" />
      <meta name="description" content={description} />
      <meta property="og:image" content={photoUrl} />
      <meta property="og:url" content={url} />
    </Helmet>
  );
};

export default PageHelmet;
