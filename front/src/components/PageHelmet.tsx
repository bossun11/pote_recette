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
      {/* 下記はデプロイしていないので仮のURLを設定 */}
      <meta property="og:url" content="http://localhost:3000/" />
      <meta property="og:image" content="http://localhost:3000/images/ogp.png" />
    </Helmet>
  );
};

export default PageHelmet;
