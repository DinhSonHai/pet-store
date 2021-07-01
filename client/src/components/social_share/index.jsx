import React from "react";
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  TwitterShareButton,
} from "react-share";
import {
  MessengerShare,
  FacebookShare,
  TwitterShare,
} from "../../assets/icons";
import { REACT_APP_FACEBOOK_CLIENT } from "../../config/login";
import './styles.scss';

const SocialShare = () => {
  return (
    <div className="share-actions">
      <FacebookShareButton url={window.location.href}>
        <FacebookShare />
      </FacebookShareButton>
      <FacebookMessengerShareButton
        url={window.location.href}
        appId={REACT_APP_FACEBOOK_CLIENT}
      >
        <MessengerShare />
      </FacebookMessengerShareButton>
      <TwitterShareButton url={window.location.href}>
        <TwitterShare />
      </TwitterShareButton>
    </div>
  );
};

export default SocialShare;