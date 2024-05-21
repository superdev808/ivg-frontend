import { confirmPopup } from 'primereact/confirmpopup';
import React, { useState } from 'react';
import { Player } from 'video-react';
import cx from 'classnames';

export interface VideoPlayerProps {
  forbidden: boolean;
  zoomOnClick: boolean;
  title?: string;
  subtitle?: string;
  videoSrc: string;
  startTime?: number;
}

const VideoPlayer = ({
  forbidden = false,
  zoomOnClick,
  title = "Ivory Insight",
  subtitle = "",
  videoSrc,
  startTime = 0,
}: VideoPlayerProps) => {
  const [opened, setOpened] = useState(false);

  const planBlocker = forbidden ? (
    <div className='absolute top-0 left-0 w-full h-full flex flex-column align-items-center overflow-auto text-center font-bold' style={{ backgroundColor: '#DEBEA5E0' }}>
      <i className="pi pi-lock my-4" style={{ fontSize: '4rem' }}></i>
      <p>
        This is for Premium members.
      </p>
      <p>
        Upgrade your account to
        access this feature.
      </p>
    </div>
  ) : <></>;

  const zoomedVideo = (
    <div className='flex-1 flex flex-column align-items-center px-4 pt-2 pb-4 border-round-lg' style={{ backgroundColor: '#DEBEA5', color: '#173327' }}>
      <h1 className='my-2'>{title}</h1>
      <h3 className='my-0'>{subtitle}</h3>
      <div className='relative w-full mt-3'>
        <Player
          playsInline
          src={videoSrc}
          startTime={startTime}
          preload='auto'
        />
        {planBlocker}
      </div>
    </div>
  )

  const handlePopup = (event: any) => {
    confirmPopup({
      target: event.currentTarget,
      style: {
        minWidth: 600,
      },
      footer: <></>,
      message: zoomedVideo,
      onShow: () => setOpened(true),
      onHide: () => setOpened(false),
    });
  };

  if (zoomOnClick === false)
    return zoomedVideo;

  return (
    <div
      onClick={handlePopup}
      className='flex-auto relative hide-vide-react-button'
      style={{
        border: opened ? '3px solid #173327' : `none`,
      }}
    >
      <Player
        playsInline
        src={videoSrc}
        startTime={startTime}
      />
      {
        planBlocker
      }
    </div>
  );
};

export default VideoPlayer;